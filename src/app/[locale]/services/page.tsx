import { notFound } from 'next/navigation';
import { ArrowUpRight, BriefcaseBusiness, Landmark, Network, PlugZap, ServerCog, ShieldCheck } from 'lucide-react';
import { dictionary, isLocale } from '@/lib/i18n';
import { getServices } from '@/data/services';
import { PageShell } from '@/components/layout/PageShell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';

const serviceIcons = [Landmark, PlugZap, Network, ShieldCheck, BriefcaseBusiness, ServerCog];

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary[locale], page = t.servicePage, services = getServices(locale);
  const heading = locale === 'ar' ? 'خدماتنا <em>التقنية.</em>' : 'Our <em>technical services.</em>';
  const intro = locale === 'ar' ? 'خدمات متخصصة تجمع بين الأنظمة المالية، هندسة البرمجيات، البنية التحتية، والاستشارات التقنية.' : 'Specialised services bringing together financial systems, software engineering, infrastructure, and technical consulting.';
  return <PageShell locale={locale} t={t}>
    <section className="inner-hero pattern-hero"><div className="container"><Reveal><h1 dangerouslySetInnerHTML={{ __html: heading }}/></Reveal><p className="inner-intro">{intro}</p></div></section>
    <section className="service-list-section"><div className="container">{services.map((service, i) => { const Icon = serviceIcons[i]; return <article id={service.key} className="service-detail" key={service.key}><div><span>{service.number}</span><div><span className="service-icon"><Icon size={23}/></span><h2>{service.title}</h2><p className="service-english-title">{service.englishTitle}</p></div></div><div><p>{service.description}</p><ArrowUpRight className="detail-arrow"/></div></article>; })}</div></section>
    <section className="thin-cta"><div className="container"><h2>{page.cta}</h2><MagneticButton href={`/${locale}/contact`} variant="light" arrow="right">{t.common.start}</MagneticButton></div></section>
  </PageShell>;
}
