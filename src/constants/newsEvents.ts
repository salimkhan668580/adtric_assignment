import type { PublicEventCategory } from "@/src/service/webService/events";

export const PUBLIC_EVENTS_PAGE_SIZE = 9;
export const HOME_EVENTS_LIMIT = 3;

export type PublicEventsCategoryFilter = "all" | PublicEventCategory;

export const PUBLIC_EVENT_CATEGORY_OPTIONS: {
  value: PublicEventsCategoryFilter;
  label: string;
}[] = [
  { value: "all", label: "All categories" },
  { value: "news", label: "News" },
  { value: "event", label: "Event" },
  { value: "achievement", label: "Achievement" },
];

export function parsePublicEventsCategory(value?: string): PublicEventsCategoryFilter {
  if (value === "event" || value === "news" || value === "achievement") return value;
  return "all";
}

export function buildPublicEventsListingUrl(opts: {
  page?: number;
  category?: PublicEventsCategoryFilter;
}): string {
  const params = new URLSearchParams();
  if (opts.page && opts.page > 1) params.set("page", String(opts.page));
  if (opts.category && opts.category !== "all") params.set("category", opts.category);
  const q = params.toString();
  return q ? `/web/news-events?${q}` : "/web/news-events";
}
