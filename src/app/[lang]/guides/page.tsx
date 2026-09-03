import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DownloadCTA from '@/components/DownloadCTA';
import { Lang } from '@/i18n/translations';
import { GUIDES, GUIDE_LANGS, GuideLang, guideContent } from '@/lib/guides';

const BASE = 'https://bellyoff.app';

// The guide engine is authored in English and Hebrew only, so its hub exists in
// those two languages. For the other locales the route is a 404 rather than a
// thin, machine-translated page.
function isGuideLang(lang: string): lang is GuideLang {
  return (GUIDE_LANGS as string[]).includes(lang);
}

const HUB = {
  en: {
    title: 'Belly-fat guides after 40',
    metaTitle: 'Belly-fat guides after 40 | BellyOff',
    metaDescription: 'Straight answers to the questions people over 40 ask about losing belly fat: how many minutes a day, does walking help, why it changes after 40, and more.',
    intro: 'Short, honest answers to the questions people over 40 actually ask about belly fat. General fitness information, not medical advice.',
    all: 'All guides',
  },
  he: {
    title: 'מדריכי שומן בטן אחרי 40',
    metaTitle: 'מדריכי שומן בטן אחרי 40 | BellyOff',
    metaDescription: 'תשובות ישרות לשאלות שאנשים אחרי 40 שואלים על הורדת שומן בטן: כמה דקות ביום, האם הליכה עוזרת, למה זה משתנה אחרי 40 ועוד.',
    intro: 'תשובות קצרות וישרות לשאלות שאנשים אחרי 40 באמת שואלים על שומן בטן. מידע כללי בכושר, לא ייעוץ רפואי.',
    all: 'כל המדריכים',
  },
} as const;

export function generateStaticParams() {
  return GUIDE_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isGuideLang(lang)) return {};
  const h = HUB[lang];
  return {
    title: h.title,
    description: h.metaDescription,
    alternates: {
      canonical: `${BASE}/${lang}/guides/`,
      languages: {
        en: `${BASE}/en/guides/`,
        he: `${BASE}/he/guides/`,
        'x-default': `${BASE}/en/guides/`,
      },
    },
  };
}

export default async function GuidesHub({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  if (!isGuideLang(rawLang)) notFound();
  const lang = rawLang as GuideLang;
  const uiLang = lang as Lang;
  const h = HUB[lang];

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: GUIDES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: guideContent(g, lang).title,
      url: `${BASE}/${lang}/guides/${g.slug}/`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <section className="max-w-3xl mx-auto px-4 py-14 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{h.title}</h1>
        <p className="text-gray-600 dark:text-[#8A8A9A] mb-10 max-w-2xl">{h.intro}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => {
            const c = guideContent(g, lang);
            return (
              <Link
                key={g.slug}
                href={`/${lang}/guides/${g.slug}/`}
                className="block rounded-2xl border border-gray-200 dark:border-[#22252E] p-5 hover:border-[#6C63FF] transition-colors"
              >
                <h2 className="text-lg font-semibold mb-1">{c.title}</h2>
                <p className="text-sm text-gray-500 dark:text-[#8A8A9A]">{c.short}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <DownloadCTA lang={uiLang} />
    </>
  );
}
