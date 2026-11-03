import { notFound } from 'next/navigation';
import { Clock3, MapPin, Phone, Sparkles } from 'lucide-react';
import { dictionary, isLocale } from '@/lib/i18n';
import { PageShell } from '@/components/layout/PageShell';
import { ProjectForm } from '@/components/ui/ProjectForm';
import { Reveal } from '@/components/ui/Reveal';

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary[locale], p = t.contactPage;
  const isArabic = locale === 'ar';
  return <PageShell locale={locale} t={t}>
    <section className="contact-page">
      <div className="contact-arc contact-arc--one"/><div className="contact-arc contact-arc--two"/><div className="contact-pattern"/>
      <div className="container contact-grid">
        <div className="contact-intro">
          <div className="contact-kicker"><span><Sparkles size={13}/>{p.eyebrow}</span><span className="contact-kicker__availability"><i/>{isArabic ? 'متاحون للمشاريع الجديدة' : 'Open for new projects'}</span></div>
          <Reveal><h1 dangerouslySetInnerHTML={{ __html: p.title }}/></Reveal>
          <p className="inner-intro">{p.intro}</p>
          <div className="contact-promise"><div className="contact-promise__icon"><Clock3 size={18}/></div><div><strong>{isArabic ? 'استجابة خلال يوم عمل واحد' : 'A considered reply in one working day'}</strong><span>{isArabic ? 'نبدأ بالاستماع، ثم نحدد الخطوة المناسبة.' : 'We start by listening, then define the right next step.'}</span></div></div>
          <div className="direct-lines"><p>{p.direct}</p><div className="contact-channel"><span><Phone size={17}/></span><b dir="ltr">+967 00 000 0000</b></div><div className="contact-channel"><span><MapPin size={17}/></span><b>{p.location}: {t.common.location}</b></div></div>
        </div>
        <div className="form-holder"><ProjectForm t={t}/></div>
      </div>
    </section>
  </PageShell>;
}
