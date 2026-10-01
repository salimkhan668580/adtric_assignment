import { z } from "zod";
import { CRM_STATUSES, ENQUIRY_STATUSES } from "../models/enquiry.js";

const optionalText = (schema: z.ZodString) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional());

export const createEnquirySchema = z.object({
  parentName: z.string({ error: "Parent name is required" }).trim().min(1, "Parent name is required").max(100),
  studentName: z.string({ error: "Student name is required" }).trim().min(1, "Student name is required").max(100),
  classApplyingFor: z.string({ error: "Class applying for is required" }).trim().min(1, "Class applying for is required").max(50),
  mobile: z
    .string({ error: "Mobile is required" })
    .trim()
    .regex(/^\+?\d{10,15}$/, "Mobile must be 10 to 15 digits"),
  email: optionalText(z.string().trim().toLowerCase().email("Invalid email")),
  message: optionalText(z.string().trim().max(1000)),
});

const enquiryStatus = z.enum(ENQUIRY_STATUSES, { error: "Status must be new, contacted or closed" });

export const updateEnquiryStatusSchema = z.object({
  status: enquiryStatus,
});

export const getEnquiriesQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(["all", ...ENQUIRY_STATUSES]).default("all"),
  crmStatus: z.enum(["all", ...CRM_STATUSES]).default("all"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type GetEnquiriesQuery = z.infer<typeof getEnquiriesQuerySchema>;
