"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import enquiryService from "@/src/service/adminService/enquiry.service";
import {
  Enquiry,
  EnquiryStatus,
  toEnquiry,
} from "@/src/components/admin/enquiries/EnquiriesList";

const RECENT_LIMIT = 5;

const getStatusBadge = (status: EnquiryStatus) => {
  switch (status) {
    case "New":
      return "bg-sky-50 text-sky-700 border border-sky-200";
    case "Contacted":
      return "bg-amber-50 text-amber-800 border border-amber-200";
    case "Closed":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }
};

export default function RecentEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    enquiryService
      .getEnquiries({ page: 1, limit: RECENT_LIMIT })
      .then((res) => {
        if (cancelled) return;
        setEnquiries(res.enquiries.slice(0, RECENT_LIMIT).map(toEnquiry));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-text-primary tracking-tight">Recent Enquiries</h2>
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
            {status === "loading" ? (
              Array.from({ length: RECENT_LIMIT }, (_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }, (_, j) => (
                    <td key={j} className="py-3.5 px-5">
                      <div className="h-4 w-20 rounded bg-background animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : status === "error" ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-rose-600 text-sm">
                  Unable to load recent enquiries.
                </td>
              </tr>
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-text-secondary text-sm">
                  No enquiries yet.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-background/50 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-text-primary">{enquiry.parent}</td>
                  <td className="py-3.5 px-5 text-text-primary">{enquiry.student}</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary/10 text-secondary border border-secondary/15">
                      {enquiry.class}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold ${getStatusBadge(enquiry.status)}`}
                    >
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    {enquiry.crmResult === "Sent" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <span className="text-emerald-500">●</span>
                        <span>Sent</span>
                      </span>
                    ) : enquiry.crmResult === "Failed" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                        <span className="text-rose-500">●</span>
                        <span>Failed</span>
                      </span>
                    ) : enquiry.crmResult === "Pending" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600">
                        <span className="text-amber-500">●</span>
                        <span>Pending</span>
                      </span>
                    ) : (
                      <span className="text-xs text-text-secondary">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-xs text-text-secondary font-medium">
                    {enquiry.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
