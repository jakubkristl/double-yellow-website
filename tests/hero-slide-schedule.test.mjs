import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS,
  isSlideActive,
  selectActiveSlides,
} from "../lib/heroSlideSchedule.ts";

const blackWeekend = {
  src: "/events/black-weekend-2026.jpg",
  endsAtMs: BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS,
};
const datedPromo = {
  src: "/events/dated-promo.png",
  startsOn: "2026-11-11",
  endsOn: "2026-11-16",
};
const permanent = { src: "/events/bnt-jakob-kristal.png" };

test("Black Weekend ends at 08:00 Europe/Sofia on 17 November 2026", () => {
  assert.equal(BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS, Date.parse("2026-11-17T06:00:00.000Z"));
});

test("Black Weekend stays up through 07:59:59 Sofia and is gone at 08:00:00", () => {
  const justBefore = new Date(BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS - 1);
  const atExpiry = new Date(BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS);

  assert.equal(isSlideActive(blackWeekend, justBefore), true);
  assert.equal(isSlideActive(blackWeekend, atExpiry), false);

  assert.deepEqual(
    selectActiveSlides([blackWeekend, datedPromo, permanent], justBefore).map((slide) => slide.src),
    [blackWeekend.src, permanent.src],
  );
  assert.deepEqual(
    selectActiveSlides([blackWeekend, datedPromo, permanent], atExpiry).map((slide) => slide.src),
    [permanent.src],
  );
});

test("a date-only slide still covers its end date in Sofia and stops the next day", () => {
  const endOf16NovSofia = new Date("2026-11-16T21:59:59.000Z");
  const startOf17NovSofia = new Date("2026-11-16T22:00:00.000Z");

  assert.equal(isSlideActive(datedPromo, endOf16NovSofia), true);
  assert.equal(isSlideActive(datedPromo, startOf17NovSofia), false);
  assert.equal(isSlideActive(blackWeekend, startOf17NovSofia), true);
});

test("an expired timed slide does not return in the undated fallback", () => {
  const atExpiry = new Date(BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS);
  assert.deepEqual(selectActiveSlides([blackWeekend], atExpiry), []);
});

test("homepages lead with Black Weekend and do not promote racketpoint", () => {
  for (const file of ["app/page.tsx", "app_en/page.tsx"]) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(source.includes("racketpoint"), false, file);
    assert.equal(source.includes("black-friday"), false, file);
    const firstSrc = source.match(/src: "([^"]+)"/);
    assert.equal(firstSrc?.[1], "/events/black-weekend-2026.jpg", file);
  }
});
