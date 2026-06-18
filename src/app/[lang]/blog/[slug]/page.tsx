import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DownloadCTA from '@/components/DownloadCTA';
import { Lang, RTL_LANGS, t } from '@/i18n/translations';
import { getBlogPost, getAllStaticParams } from '@/lib/blog';
import { categoryImage } from '@/lib/blogImages';

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
    alternates: {
      canonical: `https://bellyoff.app/${lang}/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [{ url: 'https://bellyoff.app/images/og-image.png', width: 1200, height: 630 }],
    },
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
  const isRTL = RTL_LANGS.includes(lang);
  const heroImage = categoryImage(post.category);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: lang,
    image: `https://bellyoff.app${heroImage}`,
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

      <section className="bg-[#0D0F14] pb-2">
        <div className="max-w-3xl mx-auto px-4">
          <div className="aspect-[1200/630] rounded-2xl overflow-hidden border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-[#111216]">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="article-content"
            dir={isRTL ? 'rtl' : 'ltr'}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </section>

      <DownloadCTA lang={lang} />
    </>
  );
}
