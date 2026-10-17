// The sitemap, written by hand rather than through Next's MetadataRoute so a
// post's photo can ride along as a full image entry (loc, title and caption in
// the post's language): the explicit way to hand a picture to image search.
// Next's `images` field would emit the location alone.
import { getAllBlogMeta } from '@/lib/blog';
import { GUIDES, GUIDE_LANGS } from '@/lib/guides';

export const dynamic = 'force-static';

const BASE_URL = 'https://bellyoff.app';
const LANGS = ['en', 'he', 'ar', 'es', 'de', 'fr'] as const;
const STATIC_ROUTES = ['', '/how-it-works', '/blog', '/privacy', '/terms'];

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function url(loc: string, lastmod: string, freq: string, priority: string, extra = ''): string {
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n${extra}  </url>`;
}

function alternates(path: string, langs: readonly string[]): string {
  return langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${path}/"/>\n`).join('');
}

export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  for (const lang of LANGS) {
    for (const route of STATIC_ROUTES) {
      urls.push(
        url(`${BASE_URL}/${lang}${route}/`, today, route === '/blog' ? 'daily' : 'weekly', route === '' ? '1.0' : route === '/blog' ? '0.9' : '0.7', alternates(route, LANGS)),
      );
    }
  }

  for (const lang of LANGS) {
    for (const meta of getAllBlogMeta(lang)) {
      const image = meta.image
        ? `    <image:image>\n      <image:loc>${esc(BASE_URL + meta.image)}</image:loc>\n      <image:title>${esc(meta.title)}</image:title>\n      <image:caption>${esc(meta.imageCaption || meta.imageAlt || meta.title)}</image:caption>\n    </image:image>\n`
        : '';
      urls.push(url(`${BASE_URL}/${lang}/blog/${meta.slug}/`, meta.date || today, 'monthly', '0.6', image));
    }
  }

  for (const lang of GUIDE_LANGS) {
    urls.push(url(`${BASE_URL}/${lang}/guides/`, today, 'monthly', '0.7', alternates('/guides', GUIDE_LANGS)));
    for (const g of GUIDES) {
      urls.push(url(`${BASE_URL}/${lang}/guides/${g.slug}/`, today, 'monthly', '0.6', alternates(`/guides/${g.slug}`, GUIDE_LANGS)));
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    urls.join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
