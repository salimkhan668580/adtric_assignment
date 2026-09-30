"use client";

import React, { useState, useMemo } from "react";

export type EnquiryStatus = "New" | "Contacted" | "Closed";

export interface Enquiry {
  id: string;
  parent: string;
  student: string;
  class: string;
  status: EnquiryStatus;
  crmResult: "Sent" | "Failed";
  createdAt: string;
  mobile?: string;
  email?: string;
  message?: string;
}

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-001",
    parent: "Rajesh Sharma",
    student: "Aarav Sharma",
    class: "Grade 5",
    status: "New",
    crmResult: "Sent",
    createdAt: "30 Sep 18:24",
    mobile: "+91 98765 43210",
    email: "rajesh.sharma@example.com",
    message: "Seeking admission for academic year 2026-27. Need details on curriculum and fee structure.",
  },
  {
    id: "ENQ-002",
    parent: "Pooja Verma",
    student: "Ananya Verma",
    class: "Grade 8",
    status: "Contacted",
    crmResult: "Sent",
    createdAt: "30 Sep 14:10",
    mobile: "+91 98123 45678",
    email: "pooja.v@example.com",
    message: "Interested in robotics lab facilities and sports training options available after school hours.",
  },
  {
    id: "ENQ-003",
    parent: "Vikram Malhotra",
    student: "Kabir Malhotra",
    class: "Grade 11",
    status: "New",
    crmResult: "Failed",
    createdAt: "29 Sep 20:45",
    mobile: "+91 99887 76655",
    email: "vikram.m@domain.in",
    message: "Inquiring about scholarship eligibility and entrance examination syllabus for Grade 11 Science stream.",
  },
  {
    id: "ENQ-004",
    parent: "Meera Nair",
    student: "Diya Nair",
    class: "Grade 2",
    status: "Closed",
    crmResult: "Sent",
    createdAt: "28 Sep 11:30",
    mobile: "+91 97654 32109",
    email: "meera.nair@webmail.com",
    message: "Transfer enquiry from Bangalore branch. Required documentation and mid-term enrollment timeline.",
  },
  {
    id: "ENQ-005",
    parent: "Amit Patel",
    student: "Rohan Patel",
    class: "Grade 9",
    status: "Contacted",
    crmResult: "Sent",
    createdAt: "27 Sep 16:15",
    mobile: "+91 98901 23456",
    email: "amit.patel@global.org",
    message: "Would like to book a campus tour this Saturday morning.",
  },
  {
    id: "ENQ-006",
    parent: "Sunita Choudhury",
    student: "Ishan Choudhury",
    class: "Grade 1",
    status: "New",
    crmResult: "Failed",
    createdAt: "27 Sep 09:50",
    mobile: "+91 98234 56789",
    email: "sunita.c@cloud.com",
    message: "Enquiring about daycare availability for junior classes.",
  },
  {
    id: "ENQ-007",
    parent: "Deepak Mehta",
    student: "Kavya Mehta",
    class: "Grade 10",
    status: "Closed",
    crmResult: "Sent",
    createdAt: "26 Sep 15:20",
    mobile: "+91 97123 98765",
    email: "deepak.mehta@enterprise.net",
    message: "Enquiry for board exam preparation support.",
  },
  {
    id: "ENQ-008",
    parent: "Kavita Rao",
    student: "Arjun Rao",
    class: "Grade 6",
    status: "Contacted",
    crmResult: "Sent",
    createdAt: "25 Sep 12:05",
    mobile: "+91 99001 12233",
    email: "kavita.rao@techcorp.io",
    message: "Need transport route details and fee schedule.",
  },
];

export default function EnquiriesList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Status counts for tabs
  const counts = useMemo(() => {
    return {
      All: enquiries.length,
      New: enquiries.filter((e) => e.status === "New").length,
      Contacted: enquiries.filter((e) => e.status === "Contacted").length,
      Closed: enquiries.filter((e) => e.status === "Closed").length,
    };
  }, [enquiries]);

  // Filtered enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.parent.toLowerCase().includes(q) ||
        item.student.toLowerCase().includes(q) ||
        item.class.toLowerCase().includes(q) ||
        item.crmResult.toLowerCase().includes(q) ||
        item.createdAt.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [enquiries, statusFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredEnquiries.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEnquiries = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredEnquiries.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEnquiries, validCurrentPage, itemsPerPage]);

  // Change enquiry status
  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const getStatusBadgeStyle = (status: EnquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-sky-50 text-sky-700 border-sky-200 focus:ring-sky-300";
      case "Contacted":
        return "bg-amber-50 text-amber-800 border-amber-200 focus:ring-amber-300";
      case "Closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-screen text-text-primary">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage prospective student enquiries, review CRM transmission status, and update progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface border border-border shadow-sm text-text-primary">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Total: {enquiries.length} Enquiries
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="inline-flex p-1 bg-background rounded-xl border border-border text-xs font-medium self-start overflow-x-auto max-w-full">
          {(["All", "New", "Contacted", "Closed"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? "bg-secondary text-white font-semibold shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span>{status}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === status
                    ? "bg-white/20 text-white"
                    : "bg-surface border border-border text-text-secondary"
                }`}
              >
                {counts[status]}
              </span>
            </button>
          ))}
        </div>

        {/* Search input & items per page */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search parent, student..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-text-primary text-xs placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:bg-surface transition-all"
            />
          </div>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-1.5 px-2.5 rounded-xl border border-border bg-background text-text-primary text-xs focus:outline-none focus:border-primary transition-all cursor-pointer"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-background/60 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                <th className="py-3 px-6">Parent</th>
                <th className="py-3 px-6">Student</th>
                <th className="py-3 px-6">Class</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">CRM Result</th>
                <th className="py-3 px-6">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginatedEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text-secondary text-sm">
                    No enquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="hover:bg-background/50 transition-colors cursor-pointer"
                    title="Click row to view details"
                  >
                    {/* Parent */}
                    <td className="py-4 px-6 font-semibold text-text-primary">
                      {enquiry.parent}
                    </td>

                    {/* Student */}
                    <td className="py-4 px-6 text-text-primary">
                      {enquiry.student}
                    </td>

                    {/* Class */}
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary/10 text-secondary border border-secondary/15">
                        {enquiry.class}
                      </span>
                    </td>

                    {/* Status with Change Option */}
                    <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <select
                          value={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              enquiry.id,
                              e.target.value as EnquiryStatus
                            )
                          }
                          aria-label={`Change status for ${enquiry.student}`}
                          className={`text-xs font-semibold py-1 px-2.5 rounded-lg border appearance-none pr-6 cursor-pointer focus:outline-none focus:ring-2 transition-all ${getStatusBadgeStyle(
                            enquiry.status
                          )}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-current opacity-70">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </div>
                    </td>

                    {/* CRM Result (● Sent / ● Failed) */}
                    <td className="py-4 px-6">
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

                    {/* Created At */}
                    <td className="py-4 px-6 text-xs text-text-secondary font-medium">
                      {enquiry.createdAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="py-3.5 px-6 border-t border-border bg-background/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-secondary">
          <div>
            Showing{" "}
            <span className="font-semibold text-text-primary">
              {filteredEnquiries.length === 0
                ? 0
                : (validCurrentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-text-primary">
              {Math.min(validCurrentPage * itemsPerPage, filteredEnquiries.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-text-primary">
              {filteredEnquiries.length}
            </span>{" "}
            results
          </div>

          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-border bg-surface text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background transition-colors cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  validCurrentPage === pageNum
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "border border-border bg-surface text-text-secondary hover:text-text-primary hover:bg-background"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-border bg-surface text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Row Click Detail Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <h2 className="text-base font-bold text-text-primary">
                  Enquiry Details
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  {selectedEnquiry.student} ({selectedEnquiry.class}) — Parent: {selectedEnquiry.parent}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-background/60 p-3 rounded-xl border border-border">
              <div>
                <span className="text-text-secondary font-medium">Status:</span>
                <p className="font-semibold text-text-primary mt-0.5">{selectedEnquiry.status}</p>
              </div>
              <div>
                <span className="text-text-secondary font-medium">CRM Result:</span>
                <p className="font-semibold text-text-primary mt-0.5">● {selectedEnquiry.crmResult}</p>
              </div>
              <div>
                <span className="text-text-secondary font-medium">Mobile:</span>
                <p className="font-semibold text-text-primary mt-0.5">{selectedEnquiry.mobile || "N/A"}</p>
              </div>
              <div>
                <span className="text-text-secondary font-medium">Email:</span>
                <p className="font-semibold text-text-primary mt-0.5">{selectedEnquiry.email || "N/A"}</p>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div>
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-1.5">
                  Inquiry Message
                </span>
                <div className="p-3.5 rounded-xl border border-border bg-background text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-secondary text-white hover:opacity-90 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
