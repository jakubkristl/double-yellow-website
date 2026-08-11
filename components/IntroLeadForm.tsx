"use client";

import { FormEvent, useState } from "react";

type IntroLeadFormProps = {
  locale?: "bg" | "en";
};

const copy = {
  bg: {
    whatsappUrl:
      "https://wa.me/359896754014?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D0%B5%D0%B9%D1%82%D0%B5%20Double%20Yellow!%20%D0%98%D1%81%D0%BA%D0%B0%D0%BC%20%D0%B4%D0%B0%20%D0%B7%D0%B0%D1%8F%D0%B2%D1%8F%20%D0%BF%D1%8A%D1%80%D0%B2%D0%B8%20%D0%B1%D0%B5%D0%B7%D0%BF%D0%BB%D0%B0%D1%82%D0%B5%D0%BD%20%D1%83%D1%80%D0%BE%D0%BA.%20%D0%A2%D1%80%D0%B5%D0%BD%D1%8C%D0%BE%D1%80%D1%8A%D1%82%20%D0%B8%20%D0%B5%D0%BA%D0%B8%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0%D1%82%D0%B0%20%D1%81%D0%B0%20%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8.",
    subject: "Заявка за безплатен първи урок по скуош",
    mailBody: (name: string, email: string) =>
      `Здравейте Double Yellow,\n\nИскам да запазя своя първи безплатен урок.\n\nИме: ${name || "N/A"}\nИмейл: ${email || "N/A"}\n\nРазбирам, че треньорът и екипировката са включени.\n\nБлагодаря!`,
    kicker: "Безплатен първи урок",
    heading: "Първият урок е безплатен. Треньор и екипировка са включени.",
    lead: "Остави имейл и ще ти предложим най-удобния първи свободен час.",
    namePlaceholder: "Твоето име",
    emailPlaceholder: "Твоят имейл",
    submit: "Заяви безплатен урок",
    whatsappCta: "Предпочиташ чат? Пиши в WhatsApp",
  },
  en: {
    whatsappUrl:
      "https://wa.me/359896754014?text=Hi%20Double%20Yellow!%20I%20want%20my%20first%20free%20lesson.%20Trainer%20and%20equipment%20included.",
    subject: "Free Intro Squash Lesson Request",
    mailBody: (name: string, email: string) =>
      `Hi Double Yellow,\n\nI want to book my first free lesson.\n\nName: ${name || "N/A"}\nEmail: ${email || "N/A"}\n\nI understand trainer and equipment are included.\n\nThank you!`,
    kicker: "Free Intro Offer",
    heading: "First lesson is free. Trainer and equipment included.",
    lead: "Leave your email and we will set up your best first slot.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    submit: "Claim Free Lesson",
    whatsappCta: "Prefer chat? Claim on WhatsApp",
  },
} as const;

export default function IntroLeadForm({ locale = "bg" }: IntroLeadFormProps) {
  const text = copy[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(text.subject);
    const body = encodeURIComponent(text.mailBody(name, email));

    window.location.href = `mailto:jakub@doubleyellowsquash.com?subject=${subject}&body=${body}`;
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
        />
        <input
          type="email"
          name="email"
          placeholder={text.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          {text.submit}
        </button>
      </form>

      <a href={text.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
        {text.whatsappCta}
      </a>
    </section>
  );
}
