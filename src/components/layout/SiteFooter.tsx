import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { Dictionary, Locale } from '@/lib/i18n';
import { Mark } from '@/components/ui/Mark';
export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary }) {
  const systemStatus = locale === 'ar' ? 'جميع الأنظمة تعمل بشكل طبيعي' : 'All systems operational';
  const address = locale === 'ar' ? <>شارع تعز<br/>اليمن</> : <>Taiz Street<br/>Yemen</>;
  return <footer className="site-footer"><div className="footer-system-status"><span><i/>{systemStatus}</span><span>STATUS / 24·7</span></div><div className="footer-top"><Mark light /><Link href={`/${locale}/contact`} className="footer-project"><span>{t.common.start}</span><ArrowUpRight /></Link></div><div className="footer-lines"/><div className="footer-grid"><div><p className="footer-label">{t.common.location}</p><p>{address}</p></div><div><p className="footer-label">Social</p><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin size={17}/></a><a href="#" aria-label="Instagram"><Instagram size={17}/></a></div></div><div className="footer-legal"><span>© {new Date().getFullYear()} Spartech</span><span>{locale === 'ar' ? 'كل الحقوق محفوظة' : 'All rights reserved.'}</span></div></div></footer>;
}
