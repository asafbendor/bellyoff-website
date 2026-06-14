import type { Metadata } from 'next';
import DownloadCTA from '@/components/DownloadCTA';
import { Lang, t } from '@/i18n/translations';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return { title: tr.how_page_title, description: tr.how_page_sub };
}

const PHASES = [
  {
    letter: 'A',
    color: '#6C63FF',
    bg: 'bg-[#EEEDFE] dark:bg-[#1A1D40]',
    minutes: '1-3',
    labelKey: 'phase_a_label' as const,
    titleKey: 'phase_a_title' as const,
    descKey: 'phase_a_desc' as const,
    details: [
      'Diaphragmatic (belly) breathing activates the transverse abdominis — the muscle that acts as a natural corset.',
      'Deep breathing lowers cortisol, the stress hormone that triggers visceral fat storage around the belly.',
      'The nervous system shift from sympathetic (stress) to parasympathetic (rest) is essential for fat metabolism after 40.',
    ],
  },
  {
    letter: 'B',
    color: '#00D4AA',
    bg: 'bg-[#E1F5EE] dark:bg-[#0D2A28]',
    minutes: '4-7',
    labelKey: 'phase_b_label' as const,
    titleKey: 'phase_b_title' as const,
    descKey: 'phase_b_desc' as const,
    details: [
      'Anterior pelvic tilt — a forward tilt of the pelvis — pushes the belly forward, creating a protrusion that looks like belly fat but isn\'t.',
      'Correcting pelvic tilt through targeted holds and stretches can visually reduce belly protrusion by 2-4 cm immediately.',
      'Postural muscles (glutes, deep hip flexors, lower back) are strengthened in a safe, controlled range of motion.',
    ],
  },
  {
    letter: 'C',
    color: '#F59E0B',
    bg: 'bg-[#FAEEDA] dark:bg-[#2A1F0D]',
    minutes: '8-10',
    labelKey: 'phase_c_label' as const,
    titleKey: 'phase_c_title' as const,
    descKey: 'phase_c_desc' as const,
    details: [
      'Somatic walking patterns integrate the corrected posture into natural movement.',
      'Gentle arm circles and hip mobility activate the lymphatic system for metabolic detox.',
      'The cool-down breath sequence locks in the nervous system reset achieved in Phase A.',
    ],
  },
];

const FAQ = [
  { q: 'How long until I see results from BellyOff?', a: 'Most users report postural improvements within 2-3 weeks. Visible belly reduction typically becomes noticeable after 4-6 weeks of daily practice.' },
  { q: 'Is BellyOff safe for people with back pain?', a: 'Yes. BellyOff was specifically designed to avoid exercises that strain the lower back. The posture correction in Phase B actually reduces lower back pain for many users.' },
  { q: 'Can I do BellyOff if I\'m not flexible?', a: 'Absolutely. No flexibility is required. All movements are within a comfortable, pain-free range of motion.' },
  { q: 'Why 10 minutes specifically?', a: 'Research shows that short, consistent daily practice is more effective than longer sporadic workouts for building the nervous system habits necessary for postural change and cortisol reduction.' },
];

export default async function HowItWorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-[#0D0F14] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{tr.how_page_title}</h1>
          <p className="text-[#8A8A9A] text-lg">{tr.how_page_sub}</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#111216]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{tr.science_title}</h2>
          <p className="text-gray-600 dark:text-[#8A8A9A] leading-relaxed mb-12">{tr.science_body}</p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">{tr.method_title}</h2>

          <div className="space-y-10">
            {PHASES.map((phase) => (
              <div key={phase.letter} className={`${phase.bg} rounded-2xl p-6 md:p-8`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg"
                    style={{ background: phase.color }}>
                    {phase.letter}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: phase.color }}>{tr[phase.labelKey]}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tr[phase.titleKey]}</h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-[#8A8A9A] mb-4">{tr[phase.descKey]}</p>
                <ul className="space-y-2">
                  {phase.details.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-[#8A8A9A]">
                      <span style={{ color: phase.color }} className="shrink-0 mt-0.5">•</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">FAQ</h2>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <div key={i} className="border border-gray-100 dark:border-white/5 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-600 dark:text-[#8A8A9A] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DownloadCTA lang={lang} />
    </>
  );
}
