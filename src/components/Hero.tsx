import PhoneMockup from './PhoneMockup';
import { Lang, t } from '@/i18n/translations';

export default function Hero({ lang }: { lang: Lang }) {
  const tr = t(lang);

  return (
    <section className="bg-[#0D0F14] relative overflow-hidden min-h-screen flex items-center">
      {/* Background glows */}
      <div className="absolute top-0 left-[-200px] w-[700px] h-[700px] bg-[#6C63FF] rounded-full opacity-[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#00D4AA] rounded-full opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Text column */}
          <div className="order-2 lg:order-1 flex flex-col items-start">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/25 text-[#9C95FF] text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
              {tr.hero_badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              {tr.hero_title}
            </h1>

            {/* Subtitle */}
            <p className="text-[#8A8A9A] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              {tr.hero_subtitle}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-10 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10</div>
                <div className="text-[#555] text-xs mt-0.5 whitespace-nowrap">{tr.stat_minutes}</div>
              </div>
              <div className="h-10 w-px bg-[#1E2030]" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-[#555] text-xs mt-0.5 whitespace-nowrap">{tr.stat_phases}</div>
              </div>
              <div className="h-10 w-px bg-[#1E2030]" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#9C95FF]">40+</div>
                <div className="text-[#555] text-xs mt-0.5 whitespace-nowrap">{tr.stat_age}</div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#6C63FF] hover:bg-[#5A52E0] active:bg-[#4A43C0] text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-xl shadow-[#6C63FF]/20 hover:shadow-[#6C63FF]/30 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" aria-hidden="true">
                  <path d="M3 20.5v-17c0-.83 1-1.28 1.6-.75l14 8.5c.53.32.53 1.18 0 1.5l-14 8.5c-.6.53-1.6.08-1.6-.75z" />
                </svg>
                {tr.hero_cta}
              </a>
              <p className="text-sm text-[#444]">{tr.hero_sub}</p>
            </div>
          </div>

          {/* Phones column */}
          <div className="order-1 lg:order-2 relative flex items-end justify-center min-h-[340px] sm:min-h-[480px] lg:min-h-[620px]">

            {/* Glow behind phones */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[400px] bg-[#6C63FF] rounded-full opacity-[0.08] blur-[80px]" />
            </div>

            {/* Phone cluster */}
            <div className="relative flex items-end justify-center w-full">

              {/* Left - Maya workout screen */}
              <div className="hidden md:block relative z-0 -translate-x-4 translate-y-10 -rotate-[7deg] origin-bottom">
                <PhoneMockup
                  src="/screenshots/screen-maya.svg"
                  width={175}
                  alt="Maya workout screen - Phase A breathing"
                />
              </div>

              {/* Center - Premium dashboard (largest, in front) */}
              <div className="relative z-10 -mx-6 md:-mx-10">
                <div className="drop-shadow-[0_60px_120px_rgba(108,99,255,0.25)]">
                  <PhoneMockup
                    src="/screenshots/screen-premium.svg"
                    width={218}
                    alt="BellyOff premium progress dashboard"
                  />
                </div>
              </div>

              {/* Right - Alex workout screen */}
              <div className="hidden md:block relative z-0 translate-x-4 translate-y-10 rotate-[7deg] origin-bottom">
                <PhoneMockup
                  src="/screenshots/screen-alex.svg"
                  width={175}
                  alt="Alex workout screen - Phase B posture"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
