'use client';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Calculator, Network, UsersRound } from 'lucide-react';
import { Dictionary, Locale } from '@/lib/i18n';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal, SplitWords } from '@/components/ui/Reveal';
import { ServicesShowcase } from './ServicesShowcase';
import { ProcessTrust } from './ProcessTrust';
import { StatCounter } from '@/components/ui/StatCounter';

const systemIcons = [UsersRound, Calculator, Network];

export function HomeExperience({ locale, t }: { locale: Locale; t: Dictionary }) {
  return <div className="home-experience">
    <div className="pattern-universe" aria-hidden="true"><div className="pattern-universe__grid"/><div className="pattern-universe__orb pattern-universe__orb--one"/><div className="pattern-universe__orb pattern-universe__orb--two"/></div>
    <section className="home-hero chapter" data-chapter="hero"><div className="hero-aurora" data-scroll-parallax="-125"/><div className="hero-lattice"/><div className="hero-status"><span/> LIVE SYSTEMS</div><div className="hero-grid"><div className="hero-copy">
      <Reveal><p className="eyebrow eyebrow--light"><span className="eyebrow-dot"/>{t.home.eyebrow}</p></Reveal>
      <h1><SplitWords text={t.home.heroLine1} /><span className="gradient-word">{t.home.heroAccent}</span><br/><SplitWords text={t.home.heroLine2} /></h1>
      <Reveal delay={.2}><p className="hero-description">{t.home.heroCopy}</p></Reveal>
      <Reveal delay={.35}><div className="hero-actions"><MagneticButton href={`/${locale}/contact`} variant="light" arrow="right">{t.common.start}</MagneticButton></div></Reveal>
    </div><div className="hero-side"><span className="orbit-label">SPARTECH / 15.3694° N, 44.1910° E</span><div className="hero-scroll"><ArrowDown size={14}/><span>{t.common.scroll}</span></div></div></div></section>

    <section className="proof-strip chapter"><div className="proof-scanline"/><div className="container proof-grid">{t.home.proof.map((item, i)=><Reveal key={item.label} delay={i*.08}><div className="proof-item"><strong><StatCounter value={item.value}/></strong><span>{item.label}</span></div></Reveal>)}</div></section>

    <section className="intro-section chapter"><div className="intro-tint" data-scroll-parallax="105"/><div className="intro-stamp" data-scroll-parallax="-65">SYSTEMS<br/>THAT MOVE</div><div className="container intro-layout" data-scroll-reveal><div><p className="eyebrow"><span className="eyebrow-dot"/>{t.home.introLabel}</p></div><div><Reveal><h2 dangerouslySetInnerHTML={{__html:t.home.introTitle}}/><p className="large-copy">{t.home.introCopy}</p><div className="intro-capabilities">{t.home.introCapabilities.map((capability, index) => <span key={capability}><i>0{index + 1}</i>{capability}</span>)}</div></Reveal><Link className="text-link" href={`/${locale}/services`}>{t.common.explore}<ArrowUpRight size={17}/></Link></div></div></section>

    <section className="systems-section chapter"><div className="systems-constellation" data-scroll-parallax="-155"><i/><i/><i/><i/></div><div className="container"><div className="systems-stage"><div className="section-heading"><div><p className="eyebrow eyebrow--light"><span className="eyebrow-dot"/>{t.home.systemsLabel}</p><Reveal><h2 dangerouslySetInnerHTML={{__html:t.home.systemsTitle}}/></Reveal></div><p className="section-index">01—03</p></div><div className="systems-list">{t.home.systems.map((system, i)=>{ const Icon = systemIcons[i]; return <article className="system-row" key={system.tag}><span className="system-number">{system.num}</span><div className="system-main"><div className="system-title-line"><span className="system-icon"><Icon size={18}/></span><span className="system-tag">{system.tag}</span></div><h3>{system.title}</h3></div><p>{system.copy}</p><Link href={`/${locale}/services`} aria-label={system.title}><ArrowUpRight/></Link></article>})}</div></div></div></section>

    <ProcessTrust locale={locale}/>

    <section className="statement-section chapter"><div className="statement-glow"/><div className="statement-rings" data-scroll-scale><i/><i/><i/></div><div className="container"><Reveal><p className="statement" dangerouslySetInnerHTML={{__html:t.home.statement}}/></Reveal></div></section>

    <ServicesShowcase locale={locale}/>

    <section className="final-cta chapter"><div className="final-pattern"/><div className="final-mesh" data-scroll-parallax="-90"/><div className="container final-grid" data-scroll-reveal><p className="eyebrow eyebrow--light"><span className="eyebrow-dot"/>SPARTECH / 2026</p><div><Reveal><h2 dangerouslySetInnerHTML={{__html:t.home.finalTitle}}/></Reveal><p>{t.home.finalCopy}</p><MagneticButton href={`/${locale}/contact`} variant="light" arrow="right" className="final-button">{t.common.start}</MagneticButton></div></div></section>
  </div>;
}
