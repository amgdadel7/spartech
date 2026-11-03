'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Locale } from '@/lib/i18n';

type ProjectSliderProps = { locale: Locale };
const artworks = ['/images/finance-network.png', '/images/accounting-flow.png', '/images/crm-command.png'];

export function ProjectSlider({ locale }: ProjectSliderProps) {
  const isArabic = locale === 'ar';
  const slides = isArabic
    ? [
      { category: 'حلول مالية', name: 'أنظمة مالية', detail: 'حلول موثوقة لإدارة العمليات المالية وحركة الأموال.' },
      { category: 'محاسبة وتقارير', name: 'أنظمة محاسبية', detail: 'دقة أكبر في السجلات والتقارير والرقابة المالية.' },
      { category: 'إدارة الأعمال', name: 'أنظمة إدارية', detail: 'منصات منظمة تدعم فرق العمل والقرار اليومي.' },
    ]
    : [
      { category: 'Financial solutions', name: 'Financial Systems', detail: 'Trusted systems for financial operations and money movement.' },
      { category: 'Accounting & reporting', name: 'Accounting Systems', detail: 'Greater clarity across records, reporting, and financial control.' },
      { category: 'Business operations', name: 'Administrative Systems', detail: 'Organised platforms for teams and everyday decision making.' },
    ];
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeRef = useRef(0);
  const wheelLocked = useRef(false);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const next = (index + slides.length) % slides.length;
    const viewport = viewportRef.current;
    const target = slideRefs.current[next];
    if (!viewport || !target) return;
    // Calculate from the two visible centres so this works in both LTR and RTL scroll containers.
    const viewportCenter = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    const targetCenter = target.getBoundingClientRect().left + target.clientWidth / 2;
    gsap.killTweensOf(viewport);
    gsap.to(viewport, { scrollLeft: viewport.scrollLeft + targetCenter - viewportCenter, duration: .86, ease: 'power3.inOut', overwrite: 'auto' });
    activeRef.current = next;
    setActive(next);
  }, [slides.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) { const index = Number((visible.target as HTMLElement).dataset.index); activeRef.current = index; setActive(index); }
    }, { root: viewport, threshold: [.55, .72] });
    slideRefs.current.forEach(slide => { if (slide) observer.observe(slide); });
    return () => observer.disconnect();
  }, [slides.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX) || Math.abs(event.deltaY) < 4) return;
      event.preventDefault();
      if (wheelLocked.current) return;
      wheelLocked.current = true;
      goTo(activeRef.current + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => { wheelLocked.current = false; }, 780);
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [goTo]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => goTo(active + 1), 5600);
    return () => window.clearInterval(timer);
  }, [active, paused, goTo]);

  const previousIcon = isArabic ? <ArrowRight size={17}/> : <ArrowLeft size={17}/>;
  const nextIcon = isArabic ? <ArrowLeft size={17}/> : <ArrowRight size={17}/>;
  const beginDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    const viewport = event.currentTarget;
    viewport.setPointerCapture(event.pointerId);
    dragState.current = { active: true, startX: event.clientX, startScroll: viewport.scrollLeft };
    gsap.killTweensOf(viewport); setPaused(true);
  };
  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const direction = isArabic ? 1 : -1;
    event.currentTarget.scrollLeft = dragState.current.startScroll + (event.clientX - dragState.current.startX) * direction;
  };
  const endDrag = () => { dragState.current.active = false; setPaused(false); };
  return <div className="project-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
    <div ref={viewportRef} onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} className="slider-viewport" dir={isArabic ? 'rtl' : 'ltr'} aria-roledescription="carousel">
      <div className="slider-track">
        {slides.map((project, index) => <Link ref={el => { slideRefs.current[index] = el; }} data-index={index} data-scroll-reveal className={`slide-card ${active === index ? 'is-active' : ''}`} key={project.name} href={`/${locale}/services`} aria-label={project.name}>
          <Image className="slide-art" src={artworks[index]} alt="" fill sizes="(max-width: 850px) 82vw, 800px" priority={index === 0}/>
          <span className="slide-grid"/><span className="slide-shimmer"/>
          <div className="slide-top"><span className="slide-category">{project.category}</span><span className="slide-number">0{index + 1}</span></div>
          <div className="slide-bottom"><div><h3>{project.name}</h3><p>{project.detail}</p></div><span className="slide-arrow"><ArrowUpRight size={19}/></span></div>
        </Link>)}
      </div>
    </div>
    <div className="slider-controls">
      <div className="slider-buttons"><button onClick={() => goTo(active - 1)} aria-label={isArabic ? 'المشروع السابق' : 'Previous project'}>{previousIcon}</button><button onClick={() => goTo(active + 1)} aria-label={isArabic ? 'المشروع التالي' : 'Next project'}>{nextIcon}</button></div>
      <div className="slider-meter"><span>0{active + 1}</span><div><i style={{ transform: `scaleX(${(active + 1) / slides.length})` }}/></div><span>0{slides.length}</span></div>
      <button className="autoplay-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? (isArabic ? 'تشغيل العرض التلقائي' : 'Play automatic carousel') : (isArabic ? 'إيقاف العرض التلقائي' : 'Pause automatic carousel')}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button>
    </div>
  </div>;
}
