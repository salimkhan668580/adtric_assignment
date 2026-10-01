import type { NextFunction, Request, Response } from "express";
import adminService from "../services/admin.service.js";
import { verifyToken } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      admin?: { id: string; email: string };
    }
  }
}

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token is required" });
    }

    const token = authHeader.split(" ")[1];

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const admin = await adminService.findAdminById(payload.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = { id: admin._id.toString(), email: admin.email };
    next();
  } catch (error) {
    console.error("Auth failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
