export const AUTH_TOKEN_COOKIE = "authToken";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/** Mirrors the admin JWT into a cookie so Server Components can call protected APIs. */
export function setAuthTokenCookie(token: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
}

export function clearAuthTokenCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
