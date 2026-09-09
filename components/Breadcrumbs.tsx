'use client';

import { usePathname } from 'next/navigation';
import { BUSINESS } from '@/lib/business';

type BreadcrumbItem = {
  name: string;
  url: string;
};

const SEGMENT_LABELS: Record<string, { bg: string; en: string }> = {
  about: { bg: 'За нас', en: 'About' },
  activities: { bg: 'Активности', en: 'Activities' },
  booking: { bg: 'Резервация', en: 'Booking' },
  contact: { bg: 'Контакт', en: 'Contact' },
  cookies: { bg: 'Бисквитки', en: 'Cookies' },
  events: { bg: 'Събития', en: 'Events' },
  gallery: { bg: 'Галерия', en: 'Gallery' },
  learn: { bg: 'Научи скуош', en: 'Learn Squash' },
  membership: { bg: 'Абонаменти', en: 'Membership' },
  privacy: { bg: 'Поверителност', en: 'Privacy' },
  store: { bg: 'Магазин', en: 'Store' },
  team: { bg: 'Екип', en: 'Team' },
  terms: { bg: 'Условия', en: 'Terms' },
  'beginner-squash-sofia': { bg: 'Скуош за начинаещи', en: 'Beginner Squash' },
  'squash-lessons-sofia': { bg: 'Уроци по скуош', en: 'Squash Lessons' },
  'squash-sofia': { bg: 'Скуош София', en: 'Squash Sofia' },
  success: { bg: 'Потвърждение', en: 'Confirmation' },
};

function labelForSegment(segment: string, isEn: boolean) {
  const mapped = SEGMENT_LABELS[segment];
  if (mapped) return isEn ? mapped.en : mapped.bg;
  return decodeURIComponent(segment)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const isEn = pathname === '/en' || pathname?.startsWith('/en/');

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        name: isEn ? 'Home' : 'Начало',
        url: isEn ? `${BUSINESS.url}/en` : BUSINESS.url,
      },
    ];

    let currentPath = '';
    segments.forEach((segment) => {
      // Skip the language prefix segment itself in the trail
      if (segment === 'en') {
        currentPath = '/en';
        return;
      }

      currentPath += `/${segment}`;
      breadcrumbs.push({
        name: labelForSegment(segment, isEn),
        url: `${BUSINESS.url}${currentPath}`,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
