'use client';
import { useEffect } from 'react';

const SUPPORTED = ['en', 'he', 'ar', 'es', 'de', 'fr'];

// Static-export safe root redirect with browser-language detection.
// Order of preference: previously chosen language -> browser language -> English.
export default function RootPage() {
  useEffect(() => {
    let pick = 'en';
    try {
      const stored = localStorage.getItem('bellyoff_lang');
      if (stored && SUPPORTED.includes(stored)) {
        pick = stored;
      } else {
        const prefs = (navigator.languages && navigator.languages.length
          ? navigator.languages
          : [navigator.language || 'en']
        ).map((l) => l.toLowerCase().split('-')[0]);
        pick = prefs.find((l) => SUPPORTED.includes(l)) || 'en';
      }
    } catch {
      pick = 'en';
    }
    window.location.replace(`/${pick}/`);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0F14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <a href="/en/" style={{ color: '#6C63FF', fontFamily: 'system-ui, sans-serif' }}>Continue to BellyOff</a>
    </div>
  );
}
