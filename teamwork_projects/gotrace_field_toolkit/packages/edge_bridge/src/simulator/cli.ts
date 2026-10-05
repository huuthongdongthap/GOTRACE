#!/usr/bin/env node
/**
 * CLI Runner for Virtual Weighbridge Simulator
 * Example: node --experimental-strip-types cli.ts --protocol CAS --weight 45000 --port 9100
 */

import { WeighbridgeSimulator } from './weighbridge_simulator.ts';
import type { ScaleProtocol } from '../types/index.ts';

function parseArgs(): {
  protocol: ScaleProtocol;
  weight: number;
  port: number;
  plate: string;
  station: string;
  autoLoop: boolean;
} {
  const args = process.argv.slice(2);
  let protocol: ScaleProtocol = 'CAS';
  let weight = 45000.0;
  let port = 9100;
  let plate = '66C-123.45';
  let station = 'VN.DT.PLACE.WEIGH_STATION.WS-SADEC-01';
  let autoLoop = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--protocol' && i + 1 < args.length) {
      protocol = args[++i].toUpperCase() as ScaleProtocol;
    } else if (arg === '--weight' && i + 1 < args.length) {
      weight = parseFloat(args[++i]) || 45000.0;
    } else if (arg === '--port' && i + 1 < args.length) {
      port = parseInt(args[++i], 10) || 9100;
    } else if (arg === '--plate' && i + 1 < args.length) {
      plate = args[++i];
    } else if (arg === '--station' && i + 1 < args.length) {
      station = args[++i];
    } else if (arg === '--loop') {
      autoLoop = true;
    }
  }

  return { protocol, weight, port, plate, station, autoLoop };
}

async function main() {
  const options = parseArgs();

  console.log('='.repeat(70));
  console.log('   GoTRACE Virtual Weighbridge Simulator (Mekong Delta Edge Bridge)');
  console.log('='.repeat(70));
  console.log(` Protocol:      ${options.protocol}`);
  console.log(` Target Weight: ${options.weight.toLocaleString()} kg`);
  console.log(` Vehicle Plate: ${options.plate}`);
  console.log(` Station GCI:   ${options.station}`);
  console.log(` TCP Port:      ${options.port}`);
  console.log(` Auto-Loop:     ${options.autoLoop}`);
  console.log('='.repeat(70));

  const sim = new WeighbridgeSimulator({
    protocol: options.protocol,
    targetWeightKg: options.weight,
    vehiclePlate: options.plate,
    stationGci: options.station,
    autoLoop: options.autoLoop,
  });

  sim.on('stateChange', ({ from, to }) => {
    console.log(`[STATE CHANGE] ${from ?? 'INIT'} -> ${to}`);
  });

  sim.on('clientConnected', ({ remoteAddress }) => {
    console.log(`[TCP] Edge Bridge client connected from ${remoteAddress}`);
  });

  sim.on('clientDisconnected', ({ remoteAddress }) => {
    console.log(`[TCP] Client disconnected from ${remoteAddress}`);
  });

  const actualPort = await sim.startTcpServer(options.port);
  console.log(`[TCP SERVER] Listening on 0.0.0.0:${actualPort}`);

  sim.start();
  console.log('[SIMULATOR] Simulation cycle started. Press Ctrl+C to terminate.');

  process.on('SIGINT', async () => {
    console.log('\n[SIMULATOR] Shutting down...');
    sim.stop();
    await sim.stopTcpServer();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
