import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        border: 'background ease infinite',
        slideIn: 'slideIn 0.3s ease-out forwards',
        sparkle: 'sparkle 1s linear forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        background: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '0.5' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
        }
      }
    }
  },
  plugins: [forms, typography]
} satisfies Config
