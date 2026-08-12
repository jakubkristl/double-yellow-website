export type EventDateMeta = {
  id: string;
  title: string;
  endDate?: string;
};

export function isEventArchived(endDate?: string, now = new Date()) {
  if (!endDate) {
    return false;
  }

  const eventEnd = new Date(endDate);

  if (Number.isNaN(eventEnd.getTime())) {
    return false;
  }

  return now > eventEnd;
}

export function splitEventsByArchive<T extends EventDateMeta>(events: T[], now = new Date()) {
  return {
    active: events.filter((event) => !isEventArchived(event.endDate, now)),
    archived: events.filter((event) => isEventArchived(event.endDate, now)),
  };
}
