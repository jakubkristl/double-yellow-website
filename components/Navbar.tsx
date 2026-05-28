"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Route } from "next";

type NavItem = {
  href: string;
  labelBg: string;
  labelEn: string;
};

const nav: NavItem[] = [
  { href: "/", labelBg: "Начало", labelEn: "Home" },
  { href: "/booking", labelBg: "Резервации", labelEn: "Booking" },
  { href: "/membership", labelBg: "Абонаменти", labelEn: "Membership" },
  { href: "/activities", labelBg: "Активности", labelEn: "Activities" },
  { href: "/team", labelBg: "Екип", labelEn: "Team" },
  { href: "/events", labelBg: "Събития", labelEn: "Events" },
  { href: "/store", labelBg: "Магазин", labelEn: "Store" },
  { href: "/gallery", labelBg: "Галерия", labelEn: "Gallery" },
  { href: "/about", labelBg: "За нас", labelEn: "About" },
  { href: "/contact", labelBg: "Контакт", labelEn: "Contact" },
  { href: "/learn", labelBg: "Научи", labelEn: "Learn" },
];

function withPrefix(path: string, prefix: string): Route {
  if (path === "/") {
    return ((prefix || "/") as Route);
  }
  return (`${prefix}${path}` as Route);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const prefix = isEn ? "/en" : "";
  const basePath = isEn
    ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    : pathname;
  const languageSwitchHref = (isEn
    ? `/bg${basePath === "/" ? "" : basePath}`
    : `/en${pathname === "/" ? "" : pathname}`) as Route;

  return (
    <header className="navbar-wrap">
      <nav className="container navbar" aria-label={isEn ? "Main navigation" : "Главна навигация"}>
        <Link href={withPrefix("/", prefix)} className="brand" aria-label={isEn ? "Double Yellow Squash Club | Home" : "Double Yellow Squash Club | Начало"}>
          <Image
            src="/logo.png"
            alt="Double Yellow logo"
            width={52}
            height={52}
            priority
          />
          <span className="brand-text notranslate">Double Yellow Squash Club</span>
        </Link>

        {/* Hamburger Button */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={isEn ? "Toggle menu" : "Превключи меню"}
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
                ? basePath === "/"
                : basePath.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link 
                  href={withPrefix(item.href, prefix)} 
                  className={`link ${active ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isEn ? item.labelEn : item.labelBg}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={languageSwitchHref}
              className="link link-lang-toggle"
              aria-label={isEn ? "Switch language to Bulgarian" : "Switch language to English"}
              onClick={() => setMobileMenuOpen(false)}
            >
              {isEn ? "🇧🇬 BG" : "🇬🇧 EN"}
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .navbar-wrap {
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          position: sticky;
          top: 0;
          z-index: 11000;
          isolation: isolate;
        }
        .container {
          max-width: 1320px;
          margin: 0 auto;
          width: min(1320px, calc(100vw - 32px));
          padding: 12px 16px;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 14px 16px;
          position: relative;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          z-index: 11002;
          min-width: 0;
          flex: 1 1 100%;
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
          z-index: 11002;
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
          padding: 0 0 0 64px;
          flex: 1 1 100%;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;
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
        .link-lang-toggle {
          border: 1px solid rgba(255, 204, 0, 0.35);
          border-radius: 999px;
          padding: 6px 12px;
          font-size: clamp(16px, 0.6vw + 11px, 19px);
          line-height: 1;
        }
        .link-lang-toggle:hover {
          border-color: rgba(255, 204, 0, 0.8);
          transform: translateY(-1px);
        }

        @media (max-width: 1180px) {
          .container {
            gap: 10px 16px;
          }

          .brand-text {
            font-size: clamp(20px, 1vw + 12px, 28px);
          }

          .menu {
            padding-left: 64px;
            gap: 12px 18px;
          }

          .link {
            font-size: 18px;
          }
        }

        @media (max-width: 820px) {
          .container {
            align-items: center;
            justify-content: space-between;
          }

          .brand {
            flex: 1 1 auto;
          }

          .menu {
            padding-left: 0;
          }

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
            z-index: 11001;
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
            flex-wrap: nowrap;
            justify-content: flex-start;
            padding: 100px 30px 30px;
            gap: 20px;
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.8);
            transition: right 0.3s ease;
            z-index: 11002;
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
          .link-lang-toggle {
            width: fit-content;
            padding: 10px 14px;
            border-bottom: 1px solid rgba(255, 204, 0, 0.35);
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
