import { calculateRampLength } from './ramp.js';
import { checkRampAgainstNorms } from './norms.js';

export function demo() {
  const length = calculateRampLength(1, 12);
  const result = checkRampAgainstNorms(8.3);
  console.log('Ramp length:', length.toFixed(2));
  console.log('Norm result:', result);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo();
}
