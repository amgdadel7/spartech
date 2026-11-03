'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { Dictionary, Locale } from '@/lib/i18n';
import { navigation } from '@/data/navigation';
import { Mark } from '@/components/ui/Mark';
import { LocaleSwitch } from './LocaleSwitch';

const drawerEase = [0.77, 0, 0.18, 1] as const;

export function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastScroll = useRef(0);
  const pathname = usePathname();
  const nav = navigation(locale, t);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 18);
      setHidden(!open && y > 160 && y > lastScroll.current);
      lastScroll.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', closeOnEscape); return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return <>
    <motion.header className={`site-header ${scrolled ? 'site-header--scrolled' : ''} ${hidden ? 'site-header--hidden' : ''}`} animate={{ y: hidden ? -108 : 0 }} transition={{ duration: .55, ease: drawerEase }}>
      <div className="header-shell">
        <Link href={`/${locale}`} className="header-logo" aria-label="Spartech home"><span className="logo-pulse"><i/><i/><i/></span><Mark light /></Link>
        <nav className="desktop-nav" aria-label={t.nav.menu}>{nav.map(item => <Link className={pathname === item.href ? 'is-active' : ''} key={item.href} href={item.href}><span>{item.label}</span></Link>)}</nav>
        <div className="header-actions"><LocaleSwitch locale={locale} label={t.localeName} /><Link className="header-contact" href={`/${locale}/contact`}><span>{t.nav.contact}</span><ArrowUpRight size={15}/></Link><button className="menu-toggle" aria-label={open ? t.common.close : t.common.menu} aria-expanded={open} onClick={() => setOpen(!open)}><span className="toggle-bars"><AnimatePresence mode="wait" initial={false}>{open ? <motion.span key="close" initial={{ rotate: -55, opacity: 0, scale: .7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 55, opacity: 0, scale: .7 }} transition={{ duration: .2 }}><X size={18}/></motion.span> : <motion.span key="menu" initial={{ rotate: 55, opacity: 0, scale: .7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -55, opacity: 0, scale: .7 }} transition={{ duration: .2 }}><Menu size={18}/></motion.span>}</AnimatePresence></span><span className="toggle-label">{open ? t.common.close : t.common.menu}</span></button></div>
      </div>
      <span className="header-progress" style={{ transform: `scaleX(${progress})` }}/>
    </motion.header>

    <AnimatePresence>
      {open && <motion.aside className="nav-drawer nav-drawer--open" aria-label={t.nav.menu} initial={{ clipPath: locale === 'ar' ? 'circle(0% at 72px 48px)' : 'circle(0% at calc(100% - 72px) 48px)' }} animate={{ clipPath: locale === 'ar' ? 'circle(150% at 72px 48px)' : 'circle(150% at calc(100% - 72px) 48px)' }} exit={{ clipPath: locale === 'ar' ? 'circle(0% at 72px 48px)' : 'circle(0% at calc(100% - 72px) 48px)' }} transition={{ duration: .78, ease: drawerEase }}>
        <motion.div className="drawer-orb drawer-orb--one" initial={{ scale: .72, opacity: 0 }} animate={{ scale: 1, opacity: .8 }} exit={{ scale: .8, opacity: 0 }} transition={{ duration: .8, ease: drawerEase }}/><motion.div className="drawer-orb drawer-orb--two" initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -80, opacity: 0 }} transition={{ duration: .8, ease: drawerEase }}/><div className="drawer-pattern"/>
        <motion.div className="drawer-grid" initial="closed" animate="open" exit="closed" variants={{ closed: {}, open: { transition: { staggerChildren: .08, delayChildren: .12 } } }}>
          <motion.div className="drawer-brand" variants={{ closed: { opacity: 0, y: 24 }, open: { opacity: 1, y: 0 } }} transition={{ duration: .5, ease: drawerEase }}><div className="drawer-overline"><Sparkles size={13}/><span>{t.nav.menu}</span></div><Mark light /><p>Digital systems company<br/>{t.common.location}</p><div className="drawer-coordinate">15.3694° N &nbsp; 44.1910° E</div></motion.div>
          <motion.nav variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}>{nav.map((item, i) => <motion.div key={item.href} variants={{ closed: { opacity: 0, y: 24 }, open: { opacity: 1, y: 0 } }} transition={{ duration: .48, ease: drawerEase }}><Link style={{ '--item-index': i } as React.CSSProperties} onClick={() => setOpen(false)} className={pathname === item.href ? 'is-active' : ''} href={item.href}><span>0{i + 1}</span><b>{item.label}</b><ArrowUpRight size={20}/></Link></motion.div>)}<motion.div variants={{ closed: { opacity: 0, y: 24 }, open: { opacity: 1, y: 0 } }} transition={{ duration: .48, ease: drawerEase }}><Link style={{ '--item-index': nav.length } as React.CSSProperties} onClick={() => setOpen(false)} className={pathname === `/${locale}/contact` ? 'is-active' : ''} href={`/${locale}/contact`}><span>0{nav.length + 1}</span><b>{t.nav.contact}</b><ArrowUpRight size={20}/></Link></motion.div></motion.nav>
          <motion.div className="drawer-foot" variants={{ closed: { opacity: 0, y: 12 }, open: { opacity: 1, y: 0 } }} transition={{ duration: .5, ease: drawerEase }}><p><i/>{t.home.availability}</p><span>© SPARTECH 2026</span></motion.div>
        </motion.div>
      </motion.aside>}
    </AnimatePresence>
  </>;
}
