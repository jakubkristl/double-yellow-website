import { getEventsBookingHref } from "@/lib/booking";
import { loadClubSessions, type ClubSession } from "@/lib/club-sessions";

type Locale = "bg" | "en";
type Mode = "browse" | "book";

const copy = {
  bg: {
    title: "Mini squash и Social squash",
    lead: "Предстоящите сесии от календара на клуба. Цената и свободните места идват от BookingGood. Пълна сесия не може да се резервира.",
    book: "Запази място",
    choose: "Избери в календара",
    full: "Пълно",
    empty: "В календара няма предстоящи Mini squash или Social squash сесии.",
    unavailable:
      "Свободните места не се заредиха от BookingGood. Отвори календара и провери там. Не показваме часове, които не са в календара.",
    calendar: "Отвори календара със сесиите",
    howBrowse:
      "Запази място отваря календара на клуба. Там избираш същата сесия, влизаш в BookingGood както при резервация на корт и потвърждаваш едно място за себе си.",
    howBook:
      "Избери в календара води до календара отдолу. Натисни същата сесия, влез в BookingGood и потвърди едно място за себе си.",
  },
  en: {
    title: "Mini squash and Social squash",
    lead: "Upcoming sessions from the club calendar. Price and places left come from BookingGood. A full session cannot be booked.",
    book: "Book a place",
    choose: "Choose in the calendar",
    full: "Full",
    empty: "The calendar has no upcoming Mini squash or Social squash sessions.",
    unavailable:
      "Places left could not be loaded from BookingGood. Open the calendar and check there. Sessions that are not on the calendar are not listed.",
    calendar: "Open the session calendar",
    howBrowse:
      "Book a place opens the club calendar. Choose that same session, sign in to BookingGood the same way you book a court, and confirm one place for yourself.",
    howBook:
      "Choose in the calendar moves to the calendar below. Press that same session, sign in to BookingGood, and confirm one place for yourself.",
  },
} as const;

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    timeZone: "Europe/Sofia",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${date}T12:00:00Z`));
}

function formatTime(slot: ClubSession) {
  return slot.end ? `${slot.start}–${slot.end}` : slot.start;
}

function formatPrice(slot: ClubSession, locale: Locale) {
  if (slot.priceEur == null) return null;
  const amount = Number.isInteger(slot.priceEur)
    ? `€${slot.priceEur}`
    : `€${slot.priceEur.toFixed(2)}`;
  if (!slot.perPerson) return amount;
  return locale === "bg" ? `${amount} на човек` : `${amount} per person`;
}

function placesLabel(placesLeft: number, locale: Locale) {
  if (locale === "bg") {
    if (placesLeft <= 0) return "Няма свободни места";
    if (placesLeft === 1) return "1 свободно място";
    return `${placesLeft} свободни места`;
  }
  if (placesLeft <= 0) return "No places left";
  if (placesLeft === 1) return "1 place left";
  return `${placesLeft} places left`;
}

export default async function ClubSessions({
  locale,
  mode,
}: {
  locale: Locale;
  mode: Mode;
}) {
  const text = copy[locale];
  const result = await loadClubSessions();
  const calendarHref = mode === "book" ? "#event-calendar" : getEventsBookingHref(locale);

  return (
    <section className="club-sessions" id="club-sessions" aria-labelledby="club-sessions-title">
      <h2 className="h2" id="club-sessions-title">
        {text.title}
      </h2>
      <p className="club-sessions__lead">{text.lead}</p>

      {result.error ? (
        <p className="club-sessions__note">{text.unavailable}</p>
      ) : result.slots.length === 0 ? (
        <p className="club-sessions__note">{text.empty}</p>
      ) : (
        <ul className="club-sessions__list">
          {result.slots.map((slot) => {
            const price = formatPrice(slot, locale);
            return (
              <li
                key={slot.id}
                className={`club-session${slot.bookable ? "" : " club-session--full"}`}
              >
                <div>
                  <h3 className="club-session__title">{slot.title}</h3>
                  <p className="club-session__meta">
                    <span>{formatDate(slot.date, locale)}</span>
                    <span>{formatTime(slot)}</span>
                    {price ? <span>{price}</span> : null}
                  </p>
                  <p className="club-session__places">{placesLabel(slot.placesLeft, locale)}</p>
                </div>
                {slot.bookable ? (
                  <a href={calendarHref} className="btn btn-primary">
                    {mode === "book" ? text.choose : text.book}
                  </a>
                ) : (
                  <button type="button" className="btn btn-secondary" disabled>
                    {text.full}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {result.error || result.slots.length === 0 ? (
        <p className="club-sessions__note">
          <a href={calendarHref}>{text.calendar}</a>
        </p>
      ) : (
        <p className="club-sessions__note">{mode === "book" ? text.howBook : text.howBrowse}</p>
      )}
    </section>
  );
}
