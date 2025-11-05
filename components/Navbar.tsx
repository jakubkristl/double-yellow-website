"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Booking" },
  { href: "/membership", label: "Membership" },
  // 👇 New tab appears right after Membership
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
    <header className="navbar-wrap">
      <nav className="container navbar">
        <Link href="/" className="brand" aria-label="Double Yellow Squash Club | Home">
          <Image
            src="/logo.png"
            alt="Double Yellow logo"
            width={52}
            height={52}
            priority
          />
          <span className="brand-text">Double Yellow Squash Club</span>
        </Link>

        <ul className="menu">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                {/* TS fix: href expects Route/UrlObject; our data is string */}
                <Link href={item.href as string} className={`link ${active ? "active" : ""}`}>
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
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }
        .brand-text {
          font-weight: 800;
          font-size: 34px;
          line-height: 1;
          color: #fff;
          white-space: nowrap;
        }
        .menu {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .link {
          color: #ffcc00; /* mustard */
          font-weight: 800;
          font-size: 26px;
          text-decoration: none;
          position: relative;
        }
        .link:hover {
          opacity: 0.9;
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
          .container {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .brand-text {
            font-size: 22px;
          }
          .menu {
            flex-wrap: wrap;
            gap: 14px 20px;
          }
          .link {
            font-size: 18px;
          }
        }
      `}</style>
    </header>
  );
}
