/**
 * Prepends the base path to a public asset path.
 * Needed because next/image with unoptimized:true does not auto-prepend basePath.
 */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
