import type { QueryFilter } from "mongoose";
import { Event } from "../models/events.js";
import type { IEvent } from "../models/events.js";

export interface EventFilters {
    category?: string;
    publishedStatus?: boolean;
    search?: string;
}

export interface Pagination {
    page: number;
    limit: number;
}

export type EventSortBy = "date" | "createdAt";

const createEvent = async (data: IEvent) => {
    return Event.create(data);
}

const getEvents = async (
    { category, publishedStatus, search }: EventFilters,
    { page, limit }: Pagination,
    sortBy: EventSortBy = "date"
) => {
    const filter: QueryFilter<IEvent> = {};

    if (category) {
        filter.category = category;
    }

    if (publishedStatus !== undefined) {
        filter.publishedStatus = publishedStatus;
    }

    if (search) {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escaped, "i");
        filter.$or = [{ title: regex }, { slug: regex }];
    }

    const [events, total] = await Promise.all([
        Event.find(filter)
            .sort({ [sortBy]: -1, _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Event.countDocuments(filter),
    ]);

    return { events, total };
}

const updateEvent = async (id: string, data: Partial<IEvent>) => {
    return Event.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });
}

const deleteEvent = async (id: string) => {
    return Event.findByIdAndDelete(id);
}

const getEventById = async (id: string) => {
    return Event.findById(id);
}

const getPublishedEventBySlug = async (slug: string) => {
    return Event.findOne({ slug, publishedStatus: true });
}

export default { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getPublishedEventBySlug };
