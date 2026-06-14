import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { Lang, t } from '@/i18n/translations';
import { getAllBlogMeta } from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return { title: tr.blog_title, description: tr.blog_sub };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  const posts = getAllBlogMeta(lang);

  return (
    <>
      <section className="bg-[#0D0F14] py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{tr.blog_title}</h1>
          <p className="text-[#8A8A9A]">{tr.blog_sub}</p>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-[#111216]">
        <div className="max-w-6xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-[#555]">{tr.blog_empty}</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
