'use client';
import { useEffect, useRef, useState } from 'react';

export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const hasRun = useRef(false);
  const decimal = value.includes('.');
  const prefixZero = value.startsWith('0');
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const numeric = Number(value.replace(/[^0-9.]/g, ''));
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasRun.current) return;
      hasRun.current = true; const start = performance.now(); const duration = 1050;
      const frame = (now: number) => { const progress = Math.min(1, (now - start) / duration); const eased = 1 - Math.pow(1 - progress, 3); setCurrent(numeric * eased); if (progress < 1) requestAnimationFrame(frame); };
      requestAnimationFrame(frame); observer.disconnect();
    }, { threshold: .45 });
    observer.observe(node); return () => observer.disconnect();
  }, [value]);
  const number = value.includes('K') ? current.toFixed(1) : decimal ? current.toFixed(1) : Math.round(current).toString().padStart(prefixZero ? 2 : 1, '0');
  const suffix = value.replace(/[0-9.]/g, '');
  return <span ref={ref}>{number}{suffix}</span>;
}
