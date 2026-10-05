import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateTraceabilityLabel } from '../../src/engines/erp_label_engine.ts';

describe('Tier 1: Feature 20 - Industrial Zebra ZPL Generator', () => {
  it('F20-TC1: Starts with ^XA and terminates with ^XZ framing tags', () => {
    const label = generateTraceabilityLabel('VN.DT.LOT.FINISHED.20260930-OM5451-01', 'Gao OM5451');
    assert.ok(label.zplCode.startsWith('^XA'));
    assert.ok(label.zplCode.endsWith('^XZ'));
  });

  it('F20-TC2: Embeds QR barcode command (^BQN,2,5) pointing to GoTRACE resolution URL', () => {
    const label = generateTraceabilityLabel('VN.DT.LOT.FINISHED.20260930-OM5451-01', 'Gao OM5451');
    assert.ok(label.zplCode.includes('^BQN,2,5'));
    assert.ok(label.zplCode.includes('^FDQA,https://trace.gotrace.vn/resolve?'));
  });

  it('F20-TC3: Embeds standard font definition (^A0N) for human-readable labels', () => {
    const label = generateTraceabilityLabel('VN.DT.LOT.FINISHED.20260930-OM5451-01', 'Gao OM5451 Co May');
    assert.ok(label.zplCode.includes('^A0N,26,26^FDGAO OM5451 CO MAY^FS'));
  });

  it('F20-TC4: Correctly renders LOT number, MFG date, EXP date, and net weight', () => {
    const label = generateTraceabilityLabel('VN.DT.LOT.FINISHED.20260930-OM5451-01', 'Gao OM5451', {
      mfgDate: '2026-09-30',
      expDate: '2027-09-30',
      weightKg: 50.0,
    });
    assert.ok(label.zplCode.includes('^FDLO: VN.DT.LOT.FINISHED.20260930-OM5451-01^FS'));
    assert.ok(label.zplCode.includes('^FDNSX: 2026-09-30 - HSD: 2027-09-30^FS'));
    assert.ok(label.zplCode.includes('TRONG LUONG: 50') && label.zplCode.includes('KG^FS'));
  });

  it('F20-TC5: Handles special Vietnamese alphanumeric strings without printer buffer corruptions', () => {
    const label = generateTraceabilityLabel('VN.DT.LOT.FINISHED.20260930-ST25-01', 'Gao Thom ST25 Lua Tom');
    assert.ok(label.zplCode.includes('GAO THOM ST25 LUA TOM'));
    assert.ok(label.zplCode.length > 100);
  });
});
