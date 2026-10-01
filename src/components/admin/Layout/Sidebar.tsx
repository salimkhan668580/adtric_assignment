"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthTokenCookie } from "@/src/lib/authCookie";

interface NavItem {
    name: string;
    href: string;
    badge?: string;
    badgeColor?: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
            </svg>
        ),
    },
    {
        name: "Manage Enquiry",
        href: "/admin/enquiries",
        badgeColor: "bg-amber-100 text-amber-800",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
            </svg>
        ),
    },
    {
        name: "Events and News",
        href: "/admin/news-events",
        badgeColor: "bg-pink-100 text-primary-dark",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const checkIsActive = (href: string) => {
        if (href === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(href);
    };

    return (
        <aside className="w-64 h-screen sticky top-0 bg-surface border-r border-border flex flex-col justify-between shrink-0 select-none overflow-y-auto">
            <div>
                {/* Brand / Logo Section */}
                <div className="h-16 px-6 border-b border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-text-primary tracking-tight leading-none">
                            Adtric Admin
                        </h1>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-text-secondary">
                            Management Portal
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary/80 px-3 mb-2">
                        Main Menu
                    </div>
                    <nav className="space-y-1.5">
                        {navItems.map((item) => {
                            const active = checkIsActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                        ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-md shadow-primary/20 font-semibold"
                                        : "text-text-secondary hover:text-text-primary hover:bg-background"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`transition-transform duration-200 ${active ? "text-white" : "text-text-secondary group-hover:text-primary group-hover:scale-110"
                                                }`}
                                        >
                                            {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                    </div>


                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* User profile / Logout bottom footer */}
            <div className="p-4 border-t border-border bg-background/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center shadow-sm">
                            AD
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">Admin User</p>
                            <p className="text-[11px] text-text-secondary truncate">admin@adtric.com</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowLogoutModal(true)}
                        title="Sign out"
                        aria-label="Sign out"
                        className="p-1.5 rounded-lg text-text-secondary hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Modal rendered into document.body to avoid stacking context traps */}
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
                                    Are you sure you want to sign out? You will be redirected to the admin login page.
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
                                        localStorage.clear();
                                        clearAuthTokenCookie();
                                        router.push("/admin/login");
                                    }}
                                    className="py-2.5 px-4 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </aside>
    );
}