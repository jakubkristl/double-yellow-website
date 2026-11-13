import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES } from "../data/storeItems.ts";
import {
  BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS,
  BLACK_WEEKEND_SPECIAL_OFFERS,
  blackWeekendCardSaleEur,
  blackWeekendStoreOffer,
  isBlackWeekendSaleActive,
  tenPercentOff,
} from "../lib/heroSlideSchedule.ts";

const during = new Date(BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS - 1);
const ended = new Date(BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS);

test("Black Weekend sale ends at the carousel instant", () => {
  assert.equal(isBlackWeekendSaleActive(during), true);
  assert.equal(isBlackWeekendSaleActive(ended), false);
});

test("Unsquashable rackets are 10% off, specials keep their own sale price, nothing else moves", () => {
  const seen = new Set();

  for (const category of CATEGORIES) {
    for (const item of category.items) {
      seen.add(item.name);
      const offer = blackWeekendStoreOffer(category.title, item.name, item.price, during);
      const after = blackWeekendStoreOffer(category.title, item.name, item.price, ended);
      assert.equal(after, null, item.name);

      const special = BLACK_WEEKEND_SPECIAL_OFFERS[item.name];
      if (special) {
        assert.equal(item.price, special.shelfEur, item.name);
        assert.equal(offer?.saleEur, special.saleEur, item.name);
        assert.equal(offer?.specialOffer, true, item.name);
        continue;
      }

      if (category.title === "Rackets" && item.name.startsWith("Unsquashable ")) {
        assert.equal(offer?.saleEur, tenPercentOff(item.price), item.name);
        assert.equal(offer?.specialOffer, false, item.name);
        continue;
      }

      assert.equal(offer, null, item.name);
    }
  }

  assert.equal(seen.has("Unsquashable Y-TEC PRO 120"), true);
  assert.equal(seen.has("Head Radical Junior"), true);
  assert.equal(seen.has("Unsquashable Y-TEC PRO 125"), true);

  const y125 = CATEGORIES.flatMap((category) => category.items).find((item) => item.name === "Unsquashable Y-TEC PRO 125");
  assert.equal(y125?.price, 132);
  assert.equal(blackWeekendStoreOffer("Rackets", "Unsquashable Y-TEC PRO 125", 132, during)?.saleEur, 118.8);

  const grip = CATEGORIES.flatMap((category) => category.items).find((item) => item.name === "Karakal PU Super Grip");
  const eyewear = CATEGORIES.flatMap((category) => category.items).find((item) => item.name === "Dunlop Junior Protective Eyewear");
  assert.equal(grip?.price, 4);
  assert.equal(eyewear?.price, 29);
  assert.equal(blackWeekendStoreOffer("Strings & Grips", "Karakal PU Super Grip", 4, during), null);
  assert.equal(blackWeekendStoreOffer("Eyewear", "Dunlop Junior Protective Eyewear", 29, during), null);
  assert.equal(blackWeekendStoreOffer("Shoes", "Unsquashable CROSS-TEC Black Shoe", 85, during), null);
});

test("club cards are 10% off the current shelf, including the daytime pass already at €63", () => {
  assert.equal(blackWeekendCardSaleEur(36, during), 32.4);
  assert.equal(blackWeekendCardSaleEur(66, during), 59.4);
  assert.equal(blackWeekendCardSaleEur(97, during), 87.3);
  assert.equal(blackWeekendCardSaleEur(70, during), 63);
  assert.equal(blackWeekendCardSaleEur(70, ended), null);
  assert.equal(blackWeekendCardSaleEur(36, ended), null);
});
