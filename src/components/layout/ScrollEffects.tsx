'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Decorative scroll choreography shared by all routes. */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-scroll-reveal]').forEach((element) => {
        gsap.fromTo(element, { y: 42, opacity: 0, rotateX: 7, transformPerspective: 700 }, {
          y: 0, opacity: 1, rotateX: 0, duration: .95, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-scroll-parallax]').forEach((element) => {
        const distance = Number(element.dataset.scrollParallax || 90);
        gsap.to(element, { y: distance, ease: 'none', scrollTrigger: { trigger: element.parentElement || element, start: 'top bottom', end: 'bottom top', scrub: .8 } });
      });
      gsap.utils.toArray<HTMLElement>('[data-scroll-scale]').forEach((element) => {
        gsap.fromTo(element, { scale: .86, opacity: .35 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top 92%', end: 'top 38%', scrub: .8 } });
      });
      gsap.utils.toArray<HTMLElement>('.system-row').forEach((element, index) => {
        gsap.fromTo(element, { xPercent: index % 2 ? -4 : 4, opacity: .15 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top 88%', end: 'top 54%', scrub: .5 } });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
