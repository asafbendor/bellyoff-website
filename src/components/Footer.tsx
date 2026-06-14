import Link from 'next/link';
import { Lang, t } from '@/i18n/translations';

export default function Footer({ lang }: { lang: Lang }) {
  const tr = t(lang);
  return (
    <footer className="bg-[#0D0F14] border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-lg font-semibold text-white mb-1">
              Belly<span className="text-[#6C63FF]">Off</span>
            </div>
            <div className="text-sm text-[#555]">{tr.footer_tagline}</div>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-[#8A8A9A]">
            <Link href={`/${lang}/privacy/`} className="hover:text-white transition-colors">{tr.footer_privacy}</Link>
            <Link href={`/${lang}/terms/`} className="hover:text-white transition-colors">{tr.footer_terms}</Link>
            <a href="mailto:hello@bellyoff.app" className="hover:text-white transition-colors">{tr.footer_contact}</a>
          </nav>
          <div className="text-xs text-[#444]">{tr.footer_copy}</div>
        </div>
      </div>
    </footer>
  );
}
