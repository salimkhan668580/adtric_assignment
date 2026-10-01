import NewAndEvents from "@/src/components/web/newAndEvents/NewAndEvents";
import Enquiry from "@/src/components/web/enquiry/Enquiry";

export default function WebHomePage() {
  return (
    <div className="w-full">
      <NewAndEvents />
      <Enquiry />
    </div>
  );
}