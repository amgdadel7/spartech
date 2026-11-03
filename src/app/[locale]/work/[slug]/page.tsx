import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getCaseStudy, caseSlugs } from '@/data/caseStudies';
import { dictionary, isLocale, locales } from '@/lib/i18n';
import { PageShell } from '@/components/layout/PageShell';
import { MagneticButton } from '@/components/ui/MagneticButton';

export function generateStaticParams() { return locales.flatMap(locale => caseSlugs.map(slug => ({ locale, slug }))); }
export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary[locale], study = getCaseStudy(locale, slug);
  if (!study) notFound();
  const isArabic = locale === 'ar';
  return <PageShell locale={locale} t={t}>
    <article className="case-study-page">
      <section className="case-study-hero"><div className="container"><Link className="case-back" href={`/${locale}/work`}><ChevronLeft size={16}/><span>{isArabic ? 'جميع الأعمال' : 'All work'}</span></Link><div className="case-study-title"><span>{study.number}</span><p>{study.category}</p><h1>{study.title}</h1><p className="case-summary">{study.summary}</p></div><div className="case-study-image"><Image src={study.image} alt="" fill priority sizes="(max-width: 800px) 100vw, 1200px"/></div></div></section>
      <section className="case-study-story"><div className="container case-story-grid"><div className="case-story-label">{isArabic ? 'نظرة عامة' : 'OVERVIEW'}</div><div className="case-story-copy"><div><h2>{isArabic ? 'التحدي' : 'The challenge'}</h2><p>{study.challenge}</p></div><div><h2>{isArabic ? 'الحل' : 'The solution'}</h2><p>{study.solution}</p></div></div></div></section>
      <section className="case-study-details"><div className="container"><div className="case-results"><div><p>{isArabic ? 'الأثر' : 'THE IMPACT'}</p><h2>{isArabic ? 'مبني ليتحرك بثقة.' : 'Built to move with confidence.'}</h2></div><ul>{study.outcomes.map(outcome => <li key={outcome}><Check size={16}/>{outcome}</li>)}</ul></div><div className="case-capabilities">{study.capabilities.map((capability, index) => <span key={capability}>0{index + 1}<b>{capability}</b></span>)}</div><div className="case-next"><p>{isArabic ? 'لديك تحدٍ مشابه؟' : 'Working through a similar challenge?'}</p><MagneticButton href={`/${locale}/contact`} variant="light" arrow="right">{t.common.start}</MagneticButton></div></div></section>
    </article>
  </PageShell>;
}
