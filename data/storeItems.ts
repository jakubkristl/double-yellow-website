export type Item = {
  name: string;
  priceBGN: number;
  priceEUR: number;
  image?: string;
  imageAlt?: string;
};

export type Category = {
  title: string;
  items: Item[];
};

export const CATEGORIES: Category[] = [
  {
    title: "Rackets",
    items: [
      { name: "Unsquashable MIGUEL RODRÍGUEZ ONE20 Limited Edition", priceBGN: 190, priceEUR: 97, image: "/store/products/rackets/Unsquashable MIGUEL RODRÍGUEZ ONE20 Limited Edition.webp" },
      { name: "Unsquashable NICK WALL 125 Limited Edition", priceBGN: 190, priceEUR: 97, image: "/store/products/rackets/Unsquashable NICK WALL 125 Limited Edition.webp" },
      { name: "Unsquashable Y-TEC PRO 125", priceBGN: 175, priceEUR: 89, image: "/store/products/rackets/Unsquashable Y-TEC PRO 125.webp" },
      { name: "Unsquashable Y-TEC PRO 110", priceBGN: 175, priceEUR: 89, image: "/store/products/rackets/Unsquashable Y-TEC PRO 110.webp" },
      { name: "Unsquashable TOUR-TEC PRO 125", priceBGN: 175, priceEUR: 89, image: "/store/products/rackets/Unsquashable TOUR-TEC PRO 125.webp" },
      { name: "Unsquashable JAMES WILLSTROP SIGNATURE", priceBGN: 139, priceEUR: 71, image: "/store/products/rackets/Unsquashable JAMES WILLSTROP SIGNATURE.webp" },
      { name: "Unsquashable ULTRA-LITE 135", priceBGN: 95, priceEUR: 48, image: "/store/products/rackets/Unsquashable ULTRA-LITE 135.webp" },
      { name: "Unsquashable SYN-TEC 125", priceBGN: 155, priceEUR: 79, image: "/store/products/rackets/Unsquashable SYN-TEC 125.webp" },
      { name: "Unsquashable SAM GERRITS AUTOGRAPH", priceBGN: 175, priceEUR: 89, image: "/store/products/rackets/Unsquashable SAM GERRITS AUTOGRAPH.webp" },
      { name: "Prince Vortex Pro 650", priceBGN: 175, priceEUR: 89, image: "/store/products/rackets/Prince Vortex Pro 650.webp" },
      { name: "Tecnifibre Carboflex 120 X-Top V2", priceBGN: 320, priceEUR: 163, image: "/store/products/rackets/Tecnifibre Carboflex 120 X-Top V2.webp" },
    ],
  },
  {
    title: "Shoes",
    items: [
      { name: "Unsquashable CROSS-TEC Black Shoe", priceBGN: 149, priceEUR: 76, image: "/store/products/shoes/Unsquashable CROSS-TEC Black Shoe.webp" },
      { name: "Unsquashable TOUR-TEC PRO Shoe", priceBGN: 149, priceEUR: 76, image: "/store/products/shoes/Unsquashable TOUR-TEC PRO Shoe.webp" },
    ],
  },
  {
    title: "Bags & Backpacks",
    items: [
      { name: "Unsquashable TOUR-TEC PRO Backpack", priceBGN: 99, priceEUR: 52, image: "/store/products/bags/Unsquashable TOUR-TEC PRO Backpack.webp" },
      { name: "Unsquashable TOUR-TEC PRO Deluxe Racket Bag", priceBGN: 179, priceEUR: 91, image: "/store/products/bags/Unsquashable TOUR-TEC PRO Deluxe Racket Bag.webp" },
    ],
  },
  {
    title: "Strings & Grips",
    items: [
      { name: "Unsquashable TOUR-TEC PRO 1.18 String (Yellow) — 100m Reel", priceBGN: 180, priceEUR: 92, image: "/store/products/strings-grips/Unsquashable TOUR-TEC PRO 1.18 String (Yellow) — 100m Reel.webp" },
      { name: "Unsquashable TOUR-TEC PRO PU Grip", priceBGN: 6, priceEUR: 3.07, image: "/store/products/strings-grips/Unsquashable TOUR-TEC PRO PU Grip.webp" },
    ],
  },
  {
    title: "Apparel",
    items: [
      { name: "Tecnifibre Team Tech Tee", priceBGN: 70, priceEUR: 36, image: "/store/products/apparel/Tecnifibre Team Tech Tee.avif" },
      { name: "Tecnifibre Team Cotton Tee", priceBGN: 39, priceEUR: 20, image: "/store/products/apparel/Tecnifibre Team Cotton Tee.jpg" },
      { name: "Tecnifibre Tech Socks", priceBGN: 18, priceEUR: 9, image: "/store/products/apparel/Tecnifibre Tech Socks.jpg" },
      { name: "Tecnifibre Classic Socks", priceBGN: 18, priceEUR: 9, image: "/store/products/apparel/Tecnifibre Classic Socks.jpg" },
      { name: "Tecnifibre Wristband XL", priceBGN: 11, priceEUR: 5, image: "/store/products/apparel/Tecnifibre Wristband XL.jpg" },
      { name: "Dunlop Pro Ball", priceBGN: 8, priceEUR: 4.09, image: "/store/products/apparel/Dunlop Pro Ball.WebP" },
    ],
  },
  {
    title: "Eyewear",
    items: [{ name: "Dunlop Junior Protective Eyewear", priceBGN: 40, priceEUR: 21, image: "/store/products/eyewear/Dunlop Junior Protective Eyewear.jpg" }],
  },
  {
    title: "Drinks",
    items: [
      { name: "Boheme Light 11°", priceBGN: 3.9, priceEUR: 1.99 },
      { name: "Boheme Granat 13°", priceBGN: 4.2, priceEUR: 2.15 },
      { name: "Clausthaler Classic Premium 0.5l can", priceBGN: 3.8, priceEUR: 1.94 },
      { name: "Clausthaler Classic Premium 0.33l", priceBGN: 2, priceEUR: 1.02 },
      { name: "Radeberger Pilsner 0.5l can", priceBGN: 3.9, priceEUR: 1.99 },
      { name: "Radeberger Pilsner 0.33l", priceBGN: 2.5, priceEUR: 1.28 },
      { name: "Schöfferhofer Mix Grapefruit", priceBGN: 3.9, priceEUR: 1.99 },
      { name: "Bankya 0.5l", priceBGN: 1.2, priceEUR: 0.61 },
      { name: "Bankya 1.5l", priceBGN: 1.9, priceEUR: 0.97 },
      { name: "Rosa 0.5l", priceBGN: 1.2, priceEUR: 0.61 },
      { name: "Rosa 1.5l", priceBGN: 1.9, priceEUR: 0.97 },
      { name: "Schweppes Club Soda 0.5l", priceBGN: 1.5, priceEUR: 0.77 },
      { name: "Coca-Cola 0.33l", priceBGN: 2.5, priceEUR: 1.28 },
      { name: "Powerade 0.5l", priceBGN: 4, priceEUR: 2.05 },
      { name: "Fuze Tea 0.5l", priceBGN: 3.4, priceEUR: 1.74 },
      { name: "Costa Coffee", priceBGN: 2.5, priceEUR: 1.28 },
    ],
  },
  {
    title: "Rentals",
    items: [
      { name: "Racket Rental", priceBGN: 5, priceEUR: 2.55, image: "/store/products/rentals/Racket.webp" },
      { name: "Towel Rental", priceBGN: 2, priceEUR: 1.02, image: "/store/products/rentals/Towel.jpg" },
    ],
  },
];
