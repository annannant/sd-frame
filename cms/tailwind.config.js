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
        secondary: '#98BDFF',
        'support-blue': '#7DAOFA',
        'support-purple': '#7978E9',
        'support-red': '#F3797E',
        'bg-base': '#f6f8ff',
        'font-base': '#535453',

        'dark-bg-base': '#001529',
        'dark-font-base': '#fff',
        'dark-font-nuetral': '#ffffffa6',

        // 'font-gray': '#a0a1a5',
        // 'font-dark-active': '#fff',
        // 'font-dark': '#ffffffa6',
        // 'bg-dark': '#001529',
        // 'bg-dark2': '#000c17',
        // 'dark-gray': '#2f2f30',
        // 'gray': '#acacac'
      },
    },
  },
  plugins: [],
}
