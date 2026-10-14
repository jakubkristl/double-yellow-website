export type Item = {
  name: string;
  /** Fallback EUR price when RacketPoint has no matching SKU yet. */
  price: number;
  image?: string;
  imageAlt?: string;
  /**
   * RacketPoint product key (without POS- prefix).
   * Live IDs are often `POS-{racketpointId}`; matching accepts both.
   * Omit for club-only lines (rentals, drinks).
   */
  racketpointId?: string;
};

export type Category = {
  title: string;
  items: Item[];
};

export const CATEGORIES: Category[] = [
  {
    title: "Rackets",
    items: [
      { name: "Unsquashable MIGUEL RODRIGUEZ AUTOGRAPH", price: 115.00, racketpointId: "unsquashable-miguel-rodriguez-autograph", image: "/store/products/rackets/unsquashable-miguel-rodriguez-autograph.jpg" },
      { name: "Unsquashable MIGUEL RODRÍGUEZ ONE20 Limited Edition", price: 115.00, racketpointId: "unsquashable-miguel-rodriguez-one20", image: "/store/products/rackets/Unsquashable MIGUEL RODRÍGUEZ ONE20 Limited Edition.webp" },
      { name: "Unsquashable NICK WALL 125 Limited Edition", price: 105.00, racketpointId: "unsquashable-nick-wall-125-limited-edition", image: "/store/products/rackets/Unsquashable NICK WALL 125 Limited Edition.webp" },
      { name: "Unsquashable Y-TEC PRO 125", price: 95.00, racketpointId: "unsquashable-y-tec-pro-125", image: "/store/products/rackets/Unsquashable Y-TEC PRO 125.webp" },
      { name: "Unsquashable Y-TEC PRO 110", price: 95.00, racketpointId: "unsquashable-y-tec-pro-110", image: "/store/products/rackets/Unsquashable Y-TEC PRO 110.webp" },
      { name: "Unsquashable TOUR-TEC PRO 125", price: 75.00, racketpointId: "unsquashable-tour-tec-pro-125", image: "/store/products/rackets/Unsquashable TOUR-TEC PRO 125.webp" },
      { name: "Unsquashable JAMES WILLSTROP SIGNATURE", price: 115.00, racketpointId: "unsquashable-james-willstrop-signature", image: "/store/products/rackets/Unsquashable JAMES WILLSTROP SIGNATURE.webp" },
      { name: "Unsquashable ULTRA-LITE 135", price: 59.00, racketpointId: "unsquashable-ultra-lite-135", image: "/store/products/rackets/Unsquashable ULTRA-LITE 135.webp" },
      { name: "Unsquashable SYN-TEC 125", price: 80.00, racketpointId: "unsquashable-syn-tec-125", image: "/store/products/rackets/Unsquashable SYN-TEC 125.webp" },
      { name: "Unsquashable SAM GERRITS AUTOGRAPH", price: 99.00, racketpointId: "unsquashable-sam-gerrits-autograph", image: "/store/products/rackets/Unsquashable SAM GERRITS AUTOGRAPH.webp" },
      { name: "Prince Vortex Pro 650", price: 89.00, racketpointId: "prince-vortex-pro-650", image: "/store/products/rackets/Prince Vortex Pro 650.webp" },
      { name: "Dunlop Sonic Core Ultimate 132", price: 95.00, racketpointId: "dunlop-sonic-core-ultimate-132", image: "/store/products/rackets/Dunlop Sonic Core Ultimate 132.webp" },
      { name: "Saxon Aerox 125", price: 59.00, racketpointId: "saxon-aerox-125", image: "/store/products/rackets/Saxon Aerox 125.jpg" },
      { name: "Tecnifibre Carboflex 120 X-Top V2", price: 165.00, racketpointId: "tecnifibre-carboflex-120-x-top-v2", image: "/store/products/rackets/Tecnifibre Carboflex 120 X-Top V2.webp" },
    ],
  },
  {
    title: "Shoes",
    items: [
      { name: "Unsquashable CROSS-TEC Black Shoe", price: 85.00, racketpointId: "unsquashable-cross-tec-black-shoe", image: "/store/products/shoes/Unsquashable CROSS-TEC Black Shoe.webp" },
      { name: "Unsquashable FAST-TEC Pro Shoe", price: 95.00, racketpointId: "unsquashable-fast-tec-pro-shoe", image: "/store/products/shoes/Unsquashable FAST-TEC Pro Shoe.webp" },
      { name: "Unsquashable TOUR-TEC PRO Shoe", price: 90.00, image: "/store/products/shoes/Unsquashable TOUR-TEC PRO Shoe.webp" },
    ],
  },
  {
    title: "Bags & Backpacks",
    items: [
      { name: "Unsquashable TOUR-TEC PRO Backpack", price: 59.00, racketpointId: "unsquashable-tour-tec-pro-backpack", image: "/store/products/bags/Unsquashable TOUR-TEC PRO Backpack.webp" },
      { name: "Unsquashable TOUR-TEC PRO Deluxe Racket Bag", price: 99.00, racketpointId: "unsquashable-tour-tec-pro-deluxe-racket-bag", image: "/store/products/bags/Unsquashable TOUR-TEC PRO Deluxe Racket Bag.webp" },
    ],
  },
  {
    title: "Strings & Grips",
    items: [
      { name: "Unsquashable TOUR-TEC PRO 1.18 Squash String - Yellow - 100M Reel", price: 92.00, racketpointId: "unsquashable-tour-tec-pro-string-reel", image: "/store/products/strings-grips/Unsquashable TOUR-TEC PRO 1.18 String (Yellow) — 100m Reel.webp" },
      { name: "Unsquashable TOUR-TEC PRO PU Grip - 6 Pack", price: 24.00, racketpointId: "unsquashable-tour-tec-pro-pu-grip-6-pack", image: "/store/products/strings-grips/Unsquashable TOUR-TEC PRO PU Grip.jpg" },
      // Single grip sold at the desk (reception-pos) — not a RacketPoint retail SKU
      { name: "Karakal PU Super Grip", price: 4.00, image: "/store/products/strings-grips/karakal-pu-grip.jpg" },
    ],
  },
  {
    title: "Apparel",
    items: [
      { name: "Tecnifibre Team Tech Tee", price: 35.00, racketpointId: "tecnifibre-team-tech-tee", image: "/store/products/apparel/Tecnifibre Team Tech Tee.avif" },
      { name: "Tecnifibre Team Cotton Tee", price: 20.00, racketpointId: "tecnifibre-team-cotton-tee", image: "/store/products/apparel/Tecnifibre Team Cotton Tee.jpg" },
      { name: "Dunlop Men's Indoor Crew Socks", price: 4.00, racketpointId: "dunlop-mens-indoor-crew-socks", image: "/store/products/apparel/Dunlop Men's Indoor Crew Socks.webp" },
      { name: "Tecnifibre Tech Socks", price: 9.50, racketpointId: "tecnifibre-tech-socks", image: "/store/products/apparel/Tecnifibre Tech Socks.jpg" },
      { name: "Tecnifibre Classic Socks", price: 9.50, racketpointId: "tecnifibre-classic-socks", image: "/store/products/apparel/Tecnifibre Classic Socks.jpg" },
      { name: "Tecnifibre Wristband XL", price: 5.60, racketpointId: "tecnifibre-wristband-xl", image: "/store/products/apparel/Tecnifibre Wristband XL.jpg" },
      { name: "Dunlop Pro Ball 12 Pack", price: 48.00, racketpointId: "dunlop-pro-ball-12-pack", image: "/store/products/apparel/Dunlop Pro Ball.WebP" },
    ],
  },
  {
    title: "Eyewear",
    items: [{ name: "Dunlop Junior Protective Eyewear", price: 21.00, racketpointId: "dunlop-junior-protective-eyewear", image: "/store/products/eyewear/Dunlop Junior Protective Eyewear.jpg" }],
  },
  {
    title: "Drinks",
    items: [
      { name: "Boheme Light 11°", price: 1.99 },
      { name: "Boheme Granat 13°", price: 2.15 },
      { name: "Clausthaler Classic Premium 0.5l can", price: 1.94 },
      { name: "Clausthaler Classic Premium 0.33l", price: 1.02 },
      { name: "Radeberger Pilsner 0.5l can", price: 1.99 },
      { name: "Radeberger Pilsner 0.33l", price: 1.28 },
      { name: "Schöfferhofer Mix Grapefruit", price: 1.99 },
      { name: "Bankya 0.5l", price: 0.61 },
      { name: "Bankya 1.5l", price: 0.97 },
      { name: "Rosa 0.5l", price: 0.61 },
      { name: "Rosa 1.5l", price: 0.97 },
      { name: "Schweppes Club Soda 0.5l", price: 0.77 },
      { name: "Coca-Cola 0.33l", price: 1.28 },
      { name: "Powerade 0.5l", price: 2.05 },
      { name: "Fuze Tea 0.5l", price: 1.74 },
      { name: "Costa Coffee", price: 1.28 },
    ],
  },
  {
    title: "Rentals",
    items: [
      { name: "Racket Rental", price: 2.50, image: "/store/products/rentals/Racket.webp" },
      { name: "Towel Rental", price: 1.00, image: "/store/products/rentals/Towel.jpg" },
    ],
  },
];
