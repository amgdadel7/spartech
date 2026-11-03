import { notFound } from 'next/navigation';
import { dictionary, isLocale } from '@/lib/i18n';
import { PageShell } from '@/components/layout/PageShell';
import { HomeExperience } from '@/components/home/HomeExperience';
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {const {locale}=await params;if(!isLocale(locale))notFound();const t=dictionary[locale];return <PageShell locale={locale} t={t}><HomeExperience locale={locale} t={t}/></PageShell>}
