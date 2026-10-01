import React from "react";
import DashboardStats from "./DashboardStats";
import RecentEnquiries from "./RecentEnquiries";

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Dashboard</h1>
      </div>

      <DashboardStats />

      <RecentEnquiries />
    </div>
  );
}
