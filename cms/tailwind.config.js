/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      colors: {
        primary: '#4B49AC',
        secondary: '#a3a4a5',
        success: '#57B657',
        danger: '#FF4747',
        warning: '#FFC100',
        info: '#248AFD',
        light: '#f8f9fa',
        darkBase: '#282f3a',
        link: '#007bff',

        primaryInv: 'rgba(75, 73, 172, 0.2)',
        secondaryInv: 'rgba(163, 164, 165, 0.2)',
        successInv: 'rgba(87, 182, 87, 0.2)',
        dangerInv: 'rgba(255, 71, 71, 0.2)',
        warningInv: 'rgba(255, 193, 0, 0.2)',
        infoInv: 'rgba(36, 138, 253, 0.2)',
        lightInv: 'rgba(248, 249, 250, 0.2)',
        darkBaseInv: 'rgba(40, 47, 58, 0.2)',
        'bg-base': '#f6f8ff',
        'font-base': '#535453',
        'font-title': '#010101',
        'font-description': '#76838f',
        'font-label': '#1F1F1F',
        'dark-bg-base': '#001529',
        'dark-font-base': '#fff',
        'dark-font-nuetral': '#ffffffa6',
        'gray': '#C2C7D0',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwind-children'),
  ],
}
