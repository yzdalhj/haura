import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      aura: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
    spacing: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      10: '40px',
      12: '48px',
      16: '64px',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px',
    },
  },
  shortcuts: {
    // Button shortcuts
    'h-btn': 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
    'h-btn-primary': 'h-btn bg-aura-primary-500 text-white hover:bg-aura-primary-600',
    'h-btn-secondary': 'h-btn bg-aura-neutral-100 text-aura-neutral-700 hover:bg-aura-neutral-200',
    'h-btn-outline': 'h-btn border border-aura-primary-500 text-aura-primary-500 hover:bg-aura-primary-50',
    'h-btn-ghost': 'h-btn text-aura-primary-500 hover:bg-aura-primary-50',
    'h-btn-danger': 'h-btn bg-aura-danger-500 text-white hover:bg-aura-danger-600',

    // Input shortcuts
    'h-input': 'w-full px-3 py-2 rounded-md border border-aura-neutral-300 focus:border-aura-primary-500 focus:ring-2 focus:ring-aura-primary-100 outline-none transition-all duration-200',

    // Card shortcuts
    'h-card': 'bg-white rounded-lg border border-aura-neutral-200 shadow-sm',

    // Glass effect
    'h-glass': 'backdrop-blur-xl bg-white/80 border border-white/20',
    'h-glass-dark': 'backdrop-blur-xl bg-black/40 border border-white/10',

    // Glow effects
    'h-glow': 'transition-shadow duration-300',
    'h-glow-primary': 'h-glow hover:shadow-[0_0_20px_rgba(14,165,233,0.3)]',
    'h-glow-focus': 'focus:shadow-[0_0_0_3px_rgba(14,165,233,0.2)]',
  },
  rules: [
    // Custom animation rules
    ['animate-skeleton', { animation: 'skeleton 1.5s ease-in-out infinite' }],
    ['animate-ripple', { animation: 'ripple 0.6s ease-out forwards' }],
  ],
  preflights: [
    {
      getCSS: () => `
        @keyframes skeleton {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `,
    },
  ],
})