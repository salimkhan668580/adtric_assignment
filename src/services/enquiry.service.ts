import type { HydratedDocument, QueryFilter } from "mongoose";
import { Enquiry } from "../models/enquiry.js";
import type { CrmStatus, EnquiryStatus, IEnquiry } from "../models/enquiry.js";
import type { Pagination } from "./event.service.js";
import { env } from "../config/env.js";

export interface EnquiryFilters {
    search?: string;
    status?: EnquiryStatus;
    crmStatus?: CrmStatus;
}

const CRM_TIMEOUT_MS = 5000;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

type NewEnquiry = Pick<IEnquiry, "parentName" | "studentName" | "classApplyingFor" | "mobile" | "email" | "message">;

const postToCrm = async (enquiry: HydratedDocument<IEnquiry>) => {
    if (!env.WEBHOOK_URL) {
        throw new Error("WEBHOOK_URL is not configured");
    }

    const response = await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: enquiry._id.toString(),
            parentName: enquiry.parentName,
            studentName: enquiry.studentName,
            classApplyingFor: enquiry.classApplyingFor,
            mobile: enquiry.mobile,
            email: enquiry.email,
            message: enquiry.message,
            createdAt: enquiry.get("createdAt"),
        }),
        signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    });

    if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status} ${response.statusText}`);
    }
}

const hasRecentEnquiry = async (mobile: string, classApplyingFor: string) => {
    const existing = await Enquiry.exists({
        mobile,
        classApplyingFor,
        createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    }).collation({ locale: "en", strength: 2 });

    return Boolean(existing);
}

const createEnquiry = async (data: NewEnquiry) => {
    const enquiry = await Enquiry.create(data);

    try {
        await postToCrm(enquiry);
        enquiry.crmStatus = "sent";
        enquiry.crmSentAt = new Date();
        enquiry.crmError = undefined;
    } catch (error) {
        enquiry.crmStatus = "failed";
        enquiry.crmError = error instanceof Error ? error.message : String(error);
        console.error("CRM webhook failed:", enquiry.crmError);
    }

    return enquiry.save();
}

const getEnquiries = async ({ search, status, crmStatus }: EnquiryFilters, { page, limit }: Pagination) => {
    const filter: QueryFilter<IEnquiry> = {};

    if (status) {
        filter.status = status;
    }

    if (crmStatus) {
        filter.crmStatus = crmStatus;
    }

    if (search) {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escaped, "i");
        filter.$or = [
            { parentName: regex },
            { studentName: regex },
            { classApplyingFor: regex },
            { mobile: regex },
            { email: regex },
        ];
    }

    const [enquiries, total] = await Promise.all([
        Enquiry.find(filter)
            .sort({ createdAt: -1, _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Enquiry.countDocuments(filter),
    ]);

    return { enquiries, total };
}

const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    return Enquiry.findByIdAndUpdate(id, { status }, { returnDocument: "after", runValidators: true });
}

const deleteEnquiry = async (id: string) => {
    return Enquiry.findByIdAndDelete(id);
}

export default { hasRecentEnquiry, createEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry };
