import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Calculator, Globe2, Layers3, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { dictionary, isLocale } from '@/lib/i18n';
import { caseSlugs } from '@/data/caseStudies';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';

const images = ['/images/wallet-flow.png', '/images/finance-network.png', '/images/crm-command.png', '/images/crm-command.png', '/images/accounting-flow.png', '/images/jeeb-web.png'];
const caseIcons = [ShieldCheck, Sparkles, Workflow, Layers3, Calculator, Globe2];

export default async function Work({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary[locale], p = t.workPage;
  return <PageShell locale={locale} t={t}>
    <section className="inner-hero work-hero"><div className="container"><p className="eyebrow"><span className="eyebrow-dot"/>{p.eyebrow}</p><Reveal><h1 dangerouslySetInnerHTML={{ __html: p.title }}/></Reveal><p className="inner-intro">{p.intro}</p></div></section>
    <section className="work-grid container">{p.projects.map((project, i) => { const Icon = caseIcons[i]; return <Reveal key={project.name}><article className={`case-card case-card--${i}`}><div className="case-image"><Image src={images[i]} alt="" fill sizes="(max-width: 850px) 100vw, 50vw"/><span className="case-image-icon"><Icon size={19}/></span></div><div className="case-meta"><span>{project.number}</span><span>{project.type}</span></div><div className="case-bottom"><div><h2>{project.name}</h2><p>{project.description}</p></div><Link href={`/${locale}/work/${caseSlugs[i]}`}><span>{p.view}</span><ArrowUpRight size={19}/></Link></div></article></Reveal>; })}</section>
  </PageShell>;
}
