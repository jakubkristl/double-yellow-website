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
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-wrap">
      <nav className="container navbar">
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
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          z-index: 101;
        }
        .brand-text {
          font-weight: 800;
          font-size: 34px;
          line-height: 1;
          color: #fff;
          white-space: nowrap;
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
        .hamburger span {
          display: block;
          width: 28px;
          height: 3px;
          background: var(--accent);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        
        .menu {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .link {
          color: #ffcc00;
          font-weight: 900;
          font-size: 26px;
          text-decoration: none;
          position: relative;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
          transition: all 150ms ease;
        }
        .link:hover {
          color: #ffdd4d;
          text-shadow: 0 2px 12px rgba(255, 204, 0, 0.5);
          transform: translateY(-1px);
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

        @media (max-width: 960px) {
          .brand-text {
            font-size: 26px;
          }
          .link {
            font-size: 20px;
          }
          .menu {
            gap: 18px;
          }
        }

        @media (max-width: 720px) {
          .hamburger {
            display: flex;
          }
          
          .menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            background: #0a0a0a;
            flex-direction: column;
            padding: 100px 30px 30px;
            gap: 20px;
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
            transition: right 0.3s ease;
            z-index: 100;
            overflow-y: auto;
          }
          
          .menu-open {
            right: 0;
          }
          
          .link {
            font-size: 22px;
            display: block;
            padding: 8px 0;
          }
          
          .link.active::after {
            bottom: 0;
            left: 0;
            right: auto;
            width: 40px;
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
