/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Architectural Palette (Refined for AAA)
        'bg-main': '#05070A', 
        'bg-alt': '#0A0C10',
        'surface-main': '#0F1216',
        'surface-alt': '#16191E',
        
        // Brand Portfolio Accents (Gold/Bronze/Champagne)
        'brand-gold': {
          DEFAULT: '#D4AF37',
          soft: '#EED99E',
          deep: '#A6892C',
          muted: '#8C7851',
        },
        
        // AAA Text Hierarchy
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        'text-muted': '#71717A',
        
        // Structural Elements
        'border-subtle': 'rgba(255, 255, 255, 0.05)',
        'border-medium': 'rgba(255, 255, 255, 0.1)',
        'border-gold-alpha': 'rgba(212, 175, 55, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        editorial: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 9vw, 6.5rem)', '1.05'], 
        'display-l': ['clamp(2.5rem, 6vw, 4.5rem)', '1.1'],
        'h1': ['36px', '1.2'],
        'h2': ['28px', '1.2'],
        'quote': ['26px', '1.45'],
        'body': ['16px', '1.65'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'editorial': '0.08em',
        'tight-hero': '-0.02em',
      },
      spacing: {
        'section': 'clamp(5rem, 12vh, 10rem)',
      },
      transitionTimingFunction: {
        'premium-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      backgroundImage: {
        'glass-reflection': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.02) 100%)',
      }
    },
  },
  plugins: [],
}
