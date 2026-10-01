import type { Metadata } from "next";
import EditNewsEvents from "@/src/components/admin/newsEvents/EditNewsEvents";
import { toNewsEventItem } from "@/src/components/admin/newsEvents/types";
import { getAdminEventByIdServer } from "@/src/service/adminService/event.server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getAdminEventByIdServer(id).catch(() => null);
  if (!event) return { title: "Edit Event" };
  return {
    title: `Edit: ${event.title}`,
    description: event.shortDescription,
  };
}

export default async function EditNewsEventsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const apiEvent = await getAdminEventByIdServer(id).catch(() => null);
  const initialItem = apiEvent ? toNewsEventItem(apiEvent) : null;

  return <EditNewsEvents id={id} initialItem={initialItem} />;
}
