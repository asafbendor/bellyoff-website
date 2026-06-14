import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Lang } from '@/i18n/translations';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lang: Lang;
  category: string;
  excerpt: string;
  readingMinutes: number;
  contentHtml: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  lang: Lang;
  category: string;
  excerpt: string;
  readingMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getBlogSlugs(lang: Lang): string[] {
  const dir = path.join(BLOG_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllBlogMeta(lang: Lang): BlogPostMeta[] {
  const slugs = getBlogSlugs(lang);
  return slugs
    .map((slug) => getBlogMeta(lang, slug))
    .filter(Boolean)
    .sort((a, b) => (a!.date > b!.date ? -1 : 1)) as BlogPostMeta[];
}

export function getBlogMeta(lang: Lang, slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const wordCount = content.split(/\s+/).length;
  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    lang: data.lang ?? lang,
    category: data.category ?? 'general',
    excerpt: data.excerpt ?? '',
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
  };
}

export async function getBlogPost(lang: Lang, slug: string): Promise<BlogPost | null> {
  const meta = getBlogMeta(lang, slug);
  if (!meta) return null;
  const filePath = path.join(BLOG_DIR, lang, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { ...meta, contentHtml: processed.toString() };
}

export function getAllStaticParams() {
  const langs: Lang[] = ['en', 'he', 'ar', 'es', 'de', 'fr'];
  const params: { lang: Lang; slug: string }[] = [];
  for (const lang of langs) {
    for (const slug of getBlogSlugs(lang)) {
      params.push({ lang, slug });
    }
  }
  return params;
}
