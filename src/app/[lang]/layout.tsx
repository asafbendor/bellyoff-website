import type { Metadata } from 'next';
import '../globals.css';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lang, RTL_LANGS, t, LANG_NAMES, PLAY_STORE_URL } from '@/i18n/translations';

const LANGS: Lang[] = ['en', 'he', 'ar', 'es', 'de', 'fr'];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

const OG_IMAGE = {
  url: 'https://bellyoff.app/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'BellyOff - 10 minutes a day for a flatter belly after 40',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return {
    title: { default: `${tr.app_name} - ${tr.hero_title}`, template: `%s | ${tr.app_name}` },
    description: tr.hero_subtitle,
    alternates: {
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, `https://bellyoff.app/${l}/`])),
        'x-default': 'https://bellyoff.app/en/',
      },
    },
    openGraph: {
      siteName: 'BellyOff',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      images: [OG_IMAGE.url],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const isRTL = RTL_LANGS.includes(lang);

  // No hreflang is built here on purpose. A layout does not know which page it is
  // wrapping, so the only thing it could point at is the home page, which is wrong
  // on every other route. Each page declares its own alternates in generateMetadata,
  // and blog posts declare none because a post has no translation to point at.

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'BellyOff',
    url: 'https://bellyoff.app',
    downloadUrl: PLAY_STORE_URL,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android',
    description: t(lang).hero_subtitle,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: lang,
    publisher: { '@type': 'Organization', name: 'BellyOff', url: 'https://bellyoff.app' },
  };

  const fontFamilies = lang === 'ar'
    ? 'family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700'
    : 'family=Inter:wght@400;500;600;700&family=Heebo:wght@400;500;600;700';

  return (
    <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JVM77H82ZH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-JVM77H82ZH');`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="bg-white dark:bg-[#0D0F14] text-gray-900 dark:text-white min-h-screen flex flex-col">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Header lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
