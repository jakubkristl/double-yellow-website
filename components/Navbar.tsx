"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.png"; // adjust if your path differs

const nav = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Booking" },
  { href: "/membership", label: "Membership" },
  { href: "/activities", label: "Activities" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="container navbar-wrap">
        <Link className="brand" href="/" aria-label="Double Yellow Squash Club | Home">
          <Image src={logo} alt="Double Yellow logo" width={52} height={52} priority />
          <span className="brand-text">Double Yellow Squash Club</span>
        </Link>

        <nav className="container navbar">
          <ul className="menu">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  {/* 👇 THIS was missing in your build */}
                  <Link href={item.href} className={`link ${active ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
