import bcrypt from "bcryptjs";
import adminService from "../services/admin.service.js";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await adminService.findAdminByEmail("admin@gmail.com");

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await adminService.createAdmin({
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Default admin created successfully");
  } catch (error) {
    console.error("Admin seeding failed:", error);
  }
};
