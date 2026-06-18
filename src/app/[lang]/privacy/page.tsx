import type { Metadata } from 'next';
import { Lang, t } from '@/i18n/translations';

const LANGS = ['en', 'he', 'ar', 'es', 'de', 'fr'] as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  return {
    title: t(lang).privacy_title,
    alternates: {
      canonical: `https://bellyoff.app/${lang}/privacy/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [l, `https://bellyoff.app/${l}/privacy/`])),
        'x-default': 'https://bellyoff.app/en/privacy/',
      },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  const tr = t(lang);
  return (
    <section className="py-16 bg-white dark:bg-[#111216]">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{tr.privacy_title}</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-[#8A8A9A]">
          <p><strong>Last updated:</strong> June 14, 2026</p>
          <h2>1. Information We Collect</h2>
          <p>BellyOff collects only the minimum information necessary to provide our service. We collect: profile data you provide (age, height, weight, waist measurement), workout completion data stored locally on your device, and anonymous analytics to improve the app.</p>
          <h2>2. How We Use Your Information</h2>
          <p>Your data is used solely to personalize your BellyOff experience and display your progress. We do not sell your data to third parties.</p>
          <h2>3. Data Storage</h2>
          <p>All personal health data is stored locally on your device. We do not transmit your health data to our servers.</p>
          <h2>4. Advertising</h2>
          <p>Free users may see ads provided by Google AdMob. AdMob may collect advertising identifiers in accordance with Google's privacy policy.</p>
          <h2>5. In-App Purchases</h2>
          <p>Premium subscriptions are processed through Google Play Billing. We do not store your payment information.</p>
          <h2>6. Children's Privacy</h2>
          <p>BellyOff is designed for adults 40 and older. We do not knowingly collect information from children under 16.</p>
          <h2>7. Contact</h2>
          <p>For privacy questions: <a href="mailto:privacy@bellyoff.app">privacy@bellyoff.app</a></p>
        </div>
      </div>
    </section>
  );
}
