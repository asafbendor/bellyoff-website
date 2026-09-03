import { MetadataRoute } from 'next';
import { getBlogSlugs, getBlogMeta } from '@/lib/blog';
import { GUIDES, GUIDE_LANGS } from '@/lib/guides';

export const dynamic = 'force-static';

const BASE_URL = 'https://bellyoff.app';
const LANGS = ['en', 'he', 'ar', 'es', 'de', 'fr'] as const;
const STATIC_ROUTES = ['', '/how-it-works', '/blog', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGS) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}/`,
        lastModified: new Date(),
        changeFrequency: route === '/blog' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/blog' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${BASE_URL}/${l}${route}/`])
          ),
        },
      });
    }
  }

  for (const lang of LANGS) {
    const slugs = getBlogSlugs(lang);
    for (const slug of slugs) {
      const meta = getBlogMeta(lang, slug);
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${slug}/`,
        lastModified: meta?.date ? new Date(meta.date) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Guide engine: hub + one page per guide, English and Hebrew only.
  for (const lang of GUIDE_LANGS) {
    entries.push({
      url: `${BASE_URL}/${lang}/guides/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(GUIDE_LANGS.map((l) => [l, `${BASE_URL}/${l}/guides/`])),
      },
    });
    for (const g of GUIDES) {
      entries.push({
        url: `${BASE_URL}/${lang}/guides/${g.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(GUIDE_LANGS.map((l) => [l, `${BASE_URL}/${l}/guides/${g.slug}/`])),
        },
      });
    }
  }

  return entries;
}
