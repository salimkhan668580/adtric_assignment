"use client";

import React, { useState, useEffect } from "react";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show the modal 2 seconds after the user arrives on /web
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleScrollTo = (id: string) => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Dimmed Backdrop with Blur */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#001937]/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 transition-all duration-300 transform ${
          isClosing ? "scale-95 translate-y-2 opacity-0" : "scale-100 translate-y-0 opacity-100"
        }`}
      >
        {/* Top Decorative Banner with Brand Header */}
        <div className="relative bg-gradient-to-r from-[#002855] via-[#003975] to-[#005299] px-6 pt-8 pb-6 text-white text-center">
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close welcome modal"
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Glowing Badge & Bird Icon */}
          <div className="mx-auto mb-3 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
            <svg className="w-8 h-8 text-[#00c2cb]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M6 24 L22 3 L36 12 L24 20 L38 18 L14 36 L18 22 Z" />
            </svg>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-white">
            The Manthan School
          </h3>
          <p className="text-xs text-cyan-200 uppercase tracking-widest font-semibold mt-0.5">
            get. set. know. fly
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 text-center">
          {/* Main Thank You Message */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
            <span>✨</span>
            <span>Warm Welcome</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold text-[#002855] tracking-tight">
            Thank you for visiting!
          </h4>

          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            As per the task requirements, we have specifically built two modules:{" "}
            <span className="font-bold text-[#002855]">News &amp; Events</span> and{" "}
            <span className="font-bold text-primary">Admission Enquiry</span>.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleScrollTo("enquiry")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm uppercase tracking-wide shadow-md shadow-primary/20 hover:bg-[#d94820] hover:shadow-lg transition-all duration-150 cursor-pointer active:scale-95"
            >
              <span>Admission Enquiry</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScrollTo("news-events")}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#002855] text-white font-bold text-xs sm:text-sm uppercase tracking-wide hover:bg-[#003975] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <span>Explore Events</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Dismiss Link */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              Continue exploring site →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
