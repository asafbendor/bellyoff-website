import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DownloadCTA from '@/components/DownloadCTA';
import { Lang } from '@/i18n/translations';
import { GUIDES, GUIDE_LANGS, GuideLang, getGuide, guideContent } from '@/lib/guides';

const BASE = 'https://bellyoff.app';

function isGuideLang(lang: string): lang is GuideLang {
  return (GUIDE_LANGS as string[]).includes(lang);
}

// English and Hebrew only, one entry per (lang, slug). The other four locales
// never build a guide page, so there is no thin translated content.
export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of GUIDE_LANGS) {
    for (const g of GUIDES) params.push({ lang, slug: g.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isGuideLang(lang)) return {};
  const g = getGuide(slug);
  if (!g) return {};
  const c = guideContent(g, lang);
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `${BASE}/${lang}/guides/${slug}/`,
      languages: {
        en: `${BASE}/en/guides/${slug}/`,
        he: `${BASE}/he/guides/${slug}/`,
        'x-default': `${BASE}/en/guides/${slug}/`,
      },
    },
    openGraph: {
      title: c.title,
      description: c.metaDescription,
      type: 'article',
      images: [{ url: `${BASE}/images/og-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  if (!isGuideLang(rawLang)) notFound();
  const lang = rawLang as GuideLang;
  const uiLang = lang as Lang;
  const g = getGuide(slug);
  if (!g) notFound();
  const c = guideContent(g, lang);
  const others = GUIDES.filter((x) => x.slug !== slug).slice(0, 4);
  const back = lang === 'he' ? 'לכל המדריכים' : 'All guides';
  const moreLabel = lang === 'he' ? 'מדריכים נוספים' : 'More guides';
  const faqLabel = lang === 'he' ? 'שאלות נפוצות' : 'Frequently asked';
  const disclaimer =
    lang === 'he'
      ? 'המידע כללי בתחום הכושר ואינו ייעוץ רפואי. לפני שינוי משמעותי באורח החיים, במיוחד עם מצב רפואי קיים, כדאי להתייעץ עם איש מקצוע.'
      : 'This is general fitness information, not medical advice. Before a major change, especially with an existing condition, check with a professional.';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BellyOff', item: `${BASE}/${lang}/` },
      { '@type': 'ListItem', position: 2, name: back, item: `${BASE}/${lang}/guides/` },
      { '@type': 'ListItem', position: 3, name: c.title, item: `${BASE}/${lang}/guides/${slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <article className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <nav className="text-sm text-gray-500 dark:text-[#8A8A9A] mb-6">
          <Link href={`/${lang}/guides/`} className="hover:text-[#6C63FF]">
            {back}
          </Link>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{c.title}</h1>
        <div className="rounded-2xl bg-[#EEEDFE] dark:bg-[#1A1D40] p-5 mb-8">
          <p className="font-medium">{c.short}</p>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{c.intro}</p>

        {c.sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{s.h}</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {s.body.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[#6C63FF] mt-1">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{faqLabel}</h2>
          {c.faq.map((f) => (
            <div key={f.q} className="mb-5">
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">{moreLabel}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/${lang}/guides/${o.slug}/`}
                className="block rounded-xl border border-gray-200 dark:border-[#22252E] p-4 text-sm hover:border-[#6C63FF] transition-colors"
              >
                {guideContent(o, lang).title}
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-gray-400 dark:text-[#555] border-t border-gray-200 dark:border-[#22252E] pt-5">
          {disclaimer}
        </p>
      </article>
      <DownloadCTA lang={uiLang} />
    </>
  );
}
