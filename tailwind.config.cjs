module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg0: '#080808',
        bg1: '#0f0f0f',
        bg2: '#161616',
        bg3: '#1e1e1e',
        bg4: '#252525',
        ink0: '#f4f4f0',
        ink1: '#a8a8a0',
        ink2: '#5c5c58',
        ink3: '#2e2e2c',
        g: '#1bce92',
        'g-dim': '#0e7a57',
        'g-text': '#7eecc4',
        gold: '#c9a84c'
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
        dmmono: ['DM Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
