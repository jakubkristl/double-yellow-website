/**
 * Honest peak-hours cue — no invented "next free slot" times.
 * Live availability lives in the /booking embed.
 */
export default function AvailabilityTeaser() {
  return (
    <div className="availability-teaser" aria-live="polite">
      <div>
        <span>Peak</span>
        <strong>18:00–21:00</strong>
      </div>
      <div>
        <span>Open</span>
        <strong>07:00–22:00</strong>
      </div>
      <div>
        <span>Tip</span>
        <strong>Book evenings early</strong>
      </div>
    </div>
  );
}
