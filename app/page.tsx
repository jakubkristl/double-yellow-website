import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";

export const metadata: Metadata = {
  title: "Squash Club in Sofia — Double Yellow",
  description:
    "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Squash Club in Sofia — Double Yellow",
    description:
      "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
    url: "https://doubleyellow.bg",
    images: [
      {
        url: "https://doubleyellow.bg/hero/01b.jpeg",
        alt: "Double Yellow Squash Club - renovated WSF courts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squash Club in Sofia — Double Yellow",
    description:
      "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
    images: ["/hero/01b.jpeg"],
  },
};

export const revalidate = 3600;

const DOUBLE_YELLOW_OPEN_POSTER = "/events/double-yellow-open-player-reference.jpg";
const DOUBLE_YELLOW_OPEN_EXPIRES_AT = new Date("2026-03-17T00:00:00+02:00");
const DOUBLE_YELLOW_OPEN_URL = "https://www.rankedin.com/en/tournament/64627/double-yellow-open";

function isDoubleYellowOpenActive() {
  return new Date() < DOUBLE_YELLOW_OPEN_EXPIRES_AT;
}

export default function Home() {
  const showDoubleYellowOpen = isDoubleYellowOpenActive();
  const baseImages = ["/hero/01.jpeg", "/hero/02.jpg", "/hero/03.jpg", "/hero/04.jpg", "/hero/bulgarian-squash-tour-2026.png"];
  const baseAlts = [
    "First training free - Първа тренировка безплатна",
    "Professional squash player serving on a bright, newly renovated court",
    "Court view with glass back wall and seating",
    "Pro shop gear and equipment display",
    "Bulgarian Squash Tour 2026 - 12 tournaments across the year"
  ];
  const heroImages = showDoubleYellowOpen ? [DOUBLE_YELLOW_OPEN_POSTER, ...baseImages] : baseImages;
  const heroAlts = showDoubleYellowOpen
    ? ["Double Yellow Open on 14-15 March 2026 - registration on RankedIn", ...baseAlts]
    : baseAlts;
  const heroLinks = showDoubleYellowOpen ? [DOUBLE_YELLOW_OPEN_URL, ...baseImages.map(() => undefined)] : baseImages.map(() => undefined);

  return (
    <>
      <header className="page-hero">
        {/* Carousel hero section */}
        <div className="hero-carousel">
          <Carousel images={heroImages} alts={heroAlts} links={heroLinks} />
        </div>

        <h1 className="page-title">
          New courts. New energy. Same obsession with squash.
        </h1>
      </header>

      <section className="split">
        <div className="card">
          <h2 className="h2">Visit us</h2>
          <dl className="kv">
            <div>
              <dt>Address</dt>
              <dd>
                National Sports Academy (NSA), ul. “Akad. Stefan Mladenov” 21, 1700 Sofia
              </dd>
            </div>
            <div>
              <dt>Working hours</dt>
              <dd>07:00 – 22:00 (every day)</dd>
            </div>
            <div>
              <dt>Payments</dt>
              <dd>MultiSport, CoolFit &amp; card payments accepted</dd>
            </div>
          </dl>

          {/* Payment logos */}
          <div className="payment-logos" aria-label="Accepted passes">
            <Image
              src="/logos/multisport.png"
              alt="MultiSport"
              width={110}
              height={36}
              priority
            />
            <Image
              src="/logos/coolfit.png"
              alt="CoolFit"
              width={110}
              height={36}
              priority
            />
          </div>
        </div>

        <div className="card">
          <p className="lead">
            We've fully renovated the club from top to tin — brand-new courts installed to
            official <strong>WSF specifications</strong>, brighter lighting, and a faster
            playing surface. Whether you're stepping on court for the first time or
            chasing match ball, you'll feel the upgrade the moment the ball hits the wall.
            Join weekly events, coaching sessions, and flexible membership packs. Rackets
            &amp; balls available on site — just bring your energy.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <a href="/booking" className="btn btn-primary">
              Book Now
            </a>
            <a href="/membership" className="btn btn-secondary">
              View Memberships
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
