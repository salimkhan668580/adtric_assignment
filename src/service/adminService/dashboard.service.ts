import { api } from "@/src/helper/axiosIntecpter";
import { AxiosError } from "axios";

export interface EnquiryStats {
  total: number;
  new: number;
  contacted: number;
  closed: number;
}

export interface EventStats {
  total: number;
  published: number;
  draft: number;
}

export interface DashboardStats {
  enquiries: EnquiryStats;
  events: EventStats;
}

interface DashboardStatsResponse {
  message: string;
  stats: Partial<{ enquiries: Partial<EnquiryStats>; events: Partial<EventStats> }>;
}

class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const res = await api.get<DashboardStatsResponse>("/admin/dashboard-stats");
      const enquiries = res.stats?.enquiries ?? {};
      const events = res.stats?.events ?? {};

      return {
        enquiries: {
          total: enquiries.total ?? 0,
          new: enquiries.new ?? 0,
          contacted: enquiries.contacted ?? 0,
          closed: enquiries.closed ?? 0,
        },
        events: {
          total: events.total ?? 0,
          published: events.published ?? 0,
          draft: events.draft ?? 0,
        },
      };
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
      throw new Error(
        axiosErr?.response?.data?.message ||
          axiosErr?.response?.data?.error ||
          axiosErr?.message ||
          "Failed to load dashboard stats."
      );
    }
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
export { DashboardService };
