/**
 * GoTRACE IoT Weighbridge Edge Bridge Daemon
 * Orchestrates serial ingestion, noise filtration, stable weight detection,
 * and canonical EVENT / EVIDENCE packaging.
 */

import { EventEmitter } from 'node:events';
import * as net from 'node:net';
import type {
  RawWeightReading,
  ScaleProtocol,
  StabilizationConfig,
  StabilizationResult,
  WeighedEventPayload,
  WeightTicketPayload,
} from './types/index.ts';
import { StreamRingBuffer } from './filter/ring_buffer.ts';
import { MultiProtocolParser } from './parsers/multi_parser.ts';
import { WeightStabilizer } from './stabilizer/stable_detector.ts';
import { EvidencePackager } from './packaging/evidence_packager.ts';
import { EventPackager } from './packaging/event_packager.ts';

export interface EdgeBridgeConfig {
  stationGci: string;
  protocol?: ScaleProtocol;
  scaleModel?: string;
  defaultVehiclePlate?: string;
  defaultCommodityCode?: string;
  operatorPartyId?: string;
  edgeSigningSecret?: string;
  stabilization?: StabilizationConfig;
  tcpHost?: string;
  tcpPort?: number;
}

export class EdgeBridgeDaemon extends EventEmitter {
  private config: EdgeBridgeConfig;
  private ringBuffer: StreamRingBuffer;
  private stabilizer: WeightStabilizer;
  private socket: net.Socket | null = null;
  private isConnected: boolean = false;
  private lastReading: RawWeightReading | null = null;

  // Active transaction context (e.g., set when vehicle RFID or camera scans plate)
  private currentVehiclePlate: string;
  private currentHarvestLotGci?: string;
  private currentSupplierPartyGci?: string;

  constructor(config: EdgeBridgeConfig) {
    super();
    this.config = config;
    this.currentVehiclePlate = config.defaultVehiclePlate || 'UNKNOWN-VEHICLE';

    this.ringBuffer = new StreamRingBuffer(8192);
    this.stabilizer = new WeightStabilizer(config.stabilization);

    // Pipe frames from ring buffer into parser and stabilizer
    this.ringBuffer.on('frame', (frameBuf: Buffer) => {
      this.handleFrame(frameBuf);
    });

    // Listen to stabilizer events
    this.stabilizer.on('stableWeight', (result: StabilizationResult) => {
      this.handleStableWeight(result);
    });

    this.stabilizer.on('scaleReleased', () => {
      this.emit('scaleReady');
    });
  }

  /**
   * Sets the active vehicle context for the upcoming weighing event.
   */
  public setVehicleContext(context: {
    vehiclePlate: string;
    harvestLotGci?: string;
    supplierPartyGci?: string;
  }): void {
    this.currentVehiclePlate = context.vehiclePlate.trim().toUpperCase();
    this.currentHarvestLotGci = context.harvestLotGci;
    this.currentSupplierPartyGci = context.supplierPartyGci;
  }

  /**
   * Directly feeds raw serial bytes into the edge bridge (for programmatic or testing use).
   */
  public feedBytes(chunk: Buffer | string): void {
    this.ringBuffer.push(chunk);
  }

  /**
   * Connects to a serial-to-Ethernet gateway or Virtual Simulator via TCP socket.
   */
  public async connectTcp(host: string, port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new net.Socket();

      this.socket.on('connect', () => {
        this.isConnected = true;
        this.emit('connected', { host, port });
        resolve();
      });

      this.socket.on('data', (data) => {
        this.ringBuffer.push(data);
      });

      this.socket.on('close', () => {
        this.isConnected = false;
        this.emit('disconnected');
      });

      this.socket.on('error', (err) => {
        this.emit('error', err);
        if (!this.isConnected) {
          reject(err);
        }
      });

      this.socket.connect(port, host);
    });
  }

  /**
   * Disconnects the TCP connection if active.
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.destroy();
      this.socket = null;
    }
    this.isConnected = false;
  }

  private handleFrame(frameBuf: Buffer): void {
    try {
      const reading = MultiProtocolParser.parse(frameBuf, this.config.protocol);
      this.lastReading = reading;
      this.emit('reading', reading);

      this.stabilizer.addReading(reading);
    } catch (err) {
      this.emit('parserError', { error: err, frame: frameBuf.toString('ascii') });
    }
  }

  private handleStableWeight(result: StabilizationResult): void {
    if (!result.isStable || result.stableWeightKg === null) return;

    try {
      const gross = result.grossWeightKg ?? result.stableWeightKg;
      const tare = result.tareWeightKg ?? 0;
      const net = result.netWeightKg ?? result.stableWeightKg;

      // 1. Package EVIDENCE: WEIGHT_TICKET
      const ticket: WeightTicketPayload = EvidencePackager.createWeightTicket({
        scaleStationGci: this.config.stationGci,
        vehiclePlate: this.currentVehiclePlate,
        harvestLotGci: this.currentHarvestLotGci,
        supplierPartyGci: this.currentSupplierPartyGci,
        grossWeightKg: gross,
        tareWeightKg: tare,
        netWeightKg: net,
        scaleModel: this.config.scaleModel || 'INDUSTRIAL_INDICATOR',
        rawSerialString: this.lastReading?.rawString || '',
        edgeSigningSecret: this.config.edgeSigningSecret,
      });

      this.emit('ticketGenerated', ticket);

      // 2. Package EVENT: WEIGHED
      const weighedEvent: WeighedEventPayload = EventPackager.createWeighedEvent({
        stationGci: this.config.stationGci,
        operatorPartyId: this.config.operatorPartyId,
        ticket,
        settlingDurationSeconds: result.durationSeconds,
        scaleOscillationDelta: result.varianceKg,
      });

      this.emit('eventEmitted', weighedEvent);
    } catch (err) {
      this.emit('packagingError', err);
    }
  }

  public getRingBufferMetrics() {
    return this.ringBuffer.getMetrics();
  }

  public getStabilizerState() {
    return this.stabilizer.getState();
  }

  public getLastReading(): RawWeightReading | null {
    return this.lastReading;
  }

  public reset(): void {
    this.ringBuffer.clear();
    this.stabilizer.reset();
    this.lastReading = null;
  }
}
