'use client';
import Image from 'next/image';
import { ExternalLink, MapPin, Minus, Navigation2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import { Locale } from '@/lib/i18n';

type StudioMapProps = { locale: Locale; address: string };

/** Minimal atlas-style location map with lightweight pointer parallax and no external map API. */
export function StudioMap({ locale, address }: StudioMapProps) {
  const root = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isArabic = locale === 'ar';
  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = root.current?.getBoundingClientRect();
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setOffset({ x: ((event.clientX - box.left) / box.width - .5) * -10, y: ((event.clientY - box.top) / box.height - .5) * -10 });
  };
  return <div ref={root} className="studio-map studio-map--atlas" onPointerMove={onMove} onPointerLeave={() => setOffset({ x: 0, y: 0 })}>
    <div className="atlas-image" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}><Image src="/images/sanaa-map-atlas.png" alt="" fill sizes="(max-width: 950px) 100vw, 760px" priority/></div>
    <div className="atlas-vignette"/>
    <div className="atlas-compass" aria-hidden="true"><i/><span>N</span></div>
    <div className="map-marker map-marker--atlas"><i className="map-marker__pulse"/><span className="map-marker__body"><MapPin size={20}/></span></div>
    <div className="studio-map__controls"><button onClick={() => setZoom(value => Math.min(1.16, value + .06))} aria-label={isArabic ? 'تكبير الخريطة' : 'Zoom in'}><Plus size={15}/></button><button onClick={() => setZoom(value => Math.max(.96, value - .06))} aria-label={isArabic ? 'تصغير الخريطة' : 'Zoom out'}><Minus size={15}/></button></div>
    <div className="studio-map__bottom"><div><span className="map-address-label"><Navigation2 size={14}/>{isArabic ? 'موقع المكتب' : 'Office location'}</span><strong>{address}</strong></div><a href="https://maps.google.com/?q=Taiz+Street+Yemen" target="_blank" rel="noreferrer"><span>{isArabic ? 'افتح في الخرائط' : 'Open maps'}</span><ExternalLink size={15}/></a></div>
  </div>;
}
