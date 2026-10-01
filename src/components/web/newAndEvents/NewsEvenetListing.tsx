"use client";

import React, { useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  buildPublicEventsListingUrl,
  PUBLIC_EVENT_CATEGORY_OPTIONS,
  PUBLIC_EVENTS_PAGE_SIZE,
  PublicEventsCategoryFilter,
} from "@/src/constants/newsEvents";
import { PublicEvent, resolveEventImageUrl } from "@/src/service/webService/events";

export type NewsEvenetListingProps = {
  events: PublicEvent[];
  page: number;
  totalPages: number;
  totalItems: number;
  categoryFilter: PublicEventsCategoryFilter;
  loadError?: string | null;
};

function formatDate(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function categoryLabel(category?: string): string {
  return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
}

function getCategoryBadge(category?: string): string {
  switch (category) {
    case "event":
      return "bg-pink-50 text-[#ed0a8c] border-pink-200";
    case "news":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "achievement":
      return "bg-amber-50 text-amber-800 border-amber-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("...");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}

export default function NewsEvenetListing({
  events,
  page: currentPage,
  totalPages,
  totalItems,
  categoryFilter,
  loadError = null,
}: NewsEvenetListingProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const listingHref = (page: number) =>
    buildPublicEventsListingUrl({ page, category: categoryFilter });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#listing") {
      document.getElementById("news-events-listing")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div className="w-full bg-white">
      <section className="w-full bg-[#ed0a8c] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-3">
            <Link href="/web" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">News & Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
            News & Events
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/90 font-medium max-w-2xl">
            Stay up to date with celebrations, announcements and achievements from our school.
          </p>
        </div>
      </section>

      <section
        id="news-events-listing"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 scroll-mt-24"
      >
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#00234b]">
              Browse by category
            </h2>
            <p className="mt-1 text-xs text-gray-500">Filter news, events, and achievements.</p>
          </div>
          <div className="w-full sm:w-56">
            <label htmlFor="news-events-category" className="sr-only">
              Category
            </label>
            <select
              id="news-events-category"
              value={categoryFilter}
              disabled={isPending}
              onChange={(e) => {
                const value = e.target.value as PublicEventsCategoryFilter;
                startTransition(() => {
                  router.push(buildPublicEventsListingUrl({ page: 1, category: value }));
                });
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-[#00234b] focus:outline-none focus:border-[#ed0a8c] focus:ring-2 focus:ring-[#ed0a8c]/20 transition-all cursor-pointer disabled:opacity-60"
            >
              {PUBLIC_EVENT_CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 py-12 text-center text-sm font-medium text-rose-700">
            {loadError}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 py-12 text-center text-sm font-medium text-gray-600">
            {categoryFilter === "all"
              ? "No news or events to show yet. Stay tuned!"
              : `No ${PUBLIC_EVENT_CATEGORY_OPTIONS.find((o) => o.value === categoryFilter)?.label ?? "items"} to show right now.`}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article
                key={event._id}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/web/news-events/${event.slug}`}
                  className="relative block h-52 w-full overflow-hidden bg-gray-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveEventImageUrl(event.coverImage)}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadge(event.category)}`}
                  >
                    {categoryLabel(event.category)}
                  </span>
                </Link>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <h2 className="mt-2 text-lg font-bold text-[#00234b] line-clamp-2 group-hover:text-[#ed0a8c] transition-colors">
                    <Link href={`/web/news-events/${event.slug}`}>{event.title}</Link>
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1">
                    {event.shortDescription}
                  </p>

                  <Link
                    href={`/web/news-events/${event.slug}`}
                    className="mt-4 self-start inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ed0a8c] hover:text-[#00234b] transition-colors"
                  >
                    <span>Read more</span>
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loadError && totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {totalItems === 0 ? 0 : (currentPage - 1) * PUBLIC_EVENTS_PAGE_SIZE + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-800">
                {Math.min(currentPage * PUBLIC_EVENTS_PAGE_SIZE, totalItems)}
              </span>{" "}
              of <span className="font-semibold text-gray-800">{totalItems}</span>
            </p>

            <nav className="flex items-center gap-1.5" aria-label="Pagination">
              {currentPage <= 1 ? (
                <span className="px-3.5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-400 opacity-40">
                  Previous
                </span>
              ) : (
                <Link
                  href={listingHref(currentPage - 1)}
                  scroll
                  className="px-3.5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-[#00234b] hover:border-[#ed0a8c] hover:text-[#ed0a8c] transition-colors"
                >
                  Previous
                </Link>
              )}

              {getPageNumbers(currentPage, totalPages).map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-1.5 text-gray-400 text-sm">
                    …
                  </span>
                ) : p === currentPage ? (
                  <span
                    key={p}
                    aria-current="page"
                    className="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center bg-[#ed0a8c] text-white shadow-md shadow-[#ed0a8c]/30"
                  >
                    {p}
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={listingHref(p)}
                    scroll
                    className="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center border border-gray-200 text-[#00234b] hover:border-[#ed0a8c] hover:text-[#ed0a8c] transition-colors"
                  >
                    {p}
                  </Link>
                )
              )}

              {currentPage >= totalPages ? (
                <span className="px-3.5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-400 opacity-40">
                  Next
                </span>
              ) : (
                <Link
                  href={listingHref(currentPage + 1)}
                  scroll
                  className="px-3.5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-[#00234b] hover:border-[#ed0a8c] hover:text-[#ed0a8c] transition-colors"
                >
                  Next
                </Link>
              )}
            </nav>
          </div>
        )}
      </section>
    </div>
  );
}
