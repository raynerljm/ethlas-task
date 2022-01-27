module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        overpass: "'Overpass', sans-serif",
      },
      colors: {
        "ethlas-blue": "#12326D",
        "ethlas-purple": "#1B194E",
        "ethlas-orange": "#D97A23",
        "ethlas-yellow": "#DD9810",
        "ethlas-black": "#151515",
      },
      animation: {
        jumb: "jumb 3s infinite",
      },
      keyframes: {
        jumb: {
          "0%": {
            transform: "translateY(0px)",
          },
          "35%": {
            transform: "translateY(-30px)",
            boxShadow: "0 15px 0 #DD9810",
          },
          "70%": {
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
