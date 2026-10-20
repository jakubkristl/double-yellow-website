import { Suspense } from "react";
import BookingEmbed from "@/components/BookingEmbed";
import { BOOKING_EMBED_FALLBACK_HEIGHT, bookingEmbedFrameCss } from "@/lib/booking-embed-height";

type Props = {
  title: string;
  loadingLabel: string;
};

export default function BookingEmbedSlot({ title, loadingLabel }: Props) {
  return (
    <>
      <style>{bookingEmbedFrameCss()}</style>
      <Suspense
        fallback={
          <div
            className="card booking-embed"
            style={{ minHeight: BOOKING_EMBED_FALLBACK_HEIGHT }}
            aria-busy="true"
          />
        }
      >
        <BookingEmbed title={title} loadingLabel={loadingLabel} />
      </Suspense>
    </>
  );
}
