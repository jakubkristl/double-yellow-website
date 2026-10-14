import Link from "next/link";
import type { Metadata } from "next";
import OptimizedImage from "@/components/OptimizedImage";
import styles from "./styles.module.css";
import { createPageMetadata } from "@/lib/seo";
import { isEventArchived } from "@/lib/eventArchive";

const BNT_ARTICLE_URL =
  "https://bnt.bg/news/chuzhdencite-slovakat-yakob-kristal-koito-razviva-skuosh-v-balgariya-v410712-347134news.html";
const WSF_LEVEL_1_COURSE_URL =
  "https://europeansquash.com/event/wsf-level-1-coaching-course/";
const WSF_LEVEL_1_ENTRY_FORM_URL =
  "https://europeansquash.com/wp-content/uploads/2026/03/Entry_Form_Level_1_Bulgaria_2026.pdf";
const WSF_LEVEL_1_END_DATE = "2026-06-14T23:59:59+02:00";
const DOUBLE_YELLOW_OPEN_URL =
  "https://www.rankedin.com/en/tournament/74899/double-yellow-open";
const DOUBLE_YELLOW_OPEN_END_DATE = "2026-10-26T23:59:59+02:00";
const RACKETPOINT_URL = "https://www.racketpoint.bg";
const BLACK_FRIDAY_START_DATE = "2026-11-11T00:00:00+02:00";
const BLACK_FRIDAY_END_DATE = "2026-11-16T23:59:59+02:00";
const BLACK_FRIDAY_WHATSAPP_URL =
  "https://wa.me/359896754014?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D0%B5%D0%B9%D1%82%D0%B5%20Double%20Yellow!%20%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B2%D0%B0%20%D0%BC%D0%B5%20Black%20Friday%2010%25%20%D0%BD%D0%B0%20%D0%BA%D0%BB%D1%83%D0%B1%D0%BD%D0%B0%20%D0%BA%D0%B0%D1%80%D1%82%D0%B0.";

export const metadata: Metadata = createPageMetadata({
  path: "/events",
  title: "Събития | Double Yellow Squash",
  description:
    "Следи предстоящите общностни сесии, гостуващи треньори и скуош уъркшопи в Double Yellow Squash Club в София.",
  image: "/hero/02.jpg",
});

export const revalidate = 3600;

export default function EventsPage() {
  const now = new Date();
  const isBlackFridayStarted = now >= new Date(BLACK_FRIDAY_START_DATE);
  const isBlackFridayArchived = isEventArchived(BLACK_FRIDAY_END_DATE, now);
  const showBlackFriday = isBlackFridayStarted && !isBlackFridayArchived;
  const isOpenArchived = isEventArchived(DOUBLE_YELLOW_OPEN_END_DATE);
  const isLevel1Archived = isEventArchived(WSF_LEVEL_1_END_DATE);
  const hasArchivedEvents =
    isBlackFridayArchived || isOpenArchived || isLevel1Archived;

  return (
    <main>
      <section className="container container--narrow">
        <h1 className="page-title">Събития</h1>
        <p className="subtitle">Еднократни събития, уъркшопи и гостуващи треньори.</p>

        {showBlackFriday && (
          <div className={`event-card ${styles.eventCardMidGap}`}>
            <h2 className={styles.eventHeading}>Black Friday</h2>
            <Link
              href={RACKETPOINT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Отвори racketpoint.bg за Unsquashable ракети с 10% отстъпка"
              className={styles.eventMediaLink}
            >
              <OptimizedImage
                src="/events/black-friday-2026.png"
                alt="Плакат за Black Friday в Double Yellow — 10% на клубни карти и Unsquashable ракети, 13–16 ноември 2026"
                width={1024}
                height={1024}
                className={styles.eventMedia}
                priority
              />
            </Link>
            <p className={styles.eventTextGap}>
              <strong>Дати:</strong> 13–16 ноември 2026 г. (мека анонс от 11 ноември).
            </p>
            <p className={styles.eventTextGap}>
              Black Friday в Double Yellow — 10% на клубни карти на рецепция и 10% на
              Unsquashable ракети на racketpoint.bg. Без отстъпка на Multisport или
              резервации на корт.
            </p>
            <h3 className={styles.eventSubheading}>Ключови детайли</h3>
            <ul className={styles.eventList}>
              <li>Клубни карти: всички пакети, нови и подновяване — 10% на рецепция</li>
              <li>Unsquashable ракети: всички 13 модела на racketpoint.bg</li>
              <li>Краен срок: 16 ноември 2026, 23:59 (София)</li>
            </ul>
            <div className="actions">
              <Link
                href={RACKETPOINT_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Поръчай на racketpoint.bg
              </Link>
              <Link
                href={BLACK_FRIDAY_WHATSAPP_URL}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Пиши за клубна карта
              </Link>
              <Link href="/membership" className="btn btn--secondary">
                Виж абонаменти
              </Link>
            </div>
          </div>
        )}

        {!isOpenArchived && (
          <div className={`event-card ${styles.eventCardMidGap}`}>
            <h2 className={styles.eventHeading}>Double Yellow Open</h2>
            <Link
              href={DOUBLE_YELLOW_OPEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Регистрирай се за Double Yellow Open в RankedIn"
              className={styles.eventMediaLink}
            >
              <OptimizedImage
                src="/events/double-yellow-open-2026-10.png"
                alt="Плакат за Double Yellow Open — скуош турнир на 24–25 октомври 2026"
                width={857}
                height={830}
                className={styles.eventMedia}
                priority
              />
            </Link>
            <p className={styles.eventTextGap}>
              <strong>Дати:</strong> 24–25 октомври 2026 г.
            </p>
            <p className={styles.eventTextGap}>
              Скуош турнир за всички категории в Double Yellow Squash Club. Два дни
              състезателна игра, открита регистрация и места за клубни и свободни играчи.
            </p>
            <h3 className={styles.eventSubheading}>Ключови детайли</h3>
            <ul className={styles.eventList}>
              <li>Локация: Double Yellow Squash Club</li>
              <li>Краен срок за регистрация: 22 октомври 2026</li>
              <li>Такса: €25 клубни състезатели / €35 свободни играчи</li>
            </ul>
            <div className="actions">
              <Link
                href={DOUBLE_YELLOW_OPEN_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Регистрирай се в RankedIn
              </Link>
            </div>
          </div>
        )}

        {!isLevel1Archived && (
          <div className={`event-card ${styles.eventCardMidGap}`}>
            <h2 className={styles.eventHeading}>WSF Level 1 Coaching Course</h2>
            <Link
              href={WSF_LEVEL_1_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Отвори WSF Level 1 Coaching Course в сайта на Европейската скуош федерация"
              className={styles.eventMediaLink}
            >
              <OptimizedImage
                src="/events/wsf-level-1-coaching-course.jpg"
                alt="Сесия от WSF Level 1 Coaching Course с треньор и деца на скуош корт"
                width={1366}
                height={768}
                className={styles.eventMedia}
                priority
              />
            </Link>
            <p className={styles.eventTextGap}>
              <strong>Дати:</strong> 12-14 юни 2026 г. в София, България.
            </p>
            <p className={styles.eventTextGap}>
              С удоволствие каним треньори, играчи и почитатели на скуоша да участват
              в WSF Level 1 Coaching Course, провеждан в рамките на програмата на World
              Squash Federation и с подкрепата на European Squash Federation.
            </p>
            <p className={styles.eventTextGap}>
              Курсът ще се проведе в София и дава въведение в основните принципи на
              треньорската работа в скуоша. Насочен е основно към бъдещи треньори,
              които искат да започнат работа с начинаещи и юношески групи.
            </p>
            <p className={styles.eventTextGap}>
              Програмата съчетава теория и практика на корта и се фокусира върху базовите
              технически, тактически и организационни аспекти на треньорството. Участниците,
              които успешно завършат курса, получават WSF Level 1 Coaching Certificate,
              международно признат в треньорската система на WSF.
            </p>
            <p className={styles.eventTextGap}>
              Местата са ограничени, препоръчва се ранна регистрация, а записването приключва
              на 1 май 2026 г.
            </p>

            <h3 className={styles.eventSubheading}>Ключови детайли</h3>
            <ul className={styles.eventList}>
              <li>Дати на курса: 12-14 юни 2026</li>
              <li>Локация: София, България</li>
              <li>Краен срок за регистрация: 1 май 2026</li>
              <li>Организатор: Jakub Kristl</li>
              <li>Лектор: Michael Khan</li>
              <li>Сертификация: WSF Level 1 Coaching Certificate</li>
            </ul>

            <h3 className={styles.eventSubheading}>За кого е курсът</h3>
            <p className={styles.eventTextGap}>
              Курсът е основно за бъдещи треньори в началото на своя път. Подходящ е
              за играчи, преподаватели, клубни помощници и скуош ентусиасти, които искат
              да започнат структурирана работа с ранни обучаеми, начинаещи и юношески групи.
            </p>

            <h3 className={styles.eventSubheading}>Върху какво се фокусира Level 1</h3>
            <ul className={styles.eventList}>
              <li>Работа с ранни обучаеми в среда тип "learning to play"</li>
              <li>Използване на забавни игри и прости разигравания като основни инструменти</li>
              <li>Изграждане на координация око-ръка и базови двигателни навици</li>
              <li>Стил на преподаване, подходящ за деца и напълно начинаещи</li>
              <li>Комбинация от теория и практически сесии на корта</li>
            </ul>

            <h3 className={styles.eventSubheading}>Как да се регистрираш</h3>
            <p className={styles.eventTextGap}>
              На страницата на ESF ще намериш fact sheet и официалната форма за участие.
              Препоръчваме ранна регистрация, защото местата са ограничени.
            </p>
            <div className="actions">
              <Link
                href={WSF_LEVEL_1_COURSE_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Отвори детайли за курса
              </Link>
              <Link
                href={WSF_LEVEL_1_ENTRY_FORM_URL}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Отвори формата за участие
              </Link>
            </div>
          </div>
        )}

        {hasArchivedEvents && (
          <div className={`event-card ${styles.eventCardMidGap}`}>
            <h2 className={styles.eventHeading}>Архивни събития</h2>
            <p className={styles.eventArchivedNote}>
              Минали събития остават достъпни за справка и възстановяване на контекст.
            </p>
            <ul className={styles.eventArchiveList}>
              {isBlackFridayArchived && (
                <li className={styles.eventArchiveItem}>
                  <Link href={RACKETPOINT_URL} target="_blank" rel="noopener noreferrer">
                    Black Friday
                  </Link>
                  <span className={styles.eventArchiveMeta}>Завърши на 16 ноември 2026</span>
                </li>
              )}
              {isOpenArchived && (
                <li className={styles.eventArchiveItem}>
                  <Link href={DOUBLE_YELLOW_OPEN_URL} target="_blank" rel="noopener noreferrer">
                    Double Yellow Open
                  </Link>
                  <span className={styles.eventArchiveMeta}>Завърши на 26 октомври 2026</span>
                </li>
              )}
              {isLevel1Archived && (
                <li className={styles.eventArchiveItem}>
                  <Link href={WSF_LEVEL_1_COURSE_URL} target="_blank" rel="noopener noreferrer">
                    WSF Level 1 Coaching Course
                  </Link>
                  <span className={styles.eventArchiveMeta}>Завърши на 14 юни 2026</span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Репортаж в БНТ</h2>
          <p className={styles.eventTextGap}>
            БНТ представи Якуб Кристл и развитието на скуоша в България в
            рубриката "Чужденците". Виж историята и прочети статията.
          </p>
          <Link
            href={BNT_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Отвори репортажа на БНТ за Якуб Кристл"
            className={styles.eventMediaLink}
          >
            <OptimizedImage
              src="/events/bnt-jakob-kristal.png"
              alt="Репортаж на БНТ за Якуб Кристл и развитието на скуоша в България"
              width={840}
              height={454}
              className={styles.eventMedia}
              priority
            />
          </Link>
          <div className="actions">
            <Link
              href={BNT_ARTICLE_URL}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Отвори статията в БНТ
            </Link>
          </div>
        </div>

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Гостуващи треньори</h2>
          <p>
            Редовно посрещаме опитни треньори за фокусирани клиники и тактически сесии.
            Следи тази страница и социалните ни канали за предстоящи дати.
          </p>
        </div>

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Уъркшопи и общностни сесии</h2>
          <p>
            Клубът организира еднократни уъркшопи и тематични общностни сесии за всички нива,
            от напълно начинаещи до състезателно настроени редовни играчи.
          </p>
        </div>

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Bulgarian Squash Tour 2026</h2>
          <p className={styles.eventTextGap}>
            12 турнира, едно класиране, броят се най-добрите 8 резултата. Този раздел
            остава публикуван през целия сезон 2026.
          </p>
          <p className={styles.eventTextGap}>
            Организира се под егидата на Българската скуош федерация и се администрира дигитално в RankedIn.
          </p>

          <h3 className={styles.eventSubheading}>Календар 2026</h3>
          <ul className={`${styles.eventList} ${styles.eventListSpaced}`}>
            <li>07-08 February - Fireball</li>
            <li>14-15 March - Double Yellow Squash Club</li>
            <li>21-22 March - Sofia Squash Center</li>
            <li>18-19 April - Double Yellow Squash Club</li>
            <li>02-03 May - Fireball</li>
            <li>30-31 May - Sofia Squash Center</li>
            <li>20-21 June - Double Yellow Squash Club</li>
            <li>19-20 September - Sofia Squash Center</li>
            <li>03-04 October - Fireball</li>
            <li>24-25 October - Double Yellow Squash Club</li>
            <li>14-15 November - Fireball</li>
            <li>05-06 December - Sofia Squash Center</li>
          </ul>

          <h3 className={styles.eventSubheading}>Как работи турът</h3>
          <ul className={styles.eventList}>
            <li>12 месечни турнира</li>
            <li>В класирането влизат 8-те най-добри резултата</li>
            <li>Минимум 2 гарантирани мача за всеки играч</li>
            <li>Формат: до 2 от 3 гейма (финали до 3 от 5), PAR 11</li>
            <li>Загубилият съдийства следващия мач</li>
          </ul>

          <h3 className={styles.eventSubheading}>Такси</h3>
          <ul className={styles.eventList}>
            <li>Регистрирани състезатели: 25 EUR</li>
            <li>Нерегистрирани играчи: 35 EUR</li>
            <li>Годишна регистрация на състезател: 25 EUR</li>
            <li>Годишна клубна регистрация към федерацията: 180 EUR</li>
          </ul>
        </div>

        <div className={`event-card ${styles.eventCardLargeGap}`}>
          <h2 className={styles.eventHeading}>Как да се включиш</h2>
          <p className={styles.eventTextGap}>
            За да се включиш в предстоящите събития, провери наличните сесии в Активности или се свържи директно с нас.
          </p>
          <div className="actions">
            <Link href="/activities" className="btn btn--secondary">Разгледай активности</Link>
            <Link href="/contact" className="btn btn--primary">Свържи се с клуба</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
