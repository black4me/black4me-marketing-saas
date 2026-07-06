/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'sans-serif'],
      },
      colors: {
        // BLACK4ME brand palette
        b4m: {
          black: '#0A0A0B',       // primary background
          dark: '#141416',        // surface
          card: '#1A1A1D',        // card background
          border: '#26262B',      // borders
          muted: '#9CA3AF',       // muted text
          gold: '#FFC93C',        // primary accent (logo, CTA)
          golddark: '#E0A800',
          red: '#E11D48',         // urgency/countdown
          purple: '#7C3AED',      // scarcity banner
          green: '#10B981',       // success/savings
          blue: '#3B82F6',        // info
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFC93C 0%, #FF8A00 100%)',
        'red-gradient': 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
        'purple-gradient': 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,201,60,0.08) 0%, rgba(124,58,237,0.04) 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(255,201,60,0.12) 0%, transparent 60%)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(255,201,60,0.25)',
        'card-glow': '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};