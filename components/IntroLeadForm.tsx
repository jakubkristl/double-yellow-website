"use client";

import { FormEvent, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/359896754014?text=Hi%20Double%20Yellow!%20I%20want%20my%20first%20free%20lesson.%20Trainer%20and%20equipment%20included.";

export default function IntroLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent("Free Intro Squash Lesson Request");
    const body = encodeURIComponent(
      `Hi Double Yellow,\n\nI want to book my first free lesson.\n\nName: ${name || "N/A"}\nEmail: ${email || "N/A"}\n\nI understand trainer and equipment are included.\n\nThank you!`
    );

    window.location.href = `mailto:jakub@doubleyellowsquash.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="lead-box card">
      <p className="beginner-kicker">Free Intro Offer</p>
      <h2 className="h2">First lesson is free. Trainer and equipment included.</h2>
      <p className="lead">
        Leave your email and we will set up your best first slot.
      </p>

      <form className="lead-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Claim Free Lesson
        </button>
      </form>

      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-link">
        Prefer chat? Claim on WhatsApp
      </a>
    </section>
  );
}
