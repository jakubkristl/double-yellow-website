"use client";

import { FormEvent, useState } from "react";
import { trackLeadConversion } from "@/lib/tracking";

type MembershipLeadButtonsProps = {
  locale?: "bg" | "en";
  packName: string;
};

const copy = {
  bg: {
    whatsappBase: "https://wa.me/359896754014",
    prefill: (pack: string, name: string, email: string) =>
      `Здравейте Double Yellow! Искам абонамент: ${pack}.\n\nИме: ${name || "—"}\nИмейл: ${email || "—"}`,
    namePlaceholder: "Твоето име",
    emailPlaceholder: "Твоят имейл",
    submit: "Заяви на WhatsApp",
    booking: "Резервирай корт",
    hint: "Остави имейл — получаваме заявката и продължаваме в WhatsApp.",
  },
  en: {
    whatsappBase: "https://wa.me/359896754014",
    prefill: (pack: string, name: string, email: string) =>
      `Hi Double Yellow! I want a membership pack: ${pack}.\n\nName: ${name || "—"}\nEmail: ${email || "—"}`,
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    submit: "Request on WhatsApp",
    booking: "Book a court",
    hint: "Leave your email — we capture the lead and continue on WhatsApp.",
  },
} as const;

export default function MembershipLeadButtons({
  locale = "bg",
  packName,
}: MembershipLeadButtonsProps) {
  const text = copy[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) {
      return;
    }
    setBusy(true);

    const source = `membership_${packName}`;
    trackLeadConversion(source);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source,
          pack: packName,
          locale,
        }),
      });
    } catch {
      // Still open WhatsApp — desk should not lose the lead path.
    }

    const message = encodeURIComponent(text.prefill(packName, name.trim(), email.trim()));
    window.open(`${text.whatsappBase}?text=${message}`, "_blank", "noopener,noreferrer");
    setBusy(false);
  }

  return (
    <div className="cta-buttons" style={{ marginTop: 16 }}>
      <p className="muted" style={{ marginBottom: 8, fontSize: 13 }}>
        {text.hint}
      </p>
      <form onSubmit={onSubmit} className="lead-form" style={{ gap: 8 }}>
        <input
          type="text"
          name="name"
          placeholder={text.namePlaceholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          placeholder={text.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {text.submit}
        </button>
      </form>
      <a href={locale === "en" ? "/en/booking" : "/booking"} className="btn btn-secondary">
        {text.booking}
      </a>
    </div>
  );
}
