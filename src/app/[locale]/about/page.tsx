import { notFound } from 'next/navigation';
import { ArrowDownRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { dictionary, isLocale } from '@/lib/i18n';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StudioMap } from '@/components/ui/StudioMap';

const valueIcons = [Compass, Sparkles, ShieldCheck];
export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary[locale], p = t.aboutPage;
  return <PageShell locale={locale} t={t}>
    <section className="inner-hero about-hero"><div className="about-orb"/><div className="container"><p className="eyebrow"><span className="eyebrow-dot"/>{p.eyebrow}</p><Reveal><h1 dangerouslySetInnerHTML={{ __html: p.title }}/></Reveal><p className="inner-intro">{p.intro}</p></div></section>
    <section className="about-copy"><div className="container about-copy-grid"><div className="large-quote">“<br/>{locale === 'ar' ? 'نصنع الأشياء التي تساعد الناس على صنع التقدم.' : 'We make things that help people make progress.'}</div><div><p className="eyebrow"><span className="eyebrow-dot"/>OUR PRINCIPLES</p><div className="values">{p.values.map((value, i) => { const Icon = valueIcons[i]; return <Reveal key={value.title}><article><span>0{i + 1}</span><div className="value-icon"><Icon size={18}/></div><h2>{value.title}</h2><p>{value.copy}</p></article></Reveal>; })}</div></div></div></section>
    <section className="visit-section"><div className="container visit-layout"><div className="visit-copy"><h2>{p.address}</h2><p>{locale === 'ar' ? 'من شارع تعز، نبني أنظمة رقمية تتحرك بثقة مع كل خطوة.' : 'From Taiz Street, we build digital systems that move with confidence.'}</p><a className="visit-direction" href="https://maps.google.com/?q=Taiz+Street+Yemen" target="_blank" rel="noreferrer"><span>{locale === 'ar' ? 'خطط لزيارتك' : 'Plan your visit'}</span><ArrowDownRight/></a></div><StudioMap locale={locale} address={p.address}/></div></section>
  </PageShell>;
}
