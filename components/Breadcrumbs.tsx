'use client';

import { usePathname } from 'next/navigation';

type BreadcrumbItem = {
  name: string;
  url: string;
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);

    // Always start with Home
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: 'https://doubleyellow.bg' },
    ];

    // Build path segments
    let currentPath = '';
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({
        name,
        url: `https://doubleyellow.bg${currentPath}`,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Only render if there's more than just Home
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
