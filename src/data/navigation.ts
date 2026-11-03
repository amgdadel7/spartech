import { Dictionary, Locale } from '@/lib/i18n';
/** Public navigation intentionally keeps portfolio pages offline until the case-study collection is ready. */
export const navigation = (locale: Locale, t: Dictionary) => [
  { label: t.nav.home, href: `/${locale}` },
  { label: t.nav.services, href: `/${locale}/services` },
  { label: t.nav.about, href: `/${locale}/about` },
];
