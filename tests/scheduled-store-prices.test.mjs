import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES } from "../data/storeItems.ts";
import {
  CURRENT_RACKET_RENTAL_EUR,
  SCHEDULED_RACKET_RENTAL_EUR,
  listedStorePriceEur,
  sofiaDateKey,
} from "../lib/scheduledStorePrices.ts";

function sofiaWall(year, month, day, hour, minute) {
  const labeledUtc = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offsetMinutes = (date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Sofia",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);
    const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
    const wallAsUtc = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second),
    );
    return Math.round((wallAsUtc - date.getTime()) / 60_000);
  };
  const firstOffset = offsetMinutes(labeledUtc);
  let utc = new Date(labeledUtc.getTime() - firstOffset * 60_000);
  const corrected = offsetMinutes(utc);
  if (corrected !== firstOffset) {
    utc = new Date(labeledUtc.getTime() - corrected * 60_000);
  }
  return utc;
}

const rentals = CATEGORIES.find((category) => category.title === "Rentals");
const racket = rentals?.items.find((item) => item.name === "Racket Rental");
const towel = rentals?.items.find((item) => item.name === "Towel Rental");

test("store catalog keeps today's racket rental until the Sofia gate", () => {
  assert.equal(racket?.price, CURRENT_RACKET_RENTAL_EUR);
  assert.equal(towel?.price, 1);
  const before = sofiaWall(2026, 10, 31, 23, 59);
  const after = sofiaWall(2026, 11, 1, 0, 0);
  assert.equal(sofiaDateKey(before), "2026-10-31");
  assert.equal(sofiaDateKey(after), "2026-11-01");
  assert.equal(listedStorePriceEur("Racket Rental", 2.5, before), 2.5);
  assert.equal(listedStorePriceEur("Racket Rental", 2.5, after), SCHEDULED_RACKET_RENTAL_EUR);
  assert.equal(listedStorePriceEur("Towel Rental", 1, after), 1);
  assert.equal(listedStorePriceEur("Tecnifibre Team Cotton Tee", 20, after), 20);
});
