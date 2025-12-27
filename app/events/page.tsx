import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Events & Coaching Visits | Double Yellow Squash",
  description:
    "Attend guest coaching visits, workshops, and special tournaments at Double Yellow Squash Club. Meet expert coaches and challenge opponents.",
  openGraph: {
    title: "Special Events & Coaching Visits | Double Yellow Squash",
    description:
      "Attend guest coaching visits, workshops, and special tournaments at Double Yellow Squash Club. Meet expert coaches and challenge opponents.",
    url: "https://doubleyellow.bg/events",
    images: [
      {
        url: "https://doubleyellow.bg/hero/01.jpg",
        alt: "Double Yellow Squash Club",
      },
    ],
  },
};

export default function EventsPage() {
  return (
    <main>
      <section className="container container--narrow">
        <h1 className="page-title">Events</h1>
        <p className="subtitle">One-off events, workshops & guest visits.</p>

        <p className="event-card__text">There are no upcoming guest coaching visits scheduled at the moment. Check back later for new events.</p>
      </section>
    </main>
  );
}
