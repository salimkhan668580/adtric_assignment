import EditNewsEvents from "@/src/components/admin/newsEvents/EditNewsEvents";

export default async function EditNewsEventsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditNewsEvents id={id} />;
}
