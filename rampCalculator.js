#!/usr/bin/env node
import { fileURLToPath } from 'url';

function slopePercent(length, height) {
  return (height / length) * 100;
}

function slopeAngle(length, height) {
  return Math.atan(height / length) * (180 / Math.PI);
}

function rating(percent) {
  if (percent <= 6) return 'ideal';
  if (percent <= 10) return 'acceptable';
  return 'too steep';
}

function recommendedLength(height, targetPercent) {
  return height / (targetPercent / 100);
}

function usage() {
  console.log('Usage: node rampCalculator.js <length-m> <height-m>');
  console.log('Example: node rampCalculator.js 2 0.1');
  console.log('Optional: node rampCalculator.js <length-m> <height-m> --recommend to see ideal lengths');
}

function runCli(args) {
  if (args.includes('--help') || args.length < 2) {
    usage();
    process.exit(args.includes('--help') ? 0 : 1);
  }

  const length = parseFloat(args[0]);
  const height = parseFloat(args[1]);
  if (isNaN(length) || isNaN(height) || length <= 0) {
    console.error('Invalid input. Length and height must be positive numbers.');
    usage();
    process.exit(1);
  }

  const percent = slopePercent(length, height);
  const angle = slopeAngle(length, height);

  console.log(`Length: ${length} m`);
  console.log(`Height: ${height} m`);
  console.log(`Slope: ${percent.toFixed(2)}%`);
  console.log(`Angle: ${angle.toFixed(2)}°`);
  console.log(`Rating: ${rating(percent)}`);

  if (args.includes('--recommend')) {
    const ideal = recommendedLength(height, 6);
    const max = recommendedLength(height, 10);
    console.log('Recommended length:');
    console.log(`  ideal (6%): ${ideal.toFixed(2)} m`);
    console.log(`  max (10%): ${max.toFixed(2)} m`);
  }
}

export { slopePercent, slopeAngle, rating, recommendedLength, runCli };

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  runCli(process.argv.slice(2));
}
