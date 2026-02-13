export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `testuser_${timestamp}@mailinator.com`;
}
