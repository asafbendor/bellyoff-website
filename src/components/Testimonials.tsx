import { Lang, t } from '@/i18n/translations';

export default function Testimonials({ lang }: { lang: Lang }) {
  const tr = t(lang);
  const testimonials = [
    { text: tr.t1_text, name: tr.t1_name, role: tr.t1_role },
    { text: tr.t2_text, name: tr.t2_name, role: tr.t2_role },
    { text: tr.t3_text, name: tr.t3_name, role: tr.t3_role },
  ];
  return (
    <section className="bg-gray-50 dark:bg-[#111216] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          {tr.testimonials_title}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white dark:bg-[#1A1D26] border border-gray-100 dark:border-white/5 rounded-2xl p-6">
              <div className="text-[#6C63FF] text-3xl leading-none mb-4">"</div>
              <p className="text-gray-700 dark:text-[#C0C0D0] text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6C63FF]/15 flex items-center justify-center text-sm font-bold text-[#6C63FF]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</div>
                  <div className="text-xs text-gray-400 dark:text-[#8A8A9A]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
