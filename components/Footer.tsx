"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import PhoneLink from "@/components/PhoneLink";

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
          <h4 className="footer-title notranslate">Double Yellow Squash Club</h4>
          <p className="muted">
            National Sports Academy (NSA), ul. "Akad. Stefan Mladenov" 21, 1700
            Sofia
          </p>
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
            <PhoneLink href="tel:+359896754014">
              +359 896 754 014
            </PhoneLink>
          </p>
          <p className="muted">
            <a href="mailto:jakub@doubleyellowsquash.com" aria-label="Email Double Yellow">
              jakub@doubleyellowsquash.com
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
          © {new Date().getFullYear()} Double Yellow Squash Club
        </p>
        <p className="footer-note-meta">
          Operated by Sport And Beyond EOOD • EIK 208134448 • Lyuben Rusev 6, 1113 Sofia
        </p>
      </div>
    </footer>
  );
}
