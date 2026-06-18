import type { Metadata } from 'next';
import { Lang, t } from '@/i18n/translations';

const LANGS = ['en', 'he', 'ar', 'es', 'de', 'fr'] as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  return {
    title: t(lang).terms_title,
    alternates: {
      canonical: `https://bellyoff.app/${lang}/terms/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, `https://bellyoff.app/${l}/terms/`])),
        'x-default': 'https://bellyoff.app/en/terms/',
      },
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return (
    <section className="py-16 bg-white dark:bg-[#111216]">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{tr.terms_title}</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-[#8A8A9A]">
          <p><strong>Last updated:</strong> June 14, 2026</p>
          <h2>1. Use of the App</h2>
          <p>BellyOff is a wellness app providing guided movement and breathing exercises. By using BellyOff, you agree to use it only for lawful, personal purposes.</p>
          <h2>2. Medical Disclaimer</h2>
          <p>BellyOff is not a medical program. The exercises provided are for general wellness purposes only. Consult your physician before starting any exercise program, especially if you have existing health conditions.</p>
          <h2>3. Subscriptions and Billing</h2>
          <p>Premium subscriptions are billed through Google Play. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. You may cancel at any time through your Google Play account.</p>
          <h2>4. Refund Policy</h2>
          <p>Refund requests are handled by Google Play in accordance with their refund policy.</p>
          <h2>5. Intellectual Property</h2>
          <p>All content in BellyOff, including workout routines, audio guidance, and visual content, is owned by BellyOff and protected by copyright law.</p>
          <h2>6. Limitation of Liability</h2>
          <p>BellyOff is provided "as is." We are not liable for any injuries or health outcomes resulting from use of the app.</p>
          <h2>7. Contact</h2>
          <p>For legal inquiries: <a href="mailto:legal@bellyoff.app">legal@bellyoff.app</a></p>
        </div>
      </div>
    </section>
  );
}
