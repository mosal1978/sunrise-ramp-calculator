import { describe, it, expect } from 'vitest';
import { calculateSlope, calculateAngle } from '../src/calc.js';

describe('calculateSlope', () => {
  it('returns rise over run', () => {
    expect(calculateSlope(1, 2)).toBeCloseTo(0.5);
  });

  it('throws if run is zero', () => {
    expect(() => calculateSlope(1, 0)).toThrow();
  });
});

describe('calculateAngle', () => {
  it('converts slope to degrees', () => {
    // slope 1/1 should be 45 degrees
    expect(calculateAngle(1, 1)).toBeCloseTo(45);
  });
});
