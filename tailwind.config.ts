import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' }
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        pulldown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10%)',
            visibility: 'hidden'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            visibility: 'visible'
          }
        }
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
        slideRight: 'slideRight 0.5s ',
        slideLeft: 'slideLeft 0.5s ease-in-out',
        pulldown: 'pulldown 0.3s ease-out'
      }
    }
  },
  plugins: []
};

export default config;
