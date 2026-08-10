import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f1ed',
          100: '#ede2d9',
          200: '#dcc3af',
          300: '#caa283',
          400: '#b47852',
          500: '#9b5e3f',
          600: '#7d4d33',
          700: '#613d2c',
          800: '#4a3024',
          900: '#382519'
        },
        neutral: {
          50: '#fbfaf7',
          100: '#f4f1ed',
          200: '#e3ddd5',
          300: '#c8bfb3',
          400: '#a89c88',
          500: '#7d6c5f',
          600: '#5b4d44',
          700: '#423932',
          800: '#312a26',
          900: '#221b18'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(17, 16, 15, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
