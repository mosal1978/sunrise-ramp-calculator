export interface NormCheckResult {
  /** Whether the given slope meets at least the minimum requirements */
  isCompliant: boolean;
  /** Detailed explanation for the user */
  messages: string[];
  /** Overall rating according to the norms */
  rating: 'ideal' | 'acceptable' | 'too steep';
}

/**
 * Validate a ramp slope according to DIN 18040 and common EU guidance.
 *
 * - <= 6% is considered ideal and fully compliant
 * - > 6% and <= 8% is acceptable only for short ramps
 * - > 8% is non‑compliant
 */
export function checkRampAgainstNorms(slope: number): NormCheckResult {
  const messages: string[] = [];
  let rating: 'ideal' | 'acceptable' | 'too steep';

  if (slope <= 6) {
    rating = 'ideal';
    messages.push(
      'Complies with DIN 18040 and EU recommendations (<=6% slope)'
    );
  } else if (slope <= 8) {
    rating = 'acceptable';
    messages.push(
      'Acceptable according to DIN 18040/EU for short ramps (<=8% slope)'
    );
  } else {
    rating = 'too steep';
    messages.push('Exceeds DIN 18040/EU maximum recommended slope');
  }

  return {
    isCompliant: rating !== 'too steep',
    messages,
    rating
  };
}
