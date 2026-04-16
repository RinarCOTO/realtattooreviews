export function buildUrl(...segments: string[]): string {
  return '/' + segments.join('/');
}
