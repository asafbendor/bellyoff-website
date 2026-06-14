import { Lang, t } from '@/i18n/translations';

const features = [
  {
    key: 'f1',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#6C63FF" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    color: '#6C63FF',
  },
  {
    key: 'f2',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00D4AA" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M4.5 12.5c2-3 5-4.5 7.5-4.5s5.5 1.5 7.5 4.5c-2 3-5 4.5-7.5 4.5s-5.5-1.5-7.5-4.5z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    color: '#00D4AA',
  },
  {
    key: 'f3',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="6" width="18" height="13" rx="2"/>
        <path d="M3 10h18M8 6V4M16 6V4"/>
      </svg>
    ),
    color: '#F59E0B',
  },
];

export default function Features({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const data = [
    { ...features[0], title: tr.f1_title, desc: tr.f1_desc },
    { ...features[1], title: tr.f2_title, desc: tr.f2_desc },
    { ...features[2], title: tr.f3_title, desc: tr.f3_desc },
  ];

  return (
    <section className="bg-white dark:bg-[#111216] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{tr.features_title}</h2>
          <p className="text-gray-500 dark:text-[#8A8A9A]">{tr.features_sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((f) => (
            <div key={f.key} className="bg-gray-50 dark:bg-[#1A1D26] border border-gray-100 dark:border-white/5 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15` }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-[#8A8A9A] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
