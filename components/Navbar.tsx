"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Route } from "next"; // 👈 strict typed routes

type NavItem = {
  href: Route;   // 👈 internal app routes only (must start with "/")
  label: string;
};

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Booking" },
  { href: "/membership", label: "Membership" },
  { href: "/activities", label: "Activities" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/store", label: "Store" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/learn", label: "Learn" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <nav className="container navbar" aria-label="Main navigation">
        <Link href={"/" as Route} className="brand" aria-label="Double Yellow Squash Club | Home">
          <Image
            src="/logo.png"
            alt="Double Yellow logo"
            width={52}
            height={52}
            priority
          />
          <span className="brand-text">Double Yellow Squash Club</span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen ? "true" : "false"}
        >
          <span className={mobileMenuOpen ? "open" : ""}></span>
          <span className={mobileMenuOpen ? "open" : ""}></span>
          <span className={mobileMenuOpen ? "open" : ""}></span>
        </button>

        {/* Overlay */}
        {mobileMenuOpen && (
          <div 
            className="menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <ul className={`menu ${mobileMenuOpen ? "menu-open" : ""}`}>
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`link ${active ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <style jsx>{`
        .navbar-wrap {
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .container {
          max-width: 1320px;
          margin: 0 auto;
          width: min(1320px, calc(100vw - 32px));
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          z-index: 101;
          min-width: 0;
          flex: 1 1 auto;
        }
        .brand-text {
          font-weight: 800;
          font-size: clamp(24px, 1.4vw + 14px, 32px);
          line-height: 1;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* Hamburger Button */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 101;
        }
        .hamburger:focus-visible,
        .link:focus-visible,
        .brand:focus-visible {
          outline: 3px solid #ffcc00;
          outline-offset: 3px;
          border-radius: 6px;
        }
        .hamburger span {
          display: block;
          width: 28px;
          height: 3px;
          background: var(--accent);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger span.open:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        .hamburger span.open:nth-child(2) {
          opacity: 0;
        }
        .hamburger span.open:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
        
        /* Overlay */
        .menu-overlay {
          display: none;
        }
        
        .menu {
          display: flex;
          gap: clamp(12px, 1vw, 22px);
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 0 0 auto;
        }
        .link {
          color: #ffcc00;
          font-weight: 900;
          font-size: clamp(18px, 0.85vw + 10px, 22px);
          text-decoration: none;
          position: relative;
          letter-spacing: 0.2px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
          transition: all 150ms ease;
          white-space: nowrap;
        }
        .link:hover {
          color: #ffdd4d;
          text-shadow: 0 2px 12px rgba(255, 204, 0, 0.5);
          transform: translateY(-1px);
        }
        .link:focus {
          transform: none;
        }
        .link.active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 3px;
          background: #ffcc00;
          border-radius: 2px;
        }

        @media (max-width: 1280px) {
          .hamburger {
            display: flex;
          }

          .menu-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            z-index: 99;
            animation: fadeIn 0.3s ease;
          }

          .menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: min(320px, 86vw);
            height: 100vh;
            background: #0d0d0d;
            flex-direction: column;
            padding: 100px 30px 30px;
            gap: 20px;
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.8);
            transition: right 0.3s ease;
            z-index: 100;
            overflow-y: auto;
            border-left: 2px solid var(--accent);
          }

          .menu-open {
            right: 0;
          }

          .link {
            font-size: 22px;
            display: block;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 204, 0, 0.1);
          }

          .link.active::after {
            bottom: 8px;
            left: 0;
            right: auto;
            width: 40px;
          }
        }

        @media (max-width: 960px) {
          .brand-text {
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .brand-text {
            font-size: 18px;
          }
          .menu {
            width: 240px;
          }
          .link {
            font-size: 18px;
          }
        }
      `}</style>
    </header>
  );
}
