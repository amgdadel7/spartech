import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { spartech: { DEFAULT: '#214bd9', light: '#6cdcff', night: '#080a10' } },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};
export default config;
