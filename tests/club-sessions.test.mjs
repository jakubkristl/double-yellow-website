import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getBookingEmbedSrc, getEventsBookingHref } from "../lib/booking.ts";
import { parseClubSessionsHtml } from "../lib/club-sessions.ts";

const weekHtml = readFileSync(
  new URL("./fixtures/bookinggood-events-week.html", import.meta.url),
  "utf8",
);
const duringWeek = new Date("2026-11-17T10:00:00+02:00");

test("public events calendar keeps the four live sessions", () => {
  const slots = parseClubSessionsHtml(weekHtml, duringWeek);
  assert.deepEqual(
    slots.map((slot) => ({
      title: slot.title,
      date: slot.date,
      start: slot.start,
      end: slot.end,
      placesLeft: slot.placesLeft,
      priceEur: slot.priceEur,
      bookable: slot.bookable,
    })),
    [
      {
        title: "Social squash",
        date: "2026-11-19",
        start: "18:00",
        end: "20:00",
        placesLeft: 6,
        priceEur: 10,
        bookable: true,
      },
      {
        title: "Social squash",
        date: "2026-11-20",
        start: "18:00",
        end: "20:00",
        placesLeft: 6,
        priceEur: 10,
        bookable: true,
      },
      {
        title: "Mini squash",
        date: "2026-11-21",
        start: "10:00",
        end: "11:00",
        placesLeft: 6,
        priceEur: 10,
        bookable: true,
      },
      {
        title: "Mini squash",
        date: "2026-11-22",
        start: "10:00",
        end: "11:00",
        placesLeft: 6,
        priceEur: 10,
        bookable: true,
      },
    ],
  );
});

test("a full session cannot be booked and other titles are ignored", () => {
  const html = `
    <table><thead><tr>
      <th><span>20.11</span></th>
      <th><span>21.11</span></th>
    </tr></thead><tbody><tr>
      <td><button class="slot unavailable"><span>18:00</span> <span>0 своб.</span><span>10€ на човек</span><span>Social squash</span></button></td>
      <td><button><span>10:00</span> <span>4 left</span><span>12€ per person</span><span>Time for Ladies</span></button></td>
    </tr></tbody></table>`;
  const slots = parseClubSessionsHtml(html, duringWeek);
  assert.equal(slots.length, 1);
  assert.equal(slots[0].title, "Social squash");
  assert.equal(slots[0].placesLeft, 0);
  assert.equal(slots[0].bookable, false);
});

test("sessions that have already started drop off the list", () => {
  const slots = parseClubSessionsHtml(weekHtml, new Date("2026-11-21T11:30:00+02:00"));
  assert.deepEqual(
    slots.map((slot) => slot.date),
    ["2026-11-22"],
  );
});

test("court booking stays the default embed and events use facility 717", () => {
  assert.equal(
    getBookingEmbedSrc({ theme: "dark" }),
    "https://sport.bookinggood.net/bg/embed/facility/44/72?theme=dark",
  );
  assert.equal(
    getBookingEmbedSrc({ day: "5", time: "18:00", theme: "dark" }),
    "https://sport.bookinggood.net/bg/embed/facility/44/72?theme=dark&day=5&time=18%3A00",
  );
  assert.equal(
    getBookingEmbedSrc({ facility: "events", theme: "dark" }),
    "https://sport.bookinggood.net/bg/embed/facility/44/717?theme=dark",
  );
  assert.equal(getEventsBookingHref("bg"), "/booking?facility=events#event-calendar");
  assert.equal(getEventsBookingHref("en"), "/en/booking?facility=events#event-calendar");
});
