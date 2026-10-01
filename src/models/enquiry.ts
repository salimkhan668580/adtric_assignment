import mongoose, { Schema } from "mongoose";

export const ENQUIRY_STATUSES = ["new", "contacted", "closed"] as const;
export const CRM_STATUSES = ["pending", "sent", "failed"] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];
export type CrmStatus = (typeof CRM_STATUSES)[number];

export interface IEnquiry {
    parentName: string;
    studentName: string;
    classApplyingFor: string;
    mobile: string;
    email?: string;
    message?: string;
    status: EnquiryStatus;
    crmStatus: CrmStatus;
    crmError?: string;
    crmSentAt?: Date;
}

const enquirySchema = new Schema<IEnquiry>({
    parentName: {
        type: String,
        required: true,
        trim: true,
    },
    studentName: {
        type: String,
        required: true,
        trim: true,
    },
    classApplyingFor: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ENQUIRY_STATUSES,
        default: "new",
    },
    crmStatus: {
        type: String,
        enum: CRM_STATUSES,
        default: "pending",
    },
    crmError: {
        type: String,
    },
    crmSentAt: {
        type: Date,
    },
}, { timestamps: true });

enquirySchema.index({ mobile: 1, createdAt: -1 });

export const Enquiry = mongoose.model<IEnquiry>("Enquiry", enquirySchema);
