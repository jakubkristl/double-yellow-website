"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BOOKING_FACILITY_ORIGIN, getBookingEmbedSrc } from "@/lib/booking";
import {
  BOOKING_EMBED_HEIGHT_BUFFER,
  fallbackBookingEmbedHeight,
  parseBookingEmbedHeight,
} from "@/lib/booking-embed-height";

type Props = {
  title: string;
  loadingLabel: string;
};

function contentOverflow(frame: HTMLIFrameElement): number | null {
  try {
    const content = frame.contentDocument?.documentElement?.scrollHeight ?? 0;
    if (content > frame.clientHeight + 1) {
      return content;
    }
  } catch {
    return null;
  }
  return null;
}

export default function BookingEmbed({ title, loadingLabel }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const postedHeight = useRef<number | null>(null);
  const postedWidth = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const [frameHeight, setFrameHeight] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const embedSrc = useMemo(
    () =>
      getBookingEmbedSrc({
        day: searchParams.get("day"),
        time: searchParams.get("time"),
        theme: "dark",
      }),
    [searchParams],
  );

  const recheckRef = useRef<(force: boolean) => void>(() => {});

  useLayoutEffect(() => {
    const frame = iframeRef.current;
    if (!frame) {
      return;
    }

    postedHeight.current = null;
    let width = -1;

    const apply = (force: boolean) => {
      const nextWidth = frame.clientWidth;
      if (nextWidth <= 0) {
        return;
      }
      const widthChanged = Math.abs(nextWidth - width) >= 1;
      if (!force && !widthChanged) {
        return;
      }
      width = nextWidth;

      if (postedHeight.current != null) {
        if (Math.abs(nextWidth - postedWidth.current) <= 8) {
          setFrameHeight(postedHeight.current);
          return;
        }
        postedHeight.current = null;
      }

      const measured = contentOverflow(frame);
      const next =
        measured != null
          ? measured + BOOKING_EMBED_HEIGHT_BUFFER
          : fallbackBookingEmbedHeight(nextWidth);
      setFrameHeight((current) => (current === next ? current : next));
    };

    recheckRef.current = apply;
    apply(true);

    const observer = new ResizeObserver(() => apply(false));
    observer.observe(frame);

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== BOOKING_FACILITY_ORIGIN || event.source !== frame.contentWindow) {
        return;
      }
      const posted = parseBookingEmbedHeight(event.data);
      if (posted == null) {
        return;
      }
      postedHeight.current = posted;
      postedWidth.current = frame.clientWidth;
      width = frame.clientWidth;
      setFrameHeight(posted);
    };

    window.addEventListener("message", onMessage);
    return () => {
      recheckRef.current = () => {};
      observer.disconnect();
      window.removeEventListener("message", onMessage);
    };
  }, [embedSrc]);

  useEffect(() => {
    setIsLoading(true);
  }, [embedSrc]);

  return (
    <div className="card booking-embed">
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "18vh",
            background: "#ffffff",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(255, 204, 0, 0.2)",
              borderTop: "4px solid var(--accent)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "#666", marginTop: "16px", fontSize: "14px" }}>{loadingLabel}</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="booking-embed__frame"
        title={title}
        src={embedSrc}
        style={frameHeight ? { height: frameHeight } : undefined}
        loading="eager"
        onLoad={() => {
          setIsLoading(false);
          recheckRef.current(true);
          window.setTimeout(() => recheckRef.current(true), 600);
          window.setTimeout(() => recheckRef.current(true), 1600);
        }}
      />
    </div>
  );
}
