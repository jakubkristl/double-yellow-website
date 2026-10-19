// Booking conversion regression test.
//
// Runs against a built site (`npm run build && npm start`, or BASE_URL).
// Every third-party request is aborted, so nothing reaches Google Ads or
// BookingGood. The BookingGood iframe is replaced by a local mock served at
// the real https://sport.bookinggood.net origin, and every gtag "conversion"
// call is recorded before page scripts run. The collector records raw gtag
// calls, so the helper's qa-/test- filter cannot hide a dispatch.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const BASE_ORIGIN = new URL(BASE_URL).origin;
const BOOKING_GOOD_ORIGIN = "https://sport.bookinggood.net";
const ADS_CONVERSION = "AW-17840430561/Vnw5CK6LvOAbEOG7_bpC";
const SETTLE_MS = 1200;

const MOCK_WIDGET = `<!doctype html><html><body>
<p>Mock BookingGood widget</p>
<script>window.send = (m) => parent.postMessage(m, "*");</script>
</body></html>`;

const collectorScript = () => {
  if (window.top !== window) return;
  const dataLayer = [];
  const push = Array.prototype.push;
  dataLayer.push = function (...items) {
    for (const item of items) {
      if (item && item[0] === "event" && item[1] === "conversion") {
        const params = item[2] || {};
        fetch("/__ads_collector", {
          method: "POST",
          keepalive: true,
          body: JSON.stringify({
            send_to: params.send_to,
            transaction_id: params.transaction_id,
            page: location.pathname + location.search,
          }),
        });
      }
    }
    return push.apply(this, items);
  };
  window.dataLayer = dataLayer;
};

const bookingCreated = (bookingId) => ({
  source: "bookinggood",
  version: 1,
  type: "bg:booking-created",
  payload: {
    bookingId,
    redirectUrl: "https://www.doubleyellowsquash.com/booking/success",
  },
});

let browser;

before(async () => {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
  });
});

after(async () => {
  await browser?.close();
});

async function newSession() {
  const context = await browser.newContext();
  const conversions = [];
  const blocked = [];

  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === BASE_ORIGIN) {
      if (url.pathname === "/__ads_collector") {
        conversions.push(JSON.parse(route.request().postData() || "{}"));
        return route.fulfill({ status: 204, body: "" });
      }
      return route.continue();
    }
    if (url.origin === BOOKING_GOOD_ORIGIN || url.hostname === "evil.example") {
      return route.fulfill({ status: 200, contentType: "text/html", body: MOCK_WIDGET });
    }
    blocked.push(url.href);
    return route.abort();
  });
  await context.addInitScript(collectorScript);

  const page = await context.newPage();
  return { context, page, conversions, blocked };
}

async function embedFrame(page) {
  for (let i = 0; i < 100; i += 1) {
    const frame = page
      .frames()
      .find((f) => f !== page.mainFrame() && f.url().startsWith(BOOKING_GOOD_ORIGIN));
    if (frame) {
      await frame.waitForFunction(() => typeof window.send === "function");
      return frame;
    }
    await page.waitForTimeout(100);
  }
  throw new Error("BookingGood iframe did not load");
}

async function sendFromEmbed(page, ...messages) {
  const frame = await embedFrame(page);
  for (const message of messages) {
    await frame.evaluate((m) => window.send(m), message);
  }
}

const settle = (page) => page.waitForTimeout(SETTLE_MS);

test("visit, slot selection, sign-in, cancel and failed booking send no conversion", async () => {
  const { context, page, conversions, blocked } = await newSession();
  const landed = [];
  for (const path of ["/booking", "/en/booking"]) {
    await page.goto(`${BASE_URL}${path}`);
    await embedFrame(page);
    await settle(page);
    await sendFromEmbed(
      page,
      "ready",
      { type: "bg:embed-ready", id: "72" },
      { type: "bg:slot-selected", payload: { id: "2026-10-20T18:00", courtId: "3" } },
      { type: "bookinggood-embed-auth-ready", version: 1, requestId: "b3f1c2d4" },
      { type: "auth:signed-in", id: "u_123", user: { id: "u_123" } },
      { source: "bookinggood", version: 1, type: "bg:booking-cancelled", payload: { bookingId: "48213" } },
      { source: "bookinggood", version: 1, type: "bg:booking-failed", payload: { bookingId: "48213", error: "slot_taken" } },
    );
    await settle(page);
    landed.push(new URL(page.url()).pathname);
  }
  assert.deepEqual(conversions, []);
  assert.deepEqual(landed, ["/booking", "/en/booking"]);
  assert.ok(blocked.length > 0, "analytics requests should be intercepted, not sent");
  await context.close();
});

test("a saved BookingGood booking sends exactly one conversion with its id", async () => {
  const { context, page, conversions } = await newSession();

  await page.goto(`${BASE_URL}/booking`);
  await embedFrame(page);
  await sendFromEmbed(page, bookingCreated("48213"), bookingCreated("48213"));
  await page.waitForURL(/\/booking\/success\?booking_id=48213$/);
  await settle(page);
  assert.deepEqual(
    conversions.map(({ send_to, transaction_id }) => ({ send_to, transaction_id })),
    [{ send_to: ADS_CONVERSION, transaction_id: "48213" }],
  );

  await page.reload();
  await settle(page);
  await page.goBack();
  await page.waitForURL(/\/booking$/);
  await sendFromEmbed(page, bookingCreated("48213"));
  await settle(page);
  await page.reload();
  await sendFromEmbed(page, bookingCreated("48213"));
  await settle(page);
  assert.equal(conversions.length, 1, "refresh/back/rerender must not re-dispatch");

  await page.goto(`${BASE_URL}/en/booking`);
  await sendFromEmbed(page, bookingCreated("48214"));
  await page.waitForURL(/\/en\/booking\/success\?booking_id=48214$/);
  await settle(page);
  assert.deepEqual(
    conversions.map((c) => c.transaction_id),
    ["48213", "48214"],
  );
  await context.close();
});

test("success URLs never dispatch on their own", async () => {
  const { context, page, conversions } = await newSession();
  const urls = [
    "/booking/success",
    "/booking/success?booking_id=",
    "/booking/success?booking_id=manual-smoke-20261019",
    "/booking/success?booking_id=48213",
    "/booking/success?reservation_id=777",
    "/booking/success?id=555",
    "/en/booking/success?booking_id=48213",
    "/en/booking/success?booking_id=smoke-2026-10-09",
  ];
  for (const url of urls) {
    await page.goto(`${BASE_URL}${url}`);
    await settle(page);
  }
  assert.deepEqual(conversions, []);
  await context.close();
});

test("other origins, other windows and off-spec payloads are ignored", async () => {
  const { context, page, conversions } = await newSession();
  await page.goto(`${BASE_URL}/booking`);
  await embedFrame(page);

  await sendFromEmbed(
    page,
    { ...bookingCreated("1"), payload: { bookingId: 48213, redirectUrl: "https://www.doubleyellowsquash.com/booking/success" } },
    bookingCreated("0"),
    bookingCreated("048213"),
    bookingCreated("abc"),
    bookingCreated(" 48213"),
    bookingCreated("manual-smoke-1"),
    { ...bookingCreated("48213"), version: 2 },
    { ...bookingCreated("48213"), source: undefined },
    { ...bookingCreated("48213"), type: "bg:booking-updated" },
    { ...bookingCreated("48213"), payload: { bookingId: "48213" } },
    JSON.stringify(bookingCreated("48213")),
    { type: "booking_success", booking_id: "48213" },
    { bookingId: "48213" },
    "48213",
  );
  await settle(page);

  await page.evaluate(() => {
    const frame = document.createElement("iframe");
    frame.src = "https://evil.example/embed";
    frame.id = "evil";
    document.body.appendChild(frame);
  });
  const evil = await (async () => {
    for (let i = 0; i < 100; i += 1) {
      const f = page.frames().find((fr) => fr.url().startsWith("https://evil.example"));
      if (f) return f;
      await page.waitForTimeout(100);
    }
    throw new Error("evil frame did not load");
  })();
  await evil.waitForFunction(() => typeof window.send === "function");
  await evil.evaluate((m) => window.send(m), bookingCreated("48215"));

  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    page.evaluate(
      (origin) => window.open(`${origin}/bg/embed-auth/relay?request=x`, "relay", "popup"),
      BOOKING_GOOD_ORIGIN,
    ),
  ]);
  await popup.waitForLoadState();
  await popup.evaluate((m) => window.opener.postMessage(m, "*"), bookingCreated("48216"));

  await settle(page);
  assert.deepEqual(conversions, []);
  assert.equal(new URL(page.url()).pathname, "/booking");
  await context.close();
});
