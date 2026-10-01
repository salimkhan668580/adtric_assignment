import { serverGetJson } from "@/src/lib/serverApi";
import {
  ApiEvent,
  GetEventsParams,
  GetEventsResult,
  parseAdminEventsResponse,
} from "@/src/service/adminService/event.service";

type RawEventsResponse = Parameters<typeof parseAdminEventsResponse>[0];

export async function getAdminEventsServer(params: GetEventsParams = {}): Promise<GetEventsResult> {
  const res = await serverGetJson<RawEventsResponse>("/admin/get-events", {
    params: {
      page: params.page,
      limit: params.limit,
      category: params.category,
      status: params.status,
      search: params.search?.trim() || undefined,
    },
  });
  return parseAdminEventsResponse(res, params);
}

function eventId(event: ApiEvent): string {
  return event._id ?? event.id ?? "";
}

/** No single-event admin endpoint — scan a large first page server-side. */
export async function getAdminEventByIdServer(id: string): Promise<ApiEvent | null> {
  const res = await getAdminEventsServer({ page: 1, limit: 500 });
  return res.events.find((e) => eventId(e) === id) ?? null;
}
