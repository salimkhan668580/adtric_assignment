"use client";

import React, { useState } from "react";
import Link from "next/link";
import CommingSoon from "../CommingSoon";

export default function Header() {
    const [selectedCampus, setSelectedCampus] = useState<"gnw" | "noida">("noida");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [comingSoonTitle, setComingSoonTitle] = useState("Feature Coming Soon");

    const handleOpenComingSoon = (e: React.MouseEvent, title?: string) => {
        e.preventDefault();
        setComingSoonTitle(title || "Feature Coming Soon");
        setShowComingSoon(true);
    };

    const scrollToEnquiry = (e: React.MouseEvent) => {
        const enquirySection = document.getElementById("enquiry");
        if (enquirySection) {
            e.preventDefault();
            enquirySection.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", "#enquiry");
        }
        setMobileMenuOpen(false);
    };

    const scrollToNewsEvents = (e: React.MouseEvent) => {
        const newsSection = document.getElementById("news-events");
        if (newsSection) {
            e.preventDefault();
            newsSection.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", "#news-events");
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: "News & Events", href: "/web#news-events", onClick: scrollToNewsEvents },
        { name: "Enquiry", href: "/web#enquiry", onClick: scrollToEnquiry },
    ];

    return (
        <header className="w-full select-none sticky top-0 z-40 bg-white">
            {/* 1. Top Bar (Dark Navy) */}
            <div className="bg-[#00234b] text-white text-xs px-4 sm:px-8 py-2">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
                    {/* Left: Campus Switcher Pill */}
                    <div className="flex items-center">
                        <div className="inline-flex items-center rounded-full border border-primary p-0.5 bg-black/20">
                            <button
                                type="button"
                                onClick={() => setSelectedCampus("gnw")}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${selectedCampus === "gnw"
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-white/80 hover:text-white"
                                    }`}
                            >
                                Greater Noida West
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedCampus("noida")}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${selectedCampus === "noida"
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-white/80 hover:text-white"
                                    }`}
                            >
                                Noida
                            </button>
                        </div>
                    </div>

                    {/* Right: Contact & Quick Links & Socials */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-medium tracking-wide">
                        {/* Phone */}
                        <a
                            href="tel:0120-7133925"
                            className="text-white/90 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            Front Office- <span className="font-semibold">0120-7133925</span>
                        </a>

                        {/* Pay Fees */}
                        <button
                            type="button"
                            onClick={(e) => handleOpenComingSoon(e, "Pay Fees Online")}
                            className="text-white/90 hover:text-accent-yellow font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                            Pay Fees
                        </button>

                        {/* Careers */}
                        <button
                            type="button"
                            onClick={(e) => handleOpenComingSoon(e, "Careers Portal")}
                            className="text-white/90 hover:text-accent-yellow font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                            Careers
                        </button>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            {/* Facebook */}
                            <button
                                type="button"
                                onClick={(e) => handleOpenComingSoon(e, "Facebook Page")}
                                aria-label="Facebook"
                                className="w-5 h-5 rounded-full bg-white text-[#00234b] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs cursor-pointer"
                            >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                                </svg>
                            </button>

                            {/* Instagram */}
                            <button
                                type="button"
                                onClick={(e) => handleOpenComingSoon(e, "Instagram Channel")}
                                aria-label="Instagram"
                                className="w-5 h-5 rounded-full bg-white text-[#00234b] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs cursor-pointer"
                            >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </button>

                            {/* YouTube */}
                            <button
                                type="button"
                                onClick={(e) => handleOpenComingSoon(e, "YouTube Channel")}
                                aria-label="YouTube"
                                className="w-5 h-5 rounded-full bg-white text-[#00234b] flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xs cursor-pointer"
                            >
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* 2. Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4 border-b border-gray-100">
                {/* Brand Logo: The Manthan School */}
                <Link href="/web" className="flex items-center gap-3 shrink-0 group">
                    {/* Logo Icon Mark (Bird + Swirl) */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Flying Origami Bird */}
                        <svg
                            className="absolute -top-1 right-0 w-8 h-8 text-[#00aeef] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            viewBox="0 0 40 40"
                            fill="currentColor"
                        >
                            <path d="M12 28 L28 4 L34 14 L24 22 L38 20 L16 36 L20 25 Z" />
                        </svg>
                        {/* Swirl / Ribbon */}
                        <svg
                            className="absolute bottom-0 left-0 w-8 h-8 text-primary"
                            viewBox="0 0 40 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <ellipse cx="20" cy="22" rx="14" ry="4" stroke="currentColor" />
                            <ellipse cx="20" cy="26" rx="11" ry="3.5" stroke="#9333ea" />
                            <ellipse cx="20" cy="30" rx="8" ry="3" stroke="#003b73" />
                        </svg>
                    </div>

                    {/* Logo Brand Typography */}
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00234b]">
                            The
                        </span>
                        <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#00234b] font-serif">
                            Manthan
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#00234b]">
                            School
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#1f2937]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={link.onClick}
                            className="hover:text-primary transition-colors py-1 relative group whitespace-nowrap cursor-pointer"
                        >
                            <span>{link.name}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Right CTA & Hamburger Button */}
                <div className="flex items-center gap-3">
                    {/* Enquire Now Button */}
                    <Link
                        href="/web#enquiry"
                        onClick={scrollToEnquiry}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-primary hover:bg-primary-dark shadow-md shadow-primary/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
                    >
                        <span>Enquire Now</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>

                    {/* Hamburger Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Navigation Menu"
                        className="w-10 h-10 rounded-xl bg-[#00234b] text-white flex flex-col items-center justify-center gap-1 hover:bg-[#003b73] transition-colors cursor-pointer shadow-sm"
                    >
                        <span className={`w-5 h-0.5 bg-white rounded-full transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                        <span className={`w-5 h-0.5 bg-white rounded-full transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`w-5 h-0.5 bg-white rounded-full transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile / Full Dropdown Menu (Opened via Hamburger) */}
            {mobileMenuOpen && (
                <div className="border-b border-border bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
                    <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={link.onClick}
                                    className="p-2.5 rounded-xl font-semibold text-sm text-[#1f2937] hover:text-primary hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                                >
                                    <span>{link.name}</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
                            <span className="font-medium">Selected Campus: {selectedCampus === "noida" ? "Noida" : "Greater Noida West"}</span>
                            <Link
                                href="/admin"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-semibold text-secondary hover:text-primary transition-colors underline"
                            >
                                Admin Portal Login →
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Coming Soon Modal */}
            <CommingSoon
                isOpen={showComingSoon}
                onClose={() => setShowComingSoon(false)}
                title={comingSoonTitle}
            />
        </header>
    );
}