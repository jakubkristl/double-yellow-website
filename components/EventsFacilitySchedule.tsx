import { EVENTS_FACILITY_IFRAME_SRC, EVENTS_FACILITY_IFRAME_TITLE } from "@/lib/booking";

/** The BookingGood events calendar. Attributes match the club's embed code. */
export default function EventsFacilitySchedule() {
  return (
    <iframe
      src={EVENTS_FACILITY_IFRAME_SRC}
      title={EVENTS_FACILITY_IFRAME_TITLE}
      width="100%"
      height={760}
      style={{ border: 0 }}
    />
  );
}
