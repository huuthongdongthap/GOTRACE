#!/usr/bin/env node
/**
 * CLI Runner for GoTRACE IoT Weighbridge Edge Bridge Daemon
 * Example: node --experimental-strip-types cli.ts --station VN.DT.PLACE.WEIGH_STATION.WS-SADEC-01 --host localhost --port 9100
 */

import { EdgeBridgeDaemon } from './daemon.ts';
import type { ScaleProtocol } from './types/index.ts';

function parseArgs(): {
  station: string;
  host: string;
  port: number;
  protocol?: ScaleProtocol;
  plate: string;
  secret: string;
} {
  const args = process.argv.slice(2);
  let station = 'VN.DT.PLACE.WEIGH_STATION.WS-SADEC-01';
  let host = '127.0.0.1';
  let port = 9100;
  let protocol: ScaleProtocol | undefined;
  let plate = '66C-123.45';
  let secret = 'gotrace-edge-secret-key-2026';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--station' && i + 1 < args.length) {
      station = args[++i];
    } else if (arg === '--host' && i + 1 < args.length) {
      host = args[++i];
    } else if (arg === '--port' && i + 1 < args.length) {
      port = parseInt(args[++i], 10) || 9100;
    } else if (arg === '--protocol' && i + 1 < args.length) {
      protocol = args[++i].toUpperCase() as ScaleProtocol;
    } else if (arg === '--plate' && i + 1 < args.length) {
      plate = args[++i];
    } else if (arg === '--secret' && i + 1 < args.length) {
      secret = args[++i];
    }
  }

  return { station, host, port, protocol, plate, secret };
}

async function main() {
  const options = parseArgs();

  console.log('='.repeat(70));
  console.log('   GoTRACE IoT Weighbridge Edge Bridge Daemon');
  console.log('='.repeat(70));
  console.log(` Station GCI:   ${options.station}`);
  console.log(` Connecting to: ${options.host}:${options.port}`);
  console.log(` Protocol:      ${options.protocol || 'AUTO-DETECT'}`);
  console.log(` Vehicle Plate: ${options.plate}`);
  console.log('='.repeat(70));

  const daemon = new EdgeBridgeDaemon({
    stationGci: options.station,
    protocol: options.protocol,
    defaultVehiclePlate: options.plate,
    edgeSigningSecret: options.secret,
  });

  daemon.on('connected', ({ host, port }) => {
    console.log(`[DAEMON] Connected to serial stream gateway at ${host}:${port}`);
  });

  daemon.on('reading', (r) => {
    const status = r.isStable ? 'STABLE' : 'MOTION';
    process.stdout.write(`\r[WEIGHT] Net: ${r.netKg.toLocaleString()} kg | Gross: ${r.grossKg.toLocaleString()} kg | ${status} | Proto: ${r.protocol}   `);
  });

  daemon.on('ticketGenerated', (ticket) => {
    console.log('\n\n' + '*'.repeat(70));
    console.log('   >>> NEW EVIDENCE GENERATED: WEIGHT_TICKET <<<');
    console.log('*'.repeat(70));
    console.log(` Evidence GCI:  ${ticket.evidenceId}`);
    console.log(` Ticket Number: ${ticket.metadataJson.ticketNumber}`);
    console.log(` Vehicle Plate: ${ticket.metadataJson.vehiclePlate}`);
    console.log(` Gross Weight:  ${ticket.metadataJson.grossWeightKg.toLocaleString()} kg`);
    console.log(` Tare Weight:   ${ticket.metadataJson.tareWeightKg.toLocaleString()} kg`);
    console.log(` Net Weight:    ${ticket.metadataJson.netWeightKg.toLocaleString()} kg`);
    console.log(` SHA-256 Hash:  ${ticket.fileHashSha256}`);
    console.log(` Signature:     ${ticket.digitalSignature || 'N/A'}`);
    console.log('*'.repeat(70) + '\n');
  });

  daemon.on('eventEmitted', (event) => {
    console.log(`[EVENT] Emitted EVENT: WEIGHED (${event.eventId}) -> GoTRACE Ledger`);
  });

  daemon.on('scaleReady', () => {
    console.log('[DAEMON] Scale released back to 0 kg. Ready for next truck.');
  });

  daemon.on('error', (err) => {
    console.error('\n[ERROR]', err.message);
  });

  await daemon.connectTcp(options.host, options.port);

  process.on('SIGINT', () => {
    console.log('\n[DAEMON] Disconnecting and exiting...');
    daemon.disconnect();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
