import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'BellyOff',
  description: '10-minute daily workout for belly reduction after 40.',
};

// Root layout for the language picker at "/" only. Every language page has its own
// root layout in [lang]/layout.tsx, so <html> carries the right lang and dir in the
// static HTML instead of on an inner div.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JVM77H82ZH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-JVM77H82ZH');`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
