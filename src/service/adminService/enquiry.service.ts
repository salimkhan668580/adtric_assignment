import { api } from "@/src/helper/axiosIntecpter";
import { AxiosError } from "axios";

export interface ApiEnquiry {
  _id?: string;
  id?: string;
  parentName: string;
  studentName: string;
  classApplyingFor: string;
  mobile: string;
  email?: string;
  message?: string;
  status?: string;
  crmResult?: string;
  crmStatus?: string;
  createdAt?: string;
}

export interface GetEnquiriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetEnquiriesResult {
  enquiries: ApiEnquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type Meta = { total?: number; totalPages?: number; page?: number; limit?: number };

type RawEnquiriesResponse = Meta & {
  data?: ApiEnquiry[] | (Meta & { enquiries?: ApiEnquiry[]; items?: ApiEnquiry[] });
  enquiries?: ApiEnquiry[];
  pagination?: Meta;
};

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

class EnquiryService {
  /**
   * Lists enquiries newest first. Search matches parent name, student name, class, mobile or email.
   */
  async getEnquiries(params: GetEnquiriesParams = {}): Promise<GetEnquiriesResult> {
    const query: Record<string, string | number> = {};
    if (params.page) query.page = params.page;
    if (params.limit) query.limit = params.limit;
    if (params.search?.trim()) query.search = params.search.trim();

    try {
      const res = await api.get<RawEnquiriesResponse>("/admin/get-enquiries", { params: query });

      const nested = res.data && !Array.isArray(res.data) ? res.data : undefined;
      const enquiries =
        (Array.isArray(res.data) ? res.data : undefined) ??
        nested?.enquiries ??
        nested?.items ??
        res.enquiries ??
        [];
      const meta: Meta = res.pagination ?? nested ?? res;
      const limit = meta.limit ?? params.limit ?? (enquiries.length || 1);
      const total = meta.total ?? enquiries.length;

      return {
        enquiries,
        total,
        page: meta.page ?? params.page ?? 1,
        limit,
        totalPages: meta.totalPages ?? Math.max(1, Math.ceil(total / limit)),
      };
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to load enquiries."));
    }
  }

  async updateEnquiryStatus(
    id: string,
    status: "new" | "contacted" | "closed"
  ): Promise<{ message: string }> {
    try {
      return await api.patch<{ message: string }>(
        `/admin/update-enquiry-status/${encodeURIComponent(id)}`,
        { status }
      );
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to update enquiry status."));
    }
  }

  async deleteEnquiry(id: string): Promise<{ message: string }> {
    try {
      return await api.delete<{ message: string }>(
        `/admin/delete-enquiry/${encodeURIComponent(id)}`
      );
    } catch (error: unknown) {
      throw new Error(toErrorMessage(error, "Failed to delete enquiry. Please try again."));
    }
  }
}

const enquiryService = new EnquiryService();
export default enquiryService;
export { EnquiryService };
