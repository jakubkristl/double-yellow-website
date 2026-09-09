import PhoneLink from "@/components/PhoneLink";
import { BUSINESS } from "@/lib/business";

export default function FloatingContactActions() {
  return (
    <div className="floating-contact-actions" aria-label="Quick actions">
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
