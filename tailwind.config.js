module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-blue': '#113465',
        'main-white': '#E5E7EB',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
