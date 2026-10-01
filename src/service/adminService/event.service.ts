import { api } from "@/src/helper/axiosIntecpter";
import { AxiosError } from "axios";

export type EventCategory = "event" | "news" | "achievement";

export interface CreateEventPayload {
  title: string;
  slug: string;
  category: EventCategory;
  publishedStatus: boolean;
  date: string;
  shortDescription: string;
  longDescription: string;
  coverImage: File;
}

export interface EventResponse {
  message: string;
  data?: unknown;
}

export type UpdateEventPayload = Partial<CreateEventPayload>;

export interface GetEventsParams {
  page?: number;
  limit?: number;
  category?: EventCategory;
  status?: "published" | "draft";
  search?: string;
}

export interface ApiEvent {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: EventCategory;
  publishedStatus: boolean;
  date: string;
  shortDescription: string;
  longDescription: string;
  coverImage?: string;
  createdAt?: string;
}

export interface GetEventsResult {
  events: ApiEvent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type RawEventsResponse = {
  data?: ApiEvent[] | { events?: ApiEvent[]; items?: ApiEvent[]; total?: number; totalPages?: number; page?: number; limit?: number };
  events?: ApiEvent[];
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
  pagination?: { total?: number; totalPages?: number; page?: number; limit?: number };
};

export function parseAdminEventsResponse(
  res: RawEventsResponse,
  params: GetEventsParams = {}
): GetEventsResult {
  const nested = res.data && !Array.isArray(res.data) ? res.data : undefined;
  const events =
    (Array.isArray(res.data) ? res.data : undefined) ??
    nested?.events ??
    nested?.items ??
    res.events ??
    [];
  const meta = res.pagination ?? nested ?? res;
  const limit = meta.limit ?? params.limit ?? (events.length || 1);
  const total = meta.total ?? events.length;

  return {
    events,
    total,
    page: meta.page ?? params.page ?? 1,
    limit,
    totalPages: meta.totalPages ?? Math.max(1, Math.ceil(total / limit)),
  };
}

function toErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "response" in error) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
    return (
      axiosErr.response?.data?.message ||
      axiosErr.response?.data?.error ||
      axiosErr.message ||
      fallback
    );
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

class EventService {
  /**
   * Fetches a paginated, filtered list of news/events.
   */
  async getEvents(params: GetEventsParams = {}): Promise<GetEventsResult> {
    const query: Record<string, string | number> = {};
    if (params.page) query.page = params.page;
    if (params.limit) query.limit = params.limit;
    if (params.category) query.category = params.category;
    if (params.status) query.status = params.status;
    if (params.search?.trim()) query.search = params.search.trim();

    try {
      const res = await api.get<RawEventsResponse>("/admin/get-events", { params: query });
      return parseAdminEventsResponse(res, params);
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to load events."));
    }
  }

  /**
   * Creates a news/event entry. Sent as multipart/form-data because of the cover image.
   */
  async createEvent(payload: CreateEventPayload): Promise<EventResponse> {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("slug", payload.slug);
    formData.append("category", payload.category);
    formData.append("publishedStatus", String(payload.publishedStatus));
    formData.append("date", payload.date);
    formData.append("shortDescription", payload.shortDescription);
    formData.append("longDescription", payload.longDescription);
    formData.append("coverImage", payload.coverImage);

    try {
      return await api.post<EventResponse>("/admin/create-events", formData);
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to create event. Please try again."));
    }
  }

  /**
   * Updates an event. Only the provided fields are sent.
   */
  async updateEvent(id: string, payload: UpdateEventPayload): Promise<EventResponse> {
    const formData = new FormData();
    (Object.keys(payload) as (keyof UpdateEventPayload)[]).forEach((key) => {
      const value = payload[key];
      if (value === undefined || value === null) return;
      formData.append(key, value instanceof File ? value : String(value));
    });

    try {
      return await api.put<EventResponse>(
        `/admin/edit-event/${encodeURIComponent(id)}`,
        formData
      );
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to update event. Please try again."));
    }
  }

  /**
   * Deletes an event along with its cover image on the server.
   */
  async deleteEvent(id: string): Promise<EventResponse> {
    try {
      return await api.delete<EventResponse>(`/admin/delete-event/${encodeURIComponent(id)}`);
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to delete event. Please try again."));
    }
  }
}

const eventService = new EventService();
export default eventService;
export { EventService };
