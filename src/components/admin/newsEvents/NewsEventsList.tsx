"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  NewsCategory,
  NewsEventItem,
  getStoredNewsEvents,
  saveStoredNewsEvents,
} from "./types";

export default function NewsEventsList() {
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [publishedFilter, setPublishedFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<NewsEventItem | null>(null);

  useEffect(() => {
    setItems(getStoredNewsEvents());
  }, []);

  const handleTogglePublished = (id: string) => {
    const updated = items.map((it) =>
      it.id === id ? { ...it, published: !it.published } : it
    );
    setItems(updated);
    saveStoredNewsEvents(updated);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    saveStoredNewsEvents(updated);
    setDeleteConfirmId(null);
  };

  // Filtered
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      const matchesPublished =
        publishedFilter === "All"
          ? true
          : publishedFilter === "Published"
          ? item.published
          : !item.published;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);

      return matchesCategory && matchesPublished && matchesSearch;
    });
  }, [items, categoryFilter, publishedFilter, searchQuery]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (validCurrentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, validCurrentPage, itemsPerPage]);

  const getCategoryBadge = (cat: NewsCategory) => {
    switch (cat) {
      case "Event":
        return "bg-pink-50 text-primary border-pink-200";
      case "News":
        return "bg-sky-50 text-secondary border-sky-200";
      case "Achievement":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-screen text-text-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Events and News
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Publish school events, press announcements, and student achievements.
          </p>
        </div>

        <Link
          href="/admin/news-events/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark hover:opacity-95 shadow-md shadow-primary/25 transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add News / Event</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="inline-flex p-1 bg-background rounded-xl border border-border text-xs font-medium overflow-x-auto max-w-full">
          {(["All", "Event", "News", "Achievement"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? "bg-secondary text-white font-semibold shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Published filter */}
          <select
            value={publishedFilter}
            onChange={(e) => {
              setPublishedFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="py-1.5 px-3 rounded-xl border border-border bg-background text-text-primary text-xs focus:outline-none focus:border-primary transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published Only</option>
            <option value="Draft">Drafts Only</option>
          </select>

          {/* Search */}
          <div className="relative w-full sm:w-60">
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
              placeholder="Search title, slug..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-text-primary text-xs placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:bg-surface transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-background/60 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                <th className="py-3 px-5">Cover</th>
                <th className="py-3 px-5">Title & Slug</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Published</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text-secondary text-sm">
                    No news or events found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-background/50 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="py-3.5 px-5">
                      <div className="w-14 h-11 rounded-lg overflow-hidden border border-border bg-background shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="py-3.5 px-5 max-w-md">
                      <div className="font-semibold text-text-primary truncate block text-sm hover:text-primary transition-colors cursor-pointer" onClick={() => setPreviewItem(item)}>
                        {item.title}
                      </div>
                      <div className="text-[11px] font-mono text-text-secondary truncate mt-0.5">
                        /{item.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-5 text-xs text-text-secondary font-medium">
                      {item.date}
                    </td>

                    {/* Published (yes/no toggle) */}
                    <td className="py-3.5 px-5">
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(item.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                          item.published
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                        title="Click to toggle publish status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.published ? "bg-emerald-500" : "bg-gray-400"}`} />
                        <span>{item.published ? "Yes (Published)" : "No (Draft)"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => setPreviewItem(item)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background border border-transparent hover:border-border transition-colors cursor-pointer"
                          title="Preview item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </button>

                        {/* Edit */}
                        <Link
                          href={`/admin/news-events/${item.id}`}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-secondary hover:bg-background border border-transparent hover:border-border transition-colors"
                          title="Edit news/event"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg text-text-secondary hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                          title="Delete news/event"
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
        <div className="py-3.5 px-5 border-t border-border bg-background/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-secondary">
          <div>
            Showing <span className="font-semibold text-text-primary">{filtered.length === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-text-primary">{Math.min(validCurrentPage * itemsPerPage, filtered.length)}</span> of{" "}
            <span className="font-semibold text-text-primary">{filtered.length}</span> items
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
      {deleteConfirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setDeleteConfirmId(null)}
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
              <h3 className="text-base font-bold text-text-primary">Delete News / Event?</h3>
              <p className="text-xs text-text-secondary mt-1">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="py-2 px-4 rounded-xl border border-border bg-surface text-text-secondary text-xs font-semibold hover:bg-background transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="py-2 px-4 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-surface border border-border rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 w-full bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewItem.imageUrl}
                alt={previewItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getCategoryBadge(previewItem.category)}`}>
                  {previewItem.category}
                </span>
                <span className="text-xs text-text-secondary font-medium">
                  {previewItem.date}
                </span>
                <span className={`ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  previewItem.published
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}>
                  {previewItem.published ? "Published" : "Draft"}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {previewItem.title}
                </h2>
                <p className="text-xs font-mono text-secondary mt-1">
                  /{previewItem.slug}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-background border border-border text-xs text-text-secondary italic">
                {previewItem.shortDescription}
              </div>

              <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {previewItem.content}
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <Link
                  href={`/admin/news-events/${previewItem.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-secondary text-white hover:opacity-90 transition-all"
                >
                  Edit Item
                </Link>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-border bg-surface text-text-secondary hover:bg-background transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
