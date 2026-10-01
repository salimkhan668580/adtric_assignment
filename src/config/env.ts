import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

const required = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not defined in .env`);
  }
  return value;
};

const PORT = Number(process.env.PORT) || 5000;

export const env = {
  PORT,
  BASE_URL: process.env.BASE_URL || `http://localhost:${PORT}`,
  MONGO_URI: required("MONGO_URI"),
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  WEBHOOK_URL: process.env.WEBHOOK_URL,
};
