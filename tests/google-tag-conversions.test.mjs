// Google tag page-view conversion regression test.
//
// Unlike booking-conversion.test.mjs this loads the real Google tag
// (gtag.js / gtm.js), because the page-view conversions come from remote
// rules in the AW-17840430561 tag config. Nothing reaches Google:
// measurement hosts are DNS-mapped to 127.0.0.1, every measurement request
// is answered locally (and recorded), service workers are blocked, and the
// Cloudflare tag gateway paths (/6ftv/…) are answered locally except for the
// tag script itself. BookingGood is mocked.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const BASE_ORIGIN = new URL(BASE_URL).origin;
const GATEWAY = "/6ftv/";
const ADS_LABEL = "Vnw5CK6LvOAbEOG7_bpC";
const PAGE_VIEW_CONVERSION = /^ads_conversion_/;
const MEASUREMENT_HOSTS = [
  "*.google-analytics.com",
  "analytics.google.com",
  "*.doubleclick.net",
  "www.google.com",
  "*.googleadservices.com",
  "googleadservices.com",
  "*.googlesyndication.com",
  "*.facebook.com",
  "*.facebook.net",
];

const MOCK_WIDGET = `<!doctype html><html><body>
<script>window.send = (m) => parent.postMessage(m, "*");</script>
</body></html>`;

let browser;

before(async () => {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: [`--host-resolver-rules=${MEASUREMENT_HOSTS.map((h) => `MAP ${h} 127.0.0.1`).join(", ")}`],
  });
});

after(async () => {
  await browser?.close();
});

function recordHit(hits, url, body) {
  const lines = body ? body.split("\r\n").filter(Boolean) : [""];
  for (const line of lines) {
    const params = new URLSearchParams(line);
    const get = (key) => params.get(key) ?? url.searchParams.get(key);
    hits.push({
      path: url.hostname + url.pathname,
      en: get("en"),
      label: get("label"),
      oid: get("oid"),
      dl: get("dl") ?? get("url"),
    });
  }
}

async function newSession({ consent }) {
  const context = await browser.newContext({ serviceWorkers: "block" });
  const hits = [];
  const gtagConversions = [];

  await context.exposeBinding("__recordGtagConversion", (_source, call) => {
    gtagConversions.push(call);
  });
  await context.addInitScript(() => {
    if (window.top !== window) return;
    const dataLayer = [];
    const push = Array.prototype.push;
    dataLayer.push = function (...items) {
      for (const item of items) {
        if (item && item[0] === "event" && item[1] === "conversion") {
          window.__recordGtagConversion({ ...(item[2] || {}) });
        }
      }
      return push.apply(this, items);
    };
    window.dataLayer = dataLayer;
  });
  if (consent === "granted") {
    await context.addInitScript(() => {
      localStorage.setItem(
        "cookieConsent",
        JSON.stringify({ essential: true, analytics: true, marketing: true }),
      );
    });
  }

  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin === BASE_ORIGIN) {
      if (url.pathname.startsWith(GATEWAY) && !(url.pathname === GATEWAY && !url.search)) {
        recordHit(hits, url, request.postData());
        return route.fulfill({ status: 204, body: "" });
      }
      return route.continue();
    }
    if (url.hostname === "www.googletagmanager.com" && ["/gtag/js", "/gtm.js"].includes(url.pathname)) {
      return route.continue();
    }
    if (url.hostname === "sport.bookinggood.net") {
      return route.fulfill({ status: 200, contentType: "text/html", body: MOCK_WIDGET });
    }
    recordHit(hits, url, request.postData());
    return route.fulfill({ status: 204, body: "" });
  });

  const page = await context.newPage();
  return { context, page, hits, gtagConversions };
}

const pageViewConversions = (hits) =>
  hits.filter((h) => PAGE_VIEW_CONVERSION.test(h.en || "") || h.path.includes("/measurement/conversion"));

const pageViewPaths = (hits) =>
  hits.filter((h) => h.en === "page_view" && h.dl).map((h) => new URL(h.dl).pathname);

async function settle(page, ms = 4000) {
  await page.waitForTimeout(ms);
}

async function leave(page) {
  await settle(page, 2000);
  await page.goto("about:blank");
  await settle(page, 1500);
}

for (const consent of ["denied", "granted"]) {
  test(`page loads send no page-view conversions (consent ${consent})`, async () => {
    const { context, page, hits } = await newSession({ consent });
    const paths = ["/booking", "/booking/success", "/about", "/contact", "/en/booking"];
    for (const path of paths) {
      await page.goto(`${BASE_URL}${path}`);
      await settle(page);
    }
    await leave(page);

    assert.deepEqual(pageViewConversions(hits), []);
    const seen = new Set(pageViewPaths(hits));
    for (const path of paths) {
      assert.ok(seen.has(path), `Google tag should still send a page_view for ${path}`);
    }
    await context.close();
  });
}

test("in-app navigation sends no page-view conversions", async () => {
  const { context, page, hits } = await newSession({ consent: "granted" });
  await page.goto(`${BASE_URL}/`);
  await settle(page);
  for (const href of ["/about", "/contact", "/booking"]) {
    await page.locator(`a[href="${href}"]`).first().click();
    await page.waitForURL(new RegExp(`${href}$`));
    await settle(page);
  }
  // GA4 batches plain page_view hits; without a key event to force a flush the
  // last soft navigation's hit goes out on the batch timer.
  await settle(page, 8000);
  await leave(page);

  assert.deepEqual(pageViewConversions(hits), []);
  const seen = new Set(pageViewPaths(hits));
  for (const path of ["/", "/about", "/contact", "/booking"]) {
    assert.ok(seen.has(path), `Google tag should still send a page_view for ${path}`);
  }
  await context.close();
});

test("a saved BookingGood booking still sends exactly one Vnw5 conversion", async () => {
  const { context, page, hits, gtagConversions } = await newSession({ consent: "granted" });
  await page.goto(`${BASE_URL}/booking`);
  const frame = await (async () => {
    for (let i = 0; i < 100; i += 1) {
      const f = page.frames().find((fr) => fr.url().startsWith("https://sport.bookinggood.net"));
      if (f) return f;
      await page.waitForTimeout(100);
    }
    throw new Error("BookingGood iframe did not load");
  })();
  await frame.waitForFunction(() => typeof window.send === "function");
  await settle(page, 2000);
  await frame.evaluate(() =>
    window.send({
      source: "bookinggood",
      version: 1,
      type: "bg:booking-created",
      payload: { bookingId: "48213", redirectUrl: "https://www.doubleyellowsquash.com/booking/success" },
    }),
  );
  await page.waitForURL(/\/booking\/success\?booking_id=48213$/);
  await settle(page);
  await leave(page);

  assert.deepEqual(
    gtagConversions.map(({ send_to, transaction_id }) => ({ send_to, transaction_id })),
    [{ send_to: `AW-17840430561/${ADS_LABEL}`, transaction_id: "48213" }],
  );
  const adsHits = hits.filter((h) => h.label === ADS_LABEL);
  assert.ok(adsHits.length > 0, "Vnw5 conversion request should be sent");
  assert.ok(adsHits.every((h) => h.oid === "48213"), "Vnw5 requests carry the booking id");
  assert.deepEqual(pageViewConversions(hits), []);
  await context.close();
});
