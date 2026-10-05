/**
 * Virtual Weighbridge Simulator
 * Simulates physical truck weighing cycle: EMPTY -> APPROACH -> BOUNCE -> STEADY -> DEPART.
 * Streams industrial serial frames (Toledo, CAS, Yaohua) via EventEmitter and TCP Server.
 */

import { EventEmitter } from 'node:events';
import * as net from 'node:net';
import type {
  RawWeightReading,
  ScaleProtocol,
  SimulatorOptions,
  SimulatorState,
} from '../types/index.ts';

export class WeighbridgeSimulator extends EventEmitter {
  private protocol: ScaleProtocol;
  private targetWeightKg: number;
  private tareWeightKg: number;
  private vehiclePlate: string;
  private stationGci: string;
  private scaleModel: string;
  private sampleRateHz: number;
  private approachDurationSec: number;
  private bounceDurationSec: number;
  private steadyDurationSec: number;
  private departDurationSec: number;
  private noiseStdDevKg: number;
  private autoLoop: boolean;

  private state: SimulatorState = 'EMPTY';
  private timer: NodeJS.Timeout | null = null;
  private stateStartTime: number = 0;
  private tcpServer: net.Server | null = null;
  private tcpClients: Set<net.Socket> = new Set();
  private isRunning: boolean = false;

  constructor(options?: SimulatorOptions) {
    super();
    this.protocol = options?.protocol ?? 'CAS';
    this.targetWeightKg = options?.targetWeightKg ?? 45000.0;
    this.tareWeightKg = options?.tareWeightKg ?? 13500.0;
    this.vehiclePlate = options?.vehiclePlate ?? '66C-123.45';
    this.stationGci = options?.stationGci ?? 'VN.DT.PLACE.WEIGH_STATION.WS-SADEC-01';
    this.scaleModel = options?.scaleModel ?? 'CAS-CI200A-SERIAL-01';
    this.sampleRateHz = options?.sampleRateHz ?? 10;
    this.approachDurationSec = options?.approachDurationSeconds ?? 2.0;
    this.bounceDurationSec = options?.bounceDurationSeconds ?? 2.5;
    this.steadyDurationSec = options?.steadyDurationSeconds ?? 3.5;
    this.departDurationSec = options?.departDurationSeconds ?? 1.5;
    this.noiseStdDevKg = options?.noiseStdDevKg ?? 1.0;
    this.autoLoop = options?.autoLoop ?? false;
  }

  /**
   * Starts the simulation loop.
   */
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.state = 'EMPTY';
    this.stateStartTime = Date.now();
    this.emit('stateChange', { from: null, to: 'EMPTY' });

    const intervalMs = Math.round(1000 / this.sampleRateHz);
    this.timer = setInterval(() => {
      this.tick();
    }, intervalMs);
  }

  /**
   * Stops the simulation loop.
   */
  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Starts a TCP socket server streaming raw serial bytes to connected clients.
   */
  public async startTcpServer(port: number = 9100): Promise<number> {
    return new Promise((resolve, reject) => {
      this.tcpServer = net.createServer((socket) => {
        this.tcpClients.add(socket);
        this.emit('clientConnected', { remoteAddress: socket.remoteAddress });

        socket.on('close', () => {
          this.tcpClients.delete(socket);
          this.emit('clientDisconnected', { remoteAddress: socket.remoteAddress });
        });

        socket.on('error', (err) => {
          this.tcpClients.delete(socket);
          this.emit('clientError', err);
        });
      });

      this.tcpServer.on('error', (err) => {
        reject(err);
      });

      this.tcpServer.listen(port, () => {
        const addr = this.tcpServer?.address() as net.AddressInfo;
        const actualPort = addr ? addr.port : port;
        resolve(actualPort);
      });
    });
  }

  /**
   * Closes the TCP socket server and disconnects clients.
   */
  public async stopTcpServer(): Promise<void> {
    for (const client of this.tcpClients) {
      client.destroy();
    }
    this.tcpClients.clear();

    if (this.tcpServer) {
      await new Promise<void>((resolve) => {
        this.tcpServer?.close(() => resolve());
      });
      this.tcpServer = null;
    }
  }

  /**
   * Single simulation tick.
   */
  public tick(): { reading: RawWeightReading; frame: Buffer; state: SimulatorState } {
    const now = Date.now();
    const elapsedSec = (now - this.stateStartTime) / 1000;

    let currentWeight = 0;
    let isStable = false;

    switch (this.state) {
      case 'EMPTY': {
        // Tare zero weight with small loadcell noise
        currentWeight = Math.max(0, this.randomGaussian(0, 0.5));
        isStable = true;

        if (elapsedSec >= 1.0) {
          this.transitionTo('APPROACH');
        }
        break;
      }

      case 'APPROACH': {
        // Ramp up from 0 to targetWeightKg linearly
        const progress = Math.min(1.0, elapsedSec / this.approachDurationSec);
        currentWeight = progress * this.targetWeightKg + this.randomGaussian(0, 15.0);
        isStable = false;

        if (elapsedSec >= this.approachDurationSec) {
          this.transitionTo('BOUNCE');
        }
        break;
      }

      case 'BOUNCE': {
        // Damped harmonic oscillation:
        // W(t) = Wtarget + A * e^(-lambda * t) * cos(omega * t) + noise
        const t = elapsedSec;
        const amplitude = 1200.0;
        const lambda = 1.8;
        const omega = 4.0 * Math.PI; // ~2 Hz oscillation
        const bounceOffset = amplitude * Math.exp(-lambda * t) * Math.cos(omega * t);
        const noise = this.randomGaussian(0, 8.0);
        currentWeight = this.targetWeightKg + bounceOffset + noise;
        isStable = false;

        if (elapsedSec >= this.bounceDurationSec) {
          this.transitionTo('STEADY');
        }
        break;
      }

      case 'STEADY': {
        // Stabilized weight within +/- 1.5 kg
        const noise = this.randomGaussian(0, this.noiseStdDevKg);
        currentWeight = this.targetWeightKg + noise;
        isStable = true;

        if (elapsedSec >= this.steadyDurationSec) {
          this.transitionTo('DEPART');
        }
        break;
      }

      case 'DEPART': {
        // Ramp down from targetWeightKg to 0
        const progress = Math.min(1.0, elapsedSec / this.departDurationSec);
        currentWeight = (1.0 - progress) * this.targetWeightKg + this.randomGaussian(0, 10.0);
        currentWeight = Math.max(0, currentWeight);
        isStable = false;

        if (elapsedSec >= this.departDurationSec) {
          if (this.autoLoop) {
            this.transitionTo('EMPTY');
          } else {
            this.stop();
          }
        }
        break;
      }
    }

    currentWeight = Math.round(currentWeight * 10) / 10;
    const grossKg = currentWeight;
    const tareKg = this.tareWeightKg;
    const netKg = Math.max(0, Math.round((grossKg - tareKg) * 10) / 10);

    const frame = this.encodeFrame(grossKg, tareKg, netKg, isStable);

    const reading: RawWeightReading = {
      grossKg,
      tareKg,
      netKg,
      isStable,
      rawString: frame.toString('ascii'),
      protocol: this.protocol,
      timestampMs: now,
      statusFlags: {
        overload: false,
        motion: !isStable,
        unit: 'kg',
      },
    };

    // Emit event
    this.emit('data', { reading, frame, state: this.state });

    // Send to TCP clients
    for (const client of this.tcpClients) {
      if (!client.destroyed) {
        client.write(frame);
      }
    }

    return { reading, frame, state: this.state };
  }

  private transitionTo(newState: SimulatorState): void {
    const oldState = this.state;
    this.state = newState;
    this.stateStartTime = Date.now();
    this.emit('stateChange', { from: oldState, to: newState });
  }

  /**
   * Formats raw serial bytes according to the active scale protocol.
   */
  public encodeFrame(grossKg: number, tareKg: number, netKg: number, isStable: boolean): Buffer {
    switch (this.protocol) {
      case 'TOLEDO':
        return this.encodeToledoFrame(grossKg, tareKg, isStable);
      case 'YAOHUA':
        return this.encodeYaohuaFrame(grossKg, isStable);
      case 'CAS':
      default:
        return this.encodeCasFrame(grossKg, isStable);
    }
  }

  /**
   * Encodes CAS CI-200A 22-byte ASCII streaming format:
   * Header1(ST/US),Header2(GS),Lamp(0),Sign(+ 45000.0),Unit(kg),CRLF
   */
  private encodeCasFrame(weightKg: number, isStable: boolean): Buffer {
    const stHeader = isStable ? 'ST' : 'US';
    const sign = weightKg >= 0 ? '+' : '-';
    const absWeight = Math.abs(weightKg).toFixed(1).padStart(7, '0');
    // Format: "ST,GS,0,+0045000.0,kg\r\n"
    const line = `${stHeader},GS,0,${sign}${absWeight},kg\r\n`;
    return Buffer.from(line, 'ascii');
  }

  /**
   * Encodes Mettler Toledo 18-byte continuous format:
   * STX (0x02) + Status A + Status B + Status C + Gross 6B + Tare 6B + CR + LF
   */
  private encodeToledoFrame(grossKg: number, tareKg: number, isStable: boolean): Buffer {
    const buf = Buffer.alloc(18);
    buf[0] = 0x02; // STX

    // Status Word A: Decimal point position 4 (no decimal) or 5 (0.1)
    buf[1] = 0x04;

    // Status Word B:
    // Bit 0 = 0 (Gross)
    // Bit 1 = 0 (Positive)
    // Bit 2 = 0 (Normal)
    // Bit 3 = isStable ? 0 (Stable) : 1 (Motion)
    // Bit 4 = 1 (kg)
    let statusB = 0x10; // kg unit
    if (!isStable) {
      statusB |= 0x08; // Motion
    }
    buf[2] = statusB;

    // Status Word C: 0x00
    buf[3] = 0x00;

    // Displayed gross weight: 6 ASCII characters (padded with spaces/zeros)
    const grossStr = Math.round(grossKg).toString().padStart(6, ' ');
    buf.write(grossStr, 4, 6, 'ascii');

    // Tare weight: 6 ASCII characters
    const tareStr = Math.round(tareKg).toString().padStart(6, ' ');
    buf.write(tareStr, 10, 6, 'ascii');

    buf[16] = 0x0d; // CR
    buf[17] = 0x0a; // LF

    return buf;
  }

  /**
   * Encodes Yaohua XK3190 12-byte continuous format:
   * '=' + Sign + 6 digits + Decimal flag (0) + Status ('0' stable / '1' motion) + Checksum + CR
   */
  private encodeYaohuaFrame(weightKg: number, isStable: boolean): Buffer {
    const buf = Buffer.alloc(12);
    buf[0] = 0x3d; // '='
    buf[1] = weightKg >= 0 ? 0x2b : 0x2d; // '+' or '-'

    const absWeight = Math.min(999999, Math.round(Math.abs(weightKg)));
    const digitsStr = absWeight.toString().padStart(6, '0');
    buf.write(digitsStr, 2, 6, 'ascii');

    buf[8] = 0x30; // '0' (no decimal point)
    buf[9] = isStable ? 0x30 : 0x31; // '0' = stable, '1' = motion

    // XOR Checksum from index 0 to 9
    let xor = 0;
    for (let i = 0; i < 10; i++) {
      xor ^= buf[i];
    }
    buf[10] = xor;
    buf[11] = 0x0d; // CR

    return buf;
  }

  /**
   * Box-Muller transform for realistic Gaussian noise.
   */
  private randomGaussian(mean: number, stdDev: number): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + num * stdDev;
  }

  public getState(): SimulatorState {
    return this.state;
  }

  public getTargetWeight(): number {
    return this.targetWeightKg;
  }

  public setTargetWeight(weightKg: number): void {
    this.targetWeightKg = weightKg;
  }

  public isListening(): boolean {
    return this.tcpServer !== null && this.tcpServer.listening;
  }

  public setProtocol(protocol: ScaleProtocol): void {
    this.protocol = protocol;
  }
}
