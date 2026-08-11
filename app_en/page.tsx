import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";
import AvailabilityTeaser from "@/components/AvailabilityTeaser";
import IntroLeadForm from "@/components/IntroLeadForm";

const BOOKING_EMBED_URL =
  "https://sport.bookinggood.net/bg/embed/facility/44/72";

const WHATSAPP_CTA_URL =
  "https://wa.me/359896754014?text=Hi%20Double%20Yellow!%20I%20want%20to%20book%20my%20first%20squash%20session.";

type HeroSlide = {
  src: string;
  alt: string;
  link?: string;
  linkLabel?: string;
  overlay?: {
    eyebrow?: string;
    title: string;
    body?: string;
    ctaLabel?: string;
  };
  startsOn?: string;
  endsOn?: string;
};

const BNT_ARTICLE_URL =
  "https://bnt.bg/news/chuzhdencite-slovakat-yakob-kristal-koito-razviva-skuosh-v-balgariya-v410712-347134news.html";
const WSF_LEVEL_1_COURSE_URL =
  "https://europeansquash.com/event/wsf-level-1-coaching-course/";

function getSofiaDate() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function isSlideActive(slide: HeroSlide, today: string) {
  if (slide.startsOn && slide.startsOn > today) return false;
  if (slide.endsOn && slide.endsOn < today) return false;
  return true;
}

export const metadata: Metadata = createPageMetadata({
  path: "/",
  title: "Squash Club in Sofia — Double Yellow",
  description:
    "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
  image: "/hero/01.jpeg",
});

export const revalidate = 3600;

export default function Home() {
  const today = getSofiaDate();

  const heroSlides: HeroSlide[] = [
    {
      src: "/events/easter-holiday-hours-2026.jpg",
      alt: "Double Yellow Squash Easter holiday hours poster",
      startsOn: "2026-03-20",
      endsOn: "2026-04-13",
    },
    {
      src: "/events/wsf-level-1-coaching-course.jpg",
      alt: "WSF Level 1 Coaching Course invitation in Sofia, Bulgaria",
      link: WSF_LEVEL_1_COURSE_URL,
      linkLabel: "Open WSF Level 1 Coaching Course on the European Squash Federation website",
      overlay: {
        eyebrow: "Featured Event",
        title: "WSF Level 1 Coaching Course",
        body: "12-14 June 2026 in Sofia. Mainly for aspiring coaches starting with beginner players and junior groups.",
        ctaLabel: "View course details",
      },
      endsOn: "2026-06-14",
    },
    {
      src: "/events/bnt-jakob-kristal.png",
      alt: "BNT feature: Jakub Kristl developing squash in Bulgaria",
      link: BNT_ARTICLE_URL,
      linkLabel: "Open the BNT feature about Jakub Kristl",
    },
    {
      src: "/hero/02.jpg",
      alt: "Professional squash player serving on a bright, newly renovated court",
    },
    {
      src: "/hero/03.jpg",
      alt: "Court view with glass back wall and seating",
    },
    {
      src: "/hero/04.jpg",
      alt: "Pro shop gear and equipment display",
    },
  ];

  const activeHeroSlides = heroSlides.filter((slide) => isSlideActive(slide, today));
  const displayHeroSlides = activeHeroSlides.length > 0
    ? activeHeroSlides
    : heroSlides.filter((slide) => !slide.endsOn);

  const heroImages = displayHeroSlides.map((slide) => slide.src);
  const heroAlts = displayHeroSlides.map((slide) => slide.alt);
  const heroLinks = displayHeroSlides.map((slide) => slide.link);
  const heroLinkLabels = displayHeroSlides.map((slide) => slide.linkLabel);
  const heroOverlays = displayHeroSlides.map((slide) => slide.overlay);

  const testimonials = [
    {
      quote:
        "I started with zero experience. In one session I learned enough to rally and actually enjoy it.",
      author: "Nina, beginner player",
    },
    {
      quote:
        "No partner? No problem. The team matched me instantly and now I play every week.",
      author: "Petar, community sessions",
    },
    {
      quote:
        "Courts are excellent and booking is easy. Peak hours really fill up fast.",
      author: "Martin, regular member",
    },
  ];

  return (
    <>
      <section className="beginner-priority card">
        <p className="beginner-kicker">New to squash?</p>
        <h2 className="beginner-title">Start here. First lesson free.</h2>
        <ul className="beginner-list">
          <li>Trainer included from minute one</li>
          <li>Equipment included on site</li>
          <li>We match you with players at your level</li>
        </ul>
        <div className="urgency-strip" role="status" aria-live="polite">
          <span>Peak hours sell out daily</span>
          <span>Next available: today 19:00</span>
        </div>
        <div className="cta-buttons">
          <a href="/activities" className="btn btn-primary">
            Join Beginner Session
          </a>
          <a href={WHATSAPP_CTA_URL} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            Ask On WhatsApp
          </a>
        </div>
      </section>

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
        <p className="hero-subtitle">
          First lesson free, trainer included, equipment included. Start squash today without stress.
        </p>
        <div className="cta-buttons">
          <a href="/booking" className="btn btn-primary">
            Book Now
          </a>
          <a href="/membership" className="btn btn-secondary">
            See Prices
          </a>
        </div>
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

      <section className="conversion-grid">
        <article className="card">
          <h2 className="h2">Why beginners choose Double Yellow</h2>
          <div className="value-points">
            <p><strong>No equipment stress:</strong> Rackets and balls are available at the club.</p>
            <p><strong>No partner stress:</strong> Join come-and-play and we find your match-up.</p>
            <p><strong>No "I will look silly" stress:</strong> Beginner sessions are built for first-timers.</p>
          </div>
        </article>

        <article className="card availability-card">
          <h2 className="h2">Fast booking, real urgency</h2>
          <p className="lead">
            Courts are busiest 18:00-21:00. If you want evening play, book ahead.
          </p>
          <AvailabilityTeaser />
          <a href={BOOKING_EMBED_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Open Live Booking
          </a>
        </article>
      </section>

      <section className="card social-proof">
        <h2 className="h2">What players say</h2>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="testimonial-card">
              <p>"{item.quote}"</p>
              <cite>{item.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="card community-funnel">
        <h2 className="h2">Join the community, not just a court</h2>
        <div className="community-grid">
          <div>
            <h3>No partner? No problem.</h3>
            <p>
              <strong>Social Squash — every Friday 18:00–20:00.</strong> Show up, get matched, and play with whoever is there. All levels welcome.
            </p>
            <a href="/activities" className="inline-link">See Friday Social Squash →</a>
          </div>
          <div>
            <h3>Аматъорски, ама сквош</h3>
            <p>
              Our Viber community to find a game partner any day of the week, get court tips, and stay in the loop.
            </p>
            <a href="viber://chat?number=%2B359896754014" className="inline-link">Join on Viber</a>
          </div>
          <div>
            <h3>Need a coach-led start?</h3>
            <p>Beginner coaching builds confidence fast so you can rally with anyone.</p>
            <a href="/squash-lessons-sofia" className="inline-link">See coaching options</a>
          </div>
        </div>
      </section>

      <IntroLeadForm locale="en" />
    </>
  );
}
