import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Image from "next/image";

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
        url: "https://doubleyellow.bg/hero/01.jpeg",
        alt: "Double Yellow Squash Club - renovated WSF courts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Squash Club in Sofia — Double Yellow",
    description:
      "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
    images: ["/hero/01.jpeg"],
  },
};

export const revalidate = 3600;

export default function Home() {
  const heroImages = ["/hero/02.jpg", "/hero/03.jpg", "/hero/04.jpg"];
  const heroAlts = [
    "Professional squash player serving on a bright, newly renovated court",
    "Court view with glass back wall and seating",
    "Pro shop gear and equipment display"
  ];
  const heroLinks = heroImages.map(() => undefined);

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
