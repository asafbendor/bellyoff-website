import { MetadataRoute } from 'next';

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

  return entries;
}
