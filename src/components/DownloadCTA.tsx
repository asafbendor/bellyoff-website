import { Lang, t, PLAY_STORE_URL } from '@/i18n/translations';

export default function DownloadCTA({ lang }: { lang: Lang }) {
  const tr = t(lang);
  return (
    <section className="bg-[#0D0F14] py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#6C63FF15_0%,transparent_65%)]" />
      <div className="relative max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{tr.cta_title}</h2>
        <p className="text-[#8A8A9A] mb-8">{tr.cta_sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
              <path d="M3 20.5v-17c0-.83 1-1.28 1.6-.75l14 8.5c.53.32.53 1.18 0 1.5l-14 8.5c-.6.53-1.6.08-1.6-.75z"/>
            </svg>
            {tr.cta_btn}
          </a>
          <span className="text-sm text-[#555]">{tr.cta_coming}</span>
        </div>
      </div>
    </section>
  );
}
