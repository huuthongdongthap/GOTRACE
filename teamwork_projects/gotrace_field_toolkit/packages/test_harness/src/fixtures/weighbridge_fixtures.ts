/**
 * Weighbridge Test Fixtures
 * Raw serial streams, protocol test vectors, and anomalous frames.
 */

export const MOCK_SCALE_STATION_GCI = 'VN.DT.PLACE.WEIGH_STATION.WS-COMAY-SADEC-01';
export const MOCK_OPERATOR_GCI = 'VN.DT.PARTY.OPERATOR.OP-4421';
export const MOCK_VEHICLE_PLATE = '66C-123.45';

export const SERIAL_VECTORS = {
  // CAS CI-200A
  CAS_STABLE_45000: 'ST,GS,+058500.0,kg\r\n',
  CAS_UNSTABLE_45000: 'US,GS,+058490.0,kg\r\n',
  CAS_ZERO_EMPTY: 'ST,GS,+000000.0,kg\r\n',
  CAS_NEGATIVE_NET: 'ST,GS,+010000.0,kg\r\n', // Tare is 15000 -> net -5000
  CAS_JITTER_BURST: 'US,GS,+078000.0,kg\r\n',

  // Yaohua XK3190
  YAOHUA_STABLE_45000: '=045000\r',
  YAOHUA_UNSTABLE_45000: '=+044950US\r',
  YAOHUA_ZERO: '=000000\r',

  // Toledo IND570
  TOLEDO_SICS_STABLE_45000: 'S S      45000.0 kg\r\n',
  TOLEDO_SICS_UNSTABLE_45000: 'S D      44980.0 kg\r\n',
};

export const MOCK_RAW_FRAMES_45T_INTAKE = [
  'US,GS,+015000.0,kg\r\n',
  'US,GS,+035000.0,kg\r\n',
  'US,GS,+058000.0,kg\r\n',
  'US,GS,+060200.0,kg\r\n',
  'US,GS,+059100.0,kg\r\n',
  'ST,GS,+060000.0,kg\r\n', // Gross 60,000kg, Tare 15,000kg -> Net 45,000kg
];
