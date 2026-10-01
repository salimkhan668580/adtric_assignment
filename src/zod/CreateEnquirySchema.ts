import { z } from "zod";

export const createEnquirySchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(1, "Parent name is required")
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Parent name must be under 100 characters"),
  studentName: z
    .string()
    .trim()
    .min(1, "Student name is required")
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Student name must be under 100 characters"),
  classApplyingFor: z.string().min(1, "Please select the class applying for"),
  mobile: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z
    .string()
    .trim()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Please enter a valid email address"),
  message: z.string().trim().max(1000, "Message must be under 1000 characters"),
});

export type CreateEnquiryFormInputs = z.infer<typeof createEnquirySchema>;
