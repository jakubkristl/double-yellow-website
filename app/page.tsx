import type { Metadata } from "next";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import { createPageMetadata } from "@/lib/seo";
import AvailabilityTeaser from "@/components/AvailabilityTeaser";
import IntroLeadForm from "@/components/IntroLeadForm";

const BOOKING_EMBED_URL =
  "https://sport.bookinggood.net/bg/embed/facility/44/72";

const WHATSAPP_CTA_URL =
  "https://wa.me/359896754014?text=Здравейте%20Double%20Yellow!%20Искам%20да%20запазя%20първата%20си%20тренировка%20по%20скуош.";

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
  title: "Скуош клуб в София - Double Yellow",
  description:
    "Скуош кортове по WSF стандарт, тренировки, събития и абонаменти в София. Запази корт или пробвай първата си тренировка безплатно.",
  image: "/hero/01.jpeg",
});

export const revalidate = 3600;

export default function Home() {
  const today = getSofiaDate();

  const heroSlides: HeroSlide[] = [
    {
      src: "/events/easter-holiday-hours-2026.jpg",
      alt: "Плакат за великденското работно време на Double Yellow Squash",
      startsOn: "2026-03-20",
      endsOn: "2026-04-13",
    },
    {
      src: "/events/wsf-level-1-coaching-course.jpg",
      alt: "Покана за WSF Level 1 Coaching Course в София, България",
      link: WSF_LEVEL_1_COURSE_URL,
      linkLabel: "Отвори WSF Level 1 Coaching Course в сайта на Европейската скуош федерация",
      overlay: {
        eyebrow: "Акцент",
        title: "WSF Level 1 Coaching Course",
        body: "12-14 юни 2026 г. в София. Подходящо за бъдещи треньори, които започват с начинаещи и юношески групи.",
        ctaLabel: "Виж детайли",
      },
      endsOn: "2026-06-14",
    },
    {
      src: "/events/bnt-jakob-kristal.png",
      alt: "Репортаж на БНТ: Якуб Кристл развива скуоша в България",
      link: BNT_ARTICLE_URL,
      linkLabel: "Отвори репортажа на БНТ за Якуб Кристл",
    },
    {
      src: "/hero/02.jpg",
      alt: "Професионален състезател по скуош сервира на светъл, новореновиран корт",
    },
    {
      src: "/hero/03.jpg",
      alt: "Изглед към корт със стъклена задна стена и места за публика",
    },
    {
      src: "/hero/04.jpg",
      alt: "Екипировка и аксесоари в магазина",
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
        "Започнах без никакъв опит. Само за една тренировка вече разигравах и наистина ми стана любимо.",
      author: "Нина, начинаещ играч",
    },
    {
      quote:
        "Нямаш партньор? Няма проблем. Екипът ме свърза веднага и вече играя всяка седмица.",
      author: "Петър, общностни сесии",
    },
    {
      quote:
        "Кортовете са отлични, а резервацията е лесна. Пиковите часове се запълват много бързо.",
      author: "Мартин, редовен член",
    },
  ];

  return (
    <>
      <section className="beginner-priority card">
        <p className="beginner-kicker">Нов в скуоша?</p>
        <h2 className="beginner-title">Започни оттук. Първи урок безплатно.</h2>
        <ul className="beginner-list">
          <li>Треньор от първата минута</li>
          <li>Екипировка на място</li>
          <li>Свързваме те с играчи на твоето ниво</li>
        </ul>
        <div className="urgency-strip" role="status" aria-live="polite">
          <span>Пиковите часове се изчерпват всеки ден</span>
          <span>Следващ свободен: днес 19:00</span>
        </div>
        <div className="cta-buttons">
          <a href="/activities" className="btn btn-primary">
            Включи се в сесия за начинаещи
          </a>
          <a href={WHATSAPP_CTA_URL} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
            Пиши в WhatsApp
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
          Нови кортове. Нова енергия. Същата страст към скуоша.
        </h1>
        <p className="hero-subtitle">
          Първи урок безплатно, с включен треньор и екипировка. Започни скуош още днес без стрес.
        </p>
        <div className="cta-buttons">
          <a href="/booking" className="btn btn-primary">
            Резервирай сега
          </a>
          <a href="/membership" className="btn btn-secondary">
            Виж цени
          </a>
        </div>
      </header>

      <section className="split">
        <div className="card">
          <h2 className="h2">Посети ни</h2>
          <dl className="kv">
            <div>
              <dt>Адрес</dt>
              <dd>
                National Sports Academy (NSA), ul. “Akad. Stefan Mladenov” 21, 1700 Sofia
              </dd>
            </div>
            <div>
              <dt>Работно време</dt>
              <dd>07:00 - 22:00 (всеки ден)</dd>
            </div>
            <div>
              <dt>Плащания</dt>
              <dd>Приемаме MultiSport, CoolFit и картови плащания</dd>
            </div>
          </dl>

          {/* Payment logos */}
          <div className="payment-logos" aria-label="Приемани карти и карти за достъп">
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
            Клубът е напълно реновиран - нови кортове по официални <strong>WSF стандарти</strong>,
            по-добро осветление и по-бърза настилка. Независимо дали стъпваш за първи път на
            корта или гониш мачбол, ще усетиш разликата веднага. Включи се в седмичните събития,
            тренировки и гъвкави абонаменти. Ракети и топки има на място - донеси само енергия.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <a href="/booking" className="btn btn-primary">
              Резервирай сега
            </a>
            <a href="/membership" className="btn btn-secondary">
              Виж абонаменти
            </a>
          </div>
        </div>
      </section>

      <section className="conversion-grid">
        <article className="card">
          <h2 className="h2">Защо начинаещите избират Double Yellow</h2>
          <div className="value-points">
            <p><strong>Без стрес за екипировка:</strong> Ракети и топки има в клуба.</p>
            <p><strong>Без стрес за партньор:</strong> Включваш се в отворени сесии и ние намираме подходящ съперник.</p>
            <p><strong>Без притеснение:</strong> Сесиите за начинаещи са създадени за първи стъпки.</p>
          </div>
        </article>

        <article className="card availability-card">
          <h2 className="h2">Бърза резервация, реални свободни часове</h2>
          <p className="lead">
            Най-натоварените часове са 18:00-21:00. Ако искаш вечерна игра, резервирай предварително.
          </p>
          <AvailabilityTeaser />
          <a href={BOOKING_EMBED_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Отвори резервациите на живо
          </a>
        </article>
      </section>

      <section className="card social-proof">
        <h2 className="h2">Какво казват играчите</h2>
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
        <h2 className="h2">Стани част от общност, не просто резервация на корт</h2>
        <div className="community-grid">
          <div>
            <h3>Нямаш партньор? Няма проблем.</h3>
            <p>
              <strong>Social Squash - всеки петък 18:00-20:00.</strong> Идваш, намираме ти партньор и играеш с наличните хора. Всички нива са добре дошли.
            </p>
            <a href="/activities" className="inline-link">Виж петъчния Social Squash →</a>
          </div>
          <div>
            <h3>Аматъорски, ама сквош</h3>
            <p>
              Нашата Viber общност, в която намираш партньор за игра всеки ден, получаваш съвети и следиш новините.
            </p>
            <a href="viber://chat?number=%2B359896754014" className="inline-link">Присъедини се във Viber</a>
          </div>
          <div>
            <h3>Искаш старт с треньор?</h3>
            <p>Тренировките за начинаещи изграждат увереност бързо, за да разиграваш с всеки.</p>
            <a href="/squash-lessons-sofia" className="inline-link">Виж опциите за тренировки</a>
          </div>
        </div>
      </section>

      <IntroLeadForm locale="bg" />
    </>
  );
}
