import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bookingEmbedFrameCss,
  fallbackBookingEmbedHeight,
  parseBookingEmbedHeight,
} from "../lib/booking-embed-height.ts";

test("fallback height covers the measured BookingGood document", () => {
  assert.equal(fallbackBookingEmbedHeight(280), 1990);
  assert.equal(fallbackBookingEmbedHeight(285), 1990);
  assert.equal(fallbackBookingEmbedHeight(286), 1938);
  assert.equal(fallbackBookingEmbedHeight(320), 1938);
  assert.equal(fallbackBookingEmbedHeight(445), 1938);
  assert.equal(fallbackBookingEmbedHeight(446), 1698);
  assert.equal(fallbackBookingEmbedHeight(599), 1698);
  assert.equal(fallbackBookingEmbedHeight(600), 1646);
  assert.equal(fallbackBookingEmbedHeight(1118), 1646);
  assert.equal(fallbackBookingEmbedHeight(0), 1646);
});

test("posted widget heights are used and booking messages are not", () => {
  assert.equal(parseBookingEmbedHeight(1640), 1640);
  assert.equal(parseBookingEmbedHeight("1507.2"), 1508);
  assert.equal(parseBookingEmbedHeight({ height: 1600 }), 1600);
  assert.equal(parseBookingEmbedHeight({ type: "resize", iframeHeight: 1510 }), 1510);
  assert.equal(parseBookingEmbedHeight({ data: { scrollHeight: 1700 } }), 1700);
  assert.equal(parseBookingEmbedHeight("[iFrameSizer]0:1630:1118:init"), 1630);
  assert.equal(parseBookingEmbedHeight(120), undefined);
  assert.equal(parseBookingEmbedHeight(9000), undefined);
  assert.equal(
    parseBookingEmbedHeight({
      source: "bookinggood",
      version: 1,
      type: "bg:booking-created",
      height: 2000,
      payload: { bookingId: "48213", redirectUrl: "https://www.doubleyellowsquash.com/booking/success" },
    }),
    undefined,
  );
  assert.equal(
    parseBookingEmbedHeight({ type: "bookinggood.embed-auth.ready", height: 1400 }),
    undefined,
  );
});

test("first-paint CSS uses the same width bands", () => {
  const css = bookingEmbedFrameCss();
  assert.match(css, /height: 1646px/);
  assert.match(css, /max-width: 599px[\s\S]*height: 1698px/);
  assert.match(css, /max-width: 445px[\s\S]*height: 1938px/);
  assert.match(css, /max-width: 285px[\s\S]*height: 1990px/);
  const wide = css.indexOf("max-width: 599px");
  const mid = css.indexOf("max-width: 445px");
  const narrow = css.indexOf("max-width: 285px");
  assert.ok(wide < mid && mid < narrow);
});
