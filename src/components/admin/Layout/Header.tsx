"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 w-full bg-surface border-b border-border px-6 flex items-center justify-between sticky top-0 z-10 select-none">
      <div />

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* User Profile Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-background border border-transparent hover:border-border transition-all cursor-pointer"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {/* User Icon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-primary text-white flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>

            {/* Name */}
            <span className="text-sm font-semibold text-text-primary">Admin</span>

            {/* Chevron */}
            <svg
              className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-surface border border-border shadow-xl py-1.5 z-20 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-border/60">
                <p className="text-xs font-semibold text-text-primary">Signed in as</p>
                <p className="text-xs text-text-secondary truncate mt-0.5">admin</p>
              </div>

              <div className="p-1">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          >
            <div
              className="bg-surface border border-border rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-base font-bold text-text-primary">Confirm Sign Out</h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Are you sure you want to log out of the admin panel?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-border bg-surface text-text-secondary text-xs font-semibold hover:bg-background transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLogoutModal(false);
                    router.push("/admin/login");
                  }}
                  className="py-2.5 px-4 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}