import { Admin } from "../models/admin.js";

const findAdminByEmail = async (email: string) => {
  return Admin.findOne({ email });
};

const findAdminById = async (id: string) => {
  return Admin.findById(id).select("-password");
};

const createAdmin = async (data: { email: string; password: string }) => {
  return Admin.create(data);
};

export default { findAdminByEmail, findAdminById, createAdmin };
