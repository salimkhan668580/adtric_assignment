import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
}

interface RecentEnquiry {
  id: string;
  parent: string;
  student: string;
  class: string;
  status: "New" | "Contacted" | "Closed";
  crmResult: "Sent" | "Failed";
  createdAt: string;
}

function MetricCard({ title, count, icon, iconBg, accentColor }: CardProps) {
  return (
    <div className="relative bg-surface rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Accent color bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="mt-2 text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            {count}
          </p>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const cards: CardProps[] = [
    {
      title: "Total Enquiry",
      count: "1,284",
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
      title: "Pending Enquiry",
      count: "42",
      accentColor: "var(--accent-yellow)",
      iconBg: "bg-amber-100 text-amber-800",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Resolve Enquiry",
      count: "1,242",
      accentColor: "var(--accent-blue)",
      iconBg: "bg-sky-100 text-sky-700",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Total Events",
      count: "36",
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
  ];

  const recentEnquiries: RecentEnquiry[] = [
    {
      id: "ENQ-001",
      parent: "Rajesh Sharma",
      student: "Aarav Sharma",
      class: "Grade 5",
      status: "New",
      crmResult: "Sent",
      createdAt: "30 Sep 18:24",
    },
    {
      id: "ENQ-002",
      parent: "Pooja Verma",
      student: "Ananya Verma",
      class: "Grade 8",
      status: "Contacted",
      crmResult: "Sent",
      createdAt: "30 Sep 14:10",
    },
    {
      id: "ENQ-003",
      parent: "Vikram Malhotra",
      student: "Kabir Malhotra",
      class: "Grade 11",
      status: "New",
      crmResult: "Failed",
      createdAt: "29 Sep 20:45",
    },
    {
      id: "ENQ-004",
      parent: "Meera Nair",
      student: "Diya Nair",
      class: "Grade 2",
      status: "Closed",
      crmResult: "Sent",
      createdAt: "28 Sep 11:30",
    },
    {
      id: "ENQ-005",
      parent: "Amit Patel",
      student: "Rohan Patel",
      class: "Grade 9",
      status: "Contacted",
      crmResult: "Sent",
      createdAt: "27 Sep 16:15",
    },
  ];

  const getStatusBadge = (status: "New" | "Contacted" | "Closed") => {
    switch (status) {
      case "New":
        return "bg-sky-50 text-sky-700 border border-sky-200";
      case "Contacted":
        return "bg-amber-50 text-amber-800 border border-amber-200";
      case "Closed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Dashboard</h1>
      </div>

      {/* 4 Metric Count Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            count={card.count}
            icon={card.icon}
            iconBg={card.iconBg}
            accentColor={card.accentColor}
          />
        ))}
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-text-primary tracking-tight">
              Recent Enquiries
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Latest prospective student admission submissions.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1 group"
          >
            <span>View All</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-background/60 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                <th className="py-3 px-5">Parent</th>
                <th className="py-3 px-5">Student</th>
                <th className="py-3 px-5">Class</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">CRM Result</th>
                <th className="py-3 px-5">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {recentEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-background/50 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-text-primary">
                    {enquiry.parent}
                  </td>
                  <td className="py-3.5 px-5 text-text-primary">
                    {enquiry.student}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary/10 text-secondary border border-secondary/15">
                      {enquiry.class}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold ${getStatusBadge(enquiry.status)}`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    {enquiry.crmResult === "Sent" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <span className="text-emerald-500">●</span>
                        <span>Sent</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                        <span className="text-rose-500">●</span>
                        <span>Failed</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-xs text-text-secondary font-medium">
                    {enquiry.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}