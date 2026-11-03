import type { Metadata } from 'next';
import './globals.css';
import './deployment-extensions.css';
export const metadata: Metadata = { title: { default: 'Spartech — Digital systems company', template: '%s — Spartech' }, description: 'Spartech engineers trusted software and financial infrastructure for ambitious organisations.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body>{children}</body></html>; }
