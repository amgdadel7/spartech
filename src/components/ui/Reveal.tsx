'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type RevealProps = { children: React.ReactNode; className?: string; delay?: number; words?: boolean };
export function Reveal({ children, className = '', delay = 0, words = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const target = words ? node.querySelectorAll('[data-word]') : node;
      gsap.fromTo(target, { y: 28, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: .9, stagger: words ? .055 : 0, delay, ease: 'power3.out', scrollTrigger: { trigger: node, start: 'top 88%', once: true } });
    }, node);
    return () => ctx.revert();
  }, [delay, words]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function SplitWords({ text, className = '' }: { text: string; className?: string }) {
  return <span className={className}>{text.split(' ').map((word, index) => <span data-word key={`${word}-${index}`} className="word">{word}&nbsp;</span>)}</span>;
}
