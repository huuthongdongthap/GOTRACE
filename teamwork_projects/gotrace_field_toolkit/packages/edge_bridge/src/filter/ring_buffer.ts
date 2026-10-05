/**
 * GoTRACE Stream Ring Buffer & Noise Filter
 * Buffers serial chunks, frames packets by delimiter/markers, and rejects electrical/vibrational garbage.
 */

import { EventEmitter } from 'node:events';

export interface RingBufferMetrics {
  totalBytesReceived: number;
  validFramesExtracted: number;
  droppedNoiseBytes: number;
  malformedFramesDropped: number;
}

export class StreamRingBuffer extends EventEmitter {
  private buffer: Buffer;
  private capacity: number;
  private head: number = 0; // write index
  private tail: number = 0; // read index
  private size: number = 0; // current bytes count
  private metrics: RingBufferMetrics = {
    totalBytesReceived: 0,
    validFramesExtracted: 0,
    droppedNoiseBytes: 0,
    malformedFramesDropped: 0,
  };

  constructor(capacity: number = 8192) {
    super();
    this.capacity = capacity;
    this.buffer = Buffer.alloc(capacity);
  }

  /**
   * Pushes raw incoming bytes into the ring buffer.
   */
  public push(chunk: Buffer | string): void {
    const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, 'binary');
    this.metrics.totalBytesReceived += data.length;

    for (let i = 0; i < data.length; i++) {
      const byte = data[i];

      if (this.size >= this.capacity) {
        // Buffer full: advance tail to make room (drop oldest byte)
        this.tail = (this.tail + 1) % this.capacity;
        this.size--;
        this.metrics.droppedNoiseBytes++;
      }

      this.buffer[this.head] = byte;
      this.head = (this.head + 1) % this.capacity;
      this.size++;
    }

    this.extractFrames();
  }

  /**
   * Scans and extracts all complete valid frames currently in the buffer.
   */
  public extractFrames(): Buffer[] {
    const frames: Buffer[] = [];

    while (this.size > 0) {
      // Find start of a frame
      const startOffset = this.findFrameStart();
      if (startOffset === -1) {
        // No valid frame start found in the entire buffer; drop everything
        this.metrics.droppedNoiseBytes += this.size;
        this.tail = this.head;
        this.size = 0;
        break;
      }

      // Drop any garbage bytes prior to frame start
      if (startOffset > 0) {
        this.metrics.droppedNoiseBytes += startOffset;
        this.advanceTail(startOffset);
      }

      // Now tail points to the start of a candidate frame
      // Find frame end
      const frameEndInfo = this.findFrameEnd();
      if (!frameEndInfo) {
        // Frame end not yet received (frame incomplete); wait for more bytes
        // But if candidate frame exceeds max reasonable length (128 bytes), drop first byte
        if (this.size > 128) {
          this.advanceTail(1);
          this.metrics.malformedFramesDropped++;
        }
        break;
      }

      const { length } = frameEndInfo;
      const frameBuf = Buffer.alloc(length);
      for (let i = 0; i < length; i++) {
        frameBuf[i] = this.buffer[(this.tail + i) % this.capacity];
      }

      this.advanceTail(length);

      // Validate frame length (reject too small or purely empty frames)
      if (frameBuf.length >= 4) {
        frames.push(frameBuf);
        this.metrics.validFramesExtracted++;
        this.emit('frame', frameBuf);
      } else {
        this.metrics.malformedFramesDropped++;
      }
    }

    return frames;
  }

  /**
   * Finds the offset from tail to the first recognized frame start:
   * - 0x02 (STX)
   * - '=' (0x3D)
   * - 'S' (from 'ST,' or 'S S')
   * - 'U' (from 'US,')
   * - 'O' (from 'OL,')
   */
  private findFrameStart(): number {
    for (let i = 0; i < this.size; i++) {
      const idx = (this.tail + i) % this.capacity;
      const b = this.buffer[idx];

      if (b === 0x02 || b === 0x3d) {
        return i;
      }

      // Check for multi-byte header 'ST,', 'US,', 'OL,'
      if (b === 0x53) { // 'S'
        if (i + 2 < this.size) {
          const b1 = this.buffer[(this.tail + i + 1) % this.capacity];
          const b2 = this.buffer[(this.tail + i + 2) % this.capacity];
          if ((b1 === 0x54 && b2 === 0x2c) || (b1 === 0x20 && (b2 === 0x53 || b2 === 0x44))) { // 'ST,' or 'S S' or 'S D'
            return i;
          }
        } else {
          // Incomplete header near end of buffer
          return i;
        }
      }

      if ((b === 0x55 && i + 2 < this.size) || (b === 0x4f && i + 2 < this.size)) { // 'U' or 'O'
        const b1 = this.buffer[(this.tail + i + 1) % this.capacity];
        const b2 = this.buffer[(this.tail + i + 2) % this.capacity];
        if (b1 === 0x53 && b2 === 0x2c) return i; // 'US,'
        if (b1 === 0x4c && b2 === 0x2c) return i; // 'OL,'
      }
    }
    return -1;
  }

  /**
   * Looks for frame termination (CRLF, CR, LF, or ETX) starting from current tail.
   */
  private findFrameEnd(): { length: number } | null {
    const firstByte = this.buffer[this.tail];

    // Fixed-length 18-byte Toledo continuous frame starting with STX 0x02
    if (firstByte === 0x02 && this.size >= 18) {
      const b16 = this.buffer[(this.tail + 16) % this.capacity];
      const b17 = this.buffer[(this.tail + 17) % this.capacity];
      if (b16 === 0x0d && b17 === 0x0a) {
        return { length: 18 };
      }
    }

    // Delimited frames (ended by CRLF, CR, LF, or ETX)
    for (let i = 1; i < this.size; i++) {
      const idx = (this.tail + i) % this.capacity;
      const b = this.buffer[idx];

      if (b === 0x03) { // ETX
        return { length: i + 1 };
      }

      if (b === 0x0a) { // LF
        return { length: i + 1 };
      }

      if (b === 0x0d) { // CR
        if (i + 1 < this.size) {
          const nextIdx = (this.tail + i + 1) % this.capacity;
          if (this.buffer[nextIdx] === 0x0a) { // CRLF
            return { length: i + 2 };
          }
        }
        return { length: i + 1 };
      }
    }

    return null;
  }

  private advanceTail(count: number): void {
    const toAdvance = Math.min(count, this.size);
    this.tail = (this.tail + toAdvance) % this.capacity;
    this.size -= toAdvance;
  }

  public getMetrics(): RingBufferMetrics {
    return { ...this.metrics };
  }

  public clear(): void {
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
}
