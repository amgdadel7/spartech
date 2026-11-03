import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, Landmark, Network, PlugZap, ServerCog, ShieldCheck } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import { getServices } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';

const icons = [Landmark, PlugZap, Network, ShieldCheck, BriefcaseBusiness, ServerCog];
export function ServicesShowcase({ locale }: { locale: Locale }) {
  const services = getServices(locale);
  const isArabic = locale === 'ar';
  const title = isArabic ? 'خدماتنا <em>التقنية.</em>' : 'Our <em>technical services.</em>';
  const copy = isArabic ? 'حلول متخصصة تجمع بين الهندسة المالية، البنية التقنية، والاستشارات العملية.' : 'Specialised solutions connecting financial engineering, technical infrastructure, and pragmatic advisory.';
  return <section className="services-showcase"><div className="container"><div className="services-showcase__head"><Reveal><h2 dangerouslySetInnerHTML={{ __html: title }}/><p>{copy}</p></Reveal></div><div className="services-showcase__grid">{services.map((service, index) => { const Icon = icons[index]; return <Reveal key={service.key} delay={index * .04}><Link id={service.key} className="service-showcase-card" href={`/${locale}/services#${service.key}`}><div className="service-showcase-card__top"><span>{service.number}</span><i><Icon size={20}/></i></div><div><h3>{service.title}</h3><p className="service-showcase-card__english">{service.englishTitle}</p><p className="service-showcase-card__copy">{service.description}</p></div><span className="service-showcase-card__arrow"><ArrowUpRight size={17}/></span></Link></Reveal>; })}</div></div></section>;
}
