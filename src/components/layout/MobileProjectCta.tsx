'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';

export function MobileProjectCta({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const update = () => setShow(window.scrollY > 520); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <AnimatePresence>{show && <motion.div className="mobile-project-cta" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: 'spring', stiffness: 310, damping: 28 }}><Link href={`/${locale}/contact`}><span>{t.common.start}</span><i><ArrowUpRight size={18}/></i></Link></motion.div>}</AnimatePresence>;
}
