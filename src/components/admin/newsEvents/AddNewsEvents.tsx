"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  NewsCategory,
  NewsEventItem,
  generateSlug,
  getStoredNewsEvents,
  saveStoredNewsEvents,
} from "./types";

export default function AddNewsEvents() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState<NewsCategory>("Event");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<string | null>(null);
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManuallyEdited) {
      const stored = getStoredNewsEvents();
      const existingSlugs = stored.map((item) => item.slug);
      const generated = generateSlug(newTitle, existingSlugs);
      setSlug(generated);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setSlug(e.target.value.toLowerCase().trim().replace(/[\s_-]+/g, "-"));
  };

  // Image upload handler with validation (JPG, PNG, WebP, max 2MB)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Please upload a valid JPG, PNG, or WebP image.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setImageError("Image file size exceeds the 2 MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }

    if (!slug.trim()) {
      setFormError("Slug is required.");
      return;
    }

    if (!imagePreview) {
      setFormError("Please upload a cover image (max 2 MB, JPG/PNG/WebP).");
      return;
    }

    if (!shortDescription.trim()) {
      setFormError("Short description is required.");
      return;
    }

    if (!content.trim()) {
      setFormError("Article content is required.");
      return;
    }

    setIsSubmitting(true);

    const stored = getStoredNewsEvents();
    const existingSlugs = stored.map((s) => s.slug);

    // Ensure unique slug
    const finalSlug = generateSlug(slug || title, existingSlugs);

    const newItem: NewsEventItem = {
      id: "ne-" + Date.now(),
      title: title.trim(),
      slug: finalSlug,
      category,
      date,
      imageUrl: imagePreview,
      shortDescription: shortDescription.trim(),
      content: content.trim(),
      published,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
    };

    saveStoredNewsEvents([newItem, ...stored]);
    router.push("/admin/news-events");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
            <Link href="/admin/news-events" className="hover:text-primary transition-colors">
              Events & News
            </Link>
            <span>/</span>
            <span className="text-text-primary font-medium">Add New</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Create News / Event
          </h1>
        </div>

        <Link
          href="/admin/news-events"
          className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary rounded-xl border border-border bg-surface hover:bg-background transition-all"
        >
          Cancel
        </Link>
      </div>

      {formError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{formError}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-6">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="ne-title" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
              Title <span className="text-primary">*</span>
            </label>
            <input
              id="ne-title"
              type="text"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="e.g. Annual Sports Day 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="ne-slug" className="block text-xs font-semibold uppercase tracking-wider text-text-primary">
                Slug <span className="text-primary">*</span>
              </label>
              <span className="text-[11px] text-text-secondary">Auto-generated</span>
            </div>
            <input
              id="ne-slug"
              type="text"
              required
              value={slug}
              onChange={handleSlugChange}
              placeholder="annual-sports-day-2026"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary text-sm font-mono focus:outline-none focus:border-primary focus:bg-surface transition-all"
            />
          </div>
        </div>

        {/* Category, Date & Published */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Category */}
          <div>
            <label htmlFor="ne-category" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
              Category <span className="text-primary">*</span>
            </label>
            <select
              id="ne-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as NewsCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-text-primary text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all cursor-pointer"
            >
              <option value="News">News</option>
              <option value="Event">Event</option>
              <option value="Achievement">Achievement</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="ne-date" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
              Date <span className="text-primary">*</span>
            </label>
            <input
              id="ne-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-text-primary text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all cursor-pointer"
            />
          </div>

          {/* Published Toggle (yes/no) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
              Published Status <span className="text-primary">*</span>
            </label>
            <div className="flex items-center gap-3 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="published"
                  checked={published === true}
                  onChange={() => setPublished(true)}
                  className="accent-[#ed0a8c] cursor-pointer"
                />
                <span className="text-sm font-medium text-text-primary">Yes (Published)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="published"
                  checked={published === false}
                  onChange={() => setPublished(false)}
                  className="accent-[#ed0a8c] cursor-pointer"
                />
                <span className="text-sm font-medium text-text-secondary">No (Draft)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Cover Image Upload (JPG, PNG, WebP, max 2 MB) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
            Cover Image <span className="text-primary">*</span> (JPG, PNG or WebP, max 2 MB)
          </label>

          {imagePreview ? (
            <div className="relative rounded-2xl border border-border overflow-hidden bg-background max-w-md group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 rounded-xl bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                title="Remove image"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors bg-background/50">
              <input
                id="ne-image-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="ne-image-input"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <div className="text-xs font-semibold text-text-primary">
                  Click to upload or drag image here
                </div>
                <p className="text-[11px] text-text-secondary">
                  Supported formats: JPG, PNG, WebP (Max file size: 2 MB)
                </p>
              </label>
            </div>
          )}

          {imageError && (
            <p className="mt-2 text-xs font-medium text-rose-600 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{imageError}</span>
            </p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="ne-short" className="block text-xs font-semibold uppercase tracking-wider text-text-primary">
              Short Description <span className="text-primary">*</span>
            </label>
            <span className="text-[11px] text-text-secondary">
              {shortDescription.length} / 180 characters
            </span>
          </div>
          <textarea
            id="ne-short"
            rows={2}
            required
            maxLength={220}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="A brief 1-2 sentence teaser summary of the event or announcement..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-text-primary text-sm focus:outline-none focus:border-primary focus:bg-surface transition-all resize-none"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="ne-content" className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2">
            Detailed Content <span className="text-primary">*</span>
          </label>
          <textarea
            id="ne-content"
            rows={6}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write full article content, event schedules, rules, or announcements here..."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-text-primary text-sm leading-relaxed focus:outline-none focus:border-primary focus:bg-surface transition-all"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <Link
            href="/admin/news-events"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary border border-border bg-surface hover:bg-background transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-dark hover:opacity-95 shadow-md shadow-primary/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save News / Event</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
