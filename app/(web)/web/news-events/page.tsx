import type { Metadata } from "next";
import {
  parsePublicEventsCategory,
  PUBLIC_EVENTS_PAGE_SIZE,
} from "@/src/constants/newsEvents";
import NewsEvenetListing from "@/src/components/web/newAndEvents/NewsEvenetListing";
import { getPublicEventsServer } from "@/src/service/webService/events.server";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Celebrations, announcements and achievements from our school.",
};

type SearchParams = { page?: string; category?: string };

export default async function NewsEventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const categoryFilter = parsePublicEventsCategory(sp.category);

  let events: Awaited<ReturnType<typeof getPublicEventsServer>>["events"] = [];
  let total = 0;
  let totalPages = 1;
  let loadError: string | null = null;

  try {
    const res = await getPublicEventsServer(
      page,
      PUBLIC_EVENTS_PAGE_SIZE,
      categoryFilter === "all" ? undefined : categoryFilter
    );
    events = res.events;
    total = res.total;
    totalPages = Math.max(1, res.totalPages);
  } catch (err: unknown) {
    loadError = err instanceof Error ? err.message : "Failed to load events.";
  }

  return (
    <NewsEvenetListing
      key={`${page}-${categoryFilter}`}
      events={events}
      page={page}
      totalItems={total}
      totalPages={totalPages}
      categoryFilter={categoryFilter}
      loadError={loadError}
    />
  );
}
