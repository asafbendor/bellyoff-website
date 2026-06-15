import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';
import { Lang, t } from '@/i18n/translations';
import { categoryImage } from '@/lib/blogImages';

const CATEGORY_COLORS: Record<string, string> = {
  breathing: 'bg-[#EEEDFE] text-[#534AB7]',
  posture: 'bg-[#E1F5EE] text-[#0F6E56]',
  metabolism: 'bg-[#FAEEDA] text-[#854F0B]',
  movement: 'bg-[#FCEBEB] text-[#993556]',
  mindset: 'bg-[#E6F1FB] text-[#185FA5]',
  general: 'bg-gray-100 text-gray-600',
};

export default function BlogCard({ post, lang }: { post: BlogPostMeta; lang: Lang }) {
  const tr = t(lang);
  const colorClass = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.general;
  return (
    <Link
      href={`/${lang}/blog/${post.slug}/`}
      className="group block bg-white dark:bg-[#1A1D26] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-[#6C63FF]/40 transition-colors"
    >
      <div className="aspect-[1200/630] overflow-hidden bg-[#0D0F14]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={categoryImage(post.category)}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${colorClass}`}>
            {post.category}
          </span>
          <span className="text-[11px] text-gray-400">{post.date} · {post.readingMinutes} {tr.blog_min}</span>
        </div>
        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-[#6C63FF] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-[#8A8A9A] line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
