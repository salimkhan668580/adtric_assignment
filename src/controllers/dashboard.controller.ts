import type { Request, Response } from "express";
import dashboardService from "../services/dashboard.server.js";

const getDashboardStats = async (_req: Request, res: Response) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        return res.status(200).json({
            message: "Dashboard stats fetched successfully",
            stats,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default { getDashboardStats };
