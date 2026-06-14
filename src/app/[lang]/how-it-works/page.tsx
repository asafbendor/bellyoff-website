import type { Metadata } from 'next';
import DownloadCTA from '@/components/DownloadCTA';
import { Lang, t } from '@/i18n/translations';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return { title: tr.how_page_title, description: tr.how_page_sub };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);

  const phases = [
    {
      letter: 'A',
      color: '#6C63FF',
      bg: 'bg-[#EEEDFE] dark:bg-[#1A1D40]',
      label: tr.phase_a_label,
      title: tr.phase_a_title,
      desc: tr.phase_a_desc,
      details: [tr.phase_a_d1, tr.phase_a_d2, tr.phase_a_d3],
    },
    {
      letter: 'B',
      color: '#00D4AA',
      bg: 'bg-[#E1F5EE] dark:bg-[#0D2A28]',
      label: tr.phase_b_label,
      title: tr.phase_b_title,
      desc: tr.phase_b_desc,
      details: [tr.phase_b_d1, tr.phase_b_d2, tr.phase_b_d3],
    },
    {
      letter: 'C',
      color: '#F59E0B',
      bg: 'bg-[#FAEEDA] dark:bg-[#2A1F0D]',
      label: tr.phase_c_label,
      title: tr.phase_c_title,
      desc: tr.phase_c_desc,
      details: [tr.phase_c_d1, tr.phase_c_d2, tr.phase_c_d3],
    },
  ];

  const faqs = [
    { q: tr.faq_q1, a: tr.faq_a1 },
    { q: tr.faq_q2, a: tr.faq_a2 },
    { q: tr.faq_q3, a: tr.faq_a3 },
    { q: tr.faq_q4, a: tr.faq_a4 },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
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
            {phases.map((phase) => (
              <div key={phase.letter} className={`${phase.bg} rounded-2xl p-6 md:p-8`}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0"
                    style={{ background: phase.color }}
                  >
                    {phase.letter}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: phase.color }}>{phase.label}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{phase.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-[#8A8A9A] mb-4">{phase.desc}</p>
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
              {faqs.map((f, i) => (
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
