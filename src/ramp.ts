/**
 * Calculate the length of a ramp using the Pythagorean theorem.
 * @param rise Vertical rise in meters
 * @param run  Horizontal run in meters
 */
export function calculateRampLength(rise: number, run: number): number {
  return Math.sqrt(rise * rise + run * run);
}

/**
 * Calculate the slope percentage given rise and run.
 */
export function calculateSlope(rise: number, run: number): number {
  return (rise / run) * 100;
}

/**
 * Determine the required run for a desired maximum slope.
 */
export function calculateRecommendedRun(rise: number, maxSlopePercent: number): number {
  return rise / (maxSlopePercent / 100);
}
