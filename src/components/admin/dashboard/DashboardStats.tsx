"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import dashboardService, {
  DashboardStats as DashboardStatsData,
} from "@/src/service/adminService/dashboard.service";

interface StatCard {
  title: string;
  getValue: (stats: DashboardStatsData) => number;
  accentColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const ENQUIRY_CARDS: StatCard[] = [
  {
    title: "Total Enquiry",
    getValue: (s) => s.enquiries.total,
    accentColor: "var(--secondary)",
    iconBg: "bg-secondary/10 text-secondary",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
  },
  {
    title: "New Enquiry",
    getValue: (s) => s.enquiries.new,
    accentColor: "var(--accent-yellow)",
    iconBg: "bg-amber-100 text-amber-800",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Contacted Enquiry",
    getValue: (s) => s.enquiries.contacted,
    accentColor: "var(--accent-blue)",
    iconBg: "bg-sky-100 text-sky-700",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Closed Enquiry",
    getValue: (s) => s.enquiries.closed,
    accentColor: "var(--primary)",
    iconBg: "bg-pink-100 text-primary",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const EVENT_CARDS: StatCard[] = [
  {
    title: "Total Events",
    getValue: (s) => s.events.total,
    accentColor: "var(--primary)",
    iconBg: "bg-pink-100 text-primary",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
    ),
  },
  {
    title: "Published Events",
    getValue: (s) => s.events.published,
    accentColor: "#10b981",
    iconBg: "bg-emerald-100 text-emerald-700",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    title: "Draft Events",
    getValue: (s) => s.events.draft,
    accentColor: "#9ca3af",
    iconBg: "bg-gray-100 text-gray-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    ),
  },
];

function MetricCard({
  card,
  stats,
  failed,
}: {
  card: StatCard;
  stats: DashboardStatsData | null;
  failed: boolean;
}) {
  return (
    <div className="relative bg-surface rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: card.accentColor }} />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{card.title}</p>
          {stats ? (
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              {card.getValue(stats).toLocaleString("en-IN")}
            </p>
          ) : failed ? (
            <p className="mt-2 text-3xl sm:text-4xl font-bold text-text-secondary tracking-tight">—</p>
          ) : (
            <div className="mt-3 h-8 w-16 rounded-lg bg-background animate-pulse" />
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}>
          {card.icon}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-text-primary tracking-tight">{title}</h2>
      <Link href={href} className="text-xs font-semibold text-secondary hover:text-primary transition-colors">
        Manage
      </Link>
    </div>
  );
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    dashboardService
      .getDashboardStats()
      .then((res) => {
        if (!cancelled) setStats(res);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setFailed(true);
        toast.error(err instanceof Error ? err.message : "Failed to load dashboard stats.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <SectionHeader title="Enquiries" href="/admin/enquiries" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENQUIRY_CARDS.map((card) => (
            <MetricCard key={card.title} card={card} stats={stats} failed={failed} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Events & News" href="/admin/news-events" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {EVENT_CARDS.map((card) => (
            <MetricCard key={card.title} card={card} stats={stats} failed={failed} />
          ))}
        </div>
      </div>
    </div>
  );
}
