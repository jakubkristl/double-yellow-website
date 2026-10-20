import PhoneLink from "@/components/PhoneLink";
import { BUSINESS } from "@/lib/business";

type Props = {
  /** `inline` sits in the page flow. The fixed pair must not cover the booking grid. */
  placement?: "fixed" | "inline";
};

export default function FloatingContactActions({ placement = "fixed" }: Props) {
  return (
    <div
      className={placement === "inline" ? "booking-contact-actions" : "floating-contact-actions"}
      aria-label="Quick actions"
    >
      <a
        className="floating-action floating-action-primary"
        href={`${BUSINESS.url}/booking`}
      >
        Book Now
      </a>
      <PhoneLink
        className="floating-action floating-action-secondary"
        href={BUSINESS.telephoneTelHref}
        aria-label={`Call us at ${BUSINESS.telephoneDisplay}`}
      >
        Call Us
      </PhoneLink>
    </div>
  );
}
