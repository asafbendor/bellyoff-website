'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang, LANG_LABELS, RTL_LANGS, t } from '@/i18n/translations';

const LANGS: Lang[] = ['en', 'he', 'ar', 'es', 'de', 'fr'];

export default function Header({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const pathname = usePathname();
  const isRTL = RTL_LANGS.includes(lang);
  const [menuOpen, setMenuOpen] = useState(false);

  function switchLang(newLang: Lang) {
    const segments = pathname.split('/');
    segments[1] = newLang;
    return segments.join('/');
  }

  const navLinks = (
    <>
      <Link href={`/${lang}/`} className="hover:text-white transition-colors">{tr.nav_home}</Link>
      <Link href={`/${lang}/how-it-works/`} className="hover:text-white transition-colors">{tr.nav_how}</Link>
      <Link href={`/${lang}/blog/`} className="hover:text-white transition-colors">{tr.nav_blog}</Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-[#0D0F14]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href={`/${lang}/`} className="text-lg font-semibold text-white shrink-0">
          Belly<span className="text-[#6C63FF]">Off</span>
        </Link>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-6 text-sm text-[#8A8A9A] ${isRTL ? 'flex-row-reverse' : ''}`}>
          {navLinks}
        </nav>

        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Desktop lang pills */}
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

          {/* Mobile lang select */}
          <select
            className="block sm:hidden bg-[#1A1D26] border border-white/10 text-[#8A8A9A] text-xs rounded px-2 py-1.5 focus:outline-none focus:border-[#6C63FF]"
            value={lang}
            onChange={(e) => { window.location.href = switchLang(e.target.value as Lang); }}
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>{LANG_LABELS[l]}</option>
            ))}
          </select>

          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex bg-[#6C63FF] hover:bg-[#5A52E0] text-white text-sm px-4 py-2 rounded-full font-medium transition-colors shrink-0"
          >
            {tr.nav_download}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded text-white hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className={`md:hidden border-t border-white/5 bg-[#0D0F14] px-4 py-4 flex flex-col gap-4 text-base text-[#C5C5D0] ${isRTL ? 'text-right' : 'text-left'}`}
          onClick={() => setMenuOpen(false)}
        >
          {navLinks}
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white text-sm px-4 py-2.5 rounded-full font-medium transition-colors text-center mt-1"
          >
            {tr.nav_download}
          </a>
        </nav>
      )}
    </header>
  );
}
