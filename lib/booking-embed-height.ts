/**
 * BookingGood's facility embed does not post its height. These bands are the
 * bottom of the schedule and coaches when the iframe is already tall enough
 * that the document itself does not scroll, plus a buffer so a one-line wrap
 * does not bring the scrollbar back.
 * Measured on https://sport.bookinggood.net/bg/embed/facility/44/72?theme=dark
 * (October 2026): <=285px → 1491, <=445px → 1413, <=599px → 1174, wider → 1598.
 */
export const BOOKING_EMBED_HEIGHT_BUFFER = 48;

export const BOOKING_EMBED_HEIGHT_BANDS = [
  { maxIframeWidth: 285, contentHeight: 1491 },
  { maxIframeWidth: 445, contentHeight: 1413 },
  { maxIframeWidth: 599, contentHeight: 1174 },
  { maxIframeWidth: Number.POSITIVE_INFINITY, contentHeight: 1598 },
] as const;

const MIN_POSTED_HEIGHT = 400;
const MAX_POSTED_HEIGHT = 8000;

export function fallbackBookingEmbedHeight(iframeWidth: number): number {
  const band =
    !Number.isFinite(iframeWidth) || iframeWidth <= 0
      ? BOOKING_EMBED_HEIGHT_BANDS[BOOKING_EMBED_HEIGHT_BANDS.length - 1]
      : BOOKING_EMBED_HEIGHT_BANDS.find((entry) => iframeWidth <= entry.maxIframeWidth);
  return (band?.contentHeight ?? 1598) + BOOKING_EMBED_HEIGHT_BUFFER;
}

export const BOOKING_EMBED_FALLBACK_HEIGHT = fallbackBookingEmbedHeight(0);

function pixels(value: unknown): number | undefined {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\d+(\.\d+)?$/.test(value.trim())
        ? Number(value.trim())
        : NaN;
  if (!Number.isFinite(numeric)) {
    return undefined;
  }
  const px = Math.ceil(numeric);
  if (px < MIN_POSTED_HEIGHT || px > MAX_POSTED_HEIGHT) {
    return undefined;
  }
  return px;
}

function heightFromRecord(record: Record<string, unknown>): number | undefined {
  for (const key of ["height", "iframeHeight", "frameHeight", "documentHeight", "scrollHeight"]) {
    if (key in record) {
      const parsed = pixels(record[key]);
      if (parsed) {
        return parsed;
      }
    }
  }
  return undefined;
}

/**
 * Pixel height from a BookingGood parent message, when the widget sends one.
 * Booking lifecycle and embed-auth messages are ignored.
 */
export function parseBookingEmbedHeight(data: unknown): number | undefined {
  if (typeof data === "string") {
    const resizer = data.match(/^\[iFrameSizer\][^:]*:(\d+(?:\.\d+)?):/);
    if (resizer) {
      return pixels(resizer[1]);
    }
    return pixels(data);
  }

  if (typeof data === "number") {
    return pixels(data);
  }

  if (!data || typeof data !== "object") {
    return undefined;
  }

  const record = data as Record<string, unknown>;
  if (typeof record.type === "string") {
    if (record.type.startsWith("bg:booking-") || record.type.startsWith("bookinggood.embed-auth")) {
      return undefined;
    }
  }

  const direct = heightFromRecord(record);
  if (direct) {
    return direct;
  }

  if (record.data && typeof record.data === "object") {
    return heightFromRecord(record.data as Record<string, unknown>);
  }

  return undefined;
}

/** Container-query heights so the first paint matches the iframe width before JS runs. */
export function bookingEmbedFrameCss(): string {
  const wide = fallbackBookingEmbedHeight(Number.POSITIVE_INFINITY);
  const overrides = BOOKING_EMBED_HEIGHT_BANDS.filter((band) =>
    Number.isFinite(band.maxIframeWidth),
  )
    .slice()
    .sort((a, b) => b.maxIframeWidth - a.maxIframeWidth)
    .map(
      (band) => `@container (max-width: ${band.maxIframeWidth}px) {
  .booking-embed__frame { height: ${band.contentHeight + BOOKING_EMBED_HEIGHT_BUFFER}px; }
}`,
    )
    .join("\n");

  return `.card.booking-embed {
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  padding: 0;
  background: #121318;
}
.booking-embed__frame {
  display: block;
  width: 100%;
  height: ${wide}px;
  border: 0;
  background: #121318;
}
${overrides}`;
}
