import React from "react";
import Link from "next/link";
import { PublicEvent, resolveEventImageUrl } from "@/src/service/webService/events";

interface NewsEventDetailsProps {
  event: PublicEvent;
  related?: PublicEvent[];
}

function formatDate(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatShortDate(value: string): string {
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

export default function NewsEventDetails({ event, related = [] }: NewsEventDetailsProps) {
  const imageUrl = resolveEventImageUrl(event.coverImage);

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="w-full bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 sm:pb-10">
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 min-w-0"
            aria-label="Breadcrumb"
          >
            <Link href="/web" className="hover:text-[#ed0a8c] transition-colors shrink-0">
              Home
            </Link>
            <span className="shrink-0">/</span>
            <Link href="/web/news-events" className="hover:text-[#ed0a8c] transition-colors shrink-0">
              News & Events
            </Link>
            <span className="shrink-0">/</span>
            <span className="text-[#00234b] font-semibold truncate">{event.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getCategoryBadge(event.category)}`}
            >
              {categoryLabel(event.category)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {formatDate(event.date)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00234b] tracking-tight leading-tight break-words">
            {event.title}
          </h1>

          {event.shortDescription && (
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed break-words">
              {event.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* Cover image: shown at its natural aspect ratio, never cropped */}
      {imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl shadow-black/10 ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={event.title}
              className="relative block w-full h-[260px] sm:h-[380px] lg:h-[460px] object-contain"
            />
          </figure>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-base sm:text-[17px] text-gray-700 leading-8 whitespace-pre-wrap break-words">
          {event.longDescription}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/web/news-events"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00234b] hover:text-[#ed0a8c] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to all News & Events
          </Link>
          <Link
            href="/web#enquiry"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ed0a8c] text-white hover:bg-[#00234b] transition-colors"
          >
            Admission Enquiry
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#00234b] mb-8">
              More News & Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/web/news-events/${item.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveEventImageUrl(item.coverImage)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryBadge(item.category)}`}
                    >
                      {categoryLabel(item.category)}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium text-gray-500">{formatShortDate(item.date)}</p>
                    <h3 className="mt-1.5 text-base font-bold text-[#00234b] line-clamp-2 group-hover:text-[#ed0a8c] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
