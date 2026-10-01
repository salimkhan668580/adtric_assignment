import { z } from "zod";

export const adminSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AdminInput = z.infer<typeof adminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;