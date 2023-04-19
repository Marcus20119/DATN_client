module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-blue': '#113465',
        'main-blue-80': '#3B5880',
        'main-white': '#E5E7EB',
        'main-orange': '#ff6145fb',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
