"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("salim@gmail.com");
    const [password, setPassword] = useState("123456");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);

        try {
            // Simulate authentication request
            await new Promise((resolve) => setTimeout(resolve, 800));
            // Navigate to admin dashboard after successful authentication
            router.push("/admin");
        } catch {
            setError("Invalid credentials. Please verify your details and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background overflow-hidden">
            {/* Ambient background decoration */}
            <div
                className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20"
                style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
            />
            <div
                className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-25"
                style={{ background: "radial-gradient(circle, var(--secondary) 0%, var(--accent-blue) 100%)" }}
            />
            <div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[140px] opacity-10"
                style={{ background: "var(--accent-yellow)" }}
            />

            {/* Main card */}
            <div className="relative w-full max-w-md">
                {/* Top colored accent line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent-blue to-secondary rounded-t-2xl" />

                <div className="bg-surface border border-border border-t-0 rounded-b-2xl shadow-xl shadow-secondary/5 p-6 sm:p-8 backdrop-blur-sm">
                    {/* Logo / Brand Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-lg shadow-secondary/20 mb-4 transition-transform hover:scale-105 duration-300">
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                            Admin Portal
                        </h1>
                        <p className="mt-1.5 text-sm text-text-secondary">
                            Welcome back! Please enter your details to sign in.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div
                            role="alert"
                            className="mb-5 flex items-center gap-2.5 p-3.5 text-sm rounded-xl bg-red-50 border border-red-200 text-red-700 animate-in fade-in duration-200"
                        >
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="admin-email"
                                className="block text-xs font-semibold uppercase tracking-wider text-text-primary mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.75}
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="admin-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="admin-password"
                                    className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
                                >
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.75}
                                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.75}
                                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.75}
                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.75}
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-[#ed0a8c] cursor-pointer"
                                />
                                <span className="text-sm text-text-secondary">Keep me signed in</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative py-3 px-4 rounded-xl font-semibold text-sm text-white shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-primary-dark hover:opacity-95 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer note */}
                    <div className="mt-8 pt-5 border-t border-border flex items-center justify-center gap-2 text-xs text-text-secondary">
                        <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                        </svg>
                        <span>Secured with end-to-end encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );
}