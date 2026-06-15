import PhoneMockup from './PhoneMockup';
import { Lang, t } from '@/i18n/translations';

export default function Hero({ lang }: { lang: Lang }) {
  const tr = t(lang);

  return (
    <section className="bg-[#0D0F14] relative overflow-x-hidden">
      {/* Background glows */}
      <div className="absolute top-[-100px] left-[-150px] w-[600px] h-[600px] bg-[#6C63FF] rounded-full opacity-[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-80px] w-[450px] h-[450px] bg-[#00D4AA] rounded-full opacity-[0.04] blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-0 w-full">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-start">

          {/* Text column */}
          <div className="pt-4 md:pt-8 pb-8 lg:pb-16">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/25 text-[#9C95FF] text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
              {tr.hero_badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-5">
              {tr.hero_title}
            </h1>

            {/* Subtitle */}
            <p className="text-[#8A8A9A] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {tr.hero_subtitle}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-8 mb-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">10</div>
                <div className="text-[#555] text-xs mt-0.5 whitespace-nowrap">{tr.stat_minutes}</div>
              </div>
              <div className="h-10 w-px bg-[#1E2030]" />
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">3</div>
                <div className="text-[#555] text-xs mt-0.5 whitespace-nowrap">{tr.stat_phases}</div>
              </div>
              <div className="h-10 w-px bg-[#1E2030]" />
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#9C95FF]">40+</div>
                <div className="text-[#555] text-xs mt-0.5 whitespace-nowrap">{tr.stat_age}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#6C63FF] hover:bg-[#5A52E0] active:bg-[#4A43C0] text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-200 shadow-xl shadow-[#6C63FF]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6C63FF]/50"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0" aria-hidden="true">
                  <path d="M3 20.5v-17c0-.83 1-1.28 1.6-.75l14 8.5c.53.32.53 1.18 0 1.5l-14 8.5c-.6.53-1.6.08-1.6-.75z" />
                </svg>
                {tr.hero_cta}
              </a>
            </div>
          </div>

          {/* Phones column - dir="ltr" keeps physical transforms correct in RTL page layout */}
          <div className="relative flex items-end justify-center pb-0 pt-4 lg:pt-0" dir="ltr">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[380px] h-[380px] bg-[#6C63FF] rounded-full opacity-[0.07] blur-[70px]" />
            </div>

            <div className="relative flex items-end justify-center">
              {/* Left - Maya */}
              <div className="hidden sm:block relative z-0 -translate-x-3 translate-y-12 -rotate-[7deg] origin-bottom">
                <PhoneMockup src="/screenshots/screen-maya.svg" width={180} alt="Maya workout screen" />
              </div>

              {/* Center - Premium */}
              <div className="relative z-10 -mx-4 sm:-mx-8">
                <PhoneMockup src="/screenshots/screen-premium.svg" width={224} alt="BellyOff premium dashboard" />
              </div>

              {/* Right - Alex */}
              <div className="hidden sm:block relative z-0 translate-x-3 translate-y-12 rotate-[7deg] origin-bottom">
                <PhoneMockup src="/screenshots/screen-alex.svg" width={180} alt="Alex workout screen" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
