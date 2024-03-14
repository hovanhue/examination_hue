import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'vi'] as const;

export const pathnames = {
  '/': {
    en: '/',
    vi: '/',
  },

  '/search': {
    en: '/search',
    vi: '/search',
  },

  '/about-us': {
    en: '/about-us',
    vi: '/about-us',
  },
  '/faqs': {
    en: '/faqs',
    vi: '/faqs',
  },
  '/news': {
    en: '/news',
    vi: '/news',
  },
  '/catalogs': {
    en: '/catalogs',
    vi: '/catalogs',
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`undefined
export const localePrefix = 'always';

export type AppPathnames = keyof typeof pathnames;
