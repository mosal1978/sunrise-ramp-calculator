export interface Norm {
  name: string;
  /** maximum allowed slope in percent */
  maxSlope: number;
}

export interface NormCheckResult {
  isCompliant: boolean;
  messages: string[];
}

const norms: Norm[] = [
  { name: 'DIN 18040', maxSlope: 6 },
  { name: 'ÖNORM B1600', maxSlope: 6 },
  { name: 'SIA 500', maxSlope: 6 },
  { name: 'EU 1528', maxSlope: 8 }
];

export function checkRampAgainstNorms(slope: number): NormCheckResult {
  const messages: string[] = [];
  let compliant = true;
  for (const norm of norms) {
    if (slope <= norm.maxSlope) {
      messages.push(`${norm.name}: OK (≤${norm.maxSlope}%)`);
    } else {
      messages.push(`${norm.name}: too steep (max ${norm.maxSlope}%)`);
      compliant = false;
    }
  }
  return { isCompliant: compliant, messages };
}
