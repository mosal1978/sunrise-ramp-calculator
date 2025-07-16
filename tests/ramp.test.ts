import { describe, it, expect } from 'vitest';
import { calculateRampLength, calculateSlope } from '../src/ramp.js';

describe('ramp calculations', () => {
  it('calculates ramp length correctly', () => {
    expect(calculateRampLength(1, 1)).toBeCloseTo(Math.sqrt(2));
  });

  it('calculates slope correctly', () => {
    expect(calculateSlope(1, 2)).toBeCloseTo(50);
  });
});
