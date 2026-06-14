'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang, LANG_LABELS, RTL_LANGS, t } from '@/i18n/translations';

const LANGS: Lang[] = ['en', 'he', 'ar', 'es', 'de', 'fr'];

export default function Header({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const pathname = usePathname();
  const isRTL = RTL_LANGS.includes(lang);

  function switchLang(newLang: Lang) {
    const segments = pathname.split('/');
    segments[1] = newLang;
    return segments.join('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0D0F14]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href={`/${lang}/`} className="text-lg font-semibold text-white shrink-0">
          Belly<span className="text-[#6C63FF]">Off</span>
        </Link>

        <nav className={`hidden md:flex items-center gap-6 text-sm text-[#8A8A9A] ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link href={`/${lang}/`} className="hover:text-white transition-colors">{tr.nav_home}</Link>
          <Link href={`/${lang}/how-it-works/`} className="hover:text-white transition-colors">{tr.nav_how}</Link>
          <Link href={`/${lang}/blog/`} className="hover:text-white transition-colors">{tr.nav_blog}</Link>
        </nav>

        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="hidden sm:flex items-center gap-1">
            {LANGS.map((l) => (
              <Link
                key={l}
                href={switchLang(l)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  l === lang
                    ? 'bg-[#6C63FF] text-white'
                    : 'text-[#8A8A9A] hover:text-white hover:bg-white/5'
                }`}
              >
                {LANG_LABELS[l]}
              </Link>
            ))}
          </div>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white text-sm px-4 py-2 rounded-full font-medium transition-colors shrink-0"
          >
            {tr.nav_download}
          </a>
        </div>
      </div>
    </header>
  );
}
