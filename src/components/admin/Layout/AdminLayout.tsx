"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { setAuthTokenCookie } from "@/src/lib/authCookie";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminUser");
      router.replace("/admin/login");
    } else {
      setAuthTokenCookie(token);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background gap-3">
        <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm font-medium text-text-secondary">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}