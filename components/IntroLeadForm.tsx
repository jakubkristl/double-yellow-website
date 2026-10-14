"use client";

import { FormEvent, useState } from "react";
import { trackLeadConversion } from "@/lib/tracking";

type IntroLeadFormProps = {
  locale?: "bg" | "en";
};

const copy = {
  bg: {
    whatsappBase: "https://wa.me/359896754014",
    whatsappPrefill: (name: string, email: string) =>
      `Здравейте Double Yellow! Искам да заявя първия си безплатен урок. Треньор и екипировка са включени.\n\nИме: ${name || "—"}\nИмейл: ${email || "—"}`,
    kicker: "Безплатен първи урок",
    heading: "Първият урок е безплатен. Треньор и екипировка са включени.",
    lead: "Остави име и имейл — продължаваме в WhatsApp, за да ти предложим първи час.",
    namePlaceholder: "Твоето име",
    emailPlaceholder: "Твоят имейл",
    submit: "Продължи в WhatsApp",
    bookingCta: "Или резервирай корт директно",
    done: "Отворихме WhatsApp. Изпрати съобщението, за да запазим часа.",
  },
  en: {
    whatsappBase: "https://wa.me/359896754014",
    whatsappPrefill: (name: string, email: string) =>
      `Hi Double Yellow! I want my first free lesson. Trainer and equipment included.\n\nName: ${name || "—"}\nEmail: ${email || "—"}`,
    kicker: "Free Intro Offer",
    heading: "First lesson is free. Trainer and equipment included.",
    lead: "Leave your name and email — we continue on WhatsApp to lock your first slot.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    submit: "Continue on WhatsApp",
    bookingCta: "Or book a court now",
    done: "WhatsApp opened. Send the message so we can book your slot.",
  },
} as const;

export default function IntroLeadForm({ locale = "bg" }: IntroLeadFormProps) {
  const text = copy[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    trackLeadConversion("intro_lesson_whatsapp");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: "intro_lesson_whatsapp",
          locale,
        }),
      });
    } catch {
      // WhatsApp path still works if the lead API is unreachable.
    }

    const message = encodeURIComponent(text.whatsappPrefill(name.trim(), email.trim()));
    const url = `${text.whatsappBase}?text=${message}`;
    setSubmitted(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="lead-box card">
      <p className="beginner-kicker">{text.kicker}</p>
      <h2 className="h2">{text.heading}</h2>
      <p className="lead">{text.lead}</p>

      <form className="lead-form" onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary">
          {text.submit}
        </button>
      </form>

      {submitted && <p className="muted">{text.done}</p>}

      <a href="/booking" className="inline-link">
        {text.bookingCta}
      </a>
    </section>
  );
}
