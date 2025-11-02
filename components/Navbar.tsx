"use client";

import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Booking" },
  { href: "/membership", label: "Membership" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <div className="navbar-wrap">
      <nav className="container navbar">
        <Link href="/" className="brand" aria-label="Double Yellow – Home">
          <Image
            src="/logo.png"
            alt="Double Yellow logo"
            width={52}
            height={52}
            priority
          />
          {/* Bigger brand text */}
          <span className="brand-text">Double Yellow</span>
        </Link>

        <ul className="menu">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
