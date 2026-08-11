import PhoneLink from "@/components/PhoneLink";

export default function FloatingContactActions() {
  return (
    <div className="floating-contact-actions" aria-label="Quick actions">
      <a
        className="floating-action floating-action-primary"
        href="https://www.doubleyellowsquash.com/booking"
      >
        Book Now
      </a>
      <PhoneLink
        className="floating-action floating-action-secondary"
        href="tel:0896754014"
        aria-label="Call us at 0896 754 014"
      >
        Call Us
      </PhoneLink>
    </div>
  );
}
