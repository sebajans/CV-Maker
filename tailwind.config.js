/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-br': 'radial-gradient(ellipse at bottom right,var(--tw-gradient-stops))',
        'gradient-radial-bm': 'radial-gradient(ellipse at bottom,var(--tw-gradient-stops))',
        'gradient-radial-c': 'radial-gradient(ellipse at center,var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

