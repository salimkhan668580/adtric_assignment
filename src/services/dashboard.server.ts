import { Enquiry, ENQUIRY_STATUSES } from "../models/enquiry.js";
import type { EnquiryStatus } from "../models/enquiry.js";
import { Event } from "../models/events.js";

const getEnquiryStats = async () => {
    const groups = await Enquiry.aggregate<{ _id: EnquiryStatus; count: number }>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const byStatus = Object.fromEntries(ENQUIRY_STATUSES.map((status) => [status, 0])) as Record<EnquiryStatus, number>;
    let total = 0;
    for (const { _id, count } of groups) {
        total += count;
        if (_id in byStatus) byStatus[_id] = count;
    }

    return { total, ...byStatus };
}

const getEventStats = async () => {
    const groups = await Event.aggregate<{ _id: boolean; count: number }>([
        { $group: { _id: "$publishedStatus", count: { $sum: 1 } } },
    ]);

    let published = 0;
    let draft = 0;
    for (const { _id, count } of groups) {
        if (_id === true) published += count;
        else draft += count;
    }

    return { total: published + draft, published, draft };
}

const getDashboardStats = async () => {
    const [enquiries, events] = await Promise.all([getEnquiryStats(), getEventStats()]);
    return { enquiries, events };
}

export default { getDashboardStats };
