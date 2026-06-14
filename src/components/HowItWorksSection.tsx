import Link from 'next/link';
import { Lang, t } from '@/i18n/translations';

const phases = [
  { key: 'a', color: '#6C63FF', bg: 'from-[#1A1D40] to-[#0D0F14]' },
  { key: 'b', color: '#00D4AA', bg: 'from-[#0D2A28] to-[#0D0F14]' },
  { key: 'c', color: '#F59E0B', bg: 'from-[#2A1F0D] to-[#0D0F14]' },
];

export default function HowItWorksSection({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const data = [
    { ...phases[0], label: tr.phase_a_label, title: tr.phase_a_title, desc: tr.phase_a_desc },
    { ...phases[1], label: tr.phase_b_label, title: tr.phase_b_title, desc: tr.phase_b_desc },
    { ...phases[2], label: tr.phase_c_label, title: tr.phase_c_title, desc: tr.phase_c_desc },
  ];
  return (
    <section className="bg-[#0D0F14] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{tr.how_title}</h2>
          <p className="text-[#8A8A9A] max-w-2xl mx-auto">{tr.how_sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {data.map((p, i) => (
            <div key={p.key} className={`bg-gradient-to-b ${p.bg} border border-white/5 rounded-2xl p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: p.color }}>
                  {i + 1}
                </div>
                <span className="text-xs font-medium" style={{ color: p.color }}>{p.label}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-[#8A8A9A] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${lang}/how-it-works/`}
            className="inline-flex items-center gap-2 text-[#6C63FF] hover:text-[#9C95FF] text-sm font-medium transition-colors"
          >
            {tr.nav_how} →
          </Link>
        </div>
      </div>
    </section>
  );
}
