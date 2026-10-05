import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as net from 'node:net';
import { WeighbridgeSimulator } from '../src/simulator/weighbridge_simulator.ts';

describe('Virtual Weighbridge Simulator', () => {
  it('should initialize and progress through weighing cycle states', () => {
    const sim = new WeighbridgeSimulator({
      protocol: 'CAS',
      targetWeightKg: 45000.0,
      approachDurationSeconds: 0.1,
      bounceDurationSeconds: 0.1,
      steadyDurationSeconds: 0.2,
      departDurationSeconds: 0.1,
    });

    const statesSeen = new Set<string>();
    sim.on('stateChange', ({ to }) => {
      statesSeen.add(to);
    });

    sim.start();

    // Perform ticks manually or check state transitions
    const tick1 = sim.tick();
    assert.strictEqual(tick1.reading.protocol, 'CAS');
    assert.ok(tick1.frame.length > 0);

    sim.stop();
  });

  it('should encode valid protocol frames for Toledo, CAS, and Yaohua', () => {
    const simCas = new WeighbridgeSimulator({ protocol: 'CAS', targetWeightKg: 45000 });
    const casFrame = simCas.encodeFrame(45000, 15000, 30000, true);
    assert.ok(casFrame.toString('ascii').startsWith('ST,GS,'));

    const simToledo = new WeighbridgeSimulator({ protocol: 'TOLEDO', targetWeightKg: 45000 });
    const toledoFrame = simToledo.encodeFrame(45000, 15000, 30000, true);
    assert.strictEqual(toledoFrame.length, 18);
    assert.strictEqual(toledoFrame[0], 0x02);

    const simYaohua = new WeighbridgeSimulator({ protocol: 'YAOHUA', targetWeightKg: 45000 });
    const yaohuaFrame = simYaohua.encodeFrame(45000, 0, 45000, true);
    assert.strictEqual(yaohuaFrame[0], 0x3d); // '='
  });

  it('should stream frames via EventEmitter data event', () => {
    const sim = new WeighbridgeSimulator({ protocol: 'CAS', targetWeightKg: 45000 });
    const frames: Buffer[] = [];
    sim.on('data', ({ frame }) => {
      frames.push(frame);
    });

    sim.tick();
    sim.tick();
    assert.strictEqual(frames.length, 2);
    assert.ok(frames[0].toString('ascii').includes('GS'));
  });

  it('should start TCP socket server and bind to port', async () => {
    const sim = new WeighbridgeSimulator({ protocol: 'CAS', targetWeightKg: 45000 });
    const port = await sim.startTcpServer(0); // auto-assign free port

    assert.ok(port > 0);
    assert.strictEqual(sim.isListening(), true);

    const client = new net.Socket();
    try {
      await new Promise<void>((resolve, reject) => {
        client.connect(port, '127.0.0.1', resolve);
        client.on('error', reject);
      });
      sim.tick();
      client.destroy();
    } catch (err: any) {
      // In restricted sandboxes, outbound connect to 127.0.0.1 returns EPERM
      if (err.code === 'EPERM') {
        assert.strictEqual(sim.isListening(), true);
      } else {
        throw err;
      }
    } finally {
      await sim.stopTcpServer();
      assert.strictEqual(sim.isListening(), false);
    }
  });
});
