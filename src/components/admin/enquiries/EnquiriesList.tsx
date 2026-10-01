"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import enquiryService, { ApiEnquiry } from "@/src/service/adminService/enquiry.service";

export type EnquiryStatus = "New" | "Contacted" | "Closed";
export type CrmResult = "Sent" | "Failed" | "Pending";

export interface Enquiry {
  id: string;
  parent: string;
  student: string;
  class: string;
  status: EnquiryStatus;
  crmResult?: CrmResult;
  createdAt: string;
  mobile?: string;
  email?: string;
  message?: string;
}

function capitalize(value?: string): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function formatCreatedAt(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function toEnquiry(e: ApiEnquiry): Enquiry {
  const status = capitalize(e.status) as EnquiryStatus;
  const crm = capitalize(e.crmResult ?? e.crmStatus) as CrmResult;
  return {
    id: e._id ?? e.id ?? `${e.mobile}-${e.createdAt}`,
    parent: e.parentName,
    student: e.studentName,
    class: e.classApplyingFor,
    status: ["New", "Contacted", "Closed"].includes(status) ? status : "New",
    crmResult: ["Sent", "Failed", "Pending"].includes(crm) ? crm : undefined,
    createdAt: formatCreatedAt(e.createdAt),
    mobile: e.mobile,
    email: e.email,
    message: e.message,
  };
}

export default function EnquiriesList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const [updatingStatusIds, setUpdatingStatusIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const requestKey = JSON.stringify([currentPage, itemsPerPage, debouncedSearch, reloadToken]);
  const isLoading = loadedKey !== requestKey;

  useEffect(() => {
    let cancelled = false;

    enquiryService
      .getEnquiries({ page: currentPage, limit: itemsPerPage, search: debouncedSearch })
      .then((res) => {
        if (cancelled) return;
        setEnquiries(res.enquiries.map(toEnquiry));
        setTotalItems(res.total);
        setTotalPages(Math.max(1, res.totalPages));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setEnquiries([]);
        setTotalItems(0);
        setTotalPages(1);
        toast.error(err instanceof Error ? err.message : "Failed to load enquiries.");
      })
      .finally(() => {
        if (!cancelled) setLoadedKey(requestKey);
      });

    return () => {
      cancelled = true;
    };
  }, [requestKey, currentPage, itemsPerPage, debouncedSearch]);

  const validCurrentPage = Math.min(currentPage, totalPages);
  const paginatedEnquiries = enquiries;

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const response = await enquiryService.deleteEnquiry(deleteTarget.id);
      toast.success(response?.message || "Enquiry deleted successfully!");
      setDeleteTarget(null);
      if (selectedEnquiry?.id === deleteTarget.id) setSelectedEnquiry(null);
      if (enquiries.length === 1 && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else {
        setReloadToken((t) => t + 1);
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to delete enquiry.");
    } finally {
      setIsDeleting(false);
    }
  };

  const applyStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setSelectedEnquiry((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    const previous = enquiries.find((e) => e.id === id)?.status;
    if (!previous || previous === newStatus) return;

    applyStatus(id, newStatus);
    setUpdatingStatusIds((prev) => new Set(prev).add(id));

    try {
      const response = await enquiryService.updateEnquiryStatus(
        id,
        newStatus.toLowerCase() as "new" | "contacted" | "closed"
      );
      toast.success(response?.message || `Status updated to ${newStatus}.`);
    } catch (err: unknown) {
      applyStatus(id, previous);
      toast.error(err instanceof Error ? err.message : "Failed to update enquiry status.");
    } finally {
      setUpdatingStatusIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
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
            Total: {totalItems} Enquiries
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">


        {/* Search input & items per page */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
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
              placeholder="Search parent, student, class, mobile, email..."
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
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-secondary text-sm">
                    Loading enquiries...
                  </td>
                </tr>
              ) : paginatedEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-secondary text-sm">
                    No enquiries found matching your search.
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
                          disabled={updatingStatusIds.has(enquiry.id)}
                          onChange={(e) =>
                            handleStatusChange(
                              enquiry.id,
                              e.target.value as EnquiryStatus
                            )
                          }
                          aria-label={`Change status for ${enquiry.student}`}
                          className={`text-xs font-semibold py-1 px-2.5 rounded-lg border appearance-none pr-6 cursor-pointer focus:outline-none focus:ring-2 transition-all disabled:opacity-60 disabled:cursor-wait ${getStatusBadgeStyle(
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

                    {/* Created At */}
                    <td className="py-4 px-6 text-xs text-text-secondary font-medium">
                      {enquiry.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-secondary hover:bg-background border border-transparent hover:border-border transition-colors cursor-pointer"
                        title="View details"
                        aria-label={`View enquiry from ${enquiry.parent}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(enquiry)}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                        title="Delete enquiry"
                        aria-label={`Delete enquiry from ${enquiry.parent}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                      </div>
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
              {totalItems === 0
                ? 0
                : (validCurrentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-text-primary">
              {Math.min(validCurrentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-text-primary">
              {totalItems}
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => !isDeleting && setDeleteTarget(null)}
        >
          <div
            className="bg-surface border border-border rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-text-primary">Delete Enquiry?</h3>
              <p className="text-xs text-text-secondary mt-1">
                Are you sure you want to delete the enquiry from{" "}
                <span className="font-semibold text-text-primary">{deleteTarget.parent}</span> for{" "}
                <span className="font-semibold text-text-primary">{deleteTarget.student}</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="py-2 px-4 rounded-xl border border-border bg-surface text-text-secondary text-xs font-semibold hover:bg-background transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="py-2 px-4 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

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
                <p className="font-semibold text-text-primary mt-0.5">
                  {selectedEnquiry.crmResult ? `● ${selectedEnquiry.crmResult}` : "N/A"}
                </p>
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
