export interface NormCheckResult {
  isCompliant: boolean;
  messages: string[];
}

export function checkRampAgainstNorms(slope: number): NormCheckResult {
  // Placeholder always compliant
  return {
    isCompliant: true,
    messages: ['Norm checks not yet implemented']
  };
}
