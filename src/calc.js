export function calculateSlope(rise, run) {
  if (run === 0) throw new Error('run cannot be zero');
  return rise / run;
}

export function calculateAngle(rise, run) {
  return Math.atan(calculateSlope(rise, run)) * (180 / Math.PI);
}
