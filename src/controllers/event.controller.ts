import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import eventService from "../services/event.service.js";
import type { IEvent } from "../models/events.js";
import { getEventsQuerySchema, publicEventsQuerySchema } from "../zod/event.zod.js";
import { EVENT_UPLOAD_URL, removeEventImage } from "../middlewares/upload.middleware.js";
import { buildPagination } from "../utils/pagination.js";

const isDuplicateSlugError = (error: unknown) => {
    const err = error as { code?: number; keyPattern?: Record<string, unknown> };
    return err?.code === 11000 && Boolean(err.keyPattern?.slug);
}

const getUploadedImagePath = (req: Request) =>
    req.file ? `${EVENT_UPLOAD_URL}/${req.file.filename}` : undefined;

const createEvent = async (req: Request, res: Response) => {
    const coverImage = getUploadedImagePath(req);
    try {
        if (!coverImage) {
            return res.status(400).json({ message: "Cover image is required" });
        }

        const { title, slug, category, publishedStatus, date, shortDescription, longDescription } = req.body;
        const event = await eventService.createEvent({ title, slug, category, publishedStatus, coverImage, date, shortDescription, longDescription });
        return res.status(201).json({
            message: "Event created successfully",
            event,
        });
    } catch (error) {
        await removeEventImage(coverImage);
        if (isDuplicateSlugError(error)) {
            return res.status(409).json({ message: "Slug already exists" });
        }
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getEvents = async (req: Request, res: Response) => {
    try {
        const parsed = getEventsQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query params", errors: parsed.error.issues });
        }

        const { category, status, search, page, limit } = parsed.data;

        const { events, total } = await eventService.getEvents(
            {
                category: category !== "all" ? category : undefined,
                publishedStatus: status !== "all" ? status === "published" : undefined,
                search: search || undefined,
            },
            { page, limit }
        );

        return res.status(200).json({
            message: "Events fetched successfully",
            count: events.length,
            pagination: buildPagination(page, limit, total),
            events,
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateEvent = async (req: Request, res: Response) => {
    const coverImage = getUploadedImagePath(req);
    try {
        const id = req.params.id as string;
        if (!isValidObjectId(id)) {
            await removeEventImage(coverImage);
            return res.status(400).json({ message: "Invalid event id" });
        }

        const { title, slug, category, publishedStatus, date, shortDescription, longDescription } = req.body;
        const fields = { title, slug, category, publishedStatus, coverImage, date, shortDescription, longDescription };
        const data = Object.fromEntries(
            Object.entries(fields).filter(([, value]) => value !== undefined)
        ) as Partial<IEvent>;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "At least one field is required to update" });
        }

        const existing = await eventService.getEventById(id);
        if (!existing) {
            await removeEventImage(coverImage);
            return res.status(404).json({ message: "Event not found" });
        }

        const event = await eventService.updateEvent(id, data);
        if (coverImage && existing.coverImage !== coverImage) {
            await removeEventImage(existing.coverImage);
        }

        return res.status(200).json({
            message: "Event updated successfully",
            event,
        });
    } catch (error) {
        await removeEventImage(coverImage);
        if (isDuplicateSlugError(error)) {
            return res.status(409).json({ message: "Slug already exists" });
        }
        console.error("Error updating event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid event id" });
        }

        const event = await eventService.deleteEvent(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await removeEventImage(event.coverImage);
        return res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getPublicEvents = async (req: Request, res: Response) => {
    try {
        const parsed = publicEventsQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query params", errors: parsed.error.issues });
        }

        const { category, search, page, limit } = parsed.data;

        const { events, total } = await eventService.getEvents(
            {
                category: category !== "all" ? category : undefined,
                publishedStatus: true,
                search: search || undefined,
            },
            { page, limit },
            "createdAt"
        );

        return res.status(200).json({
            message: "Events fetched successfully",
            count: events.length,
            pagination: buildPagination(page, limit, total),
            events,
        });
    } catch (error) {
        console.error("Error fetching public events:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getPublicEventBySlug = async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug as string;

        const event = await eventService.getPublishedEventBySlug(slug);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({
            message: "Event fetched successfully",
            event,
        });
    } catch (error) {
        console.error("Error fetching event:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default { createEvent, getEvents, updateEvent, deleteEvent, getPublicEvents, getPublicEventBySlug };
