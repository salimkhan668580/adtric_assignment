import { cookies } from "next/headers";
import { AUTH_TOKEN_COOKIE } from "@/src/lib/authCookie";

function apiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  return base;
}

export async function getServerAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_COOKIE)?.value ?? null;
}

type ServerGetOptions = {
  params?: Record<string, string | number | undefined>;
  token?: string | null;
};

/**
 * JSON GET against the backend from Server Components / Route Handlers.
 */
export async function serverGetJson<T>(path: string, options: ServerGetOptions = {}): Promise<T> {
  const url = new URL(`${apiBaseUrl()}/${path.replace(/^\/+/, "")}`);

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value === undefined || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }

  let token = options.token;
  if (token === undefined) {
    token = await getServerAuthToken();
  }

  const headers: HeadersInit = { Accept: "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { headers, cache: "no-store" });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string; error?: string };
      message = body.message || body.error || message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
