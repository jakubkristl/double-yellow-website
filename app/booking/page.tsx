export const dynamic = "force-static";

export default function BookingPage() {
  return (
    <section className="container">
      <h1 className="page-title">Booking</h1>
      <p>
        Reserve a court in seconds. We use <strong>BookingGood</strong> for secure reservations.
      </p>

      <p>
        <a
          href="https://www.bookinggood.net/places/double-yellow-squash-club-44/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a court on BookingGood →
        </a>
      </p>

      <p className="muted">
        Opens in a new tab. (We keep this page light for speed and clarity.)
      </p>
    </section>
  );
}
