"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import PhoneLink from "@/components/PhoneLink";
import { BUSINESS, getVenueAddressLine } from "@/lib/business";

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname?.startsWith("/en/");
  const prefix = isEn ? "/en" : "";
  const basePath = isEn
    ? pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    : pathname;
  const languageSwitchHref = (isEn
    ? `/bg${basePath === "/" ? "" : basePath}`
    : `/en${pathname === "/" ? "" : pathname}`) as Route;

  const linkTo = (path: string): Route => {
    if (path === "/") {
      return ((prefix || "/") as Route);
    }
    return (`${prefix}${path}` as Route);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4 className="footer-title notranslate">{BUSINESS.name}</h4>
          <p className="muted">{getVenueAddressLine(isEn ? "en" : "bg")}</p>
          <p className="muted">
            {isEn
              ? "Open daily • MultiSport, CoolFit & card payments accepted"
              : "Отворено всеки ден • Приемаме MultiSport, CoolFit и картови плащания"}
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{isEn ? "Quick links" : "Бързи връзки"}</h4>
          <ul className="link-list">
            <li>
              <Link href={linkTo("/booking")}>{isEn ? "Book a court" : "Резервирай корт"}</Link>
            </li>
            <li>
              <Link href={linkTo("/beginner-squash-sofia")}>
                {isEn ? "New to squash? Start here" : "Нов в скуоша? Започни оттук"}
              </Link>
            </li>
            <li>
              <Link href={linkTo("/membership")}>{isEn ? "Membership packs" : "Абонаментни пакети"}</Link>
            </li>
            <li>
              <Link href={linkTo("/events")}>{isEn ? "Events & programs" : "Събития и програми"}</Link>
            </li>
            <li>
              <Link href={linkTo("/squash-sofia")}>{isEn ? "Squash Sofia" : "Скуош в София"}</Link>
            </li>
            <li>
              <Link href={linkTo("/learn")}>{isEn ? "Beginner tips & guides" : "Съвети и ръководства"}</Link>
            </li>
            <li>
              <Link href={languageSwitchHref}>{isEn ? "Българска версия" : "English version"}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{isEn ? "Contact" : "Контакт"}</h4>
          <p className="muted">
            <PhoneLink href={BUSINESS.telephoneTelHref}>
              {BUSINESS.telephoneDisplay}
            </PhoneLink>
          </p>
          <p className="muted">
            <a href={`mailto:${BUSINESS.email}`} aria-label="Email Double Yellow">
              {BUSINESS.email}
            </a>
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">{isEn ? "Legal" : "Правна информация"}</h4>
          <ul className="link-list">
            <li>
              <Link href={linkTo("/privacy")}>{isEn ? "Privacy Policy" : "Политика за поверителност"}</Link>
            </li>
            <li>
              <Link href={linkTo("/terms")}>{isEn ? "Terms & Conditions" : "Общи условия"}</Link>
            </li>
            <li>
              <Link href={linkTo("/cookies")}>{isEn ? "Cookie Policy" : "Политика за бисквитки"}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-note">
        <p className="footer-note-main">
          © {new Date().getFullYear()} {BUSINESS.name}
        </p>
        <p className="footer-note-meta">
          Operated by {BUSINESS.legalName} • EIK {BUSINESS.eik} •{" "}
          {BUSINESS.legal.streetAddress}, {BUSINESS.legal.postalCode}{" "}
          {BUSINESS.legal.addressLocality}
        </p>
      </div>
    </footer>
  );
}
