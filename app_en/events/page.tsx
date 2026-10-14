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
  "https://wa.me/359896754014?text=Hi%20Double%20Yellow!%20I%27m%20interested%20in%20the%20Black%20Friday%2010%25%20club%20card%20offer.";

export const metadata: Metadata = createPageMetadata({
  path: "/events",
  locale: "en",
  title: "Events | Double Yellow Squash",
  description:
    "Follow upcoming community sessions, guest coaching visits, and squash workshops at Double Yellow Squash Club in Sofia.",
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
        <h1 className="page-title">Events</h1>
        <p className="subtitle">One-off events, workshops & guest visits.</p>

        {showBlackFriday && (
          <div className={`event-card ${styles.eventCardMidGap}`}>
            <h2 className={styles.eventHeading}>Black Friday</h2>
            <Link
              href={RACKETPOINT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open racketpoint.bg for Unsquashable rackets at 10% off"
              className={styles.eventMediaLink}
            >
              <OptimizedImage
                src="/events/black-friday-2026.png"
                alt="Black Friday at Double Yellow poster — 10% off club cards and Unsquashable rackets, 13–16 November 2026"
                width={1024}
                height={1024}
                className={styles.eventMedia}
                priority
              />
            </Link>
            <p className={styles.eventTextGap}>
              <strong>Dates:</strong> 13–16 November 2026 (soft announce from 11 November).
            </p>
            <p className={styles.eventTextGap}>
              Black Friday at Double Yellow — 10% off club cards at the desk and 10% off
              Unsquashable rackets on racketpoint.bg. Multisport and court bookings are not
              discounted.
            </p>
            <h3 className={styles.eventSubheading}>Key Details</h3>
            <ul className={styles.eventList}>
              <li>Club cards: all packs, new + renew — 10% at the desk</li>
              <li>Unsquashable rackets: all 13 models on racketpoint.bg</li>
              <li>Ends: 16 November 2026, 23:59 (Sofia)</li>
            </ul>
            <div className="actions">
              <Link
                href={RACKETPOINT_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop racketpoint.bg
              </Link>
              <Link
                href={BLACK_FRIDAY_WHATSAPP_URL}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about a club card
              </Link>
              <Link href="/en/membership" className="btn btn--secondary">
                See memberships
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
              aria-label="Register for Double Yellow Open on RankedIn"
              className={styles.eventMediaLink}
            >
              <OptimizedImage
                src="/events/double-yellow-open-2026-10.png"
                alt="Double Yellow Open poster — squash tournament on 24–25 October 2026"
                width={857}
                height={830}
                className={styles.eventMedia}
                priority
              />
            </Link>
            <p className={styles.eventTextGap}>
              <strong>Dates:</strong> 24–25 October 2026.
            </p>
            <p className={styles.eventTextGap}>
              Squash tournament for all categories at Double Yellow Squash Club. Two days of
              competitive play with open registration for club and open players.
            </p>
            <h3 className={styles.eventSubheading}>Key Details</h3>
            <ul className={styles.eventList}>
              <li>Location: Double Yellow Squash Club</li>
              <li>Registration deadline: 22 October 2026</li>
              <li>Fees: €25 club competitors / €35 open players</li>
            </ul>
            <div className="actions">
              <Link
                href={DOUBLE_YELLOW_OPEN_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register on RankedIn
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
              aria-label="Open WSF Level 1 Coaching Course on the European Squash Federation website"
              className={styles.eventMediaLink}
            >
              <OptimizedImage
                src="/events/wsf-level-1-coaching-course.jpg"
                alt="WSF Level 1 Coaching Course session with a coach and children on a squash court"
                width={1366}
                height={768}
                className={styles.eventMedia}
                priority
              />
            </Link>
            <p className={styles.eventTextGap}>
              <strong>Dates:</strong> 12-14 June 2026 in Sofia, Bulgaria.
            </p>
            <p className={styles.eventTextGap}>
              We are pleased to invite coaches, players, and squash enthusiasts to participate
              in the WSF Level 1 Coaching Course, delivered within the framework of the World
              Squash Federation Coaching Programme and supported by the European Squash Federation.
            </p>
            <p className={styles.eventTextGap}>
              The course will be held in Sofia, Bulgaria, and provides an introduction to the
              fundamental principles of squash coaching. It is mainly intended for aspiring
              coaches who want to start working with beginner players and junior groups.
            </p>
            <p className={styles.eventTextGap}>
              The programme combines theoretical knowledge with practical on-court sessions and
              focuses on the basic technical, tactical, and organizational aspects of coaching.
              Participants who successfully complete the course will receive the WSF Level 1
              Coaching Certificate, recognized internationally within the WSF coaching pathway.
            </p>
            <p className={styles.eventTextGap}>
              Places are limited, early registration is recommended, and entries close on
              1 May 2026.
            </p>

            <h3 className={styles.eventSubheading}>Key Details</h3>
            <ul className={styles.eventList}>
              <li>Course dates: 12-14 June 2026</li>
              <li>Location: Sofia, Bulgaria</li>
              <li>Registration deadline: 1 May 2026</li>
              <li>Course organizer: Jakub Kristl</li>
              <li>Course tutor: Michael Khan</li>
              <li>Certification: WSF Level 1 Coaching Certificate</li>
            </ul>

            <h3 className={styles.eventSubheading}>Who It Is For</h3>
            <p className={styles.eventTextGap}>
              This course is mainly for aspiring coaches at the start of their coaching path.
              It is a strong fit for players, teachers, club helpers, and squash enthusiasts
              who want to begin coaching early learners, beginners, and junior groups in a
              structured way.
            </p>

            <h3 className={styles.eventSubheading}>What Level 1 Focuses On</h3>
            <ul className={styles.eventList}>
              <li>Working with early learners in a "learning to play" environment</li>
              <li>Using fun games and simple rallies as the core learning tools</li>
              <li>Building hand-eye coordination and fundamental movement habits</li>
              <li>Learning a teaching style suited to children and complete beginners</li>
              <li>Combining theory with practical on-court coaching sessions</li>
            </ul>

            <h3 className={styles.eventSubheading}>How To Register</h3>
            <p className={styles.eventTextGap}>
              The ESF event page includes the fact sheet and the official entry form. Early
              registration is recommended because places are limited.
            </p>
            <div className="actions">
              <Link
                href={WSF_LEVEL_1_COURSE_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Course Details
              </Link>
              <Link
                href={WSF_LEVEL_1_ENTRY_FORM_URL}
                className="btn btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Entry Form
              </Link>
            </div>
          </div>
        )}

        {hasArchivedEvents && (
          <div className={`event-card ${styles.eventCardMidGap}`}>
            <h2 className={styles.eventHeading}>Archived events</h2>
            <p className={styles.eventArchivedNote}>
              Past events stay available for reference and to revisit the details if needed.
            </p>
            <ul className={styles.eventArchiveList}>
              {isBlackFridayArchived && (
                <li className={styles.eventArchiveItem}>
                  <Link href={RACKETPOINT_URL} target="_blank" rel="noopener noreferrer">
                    Black Friday
                  </Link>
                  <span className={styles.eventArchiveMeta}>Ended 16 November 2026</span>
                </li>
              )}
              {isOpenArchived && (
                <li className={styles.eventArchiveItem}>
                  <Link href={DOUBLE_YELLOW_OPEN_URL} target="_blank" rel="noopener noreferrer">
                    Double Yellow Open
                  </Link>
                  <span className={styles.eventArchiveMeta}>Ended 26 October 2026</span>
                </li>
              )}
              {isLevel1Archived && (
                <li className={styles.eventArchiveItem}>
                  <Link href={WSF_LEVEL_1_COURSE_URL} target="_blank" rel="noopener noreferrer">
                    WSF Level 1 Coaching Course
                  </Link>
                  <span className={styles.eventArchiveMeta}>Ended 14 June 2026</span>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Featured On BNT</h2>
          <p className={styles.eventTextGap}>
            BNT featured Jakub Kristl and the growth of squash in Bulgaria in the
            "Chuzhdentsite" segment. Watch the story and read the article.
          </p>
          <Link
            href={BNT_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open BNT feature about Jakub Kristl"
            className={styles.eventMediaLink}
          >
            <OptimizedImage
              src="/events/bnt-jakob-kristal.png"
              alt="BNT feature about Jakub Kristl developing squash in Bulgaria"
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
              Open BNT Article
            </Link>
          </div>
        </div>

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Guest Coaching Visits</h2>
          <p>
            We regularly host experienced coaches for focused clinics and tactical sessions.
            Follow this page and our social channels for upcoming dates.
          </p>
        </div>

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Workshops & Community Sessions</h2>
          <p>
            The club runs one-off workshops and themed community sessions for all levels,
            from first-time players to competitive regulars.
          </p>
        </div>

        <div className={`event-card ${styles.eventCardMidGap}`}>
          <h2 className={styles.eventHeading}>Bulgarian Squash Tour 2026</h2>
          <p className={styles.eventTextGap}>
            12 tournaments, one ranking, best 8 results count. This section stays published
            throughout the 2026 season.
          </p>
          <p className={styles.eventTextGap}>
            Organized under the Bulgarian Squash Federation and managed digitally in RankedIn.
          </p>

          <h3 className={styles.eventSubheading}>Calendar 2026</h3>
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

          <h3 className={styles.eventSubheading}>How The Tour Works</h3>
          <ul className={styles.eventList}>
            <li>12 monthly tournaments</li>
            <li>Best 8 results enter the ranking</li>
            <li>Minimum 2 guaranteed matches per player</li>
            <li>Format: best of 3 games (finals best of 5), PAR 11</li>
            <li>Loser referees the next match</li>
          </ul>

          <h3 className={styles.eventSubheading}>Fees</h3>
          <ul className={styles.eventList}>
            <li>Registered athletes: 25 EUR</li>
            <li>Non-registered players: 35 EUR</li>
            <li>Annual athlete registration: 25 EUR</li>
            <li>Annual club registration to federation: 180 EUR</li>
          </ul>
        </div>

        <div className={`event-card ${styles.eventCardLargeGap}`}>
          <h2 className={styles.eventHeading}>How To Join</h2>
          <p className={styles.eventTextGap}>
            To join upcoming events, check available sessions in Activities or contact us directly.
          </p>
          <div className="actions">
            <Link href="/activities" className="btn btn--secondary">Browse Activities</Link>
            <Link href="/contact" className="btn btn--primary">Contact The Club</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
