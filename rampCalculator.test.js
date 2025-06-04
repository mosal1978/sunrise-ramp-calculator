import { describe, it, expect } from 'vitest';
import { slopePercent, rating, recommendedLength } from './rampCalculator.js';

describe('ramp calculations', () => {
  it('calculates slope percent', () => {
    expect(slopePercent(2, 0.1)).toBeCloseTo(5);
  });

  it('rates slope correctly', () => {
    expect(rating(5)).toBe('ideal');
    expect(rating(8)).toBe('acceptable');
    expect(rating(15)).toBe('too steep');
  });

  it('provides recommended length', () => {
    expect(recommendedLength(0.1, 6)).toBeCloseTo(1.6667, 3);
  });
});
