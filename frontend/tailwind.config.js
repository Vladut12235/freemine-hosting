module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07111f',
        surface: '#0d1b2a',
        surfaceAlt: '#101f35',
        accent: '#6ee7ff',
        purple: '#8b5cf6',
        cyan: '#22d3ee',
      },
      boxShadow: {
        neon: '0 0 25px rgba(110, 231, 255, 0.25)',
      },
    },
  },
  plugins: [],
};
