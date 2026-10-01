import {
  parsePublicEventsResponse,
  PublicEvent,
  PublicEventCategory,
  PublicEventsResult,
  RawPublicEventsResponse,
} from "@/src/service/webService/events";

function publicApiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  return base;
}

export async function getPublicEventsServer(
  page = 1,
  limit = 3,
  category?: PublicEventCategory
): Promise<PublicEventsResult> {
  const url = new URL(`${publicApiBase()}/get-events`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  if (category) url.searchParams.set("category", category);

  const res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string; error?: string };
      message = body.message || body.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const data = (await res.json()) as RawPublicEventsResponse;
  return parsePublicEventsResponse(data, page, limit);
}

export async function getPublicEventBySlugServer(slug: string): Promise<PublicEvent | null> {
  const url = `${publicApiBase()}/get-event/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });

  if (res.status === 404) return null;

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { message?: string; error?: string };
      message = body.message || body.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const data = (await res.json()) as { event?: PublicEvent; data?: PublicEvent };
  return data.event ?? data.data ?? null;
}
