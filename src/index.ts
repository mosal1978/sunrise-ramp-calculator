import { calculateRampLength, calculateSlope } from './ramp.js';
import { checkRampAgainstNorms } from './norms.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function demo() {
  const rl = readline.createInterface({ input, output });
  const rise = parseFloat(await rl.question('Rise (m): '));
  const run = parseFloat(await rl.question('Run (m): '));
  rl.close();

  const length = calculateRampLength(rise, run);
  const slope = calculateSlope(rise, run);
  const result = checkRampAgainstNorms(slope);
  console.log(`Ramp length: ${length.toFixed(2)} m`);
  console.log(`Slope: ${slope.toFixed(2)} %`);
  console.log('Compliant with all norms:', result.isCompliant);
  for (const msg of result.messages) {
    console.log(' -', msg);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo();
}
