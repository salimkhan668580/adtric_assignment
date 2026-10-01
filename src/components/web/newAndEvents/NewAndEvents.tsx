import React from "react";
import Link from "next/link";
import { PublicEvent, resolveEventImageUrl } from "@/src/service/webService/events";

const DISPLAY_LIMIT = 3;

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

type NewAndEventsProps = {
  events?: PublicEvent[];
};

export default function NewAndEvents({ events = [] }: NewAndEventsProps) {
  const items = events.slice(0, DISPLAY_LIMIT).map((e) => ({
    id: e._id,
    slug: e.slug,
    title: e.title,
    category: e.category ? e.category.charAt(0).toUpperCase() + e.category.slice(1) : "",
    imageUrl: resolveEventImageUrl(e.coverImage),
    date: formatDate(e.date),
    shortDescription: e.shortDescription ?? "",
  }));

  const renderCard = (item: (typeof items)[number]) => (
    <Link
      key={item.id}
      href={`/web/news-events/${item.slug}`}
      className="group flex flex-col w-full rounded-2xl overflow-hidden bg-white text-[#00234b] shadow-lg shadow-black/15 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.category && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white text-[#ed0a8c] shadow-sm">
            {item.category}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {item.date && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            {item.date}
          </span>
        )}
        <h3 className="mt-1.5 text-base sm:text-lg font-bold leading-snug line-clamp-2 group-hover:text-[#ed0a8c] transition-colors">
          {item.title}
        </h3>
        {item.shortDescription && (
          <p className="mt-1.5 text-sm text-gray-600 line-clamp-2 flex-1">{item.shortDescription}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ed0a8c]">
          Read more
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );

  return (
    <section id="news-events" className="relative w-full bg-[#ed0a8c] text-white pt-4 sm:pt-6 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 text-[#ed0a8c] block"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,65 Q80,10 160,50 Q260,0 360,55 Q460,5 560,50 Q660,-5 760,45 Q860,10 960,50 Q1060,-10 1160,50 Q1260,5 1360,45 Q1400,20 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-6 left-1/3 opacity-15">
          <svg className="w-20 h-20 stroke-white fill-none" viewBox="0 0 100 100" strokeWidth={2}>
            <polygon points="50,5 95,50 50,95 5,50" />
            <line x1="5" y1="50" x2="95" y2="50" />
            <line x1="50" y1="5" x2="50" y2="95" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-8 opacity-15">
          <svg className="w-24 h-24 stroke-white fill-none" viewBox="0 0 100 100" strokeWidth={2}>
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans">
              The Event Diary
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/90 font-medium max-w-xl">
              Events and celebrations that create joyful moments throughout the year.
            </p>
          </div>

          <Link
            href="/web/news-events"
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#00234b] hover:text-[#ed0a8c] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            <span>All Events & Competitions</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white/10 border border-white/20 py-12 text-center text-sm font-medium text-white/90">
            No events to show yet. Stay tuned!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {items.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
}
