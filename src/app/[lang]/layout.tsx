import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lang, RTL_LANGS, t, LANG_NAMES } from '@/i18n/translations';

const LANGS: Lang[] = ['en', 'he', 'ar', 'es', 'de', 'fr'];

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return {
    title: { default: `${tr.app_name} — ${tr.hero_title}`, template: `%s | ${tr.app_name}` },
    description: tr.hero_subtitle,
    alternates: {
      languages: Object.fromEntries(
        LANGS.map((l) => [l, `https://bellyoff.app/${l}/`])
      ),
    },
    openGraph: {
      siteName: 'BellyOff',
      type: 'website',
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

  const hreflangLinks = LANGS.map((l) => (
    <link key={l} rel="alternate" hrefLang={l} href={`https://bellyoff.app/${l}/`} />
  ));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BellyOff',
    url: 'https://bellyoff.app',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Android',
    description: t(lang).hero_subtitle,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: lang,
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} lang={lang} className="bg-white dark:bg-[#0D0F14] text-gray-900 dark:text-white min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
