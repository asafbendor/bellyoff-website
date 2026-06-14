import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D0F14',
        surface: '#1A1D26',
        purple: '#6C63FF',
        teal: '#00D4AA',
        amber: '#F59E0B',
        textPrimary: '#F0F0F5',
        textSecondary: '#8A8A9A',
      },
      fontFamily: {
        sans: ['Inter', 'Heebo', 'system-ui', 'sans-serif'],
        hebrew: ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
