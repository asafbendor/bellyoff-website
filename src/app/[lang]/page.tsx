import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorksSection from '@/components/HowItWorksSection';
import Testimonials from '@/components/Testimonials';
import DownloadCTA from '@/components/DownloadCTA';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { Lang, t } from '@/i18n/translations';
import { getAllBlogMeta } from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return {
    title: tr.hero_title,
    description: tr.hero_subtitle,
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  const recentPosts = getAllBlogMeta(lang).slice(0, 3);

  return (
    <>
      <Hero lang={lang} />
      <Features lang={lang} />
      <HowItWorksSection lang={lang} />
      <Testimonials lang={lang} />

      {recentPosts.length > 0 && (
        <section className="bg-white dark:bg-[#111216] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tr.blog_title}</h2>
              <Link href={`/${lang}/blog/`} className="text-sm text-[#6C63FF] hover:text-[#9C95FF] transition-colors">
                {tr.blog_all} →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DownloadCTA lang={lang} />
    </>
  );
}
