import { api } from "@/src/helper/axiosIntecpter";
import { AxiosError } from "axios";

export interface CreateEnquiryPayload {
  parentName: string;
  studentName: string;
  classApplyingFor: string;
  mobile: string;
  email?: string;
  message?: string;
}

export interface CreateEnquiryResponse {
  message: string;
  data?: unknown;
}

/**
 * Submits an admission enquiry from the public website.
 */
export async function createEnquiry(payload: CreateEnquiryPayload): Promise<CreateEnquiryResponse> {
  const body: CreateEnquiryPayload = {
    parentName: payload.parentName.trim(),
    studentName: payload.studentName.trim(),
    classApplyingFor: payload.classApplyingFor,
    mobile: payload.mobile.trim(),
  };
  if (payload.email?.trim()) body.email = payload.email.trim();
  if (payload.message?.trim()) body.message = payload.message.trim();

  try {
    return await api.post<CreateEnquiryResponse>("/create-enquiry", body);
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
    throw new Error(
      axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        "Failed to submit enquiry. Please try again."
    );
  }
}
