import { describe, it, expect } from 'vitest';
import { checkRampAgainstNorms } from '../src/norms.js';

describe('norm checks', () => {
  it('reports non compliance for steep slope', () => {
    const result = checkRampAgainstNorms(12);
    expect(result.isCompliant).toBe(false);
  });

  it('reports compliance for gentle slope', () => {
    const result = checkRampAgainstNorms(5);
    expect(result.isCompliant).toBe(true);
  });
});
