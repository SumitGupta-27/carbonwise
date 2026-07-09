/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        canvas: {
          light: '#F5F8F5',
          dark: '#0B1512',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#101E1A',
        },
        ink: {
          light: '#0F2119',
          dark: '#E9F3EC',
        },
        // Brand ramp — forest / slate-teal / lime
        forest: {
          50: '#EAF6EF',
          100: '#CDEBD9',
          200: '#9DD6B4',
          300: '#69BD8D',
          400: '#3EA26D',
          500: '#1F7A5C',
          600: '#186449',
          700: '#134F3B',
          800: '#0F3D2E',
          900: '#0A2A20',
        },
        slate: {
          50: '#EAF3F6',
          100: '#CBE2E9',
          200: '#9FC7D3',
          300: '#6FA9BB',
          400: '#478BA0',
          500: '#2E6F8E',
          600: '#255A73',
          700: '#1D475C',
          800: '#153545',
          900: '#0F2530',
        },
        lime: {
          400: '#C4EA7D',
          500: '#A8E063',
          600: '#8FC94C',
        },
        clay: {
          500: '#D97757',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(15, 33, 25, 0.06), 0 8px 24px rgba(15, 33, 25, 0.05)',
        softDark: '0 2px 8px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.3)',
        ring: '0 0 0 1px rgba(31, 122, 92, 0.15)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%': { transform: 'translate(6px,-6px) rotate(2deg)' },
        },
        growRing: {
          '0%': { strokeDashoffset: 'var(--ring-start, 283)' },
          '100%': { strokeDashoffset: 'var(--ring-end, 0)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}
