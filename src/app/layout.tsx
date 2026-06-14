import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BellyOff',
  description: '10-minute daily workout for belly reduction after 40.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
