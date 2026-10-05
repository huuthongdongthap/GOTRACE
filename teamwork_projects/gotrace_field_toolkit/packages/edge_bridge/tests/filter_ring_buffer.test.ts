import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { StreamRingBuffer } from '../src/filter/ring_buffer.ts';

describe('Stream RingBuffer & Noise Filter', () => {
  it('should extract complete framed packet from full chunk', () => {
    const ringBuffer = new StreamRingBuffer(256);
    const rawFrame = 'ST,GS,0,+ 45000.0,kg\r\n';

    let emittedFrame: Buffer | null = null;
    ringBuffer.on('frame', (buf: Buffer) => {
      emittedFrame = buf;
    });

    ringBuffer.push(rawFrame);

    assert.ok(emittedFrame);
    const finalFrame = emittedFrame as unknown as Buffer;
    assert.strictEqual(finalFrame.toString('ascii'), rawFrame);
    assert.strictEqual(ringBuffer.getMetrics().validFramesExtracted, 1);
  });

  it('should reassemble split packet chunks across network arrivals', () => {
    const ringBuffer = new StreamRingBuffer(256);
    const chunk1 = 'ST,GS,0,+';
    const chunk2 = ' 45000.0,kg\r\n';

    const frames: Buffer[] = [];
    ringBuffer.on('frame', (buf) => frames.push(buf));

    ringBuffer.push(chunk1);
    assert.strictEqual(frames.length, 0); // Not yet complete

    ringBuffer.push(chunk2);
    assert.strictEqual(frames.length, 1);
    assert.strictEqual(frames[0].toString('ascii'), 'ST,GS,0,+ 45000.0,kg\r\n');
  });

  it('should filter out electrical noise and non-printable bytes', () => {
    const ringBuffer = new StreamRingBuffer(256);
    // Noise bytes (0x01, 0x12, 0x15) prepended to valid frame
    const noise = Buffer.from([0x01, 0x12, 0x15, 0x00]);
    const valid = Buffer.from('ST,GS,0,+ 45000.0,kg\r\n', 'ascii');
    const combined = Buffer.concat([noise, valid]);

    const frames: Buffer[] = [];
    ringBuffer.on('frame', (buf) => frames.push(buf));

    ringBuffer.push(combined);

    assert.strictEqual(frames.length, 1);
    assert.strictEqual(frames[0].toString('ascii'), 'ST,GS,0,+ 45000.0,kg\r\n');
    assert.ok(ringBuffer.getMetrics().droppedNoiseBytes >= 4);
  });

  it('should extract fixed 18-byte Toledo continuous frames', () => {
    const ringBuffer = new StreamRingBuffer(256);
    const toledoBuf = Buffer.alloc(18);
    toledoBuf[0] = 0x02; // STX
    toledoBuf[1] = 0x04;
    toledoBuf[2] = 0x10;
    toledoBuf[3] = 0x00;
    toledoBuf.write(' 45000', 4, 6, 'ascii');
    toledoBuf.write(' 15000', 10, 6, 'ascii');
    toledoBuf[16] = 0x0d;
    toledoBuf[17] = 0x0a;

    const frames: Buffer[] = [];
    ringBuffer.on('frame', (buf) => frames.push(buf));

    ringBuffer.push(toledoBuf);
    assert.strictEqual(frames.length, 1);
    assert.strictEqual(frames[0].length, 18);
    assert.strictEqual(frames[0][0], 0x02);
  });
});
