'use client';

import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/lib/seo';

type BreadcrumbItem = {
  name: string;
  url: string;
};

const LABELS_BG: Record<string, string> = {
  about: 'За нас',
  activities: 'Активности',
  booking: 'Резервации',
  success: 'Потвърждение',
  contact: 'Контакт',
  cookies: 'Бисквитки',
  events: 'Събития',
  gallery: 'Галерия',
  learn: 'Научи',
  membership: 'Абонаменти',
  privacy: 'Поверителност',
  store: 'Магазин',
  team: 'Екип',
  terms: 'Условия',
  'beginner-squash-sofia': 'Скуош за начинаещи',
  'squash-lessons-sofia': 'Уроци по скуош',
  'squash-sofia': 'Скуош в София',
};

const LABELS_EN: Record<string, string> = {
  about: 'About',
  activities: 'Activities',
  booking: 'Booking',
  success: 'Confirmation',
  contact: 'Contact',
  cookies: 'Cookies',
  events: 'Events',
  gallery: 'Gallery',
  learn: 'Learn',
  membership: 'Membership',
  privacy: 'Privacy',
  store: 'Store',
  team: 'Team',
  terms: 'Terms',
  'beginner-squash-sofia': 'Beginner squash',
  'squash-lessons-sofia': 'Squash lessons',
  'squash-sofia': 'Squash in Sofia',
};

function titleFromSlug(segment: string) {
  return decodeURIComponent(segment)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const labels = isEn ? LABELS_EN : LABELS_BG;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        name: isEn ? 'Home' : 'Начало',
        url: isEn ? `${SITE_URL}/en` : SITE_URL,
      },
    ];

    let currentPath = '';
    segments.forEach((segment) => {
      if (segment === 'en') {
        return;
      }

      currentPath += `/${segment}`;
      const urlPath = isEn ? `/en${currentPath}` : currentPath;
      breadcrumbs.push({
        name: labels[segment] ?? titleFromSlug(segment),
        url: `${SITE_URL}${urlPath}`,
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
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}
