'use client';
import { useEffect } from 'react';

// Static-export safe redirect to the default locale.
// Cloudflare Pages serves a server-side 302 via public/_redirects;
// this client redirect is the fallback for direct static hosting.
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/en/');
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0D0F14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <a href="/en/" style={{ color: '#6C63FF', fontFamily: 'system-ui, sans-serif' }}>Continue to BellyOff</a>
    </div>
  );
}
