import type { Metadata } from "next";
import NewsEventsList from "@/src/components/admin/newsEvents/NewsEventsList";
import { toNewsEventItem } from "@/src/components/admin/newsEvents/types";
import { EventCategory } from "@/src/service/adminService/event.service";
import { getAdminEventsServer } from "@/src/service/adminService/event.server";

export const metadata: Metadata = {
  title: "Events and News",
  description: "Manage school events, news, and achievements.",
};

const ITEMS_PER_PAGE = 6;

type SearchParams = {
  page?: string;
  category?: string;
  status?: string;
  search?: string;
};

function parseCategory(value?: string): "All" | "Event" | "News" | "Achievement" {
  if (value === "Event" || value === "News" || value === "Achievement") return value;
  return "All";
}

function parsePublished(value?: string): "All" | "Published" | "Draft" {
  if (value === "Published" || value === "Draft") return value;
  return "All";
}

export default async function NewsEventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const categoryFilter = parseCategory(sp.category);
  const publishedFilter = parsePublished(sp.status);
  const searchQuery = sp.search?.trim() ?? "";

  let items: ReturnType<typeof toNewsEventItem>[] = [];
  let total = 0;
  let totalPages = 1;
  let loadError: string | null = null;

  try {
    const res = await getAdminEventsServer({
      page,
      limit: ITEMS_PER_PAGE,
      category:
        categoryFilter === "All"
          ? undefined
          : (categoryFilter.toLowerCase() as EventCategory),
      status:
        publishedFilter === "Published"
          ? "published"
          : publishedFilter === "Draft"
            ? "draft"
            : undefined,
      search: searchQuery,
    });
    items = res.events.map(toNewsEventItem);
    total = res.total;
    totalPages = Math.max(1, res.totalPages);
  } catch (err: unknown) {
    loadError = err instanceof Error ? err.message : "Failed to load events.";
  }

  const listKey = `${page}-${categoryFilter}-${publishedFilter}-${searchQuery}`;

  return (
    <NewsEventsList
      key={listKey}
      items={items}
      total={total}
      totalPages={totalPages}
      page={page}
      itemsPerPage={ITEMS_PER_PAGE}
      categoryFilter={categoryFilter}
      publishedFilter={publishedFilter}
      searchQuery={searchQuery}
      loadError={loadError}
    />
  );
}
