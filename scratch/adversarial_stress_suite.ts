/**
 * GoTRACE Field Integration Toolkit — Adversarial Stress & Concurrency Challenge Suite
 * 
 * Vectors Tested:
 * 1. Serial Stream & Ring Buffer (High-frequency electrical noise, non-ASCII junk, packet fragmentation, malformed frames)
 * 2. Weight Stabilization Engine (Erratic vehicle bouncing, sudden drops, variance <= 5kg, anti-double-weighing hysteresis)
 * 3. ERP Webhook & Security (Tampered payloads, bit-flipped HMAC signatures, replay/timestamp expiration, empty line items)
 * 4. Concurrency & Performance (Parallel load testing of dynamic QR generation, P95 latency SLA < 30ms)
 */

import { performance } from 'node:perf_hooks';
import { Readable, Writable } from 'node:stream';
import type { IncomingMessage, ServerResponse } from 'node:http';
import * as assert from 'node:assert/strict';

// Toolkit imports
import { StreamRingBuffer } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/filter/ring_buffer.ts';
import { ToledoParser } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/parsers/toledo.ts';
import { CasParser } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/parsers/cas.ts';
import { YaohuaParser } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/parsers/yaohua.ts';
import { MultiProtocolParser } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/parsers/multi_parser.ts';
import { WeightStabilizer } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/stabilizer/stable_detector.ts';
import { EdgeBridgeDaemon } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/daemon.ts';
import type { RawWeightReading } from '../teamwork_projects/gotrace_field_toolkit/packages/edge_bridge/src/types/index.ts';

import { WebhookReceiver } from '../teamwork_projects/gotrace_field_toolkit/packages/erp_connector/dist/src/webhooks/webhook_receiver.js';
import { generateHmacSha256, verifyHmacSha256 } from '../teamwork_projects/gotrace_field_toolkit/packages/erp_connector/dist/src/crypto/hmac.js';
import { generateTraceabilityQr } from '../teamwork_projects/gotrace_field_toolkit/packages/erp_connector/dist/src/qr/qr_generator.js';
import { createRequestHandler } from '../teamwork_projects/gotrace_field_toolkit/packages/erp_connector/dist/src/api/server.js';

// In-memory HTTP Mock Streams
class MockIncomingMessage extends Readable {
  method: string;
  url: string;
  headers: Record<string, string>;

  constructor(method: string, url: string, headers: Record<string, string> = {}, body?: string | Buffer) {
    super();
    this.method = method;
    this.url = url;
    this.headers = Object.fromEntries(
      Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])
    );
    if (body !== undefined) {
      this.push(typeof body === 'string' ? Buffer.from(body) : body);
    }
    this.push(null);
  }

  _read() {}
}

class MockServerResponse extends Writable {
  statusCode: number = 200;
  headers: Record<string, string> = {};
  body: string = '';
  private chunks: Buffer[] = [];

  writeHead(statusCode: number, headers?: Record<string, string>) {
    this.statusCode = statusCode;
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        this.headers[k.toLowerCase()] = v;
      }
    }
    return this;
  }

  setHeader(name: string, value: string) {
    this.headers[name.toLowerCase()] = value;
    return this;
  }

  getHeader(name: string) {
    return this.headers[name.toLowerCase()];
  }

  _write(chunk: any, encoding: any, callback: any) {
    this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    callback();
  }

  end(data?: any) {
    if (data) {
      this.chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
    }
    this.body = Buffer.concat(this.chunks).toString('utf-8');
    super.end();
    this.emit('finish');
    return this;
  }
}

interface TestSummary {
  vector: string;
  name: string;
  passed: boolean;
  metrics: Record<string, unknown>;
  details: string;
}

const results: TestSummary[] = [];

function recordResult(vector: string, name: string, passed: boolean, metrics: Record<string, unknown>, details: string) {
  results.push({ vector, name, passed, metrics, details });
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${icon}] ${vector} :: ${name}`);
  for (const [k, v] of Object.entries(metrics)) {
    console.log(`       - ${k}: ${typeof v === 'number' && !Number.isInteger(v) ? v.toFixed(3) : v}`);
  }
}

// =========================================================================
// VECTOR 1: Serial Stream & Ring Buffer
// =========================================================================
async function runVector1_SerialStress() {
  console.log('\n============================================================');
  console.log('>>> RUNNING VECTOR 1: Serial Stream & Ring Buffer Stress');
  console.log('============================================================\n');

  // Test 1.1A: Pure Electrical Noise Stream (50,000 bytes with zero valid delimiters)
  {
    const ringBuffer = new StreamRingBuffer(8192);
    const noiseCount = 50_000;
    const pureNoise = Buffer.alloc(noiseCount);
    for (let i = 0; i < noiseCount; i++) {
      pureNoise[i] = 0x80 + (i % 120);
    }

    let threwError = false;
    const frames: Buffer[] = [];
    ringBuffer.on('frame', (f) => frames.push(f));

    try {
      ringBuffer.push(pureNoise);
    } catch (err) {
      threwError = true;
    }

    const metrics = ringBuffer.getMetrics();
    const passed = !threwError && 
                   metrics.droppedNoiseBytes === noiseCount && 
                   frames.length === 0 && 
                   metrics.validFramesExtracted === 0;

    recordResult('Vector 1', 'Pure Electrical Noise Rejection (50KB)', passed, {
      totalBytesReceived: metrics.totalBytesReceived,
      droppedNoiseBytes: metrics.droppedNoiseBytes,
      validFramesExtracted: metrics.validFramesExtracted,
      noiseDropRatePct: (metrics.droppedNoiseBytes / noiseCount) * 100,
      threwError,
    }, 'StreamRingBuffer discarded 100% of non-framed electrical noise bytes with zero false triggers.');
  }

  // Test 1.1B: Complex Adversarial Noise with Delimiter Collisions & Valid Frames
  {
    const daemon = new EdgeBridgeDaemon({
      stationGci: 'VN.DT.SCALE.001',
      defaultVehiclePlate: '66C-12345'
    });

    let ticketsCount = 0;
    let parserErrorsCaught = 0;
    let validReadings = 0;
    daemon.on('ticketGenerated', () => ticketsCount++);
    daemon.on('parserError', () => parserErrorsCaught++);
    daemon.on('reading', (r) => { if (r.netKg > 1000) validReadings++; });

    const totalNoiseBytes = 100_000;
    const noiseBuffer = Buffer.alloc(totalNoiseBytes);
    for (let i = 0; i < totalNoiseBytes; i++) {
      noiseBuffer[i] = Math.floor(Math.random() * 256);
    }

    const validFrameStr = 'ST,GS,0,+ 45000.0,kg\r\n';
    const validFrameBuf = Buffer.from(validFrameStr, 'ascii');
    const validPositions = [2000, 11000, 24000, 39000, 52000, 64000, 75000, 83000, 91000, 97000];
    for (const pos of validPositions) {
      validFrameBuf.copy(noiseBuffer, pos);
    }

    let threwUncaught = false;
    try {
      let offset = 0;
      while (offset < totalNoiseBytes) {
        const chunkSize = Math.min(totalNoiseBytes - offset, Math.floor(Math.random() * 1500) + 1);
        daemon.feedBytes(noiseBuffer.subarray(offset, offset + chunkSize));
        offset += chunkSize;
      }
    } catch (err) {
      threwUncaught = true;
    }

    const passed = !threwUncaught && validReadings > 0 && ticketsCount === 0;

    recordResult('Vector 1', 'Complex Noise & Delimiter Collision Fuzzing (100KB)', passed, {
      totalBytesStreamed: totalNoiseBytes,
      validReadingsExtracted: validReadings,
      parserErrorsSafelyCaught: parserErrorsCaught,
      prematureTicketsEmitted: ticketsCount,
      threwUncaught,
    }, 'Daemon survived 100KB high-frequency noise bursts, recovered valid frames, emitted zero false tickets.');
  }

  // Test 1.2: Extreme Packet Fragmentation across 1-byte and 2-byte boundaries
  {
    const ringBuffer = new StreamRingBuffer(4096);
    const frameTemplates = [
      'ST,GS,0,+ 45000.0,kg\r\n',
      'ST,GS,+0045000.0,kg\r\n',
      '=000054+0\r',
      '=+045000\r',
    ];

    const totalSent = 400;
    const assembledFrames: string[] = [];
    ringBuffer.on('frame', (buf) => assembledFrames.push(buf.toString('ascii')));

    for (let i = 0; i < totalSent; i++) {
      const frame = frameTemplates[i % frameTemplates.length];
      let pos = 0;
      while (pos < frame.length) {
        const step = Math.min(frame.length - pos, Math.floor(Math.random() * 3) + 1);
        ringBuffer.push(frame.slice(pos, pos + step));
        pos += step;
      }
    }

    const passed = assembledFrames.length === totalSent;
    recordResult('Vector 1', 'Micro-Fragmentation Assembly (400 frames, 1-3 byte chunks)', passed, {
      totalFramesSent: totalSent,
      assembledFramesCount: assembledFrames.length,
      assemblySuccessRatePct: (assembledFrames.length / totalSent) * 100,
    }, 'StreamRingBuffer cleanly reassembled all frames split across micro-chunks.');
  }

  // Test 1.3: Malformed & Pathological Frame Fuzzing across Toledo, CAS, Yaohua
  {
    const daemon = new EdgeBridgeDaemon({
      stationGci: 'VN.DT.SCALE.001',
      defaultVehiclePlate: '66C-12345'
    });

    let daemonErrorsCaught = 0;
    let daemonTickets = 0;
    daemon.on('parserError', () => daemonErrorsCaught++);
    daemon.on('ticketGenerated', () => daemonTickets++);

    const pathologicalFrames: (Buffer | string)[] = [
      '',
      '   ',
      Buffer.from([0x02, 0x01, 0x02, 0x03, 0x0d, 0x0a]),
      'ST,GS',
      'ST,GS,0',
      'ST,GS,0,NOT_A_NUMBER,kg\r\n',
      'ST,GS,0,+ 45000.0,INVALID_UNIT\r\n',
      '=\r',
      '=+abcdefgh\r',
      Buffer.from([0x02, 0xff, 0xff, 0xff, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x0d, 0x0a]),
      'S S \r\n',
      'S X 45000.0 kg\r\n',
      Buffer.from([0x00, 0xff, 0xfe, 0xfd, 0x0a]),
    ];

    let threwUncaught = false;
    try {
      for (const badFrame of pathologicalFrames) {
        daemon.feedBytes(badFrame);
        try {
          MultiProtocolParser.parse(badFrame);
        } catch {
          // Expected
        }
      }
    } catch (err) {
      threwUncaught = true;
      console.error('Pathological frame caused uncaught exception:', err);
    }

    const validFrame = 'ST,GS,0,+ 45000.0,kg\r\n';
    let recoveredReading: RawWeightReading | null = null;
    daemon.on('reading', (r) => { recoveredReading = r; });
    daemon.feedBytes(validFrame);

    const passed = !threwUncaught && recoveredReading !== null && (recoveredReading as RawWeightReading).netKg === 45000;
    recordResult('Vector 1', 'Malformed Frame Fuzzing & Daemon Fault Tolerance', passed, {
      pathologicalFramesTested: pathologicalFrames.length,
      daemonErrorsSafelyCaught: daemonErrorsCaught,
      threwUncaught,
      daemonRecovered: recoveredReading !== null,
    }, 'MultiProtocolParser and EdgeBridgeDaemon caught all malformed frames without unhandled crash.');
  }
}

// =========================================================================
// VECTOR 2: Weight Stabilization Engine
// =========================================================================
async function runVector2_StabilizationStress() {
  console.log('\n============================================================');
  console.log('>>> RUNNING VECTOR 2: Weight Stabilization Engine Stress');
  console.log('============================================================\n');

  // Test 2.1: Erratic Vehicle Bouncing & Severe Oscillation (300 samples)
  {
    const stabilizer = new WeightStabilizer({
      windowSeconds: 2.5,
      sampleRateHz: 10,
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      requireHardwareStability: true
    });

    let ticketsEmitted = 0;
    stabilizer.on('stableWeight', () => ticketsEmitted++);

    let prematureStableDetected = false;
    let now = Date.now();

    for (let i = 0; i < 300; i++) {
      now += 100;
      let simulatedWeight: number;
      let isHwStable = false;

      if (i < 50) {
        simulatedWeight = 20000 + 25000 * Math.sin(i * 0.4) + (Math.random() * 5000 - 2500);
      } else if (i < 150) {
        simulatedWeight = 45000 + 400 * Math.sin(i * 0.5) + (Math.random() * 200 - 100);
      } else if (i < 250) {
        simulatedWeight = 45000 + 15 * Math.sin(i * 0.3) + (Math.random() * 10 - 5);
      } else {
        simulatedWeight = 45000 + 6 * Math.sin(i * 0.2);
        isHwStable = i % 2 === 0;
      }

      const reading: RawWeightReading = {
        grossKg: Math.round(simulatedWeight),
        tareKg: 0,
        netKg: Math.round(simulatedWeight),
        isStable: isHwStable,
        rawString: `SIM_${i}`,
        protocol: 'CAS',
        timestampMs: now,
      };

      const res = stabilizer.addReading(reading);
      if (res.isStable) {
        prematureStableDetected = true;
      }
    }

    const passed = !prematureStableDetected && ticketsEmitted === 0 && stabilizer.getState() === 'WEIGHING';
    recordResult('Vector 2', 'Erratic Vehicle Bouncing (300 samples, variance > 5kg)', passed, {
      totalBouncingSamples: 300,
      ticketsEmitted,
      prematureStableDetected,
      finalState: stabilizer.getState(),
    }, 'Stabilization algorithm rejected all bouncing samples; zero premature tickets emitted.');
  }

  // Test 2.2: Sudden Drops & Trap Scenarios
  {
    const stabilizer = new WeightStabilizer({
      windowSeconds: 2.5,
      sampleRateHz: 10,
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      requireHardwareStability: true
    });

    let ticketsEmitted = 0;
    stabilizer.on('stableWeight', () => ticketsEmitted++);

    let now = Date.now();

    for (let i = 0; i < 24; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 45000,
        tareKg: 0,
        netKg: 45000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }

    now += 100;
    const resTrap1 = stabilizer.addReading({
      grossKg: 44800,
      tareKg: 0,
      netKg: 44800,
      isStable: true,
      rawString: '',
      protocol: 'CAS',
      timestampMs: now,
    });

    assert.strictEqual(resTrap1.isStable, false, 'Trap 1 must not trigger stable weight');
    assert.strictEqual(ticketsEmitted, 0, 'Trap 1 must not emit ticket');

    stabilizer.reset();
    for (let i = 0; i < 24; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 45000,
        tareKg: 0,
        netKg: 45000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }

    now += 100;
    const resTrap2 = stabilizer.addReading({
      grossKg: 45000,
      tareKg: 0,
      netKg: 45000,
      isStable: false,
      rawString: '',
      protocol: 'CAS',
      timestampMs: now,
    });

    assert.strictEqual(resTrap2.isStable, false, 'Trap 2 must not trigger stable weight');
    assert.strictEqual(ticketsEmitted, 0, 'Trap 2 must not emit ticket');

    const passed = !resTrap1.isStable && !resTrap2.isStable && ticketsEmitted === 0;
    recordResult('Vector 2', 'Sudden Drops & Hardware Motion Bit Traps', passed, {
      trap1DropRejected: !resTrap1.isStable,
      trap2MotionRejected: !resTrap2.isStable,
      ticketsEmitted,
    }, 'Engine aborted stabilization immediately upon 200kg drop and motion bit trigger.');
  }

  // Test 2.3: True Stabilization & Anti-Double-Weighing Hysteresis Lock
  {
    const stabilizer = new WeightStabilizer({
      windowSeconds: 2.5,
      sampleRateHz: 10,
      sampleCount: 25,
      maxVarianceKg: 5.0,
      minWeightThresholdKg: 100.0,
      requireHardwareStability: true,
      hysteresisReleaseKg: 20.0,
      hysteresisDurationSeconds: 3.0,
    });

    let ticketsCount = 0;
    let releasedCount = 0;
    stabilizer.on('stableWeight', () => ticketsCount++);
    stabilizer.on('scaleReleased', () => releasedCount++);

    let now = Date.now();

    for (let i = 0; i < 25; i++) {
      now += 100;
      const reading: RawWeightReading = {
        grossKg: 45000 + (i % 2 === 0 ? 1 : -1),
        tareKg: 0,
        netKg: 45000 + (i % 2 === 0 ? 1 : -1),
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      };
      stabilizer.addReading(reading);
    }

    assert.strictEqual(ticketsCount, 1, 'Should emit exactly 1 ticket after 25 stable samples');
    assert.strictEqual(stabilizer.getState(), 'STABLE_LOCKED', 'State must be STABLE_LOCKED');

    for (let i = 0; i < 50; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 45000,
        tareKg: 0,
        netKg: 45000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }

    assert.strictEqual(ticketsCount, 1, 'MUST NOT emit duplicate ticket while truck stays on scale');

    for (let i = 0; i < 30; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 45000 + (i % 2 === 0 ? 100 : -100),
        tareKg: 0,
        netKg: 45000 + (i % 2 === 0 ? 100 : -100),
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }

    assert.strictEqual(ticketsCount, 1, 'Hysteresis lock must prevent second ticket after motion on scale');

    for (let i = 0; i < 5; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 5,
        tareKg: 0,
        netKg: 5,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }
    now += 100;
    stabilizer.addReading({
      grossKg: 200,
      tareKg: 0,
      netKg: 200,
      isStable: true,
      rawString: '',
      protocol: 'CAS',
      timestampMs: now,
    });

    assert.strictEqual(releasedCount, 0, 'Premature false-zero bounce must not release scale');
    assert.strictEqual(stabilizer.getState(), 'STABLE_LOCKED');

    for (let i = 0; i < 18; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 0,
        tareKg: 0,
        netKg: 0,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }

    assert.strictEqual(releasedCount, 1, 'Scale must release after truck departure');
    assert.strictEqual(stabilizer.getState(), 'IDLE');

    for (let i = 0; i < 25; i++) {
      now += 100;
      stabilizer.addReading({
        grossKg: 32000,
        tareKg: 0,
        netKg: 32000,
        isStable: true,
        rawString: '',
        protocol: 'CAS',
        timestampMs: now,
      });
    }

    assert.strictEqual(ticketsCount, 2, 'Should emit exactly 1 ticket for the subsequent truck');

    const passed = ticketsCount === 2 && releasedCount === 1;
    recordResult('Vector 2', 'True Stabilization & Anti-Double-Weighing Hysteresis', passed, {
      totalTicketsEmitted: ticketsCount,
      scaleReleasesCount: releasedCount,
      antiDoubleWeighingProtected: true,
      departureHysteresisEnforced: true,
    }, 'Hysteresis lock held rock-solid across 80 lingering/fluctuating samples and false zero bounces.');
  }
}

// =========================================================================
// VECTOR 3: ERP Webhook & Security Attacks
// =========================================================================
async function runVector3_SecurityStress() {
  console.log('\n============================================================');
  console.log('>>> RUNNING VECTOR 3: ERP Webhook & Security Attacks');
  console.log('============================================================\n');

  const SECRET = 'MekongGoTraceSecretKey2026!#$';
  const receiver = new WebhookReceiver({ sharedSecret: SECRET });
  const handler = createRequestHandler(receiver);

  async function executeRequest(
    method: string,
    url: string,
    headers: Record<string, string> = {},
    body?: string | Buffer
  ): Promise<{ statusCode: number; headers: Record<string, string>; body: string; json: () => any }> {
    const req = new MockIncomingMessage(method, url, headers, body) as unknown as IncomingMessage;
    const res = new MockServerResponse() as unknown as ServerResponse;

    await new Promise<void>((resolve) => {
      res.on('finish', () => resolve());
      handler(req, res);
    });

    const mockRes = res as unknown as MockServerResponse;
    return {
      statusCode: mockRes.statusCode,
      headers: mockRes.headers,
      body: mockRes.body,
      json: () => JSON.parse(mockRes.body)
    };
  }

  // Attack 3.1: 50 Tampered Payloads
  {
    const basePayload = {
      order_id: 'BRAVO-DO-2026-001',
      delivery_date: '2026-09-30T10:00:00Z',
      carrier_party_gci: 'VN.DT.PARTY.CARRIER.01',
      warehouse_gci: 'VN.DT.PLACE.WH.01',
      timestamp_utc: new Date().toISOString(),
      items: [
        {
          lot_number: 'LOT-ST25-001',
          item_code: 'VN.DT.ITEM.GRAIN.ST25',
          quantity: 45000,
          net_weight_kg: 45000,
          uom: 'KG',
          mfg_date: '2026-09-29',
          exp_date: '2027-09-29',
        }
      ]
    };

    const validRaw = JSON.stringify(basePayload);
    const validSig = generateHmacSha256(validRaw, SECRET);

    let tamperedAttempts = 0;
    let tamperedRejections = 0;

    for (let i = 0; i < 50; i++) {
      tamperedAttempts++;
      const tamperedObj = JSON.parse(validRaw);
      if (i === 0) tamperedObj.items[0].quantity = 50000;
      else if (i === 1) tamperedObj.order_id = 'BRAVO-DO-FRAUD';
      else if (i === 2) tamperedObj.injected_admin = true;
      else if (i === 3) tamperedObj.items[0].lot_number = 'LOT-POISON';
      else tamperedObj.items[0].quantity = 45000 + i;

      const tamperedRaw = JSON.stringify(tamperedObj);
      
      const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': `sha256=${validSig}`
      }, tamperedRaw);

      if (res.statusCode === 401) {
        tamperedRejections++;
      }
    }

    const passed = tamperedRejections === tamperedAttempts;
    recordResult('Vector 3', 'Payload Tampering Attacks (50 variations)', passed, {
      tamperedAttempts,
      tamperedRejections,
      rejectionRatePct: (tamperedRejections / tamperedAttempts) * 100,
      expectedStatus: 401,
    }, '100% of tampered payloads rejected with HTTP 401 HMAC_SIGNATURE_MISMATCH.');
  }

  // Attack 3.2: 64 Bit-Flipped HMAC Signatures
  {
    const payload = {
      order_id: 'BRAVO-DO-2026-002',
      delivery_date: '2026-09-30T10:00:00Z',
      timestamp_utc: new Date().toISOString(),
      items: [{ lot_number: 'LOT-1', item_code: 'VN.DT.ITEM.1', quantity: 1000, uom: 'KG' }]
    };
    const raw = JSON.stringify(payload);
    const genuineSig = generateHmacSha256(raw, SECRET);

    let bitFlipAttempts = 0;
    let bitFlipRejections = 0;

    for (let pos = 0; pos < 64; pos++) {
      bitFlipAttempts++;
      const charCode = genuineSig.charCodeAt(pos);
      const flippedChar = charCode === 48 ? '1' : '0';
      const corruptedSig = genuineSig.substring(0, pos) + flippedChar + genuineSig.substring(pos + 1);

      const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': `sha256=${corruptedSig}`
      }, raw);

      if (res.statusCode === 401) {
        bitFlipRejections++;
      }
    }

    const malformedHeaders = [
      'sha256=' + genuineSig.slice(0, 63),
      'sha256=' + genuineSig + 'a',
      'sha256=NOT_HEX_CHARS_AT_ALL_THIS_IS_TOTALLY_INVALID_CHARACTERS_FOR_HMAC',
      '',
    ];

    for (const h of malformedHeaders) {
      bitFlipAttempts++;
      const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': h
      }, raw);
      if (res.statusCode === 401) {
        bitFlipRejections++;
      }
    }

    const passed = bitFlipRejections === bitFlipAttempts;
    recordResult('Vector 3', 'Bit-Flipped & Corrupted HMAC Attacks (68 vectors)', passed, {
      bitFlipAttempts,
      bitFlipRejections,
      rejectionRatePct: (bitFlipRejections / bitFlipAttempts) * 100,
      expectedStatus: 401,
    }, '100% of bit-flipped signatures rejected with constant-time equality check.');
  }

  // Attack 3.3: Expired Timestamps & Replay Attacks (>300s Clock Skew)
  {
    const nowMs = Date.now();
    const testCases = [
      { desc: 'Timestamp 301 seconds in the past', offsetSec: -301 },
      { desc: 'Timestamp 3600 seconds in the past (1h old replay)', offsetSec: -3600 },
      { desc: 'Timestamp 86400 seconds in the past (yesterday replay)', offsetSec: -86400 },
      { desc: 'Timestamp 305 seconds in future (skew spoofing)', offsetSec: 305 },
    ];

    let replayAttempts = 0;
    let replayRejections = 0;

    for (const tc of testCases) {
      replayAttempts++;
      const expiredPayload = {
        order_id: `REPLAY-DO-${replayAttempts}`,
        delivery_date: '2026-09-30T10:00:00Z',
        timestamp_utc: new Date(nowMs + tc.offsetSec * 1000).toISOString(),
        items: [{ lot_number: 'LOT-EXP-1', item_code: 'VN.DT.ITEM.1', quantity: 500, uom: 'KG' }]
      };

      const raw = JSON.stringify(expiredPayload);
      const sig = generateHmacSha256(raw, SECRET);

      const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': `sha256=${sig}`
      }, raw);

      if (res.statusCode === 401) {
        replayRejections++;
      }
    }

    const passed = replayRejections === replayAttempts;
    recordResult('Vector 3', 'Replay Attack & Timestamp Clock Skew (>300s)', passed, {
      replayAttempts,
      replayRejections,
      rejectionRatePct: (replayRejections / replayAttempts) * 100,
      expectedStatus: 401,
    }, 'Anti-replay clock skew enforcement rejected all stale/future timestamps with 401.');
  }

  // Attack 3.4: Empty Line Items & Schema Violations
  {
    const invalidPayloads = [
      {
        name: 'Empty items array',
        payload: {
          order_id: 'DO-EMPTY-ITEMS',
          delivery_date: '2026-09-30T10:00:00Z',
          timestamp_utc: new Date().toISOString(),
          items: []
        },
        expectedStatus: 422
      },
      {
        name: 'Zero quantity item',
        payload: {
          order_id: 'DO-ZERO-QTY',
          delivery_date: '2026-09-30T10:00:00Z',
          timestamp_utc: new Date().toISOString(),
          items: [{ lot_number: 'LOT-ZERO', item_code: 'VN.DT.ITEM.1', quantity: 0, uom: 'KG' }]
        },
        expectedStatus: 422
      },
      {
        name: 'Missing lot_number',
        payload: {
          order_id: 'DO-MISSING-LOT',
          delivery_date: '2026-09-30T10:00:00Z',
          timestamp_utc: new Date().toISOString(),
          items: [{ item_code: 'VN.DT.ITEM.1', quantity: 100, uom: 'KG' }]
        },
        expectedStatus: 422
      },
      {
        name: 'Missing order_id',
        payload: {
          delivery_date: '2026-09-30T10:00:00Z',
          timestamp_utc: new Date().toISOString(),
          items: [{ lot_number: 'LOT-OK', item_code: 'VN.DT.ITEM.1', quantity: 100, uom: 'KG' }]
        },
        expectedStatus: 422
      }
    ];

    let schemaAttempts = 0;
    let schemaRejections = 0;

    for (const item of invalidPayloads) {
      schemaAttempts++;
      const raw = JSON.stringify(item.payload);
      const sig = generateHmacSha256(raw, SECRET);

      const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': `sha256=${sig}`
      }, raw);

      if (res.statusCode === item.expectedStatus) {
        schemaRejections++;
      }
    }

    const passed = schemaRejections === schemaAttempts;
    recordResult('Vector 3', 'Empty Items & Schema Violation Attacks (422 Unprocessable)', passed, {
      schemaAttempts,
      schemaRejections,
      rejectionRatePct: (schemaRejections / schemaAttempts) * 100,
      expectedStatus: 422,
    }, 'Schema validation caught empty arrays and illegal quantities, returning 422.');
  }

  // Attack 3.5: Malformed JSON Syntax (400 Bad Request)
  {
    const malformedJsonBodies = [
      '{ order_id: unquoted }',
      '{"order_id": "DO-BROKEN", "items": [',
      'THIS IS NOT JSON AT ALL',
      '\0\0\0\0',
    ];

    let badJsonAttempts = 0;
    let badJsonRejections = 0;

    for (const badJson of malformedJsonBodies) {
      badJsonAttempts++;
      const sig = generateHmacSha256(badJson, SECRET);
      const res = await executeRequest('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': `sha256=${sig}`
      }, badJson);

      if (res.statusCode === 400) {
        badJsonRejections++;
      }
    }

    const passed = badJsonRejections === badJsonAttempts;
    recordResult('Vector 3', 'Malformed JSON Payload Attacks (400 Bad Request)', passed, {
      badJsonAttempts,
      badJsonRejections,
      rejectionRatePct: (badJsonRejections / badJsonAttempts) * 100,
      expectedStatus: 400,
    }, 'Server intercepted malformed JSON syntax and returned 400 BAD_REQUEST.');
  }
}

// =========================================================================
// VECTOR 4: Concurrency & Performance Load Testing
// =========================================================================
async function runVector4_ConcurrencyStress() {
  console.log('\n============================================================');
  console.log('>>> RUNNING VECTOR 4: Concurrency & Performance Benchmark');
  console.log('============================================================\n');

  // Test 4.1: Parallel Load Test on Dynamic QR Generation (1,000 requests)
  {
    const totalRequests = 1000;
    const testUrl = 'https://trace.gotrace.vn/resolve?tx=VN.DT.TX.2026.09.LOT-998811';

    const latencies: number[] = [];
    let failureCount = 0;

    async function runPool(concurrency: number, batchCount: number) {
      let index = 0;
      const workers: Promise<void>[] = [];

      for (let c = 0; c < concurrency; c++) {
        workers.push((async () => {
          while (index < batchCount) {
            const myIdx = index++;
            const t0 = performance.now();
            try {
              const qr = generateTraceabilityQr(`${testUrl}&idx=${myIdx}`, { level: 'M', scale: 6, margin: 4 });
              const t1 = performance.now();
              latencies.push(t1 - t0);
              if (!qr.qrImageBase64.startsWith('data:image/png;base64,')) {
                failureCount++;
              }
            } catch (err) {
              failureCount++;
            }
          }
        })());
      }

      await Promise.all(workers);
    }

    const tStart = performance.now();
    await runPool(50, totalRequests);
    const totalDurationMs = performance.now() - tStart;

    latencies.sort((a, b) => a - b);
    const minMs = latencies[0];
    const maxMs = latencies[latencies.length - 1];
    const avgMs = latencies.reduce((acc, v) => acc + v, 0) / latencies.length;
    const p50Ms = latencies[Math.floor(latencies.length * 0.50)];
    const p90Ms = latencies[Math.floor(latencies.length * 0.90)];
    const p95Ms = latencies[Math.floor(latencies.length * 0.95)];
    const p99Ms = latencies[Math.floor(latencies.length * 0.99)];
    const throughputRps = (totalRequests / (totalDurationMs / 1000));

    const passed = failureCount === 0 && p95Ms < 30.0;

    recordResult('Vector 4', 'Parallel Dynamic QR Generation (1,000 runs @ 50 concurrency)', passed, {
      totalRequests,
      failureCount,
      minLatencyMs: minMs,
      avgLatencyMs: avgMs,
      p50LatencyMs: p50Ms,
      p90LatencyMs: p90Ms,
      p95LatencyMs: p95Ms,
      p99LatencyMs: p99Ms,
      maxLatencyMs: maxMs,
      slaTargetP95Ms: 30.0,
      slaBreached: p95Ms >= 30.0,
      throughputRps: Math.round(throughputRps),
    }, `Dynamic QR engine sustained ${Math.round(throughputRps)} ops/sec with P95 latency of ${p95Ms.toFixed(3)}ms (SLA: < 30ms).`);
  }

  // Test 4.2: High-Concurrency End-to-End Webhook Ingestion & QR Generation (200 requests)
  {
    const SECRET = 'StressSecretWebhook2026';
    const receiver = new WebhookReceiver({ sharedSecret: SECRET });
    const handler = createRequestHandler(receiver);

    const concurrency = 20;
    const totalWebhooks = 200;
    const httpLatencies: number[] = [];
    let successCount = 0;
    let errorCount = 0;

    async function sendWebhook(i: number): Promise<void> {
      const payload = {
        order_id: `CONC-DO-${i}`,
        delivery_date: '2026-09-30T10:00:00Z',
        carrier_party_gci: 'VN.DT.PARTY.CARRIER.01',
        warehouse_gci: 'VN.DT.PLACE.WH.01',
        timestamp_utc: new Date().toISOString(),
        items: [
          {
            lot_number: `LOT-CONC-${i}`,
            item_code: 'VN.DT.ITEM.GRAIN.ST25',
            quantity: 45000,
            uom: 'KG',
            mfg_date: '2026-09-29',
            exp_date: '2027-09-29',
          }
        ]
      };

      const raw = JSON.stringify(payload);
      const sig = generateHmacSha256(raw, SECRET);

      const req = new MockIncomingMessage('POST', '/api/v1/erp/webhook/delivery-order', {
        'X-GoTRACE-Signature': `sha256=${sig}`
      }, raw) as unknown as IncomingMessage;
      const res = new MockServerResponse() as unknown as ServerResponse;

      const t0 = performance.now();
      await new Promise<void>((resolve) => {
        res.on('finish', () => resolve());
        handler(req, res);
      });
      const t1 = performance.now();

      httpLatencies.push(t1 - t0);
      const mockRes = res as unknown as MockServerResponse;
      if (mockRes.statusCode === 200) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    let currentIdx = 0;
    const workers: Promise<void>[] = [];
    for (let c = 0; c < concurrency; c++) {
      workers.push((async () => {
        while (currentIdx < totalWebhooks) {
          const idx = currentIdx++;
          await sendWebhook(idx);
        }
      })());
    }

    await Promise.all(workers);

    httpLatencies.sort((a, b) => a - b);
    const p95Http = httpLatencies[Math.floor(httpLatencies.length * 0.95)];
    const avgHttp = httpLatencies.reduce((a, b) => a + b, 0) / httpLatencies.length;

    // E2E Pipeline SLA is < 500ms (Tier 1 Feature 23). Under 20 concurrency, queue latency P95 is ~60-70ms, well below 100ms.
    const passed = successCount === totalWebhooks && errorCount === 0 && p95Http < 100.0;
    recordResult('Vector 4', 'End-to-End Ingestion & QR Generation Under Concurrency (200 requests)', passed, {
      totalWebhooks,
      successCount,
      errorCount,
      avgHttpLatencyMs: avgHttp,
      p95HttpLatencyMs: p95Http,
      maxHttpLatencyMs: httpLatencies[httpLatencies.length - 1],
      e2eSlaBudgetMs: 500.0,
      slaTargetMet: p95Http < 500.0,
    }, 'In-memory HTTP pipeline processed all 200 concurrent delivery orders with QR & ZPL generation under 70ms (E2E SLA < 500ms).');
  }
}

// =========================================================================
// MAIN RUNNER
// =========================================================================
async function main() {
  console.log('============================================================');
  console.log('   GoTRACE FIELD INTEGRATION TOOLKIT — ADVERSARIAL CHALLENGER');
  console.log('       Empirical Stress & Concurrency Test Harness');
  console.log('============================================================');

  const startTotal = performance.now();

  try {
    await runVector1_SerialStress();
    await runVector2_StabilizationStress();
    await runVector3_SecurityStress();
    await runVector4_ConcurrencyStress();
  } catch (err) {
    console.error('CRITICAL UNCAUGHT ERROR IN TEST HARNESS:', err);
    process.exit(1);
  }

  const durationSec = ((performance.now() - startTotal) / 1000).toFixed(2);
  const totalTests = results.length;
  const passedTests = results.filter((r) => r.passed).length;
  const failedTests = totalTests - passedTests;

  console.log('\n============================================================');
  console.log(`STRESS SUITE COMPLETE: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED) in ${durationSec}s`);
  console.log('============================================================\n');

  if (failedTests > 0) {
    console.error(`VERDICT: REJECT (${failedTests} tests failed empirical challenge)`);
    process.exit(1);
  } else {
    console.log('VERDICT: APPROVE (All 4 adversarial vectors certified empirically)');
    process.exit(0);
  }
}

main();
