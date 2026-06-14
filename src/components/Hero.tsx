import PhoneMockup from './PhoneMockup';
import { Lang, t } from '@/i18n/translations';

export default function Hero({ lang }: { lang: Lang }) {
  const tr = t(lang);
  return (
    <section className="bg-[#0D0F14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,#6C63FF10_0%,transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/30 text-[#9C95FF] text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              {tr.hero_badge}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {tr.hero_title}
            </h1>
            <p className="text-[#8A8A9A] text-lg leading-relaxed mb-8">
              {tr.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5A52E0] text-white px-6 py-3 rounded-full font-semibold transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                  <path d="M3 20.5v-17c0-.83 1-1.28 1.6-.75l14 8.5c.53.32.53 1.18 0 1.5l-14 8.5c-.6.53-1.6.08-1.6-.75z"/>
                </svg>
                {tr.hero_cta}
              </a>
              <div className="text-sm text-[#555] self-center">{tr.hero_sub}</div>
            </div>
          </div>

          <div className="flex items-end justify-center gap-6 md:gap-8">
            <PhoneMockup screen="maya" lang={lang} className="-rotate-6 translate-y-4 mt-8" />
            <PhoneMockup screen="summary" lang={lang} className="scale-110" />
            <PhoneMockup screen="alex" lang={lang} className="rotate-6 translate-y-4 mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
