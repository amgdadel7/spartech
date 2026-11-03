'use client';
import Link from 'next/link';
import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

type Props = { href: string; children: React.ReactNode; variant?: 'dark' | 'light' | 'ghost'; arrow?: 'up' | 'down' | 'right'; className?: string };
/** Primary interaction primitive: CSS magnetic drift + Framer Motion press response. */
export function MagneticButton({ href, children, variant = 'dark', arrow = 'up', className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect(); const x = event.clientX - rect.left - rect.width / 2; const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * .13}px, ${y * .16}px)`;
  };
  const icon = arrow === 'up' ? <ArrowUpRight size={17} /> : arrow === 'down' ? <ArrowDownLeft size={17} /> : <ArrowRight size={19} />;
  return <motion.div className="inline-flex" whileHover={{ y: -2 }} whileTap={{ scale: .97 }} transition={{ type: 'spring', stiffness: 360, damping: 22 }}>
    <Link ref={ref} href={href} onMouseMove={onMove} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ''; }} className={`magnetic-button magnetic-button--${variant} cta-button cta-button--${variant} ${className}`}>
      <span>{children}</span><span className="button-icon">{icon}</span>
    </Link>
  </motion.div>;
}
