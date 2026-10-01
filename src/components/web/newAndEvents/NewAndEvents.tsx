"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface EventGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  heightClass: string;
}

export default function NewAndEvents() {
  const [selectedPhoto, setSelectedPhoto] = useState<EventGalleryItem | null>(null);

  // The 8 gallery photos arranged in 4 columns matching the reference layout
  const column1: EventGalleryItem[] = [
    {
      id: "ev-1",
      title: "Diwali celebration",
      category: "Celebration",
      imageUrl:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-52 sm:h-56",
    },
    {
      id: "ev-2",
      title: "Fancy dress",
      category: "Competition",
      imageUrl:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-52 sm:h-56",
    },
  ];

  const column2: EventGalleryItem[] = [
    {
      id: "ev-3",
      title: "Sports day, portrait frame",
      category: "Sports",
      imageUrl:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-64 sm:h-72",
    },
    {
      id: "ev-4",
      title: "Art exhibition",
      category: "Exhibition",
      imageUrl:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-40 sm:h-44",
    },
  ];

  const column3: EventGalleryItem[] = [
    {
      id: "ev-5",
      title: "Janmashtami Celebration",
      category: "Festivity",
      imageUrl:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-64 sm:h-72",
    },
    {
      id: "ev-6",
      title: "Field trip group",
      category: "Excursion",
      imageUrl:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-40 sm:h-44",
    },
  ];

  const column4: EventGalleryItem[] = [
    {
      id: "ev-7",
      title: "Storytelling competition",
      category: "Academics",
      imageUrl:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-40 sm:h-44",
    },
    {
      id: "ev-8",
      title: "Graduation, Grade 2",
      category: "Milestone",
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-64 sm:h-72",
    },
  ];

  const renderCard = (item: EventGalleryItem) => (
    <div
      key={item.id}
      onClick={() => setSelectedPhoto(item)}
      className={`relative w-full ${item.heightClass} rounded-2xl overflow-hidden group shadow-lg shadow-black/15 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
    >
      {/* Background Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

      {/* Title Label */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm line-clamp-1">
          {item.title}
        </span>
        <svg
          className="w-3.5 h-3.5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );

  return (
    <section id="news-events" className="relative w-full bg-[#ed0a8c] text-white pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 mt-12 overflow-hidden">
      {/* Cloud-scalloped Top Border Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-20 md:h-28 text-[#ed0a8c] block"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,65 Q80,10 160,50 Q260,0 360,55 Q460,5 560,50 Q660,-5 760,45 Q860,10 960,50 Q1060,-10 1160,50 Q1260,5 1360,45 Q1400,20 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
      </div>



      {/* Subtle Doodle Watermarks in Background */}
      <div className="pointer-events-none absolute top-12 left-1/3 opacity-15">
        <svg className="w-24 h-24 stroke-white fill-none" viewBox="0 0 100 100" strokeWidth={2}>
          <polygon points="50,5 95,50 50,95 5,50" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <line x1="50" y1="5" x2="50" y2="95" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-8 right-16 opacity-15">
        <svg className="w-28 h-28 stroke-white fill-none" viewBox="0 0 100 100" strokeWidth={2}>
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pt-4 sm:pt-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-sans">
              The Event Diary
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/90 font-medium max-w-xl">
              Events and celebrations that create joyful moments throughout the year.
            </p>
          </div>

          {/* Top Right Action Button */}
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

        {/* 4-Column Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {column1.map(renderCard)}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {column2.map(renderCard)}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {column3.map(renderCard)}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {column4.map(renderCard)}
          </div>
        </div>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 sm:h-96 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 bg-white text-gray-900 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ed0a8c]">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-xl font-bold mt-0.5">{selectedPhoto.title}</h3>
              </div>
              <Link
                href="/web/news-events"
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#00234b] text-white hover:bg-[#ed0a8c] transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
