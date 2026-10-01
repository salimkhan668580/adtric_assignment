import { api } from "@/src/helper/axiosIntecpter";
import { AxiosError } from "axios";

export type PublicEventCategory = "event" | "news" | "achievement";

export interface PublicEvent {
  _id: string;
  title: string;
  slug: string;
  category: PublicEventCategory;
  publishedStatus?: boolean;
  coverImage?: string;
  date: string;
  shortDescription: string;
  longDescription: string;
  createdAt?: string;
}

export interface PublicEventsResult {
  events: PublicEvent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type RawPublicEventsResponse = {
  data?: PublicEvent[] | { events?: PublicEvent[]; items?: PublicEvent[]; total?: number; totalPages?: number; page?: number; limit?: number };
  events?: PublicEvent[];
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
  pagination?: { total?: number; totalPages?: number; page?: number; limit?: number };
};

export function resolveEventImageUrl(path?: string): string {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  return `${base}/${path.replace(/^\/+/, "")}`;
}

/**
 * Fetches a single published event by slug. Returns null when it doesn't exist.
 */
export async function getPublicEventBySlug(slug: string): Promise<PublicEvent | null> {
  try {
    const res = await api.get<{ message?: string; event?: PublicEvent; data?: PublicEvent }>(
      `/get-event/${encodeURIComponent(slug)}`
    );
    return res.event ?? res.data ?? null;
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
    if (axiosErr?.response?.status === 404) return null;
    throw new Error(
      axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        "Failed to load event."
    );
  }
}

export function parsePublicEventsResponse(
  res: RawPublicEventsResponse,
  page: number,
  limit: number
): PublicEventsResult {
  const nested = res.data && !Array.isArray(res.data) ? res.data : undefined;
  const events =
    (Array.isArray(res.data) ? res.data : undefined) ??
    nested?.events ??
    nested?.items ??
    res.events ??
    [];
  const meta = res.pagination ?? nested ?? res;
  const resolvedLimit = meta.limit ?? limit;
  const total = meta.total ?? events.length;

  return {
    events,
    total,
    page: meta.page ?? page,
    limit: resolvedLimit,
    totalPages: meta.totalPages ?? Math.max(1, Math.ceil(total / resolvedLimit)),
  };
}

/**
 * Fetches published news/events for the public website (client-side).
 */
export async function getPublicEvents(
  page = 1,
  limit = 3,
  category?: PublicEventCategory
): Promise<PublicEventsResult> {
  try {
    const params: Record<string, string | number> = { page, limit };
    if (category) params.category = category;
    const res = await api.get<RawPublicEventsResponse>("/get-events", { params });
    return parsePublicEventsResponse(res, page, limit);
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
    throw new Error(
      axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        "Failed to load events."
    );
  }
}
