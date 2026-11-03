'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n';
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname(); const segments = pathname.split('/'); segments[1] = locale === 'ar' ? 'en' : 'ar';
  return <Link href={segments.join('/') || `/${locale === 'ar' ? 'en' : 'ar'}`} className="language-switch" aria-label={`Switch to ${label}`}>{label}</Link>;
}
