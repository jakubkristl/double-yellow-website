"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLLIElement | null>(null);
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const prefix = isEn ? "/en" : "";
  const basePath = isEn
    ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    : pathname;

  const activePath = isEn ? basePath : pathname;
  const languageBgHref = (`/bg${activePath === "/" ? "" : activePath}`) as Route;
  const languageEnHref = (`/en${activePath === "/" ? "" : activePath}`) as Route;

  useEffect(() => {
    setLanguageMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!languageMenuOpen) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [languageMenuOpen]);

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
          <li className="lang-menu" ref={languageMenuRef}>
            <button
              type="button"
              className="lang-toggle-btn"
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
              aria-label={isEn ? "Change language" : "Смени език"}
              onClick={() => setLanguageMenuOpen((open) => !open)}
            >
              <Image
                src={isEn ? "/flags/gb.svg" : "/flags/bg.svg"}
                alt={isEn ? "English" : "Български"}
                width={20}
                height={14}
                className="lang-flag"
              />
              <span>{isEn ? "EN" : "BG"}</span>
              <span className="lang-caret" aria-hidden="true">▾</span>
            </button>

            {languageMenuOpen && (
              <div className="lang-dropdown" role="menu">
                <Link
                  href={languageEnHref}
                  className={`lang-option ${isEn ? "active" : ""}`}
                  role="menuitem"
                  onClick={() => {
                    setLanguageMenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Image src="/flags/gb.svg" alt="English" width={20} height={14} className="lang-flag" />
                  <span className="lang-code">EN</span>
                  <span className="lang-name">English</span>
                </Link>

                <Link
                  href={languageBgHref}
                  className={`lang-option ${!isEn ? "active" : ""}`}
                  role="menuitem"
                  onClick={() => {
                    setLanguageMenuOpen(false);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Image src="/flags/bg.svg" alt="Български" width={20} height={14} className="lang-flag" />
                  <span className="lang-code">BG</span>
                  <span className="lang-name">Български</span>
                </Link>
              </div>
            )}
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
        .lang-toggle-btn:focus-visible,
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

        .lang-menu {
          position: relative;
        }

        .lang-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ffcc00;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.75);
          border-radius: 8px;
          padding: 6px 10px;
          font-weight: 900;
          font-size: clamp(16px, 0.6vw + 11px, 19px);
          cursor: pointer;
          line-height: 1;
        }

        .lang-toggle-btn:hover {
          border-color: #ffffff;
        }

        .lang-caret {
          font-size: 14px;
          opacity: 0.95;
        }

        .lang-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 210px;
          background: #e9e9e9;
          border: 1px solid #bdbdbd;
          border-radius: 4px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          z-index: 11005;
        }

        .lang-option {
          display: grid;
          grid-template-columns: 24px 36px 1fr;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          color: #2b6fe8;
          text-decoration: none;
          font-size: 16px;
          border-bottom: 1px solid #d0d0d0;
          background: #efefef;
        }

        .lang-option:last-child {
          border-bottom: none;
        }

        .lang-option.active {
          background: #dfe5f2;
        }

        .lang-option:hover {
          background: #d8deeb;
        }

        .lang-code {
          font-weight: 700;
          letter-spacing: 0.5px;
          font-size: 18px;
        }

        .lang-name {
          font-size: 16px;
          line-height: 1.1;
          color: #2b6fe8;
        }

        .lang-flag {
          border-radius: 2px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
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
          .lang-toggle-btn {
            margin-top: 8px;
          }

          .lang-dropdown {
            right: auto;
            left: 0;
            min-width: 220px;
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
