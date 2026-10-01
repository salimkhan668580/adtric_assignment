"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToSection = (id: string, e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#001937] text-white/90 relative overflow-hidden border-t border-[#002b5c]">
      {/* Decorative ambient top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-96 h-28 blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 right-10 w-96 h-40 blur-3xl opacity-15"
        style={{ background: "radial-gradient(circle, #00aeef 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Introduction */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/web" className="flex items-center gap-3 group w-fit">
              {/* Logo Icon Mark (Origami Bird + Rings) */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg
                  className="absolute -top-1 right-0 w-8 h-8 text-[#00aeef] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  viewBox="0 0 40 40"
                  fill="currentColor"
                >
                  <path d="M12 28 L28 4 L34 14 L24 22 L38 20 L16 36 L20 25 Z" />
                </svg>
                <svg
                  className="absolute bottom-0 left-0 w-8 h-8 text-primary"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <ellipse cx="20" cy="22" rx="14" ry="4" stroke="currentColor" />
                  <ellipse cx="20" cy="26" rx="11" ry="3.5" stroke="#9333ea" />
                  <ellipse cx="20" cy="30" rx="8" ry="3" stroke="#00aeef" />
                </svg>
              </div>

              {/* Logo Typography */}
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/80">
                  The
                </span>
                <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-serif">
                  Manthan
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/80">
                  School
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              An institution dedicated to nurturing holistic growth, academic distinction, and critical problem solving in a globally attuned environment.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link
                  href="/web#news-events"
                  onClick={(e) => scrollToSection("news-events", e)}
                  className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-primary font-bold">›</span> News & Events
                </Link>
              </li>
              <li>
                <Link
                  href="/web#enquiry"
                  onClick={(e) => scrollToSection("enquiry", e)}
                  className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-primary font-bold">›</span> Admission Enquiry
                </Link>
              </li>
              <li>
                <Link
                  href="/web/pay-fees"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="text-primary font-bold">›</span> Pay Fees Online
                </Link>
              </li>
              <li>
                <Link
                  href="/web/careers"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="text-primary font-bold">›</span> Work With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="text-primary font-bold">›</span> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academics */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Academics
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li className="flex items-center gap-1.5">
                <span className="text-accent-blue font-bold">●</span> Pre-Primary (Pre-Nur - KG)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-accent-blue font-bold">●</span> Primary Wing (Grade 1 - 5)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-accent-blue font-bold">●</span> Middle Wing (Grade 6 - 8)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-accent-blue font-bold">●</span> Senior Wing (Grade 9 - 12)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-accent-blue font-bold">●</span> STEM & Robotics Lab
              </li>
            </ul>
          </div>

          {/* Campus Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Campuses
            </h4>

            {/* Noida Campus */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Noida Campus (Sector 78)</span>
                <span className="text-[10px] font-semibold text-primary uppercase">Main Wing</span>
              </div>
              <p className="text-[11px] text-white/60">
                Sector 78, Noida, Gautam Buddha Nagar, UP 201301
              </p>
              <div className="pt-1 flex items-center gap-4 text-xs">
                <a href="tel:0120-7133925" className="text-primary hover:underline font-semibold">
                  Ph: 0120-7133925
                </a>
              </div>
            </div>

            {/* Greater Noida West Campus */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Greater Noida West Campus</span>
                <span className="text-[10px] font-semibold text-accent-blue uppercase">Sec 16B</span>
              </div>
              <p className="text-[11px] text-white/60">
                Plot No. GH-04, Sector 16B, Greater Noida West, UP 201306
              </p>
              <div className="pt-1 flex items-center gap-4 text-xs">
                <a href="tel:0120-7133926" className="text-accent-blue hover:underline font-semibold">
                  Ph: 0120-7133926
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} The Manthan School. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-primary hover:text-white transition-colors font-semibold cursor-pointer"
            >
              <span>Back to Top</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
