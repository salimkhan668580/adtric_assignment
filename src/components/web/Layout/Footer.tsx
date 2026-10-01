"use client";

import React, { useState } from "react";
import Link from "next/link";
import CommingSoon from "../CommingSoon";

export default function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("Feature Coming Soon");

  const handleOpenComingSoon = (e: React.MouseEvent, title?: string) => {
    e.preventDefault();
    setComingSoonTitle(title || "Feature Coming Soon");
    setShowComingSoon(true);
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <footer className="w-full bg-[#002855] text-white relative overflow-hidden font-sans">
        {/* Subtle geometric watermark curves & background accents matching the design */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
          <svg
            className="absolute -right-20 -top-20 w-[600px] h-[600px] text-white/20"
            viewBox="0 0 500 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="100" y="50" width="360" height="420" rx="90" transform="rotate(25 280 260)" />
            <rect x="160" y="100" width="300" height="340" rx="70" transform="rotate(25 310 270)" />
            <circle cx="400" cy="400" r="160" strokeDasharray="6 6" />
          </svg>
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#0070ba]/20 rounded-full blur-3xl" />
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12">
            
            {/* Column 1: Brand & Logo */}
            <div className="space-y-4">
              <Link href="/web" className="inline-block group">
                <div className="flex flex-col items-start">
                  {/* Origami bird & colorful swirl rings */}
                  <div className="relative w-20 h-16 mb-2">
                    {/* Origami flying bird */}
                    <svg
                      className="absolute top-0 right-2 w-9 h-9 text-[#00c2cb] transform group-hover:-translate-y-1 transition-transform duration-300"
                      viewBox="0 0 40 40"
                      fill="currentColor"
                    >
                      <path d="M6 24 L22 3 L36 12 L24 20 L38 18 L14 36 L18 22 Z" />
                    </svg>

                    {/* Dynamic swirling rings */}
                    <div className="absolute bottom-1 left-2 w-14 h-8">
                      <svg className="w-full h-full" viewBox="0 0 70 40" fill="none">
                        <ellipse cx="35" cy="18" rx="28" ry="7" stroke="#e11d48" strokeWidth="2.5" />
                        <ellipse cx="35" cy="24" rx="24" ry="6" stroke="#a855f7" strokeWidth="2" />
                        <ellipse cx="35" cy="30" rx="20" ry="5" stroke="#00c2cb" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Logo Text Typography */}
                  <div className="leading-tight tracking-tight">
                    <span className="block text-xl font-bold tracking-wider font-serif uppercase text-white">
                      The
                    </span>
                    <span className="block text-2xl font-black tracking-tight font-serif uppercase text-white -mt-1">
                      Manthan
                    </span>
                    <span className="block text-2xl font-black tracking-widest font-serif uppercase text-white -mt-1">
                      School
                    </span>
                  </div>

                  {/* Tagline */}
                  <span className="block text-sm italic font-serif text-white/90 tracking-wide mt-1">
                    get. set. know. fly
                  </span>

                  {/* Mahagun Initiative */}
                  <span className="block text-[9px] font-bold tracking-[0.25em] uppercase text-white/80 border-t border-white/30 pt-1 mt-1.5 w-full">
                    A Mahagun Initiative
                  </span>
                </div>
              </Link>
            </div>

            {/* Column 2: Academics / Wings */}
            <div>
              <ul className="space-y-2.5 text-[13px] text-white/90 font-normal">
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Toddlers, Cuddle Bugs Wing")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Toddlers, Cuddle Bugs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Pre-Nursery, Hatchlings Wing")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Pre-Nursery, Hatchlings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Nursery, Nestlings Wing")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Nursery, Nestlings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Kindergarten, Fledglings")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Kindergarten, Fledglings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Grades 1 and 2 Curriculum")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Grades 1 and 2
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Curriculum and Pedagogy")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Curriculum and Pedagogy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "A Day at Manthan")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    A Day at Manthan
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Beyond Academics")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Beyond Academics
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Admissions */}
            <div>
              <ul className="space-y-2.5 text-[13px] text-white/90 font-normal">
                <li>
                  <button
                    type="button"
                    onClick={(e) => scrollToSection("enquiry", e)}
                    className="hover:text-cyan-300 transition-colors text-left font-medium"
                  >
                    Admissions 2027-28
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Admission Process and Age Criteria")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Admission Process and Age Criteria
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Fee Structure")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Fee Structure
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => scrollToSection("enquiry", e)}
                    className="hover:text-cyan-300 transition-colors text-left font-medium"
                  >
                    Online Registration
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Admission FAQs")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Admission FAQs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Download Brochure")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Download Brochure
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => scrollToSection("enquiry", e)}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Contact and Book a Visit
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Parent & Community Links */}
            <div>
              <ul className="space-y-2.5 text-[13px] text-white/90 font-normal">
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Parent Login Portal")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Parent Login
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Pay Fees Online")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Pay Fees
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Parents ERP")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Parents ERP
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Safety, Hygiene and Child Care")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Safety, Hygiene and Child Care
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Transport and Timings")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Transport and Timings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Student Corner")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Student Corner
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "Parent FAQs and Answer Hub")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Parent FAQs and Answer Hub
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => scrollToSection("news-events", e)}
                    className="hover:text-cyan-300 transition-colors text-left font-medium"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => scrollToSection("news-events", e)}
                    className="hover:text-cyan-300 transition-colors text-left font-medium"
                  >
                    Events and Competitions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => handleOpenComingSoon(e, "School Blog")}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Contact & Visit CTA */}
            <div className="space-y-4">
              <div className="space-y-1.5 text-[13px] text-white/90">
                <p>
                  Front office{" "}
                  <a href="tel:0120-4984255" className="hover:text-cyan-300 transition-colors">
                    0120-4984255
                  </a>
                </p>
                <p>
                  Admissions{" "}
                  <a href="tel:+919643304760" className="hover:text-cyan-300 transition-colors">
                    +91 96433 04760
                  </a>
                </p>
                <p>
                  <a href="mailto:info@manthan.edu.in" className="hover:text-cyan-300 transition-colors">
                    info@manthan.edu.in
                  </a>
                </p>
                <p>
                  <a href="mailto:admission@manthan.edu.in" className="hover:text-cyan-300 transition-colors">
                    admission@manthan.edu.in
                  </a>
                </p>
              </div>

              {/* Book a campus visit button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => scrollToSection("enquiry", e)}
                  className="w-full sm:w-auto inline-block text-center px-6 py-2.5 bg-white text-[#002855] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-slate-100 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                >
                  Book a Campus Visit
                </button>
              </div>
            </div>

          </div>

          {/* Center Campus Link Strip */}
          <div className="text-center py-5 border-t border-white/10">
            <p className="text-xs sm:text-[13px] text-white/90">
              Looking for Grades 3 to 12?{" "}
              <button
                type="button"
                onClick={(e) => handleOpenComingSoon(e, "Greater Noida West Campus")}
                className="text-[#00c2cb] hover:text-cyan-200 underline font-medium cursor-pointer transition-colors"
              >
                Visit our Greater Noida West campus
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="w-full border-t border-white/10 bg-[#001f42]/60 py-4 px-4 sm:px-6 lg:px-8 relative z-10 text-[11px] sm:text-xs text-white/80">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1">
              <button
                type="button"
                onClick={(e) => handleOpenComingSoon(e, "Mandatory Public Disclosure")}
                className="hover:text-white transition-colors"
              >
                Mandatory Public Disclosure
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={(e) => handleOpenComingSoon(e, "Careers")}
                className="hover:text-white transition-colors"
              >
                Careers
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={(e) => handleOpenComingSoon(e, "Privacy Policy")}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={(e) => handleOpenComingSoon(e, "Terms of Use")}
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </button>
              <span className="text-white/40">|</span>
              <button
                type="button"
                onClick={(e) => handleOpenComingSoon(e, "Sitemap")}
                className="hover:text-white transition-colors"
              >
                Sitemap
              </button>
            </div>

            {/* Copyright & Credit */}
            <div className="text-white/80">
              © {new Date().getFullYear()} The Manthan School. Designed and developed by{" "}
              <span className="font-bold text-white">Adtric</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Modal */}
        <CommingSoon
          isOpen={showComingSoon}
          onClose={() => setShowComingSoon(false)}
          title={comingSoonTitle}
        />
      </footer>

      {/* Floating Action Buttons (Bottom Right): Chat Bubble and WhatsApp */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        {/* Support Chat Bubble Icon */}
        <button
          type="button"
          onClick={(e) => handleOpenComingSoon(e, "Live Support Chat")}
          aria-label="Support Chat"
          className="w-12 h-12 rounded-full bg-[#002447] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#003366] transition-all duration-200 cursor-pointer border border-white/20"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.141 2 11.25c0 2.923 1.488 5.535 3.818 7.202-.178 1.464-.813 3.013-1.848 4.195a.5.5 0 00.573.79c2.316-.948 4.167-2.127 5.253-2.909.704.14 1.44.222 2.204.222 5.523 0 10-4.141 10-9.25S17.523 2 12 2zm-4 10a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
          </svg>
        </button>

        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/919643304760"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:brightness-105 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>
    </>
  );
}


