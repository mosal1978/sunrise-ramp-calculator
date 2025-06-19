import { calculateRampLength } from './ramp.js';
import { checkRampAgainstNorms } from './norms.js';

export function demo() {
  const rise = 1; // in meters
  const run = 12; // in meters
  const length = calculateRampLength(rise, run);
  const slopePercent = (rise / run) * 100;
  const result = checkRampAgainstNorms(slopePercent);

  console.log(`Ramp rise/run: ${rise}m / ${run}m`);
  console.log(`Slope: ${slopePercent.toFixed(1)}%`);
  console.log(`Length: ${length.toFixed(2)}m`);
  console.log(`Rating: ${result.rating}`);
  console.log(result.messages.join('\n'));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo();
}
