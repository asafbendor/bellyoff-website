import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DownloadCTA from '@/components/DownloadCTA';
import { Lang, t } from '@/i18n/translations';
import { getBlogPost, getAllStaticParams } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Lang;
  const post = await getBlogPost(lang, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Lang;
  const post = await getBlogPost(lang, slug);
  if (!post) notFound();

  const tr = t(lang);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: lang,
    publisher: {
      '@type': 'Organization',
      name: 'BellyOff',
      url: 'https://bellyoff.app',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-[#0D0F14] py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link href={`/${lang}/blog/`} className="text-sm text-[#6C63FF] hover:text-[#9C95FF] mb-6 inline-block">
            ← {tr.blog_title}
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-[#6C63FF] bg-[#6C63FF]/10 px-2 py-0.5 rounded-full uppercase">
              {post.category}
            </span>
            <span className="text-xs text-[#555]">{post.date} · {post.readingMinutes} {tr.blog_min}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-[#111216]">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-p:text-gray-600 dark:prose-p:text-[#8A8A9A] prose-a:text-[#6C63FF] max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </section>

      <DownloadCTA lang={lang} />
    </>
  );
}
