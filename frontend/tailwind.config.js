/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'swiggy-orange': '#FC8019',
        'zomato-red': '#E23744',
        primary: '#FC8019',
        secondary: '#E23744',
        accent: '#F7B801',
      },
      backgroundImage: {
        'gradient-swiggy': 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
        'gradient-zomato': 'linear-gradient(135deg, #E23744 0%, #D63447 100%)',
        'gradient-primary': 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #E23744 0%, #D63447 100%)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
