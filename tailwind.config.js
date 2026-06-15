/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds & Surfaces
        'bg-main': '#0B0F14',
        'bg-alt': '#0F172A',
        'surface-main': '#111827',
        'surface-alt': '#1F2933',
        
        // Brand Colors
        'brand-primary': '#14213D',
        'brand-primary-soft': '#1E2A46',
        'brand-primary-strong': '#0B162B',
        
        // Accents
        'brand-accent': '#C8A45D',
        'brand-accent-soft': '#E2CFA1',
        'brand-accent-dark': '#8A6E35',
        
        // Text
        'text-primary-dark': '#F9FAFB',
        'text-secondary-dark': '#D1D5DB',
        'text-muted-dark': '#9CA3AF',
        
        'text-primary-light': '#111827',
        'text-secondary-light': '#4B5563',
        'text-muted-light': '#9CA3AF',
        
        // Borders
        'border-subtle-dark': '#1F2933',
        'border-subtle-light': '#E5E7EB',
        'border-strong': '#374151',
        
        // States
        'state-success': '#16A34A',
        'state-warning': '#F59E0B',
        'state-error': '#DC2626',
        
        // Overlays
        'overlay-scrim': 'rgba(15, 23, 42, 0.72)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['48px', '1.1'],
        'display-l': ['40px', '1.1'],
        'h1': ['32px', '1.25'],
        'h2': ['24px', '1.25'],
        'h3': ['20px', '1.25'],
        'h4': ['18px', '1.25'],
        'body': ['16px', '1.5'],
        'body-sm': ['14px', '1.5'],
        'caption': ['12px', '1.5'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '56px',
        '5xl': '72px',
      },
      boxShadow: {
        'sm': '0 10px 25px rgba(15, 23, 42, 0.25)',
        'md': '0 20px 45px rgba(15, 23, 42, 0.35)',
        'inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'pill': '999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '260ms',
      },
      transitionTimingFunction: {
        'fast': 'ease-out',
        'normal': 'ease-out',
        'slow': 'ease-in-out',
      }
    },
  },
  plugins: [],
}
