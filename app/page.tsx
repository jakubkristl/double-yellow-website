import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";

const BNT_ARTICLE_URL =
  "https://bnt.bg/news/chuzhdencite-slovakat-yakob-kristal-koito-razviva-skuosh-v-balgariya-v410712-347134news.html";
const WSF_LEVEL_1_COURSE_URL =
  "https://europeansquash.com/event/wsf-level-1-coaching-course/";

export const metadata: Metadata = createPageMetadata({
  path: "/",
  title: "Squash Club in Sofia — Double Yellow",
  description:
    "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
  image: "/hero/01.jpeg",
});

export const revalidate = 3600;

export default function Home() {
  const heroImages = [
    "/events/wsf-level-1-coaching-course.jpg",
    "/events/bnt-jakob-kristal.png",
    "/hero/02.jpg",
    "/hero/03.jpg",
    "/hero/04.jpg",
  ];
  const heroAlts = [
    "WSF Level 1 Coaching Course invitation in Sofia, Bulgaria",
    "BNT feature: Jakub Kristl developing squash in Bulgaria",
    "Professional squash player serving on a bright, newly renovated court",
    "Court view with glass back wall and seating",
    "Pro shop gear and equipment display"
  ];
  const heroLinks = [
    WSF_LEVEL_1_COURSE_URL,
    BNT_ARTICLE_URL,
    ...heroImages.slice(2).map(() => undefined),
  ];
  const heroLinkLabels = [
    "Open WSF Level 1 Coaching Course on the European Squash Federation website",
    "Open the BNT feature about Jakub Kristl",
    undefined,
    undefined,
    undefined,
  ];
  const heroOverlays = [
    {
      eyebrow: "Featured Event",
      title: "WSF Level 1 Coaching Course",
      body: "12-14 June 2026 in Sofia. Mainly for aspiring coaches starting with beginner players and junior groups.",
      ctaLabel: "View course details",
    },
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  return (
    <>
      <header className="page-hero">
        {/* Carousel hero section */}
        <div className="hero-carousel">
          <Carousel
            images={heroImages}
            alts={heroAlts}
            links={heroLinks}
            linkLabels={heroLinkLabels}
            overlays={heroOverlays}
          />
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
