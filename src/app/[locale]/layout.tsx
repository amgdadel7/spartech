import { notFound } from 'next/navigation';
import { dictionary, isLocale, locales } from '@/lib/i18n';
export function generateStaticParams(){ return locales.map(locale=>({locale})); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { const {locale} = await params; if(!isLocale(locale)) notFound(); const t=dictionary[locale]; return <div lang={locale} dir={t.dir} className={`locale-${locale}`}>{children}</div>; }
