export const EVENTS = [
  {
    id: 'time-for-ladies',
    title: 'Time for Ladies',
    description: 'Women-only session: friendly pace, great vibes, quick progress.',
    startDate: '2025-11-12T18:00:00+02:00',
    endDate: '2025-11-12T19:30:00+02:00',
    location: {
      name: 'Double Yellow Squash Club',
      streetAddress: 'ul. Akademik Stefan Mladenov 21',
      addressLocality: 'Sofia',
      postalCode: '1700',
      addressCountry: 'BG',
    },
    image: '/activities/timeforladies.jpg',
    url: 'https://doubleyellow.bg/activities#time-for-ladies',
  },
  {
    id: 'mini-squash',
    title: 'Mini Squash (Kids)',
    description: 'Fun skills & games for kids to fall in love with squash.',
    startDate: '2025-11-15T10:00:00+02:00',
    endDate: '2025-11-15T11:30:00+02:00',
    location: {
      name: 'Double Yellow Squash Club',
      streetAddress: 'ul. Akademik Stefan Mladenov 21',
      addressLocality: 'Sofia',
      postalCode: '1700',
      addressCountry: 'BG',
    },
    image: '/activities/minisquash.jpg',
    url: 'https://doubleyellow.bg/activities#mini-squash',
  },
  {
    id: 'magnificent-7',
    title: 'Magnificent 7',
    description: 'Round-robin for seven players — tight matches, quick rotations.',
    startDate: '2025-11-13T18:00:00+02:00',
    endDate: '2025-11-13T20:30:00+02:00',
    location: {
      name: 'Double Yellow Squash Club',
      streetAddress: 'ul. Akademik Stefan Mladenov 21',
      addressLocality: 'Sofia',
      postalCode: '1700',
      addressCountry: 'BG',
    },
    image: '/activities/magnificent7.jpg',
    url: 'https://doubleyellow.bg/activities#magnificent-7',
  },
] as const;

export type EventItem = typeof EVENTS[number];
