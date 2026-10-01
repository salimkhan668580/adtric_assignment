import NewAndEvents from "@/src/components/web/newAndEvents/NewAndEvents";
import Enquiry from "@/src/components/web/enquiry/Enquiry";
import { HOME_EVENTS_LIMIT } from "@/src/constants/newsEvents";
import { getPublicEventsServer } from "@/src/service/webService/events.server";

export default async function WebHomePage() {
  const { events } = await getPublicEventsServer(1, HOME_EVENTS_LIMIT).catch(() => ({ events: [] }));

  return (
    <div className="w-full">
      <NewAndEvents events={events} />
      <Enquiry />
    </div>
  );
}
