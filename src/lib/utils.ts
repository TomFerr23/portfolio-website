export function cn(...inputs: (string | undefined | false | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clampValue(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}
