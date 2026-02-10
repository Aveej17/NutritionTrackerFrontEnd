export function isPremiumError(
  error: unknown
): error is Error & { isPremiumError: true } {
  return (
    error instanceof Error &&
    (error as any).isPremiumError === true
  );
}