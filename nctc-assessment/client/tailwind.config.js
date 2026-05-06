/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:     '#01093d',
        electric: '#2015ff',
        nearblack:'#161616',
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
