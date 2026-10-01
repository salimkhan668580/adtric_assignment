import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import enquiryService from "../services/enquiry.service.js";
import { getEnquiriesQuerySchema } from "../zod/enquiry.zod.js";
import { buildPagination } from "../utils/pagination.js";

const createEnquiry = async (req: Request, res: Response) => {
    try {
        const { parentName, studentName, classApplyingFor, mobile, email, message } = req.body;

        if (await enquiryService.hasRecentEnquiry(mobile, classApplyingFor)) {
            return res.status(409).json({ message: "We have already received your enquiry." });
        }

        const enquiry = await enquiryService.createEnquiry({ parentName, studentName, classApplyingFor, mobile, email, message });
        return res.status(201).json({
            message: "Enquiry submitted successfully",
            enquiryId: enquiry._id,
        });
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getEnquiries = async (req: Request, res: Response) => {
    try {
        const parsed = getEnquiriesQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query params", errors: parsed.error.issues });
        }

        const { search, status, crmStatus, page, limit } = parsed.data;
        const { enquiries, total } = await enquiryService.getEnquiries(
            {
                search: search || undefined,
                status: status !== "all" ? status : undefined,
                crmStatus: crmStatus !== "all" ? crmStatus : undefined,
            },
            { page, limit }
        );

        return res.status(200).json({
            message: "Enquiries fetched successfully",
            count: enquiries.length,
            pagination: buildPagination(page, limit, total),
            enquiries,
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateEnquiryStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid enquiry id" });
        }

        const enquiry = await enquiryService.updateEnquiryStatus(id, req.body.status);
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }

        return res.status(200).json({
            message: "Enquiry status updated successfully",
            enquiry,
        });
    } catch (error) {
        console.error("Error updating enquiry status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteEnquiry = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid enquiry id" });
        }

        const enquiry = await enquiryService.deleteEnquiry(id);
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }

        return res.status(200).json({ message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default { createEnquiry, getEnquiries, updateEnquiryStatus, deleteEnquiry };
