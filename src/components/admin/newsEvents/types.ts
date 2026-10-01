import type { ApiEvent, EventCategory } from "@/src/service/adminService/event.service";

export type NewsCategory = "News" | "Event" | "Achievement";

export interface NewsEventItem {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  date: string;
  imageUrl: string;
  shortDescription: string;
  content: string;
  published: boolean;
  createdAt: string;
}

export function generateSlug(
  title: string,
  existingSlugs: string[] = [],
  excludeSlug?: string
): string {
  let base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!base) base = "untitled";

  const slugsToCheck = excludeSlug
    ? existingSlugs.filter((s) => s !== excludeSlug)
    : existingSlugs;

  let slug = base;
  let count = 1;
  while (slugsToCheck.includes(slug)) {
    slug = `${base}-${count}`;
    count++;
  }
  return slug;
}

export const INITIAL_NEWS_EVENTS: NewsEventItem[] = [
  {
    id: "ne-1",
    title: "Annual Science & Innovation Exhibition 2026",
    slug: "annual-science-innovation-exhibition-2026",
    category: "Event",
    date: "2026-10-15",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    shortDescription:
      "Showcasing student-led breakthrough research projects, robotics models, and sustainable energy prototypes.",
    content:
      "We are delighted to host our Annual Science and Innovation Exhibition featuring over 120 interactive projects across primary and senior divisions. Parents and industry mentors are invited to review student projects and participate in live demonstrations.",
    published: true,
    createdAt: "2026-09-28 10:00",
  },
  {
    id: "ne-2",
    title: "Campus Upgrades: New Robotics and AI Laboratory",
    slug: "campus-upgrades-new-robotics-and-ai-laboratory",
    category: "News",
    date: "2026-09-22",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    shortDescription:
      "State-of-the-art computational infrastructure with robotic arms, 3D printers, and edge AI kits now available.",
    content:
      "In line with our commitment to STEM excellence, our new robotics and AI laboratory was inaugurated this week. Students from Grades 6 to 12 will now access advanced hands-on robotics equipment.",
    published: true,
    createdAt: "2026-09-22 14:30",
  },
  {
    id: "ne-3",
    title: "National STEM Olympiad Gold Medal Victory",
    slug: "national-stem-olympiad-gold-medal-victory",
    category: "Achievement",
    date: "2026-09-18",
    imageUrl:
      "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=600&q=80",
    shortDescription:
      "Our senior student robotics team secured 1st place in the National STEM Olympiad Finals.",
    content:
      "Huge congratulations to Kabir Malhotra and Aarav Sharma for clinching the Gold Trophy at the National STEM Olympiad in New Delhi out of more than 400 competing institutions.",
    published: true,
    createdAt: "2026-09-18 16:45",
  },
  {
    id: "ne-4",
    title: "Inter-School Football Championship Finals",
    slug: "inter-school-football-championship-finals",
    category: "Event",
    date: "2026-11-05",
    imageUrl:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    shortDescription:
      "Join us this November on the central sports field for the inter-school athletic tournament.",
    content:
      "Twelve regional schools will compete in the annual varsity league. Schedule of fixtures and ticketing information will be dispatched to parents via student portal.",
    published: false,
    createdAt: "2026-09-15 09:20",
  },
];

const STORAGE_KEY = "adtric_news_events_data";

export function getStoredNewsEvents(): NewsEventItem[] {
  if (typeof window === "undefined") return INITIAL_NEWS_EVENTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS_EVENTS));
      return INITIAL_NEWS_EVENTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_NEWS_EVENTS;
  }
}

const CATEGORY_LABELS: Record<EventCategory, NewsCategory> = {
  event: "Event",
  news: "News",
  achievement: "Achievement",
};

export function resolveImageUrl(path?: string): string {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  return `${base}/${path.replace(/^\/+/, "")}`;
}

export function toNewsEventItem(e: ApiEvent): NewsEventItem {
  return {
    id: e._id ?? e.id ?? e.slug,
    title: e.title,
    slug: e.slug,
    category: CATEGORY_LABELS[e.category] ?? "Event",
    date: e.date ? e.date.split("T")[0] : "",
    imageUrl: resolveImageUrl(e.coverImage),
    shortDescription: e.shortDescription ?? "",
    content: e.longDescription ?? "",
    published: Boolean(e.publishedStatus),
    createdAt: e.createdAt ?? "",
  };
}

const CACHE_KEY = "adtric_news_events_cache";

export function cacheNewsEventItems(items: NewsEventItem[]): void {
  if (typeof window === "undefined") return;
  try {
    const existing: Record<string, NewsEventItem> = JSON.parse(
      localStorage.getItem(CACHE_KEY) || "{}"
    );
    items.forEach((it) => {
      existing[it.id] = it;
    });
    localStorage.setItem(CACHE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to cache news events", err);
  }
}

export function getCachedNewsEventRaw(id: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const all: Record<string, NewsEventItem> = JSON.parse(
      localStorage.getItem(CACHE_KEY) || "{}"
    );
    return all[id] ? JSON.stringify(all[id]) : null;
  } catch {
    return null;
  }
}

export function saveStoredNewsEvents(items: NewsEventItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save news events to localStorage", err);
  }
}
