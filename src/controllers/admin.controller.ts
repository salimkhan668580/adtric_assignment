import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import adminService from "../services/admin.service.js";
import { generateToken } from "../utils/jwt.js";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await adminService.findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { login };
