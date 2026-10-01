import { z } from "zod";

export const getEventsQuerySchema = z.object({
  category: z.enum(["all", "event", "news", "achievement"]).default("all"),
  status: z.enum(["all", "published", "draft"]).default("all"),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const publicEventsQuerySchema = getEventsQuerySchema.omit({ status: true });

const formBoolean = z.preprocess(
  (value) => (value === "true" ? true : value === "false" ? false : value),
  z.boolean()
);

export const createEventSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  category: z.enum(["event", "news", "achievement"]),
  publishedStatus: formBoolean.optional(),
  date: z.coerce.date({ error: "Invalid date" }),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export type GetEventsQuery = z.infer<typeof getEventsQuerySchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
