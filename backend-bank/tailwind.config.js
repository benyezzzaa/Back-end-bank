module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      animation: {
        gradientAnimation: 'gradientAnimation 15s ease infinite',
      },
      keyframes: {
        gradientAnimation: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundImage: {
        'gradient-animation': 'url("https://img.freepik.com/premium-vector/stock-market-forex-trading-graph-graphic-concept_115579-1314.jpg?w=996")',
        'photos': 'url("https://i.pinimg.com/564x/4e/fe/80/4efe80e03ed21af029af08abca38e9e4.jpg")'
      },
    },
  },
  variants: {},
  plugins: [],
};
