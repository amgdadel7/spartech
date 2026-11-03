import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { SmoothScroll } from './SmoothScroll';
import { ScrollEffects } from './ScrollEffects';
import { MobileProjectCta } from './MobileProjectCta';
import { Dictionary, Locale } from '@/lib/i18n';
export function PageShell({ children, locale, t }: { children: React.ReactNode; locale: Locale; t: Dictionary }) { return <SmoothScroll><ScrollEffects/><SiteHeader locale={locale} t={t}/><main>{children}</main><SiteFooter locale={locale} t={t}/><MobileProjectCta locale={locale} t={t}/></SmoothScroll>; }
