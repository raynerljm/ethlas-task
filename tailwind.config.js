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
        typing: "typing 1s steps(50, end) forwards",
        show: "show 5s linear infinite",
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
        typing: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        show: {
          "0%": { marginTop: "-384px" },
          "5%": { marginTop: "-256px" },
          "33%": { marginTop: "-256px" },
          "38%": { marginTop: "-128px" },
          "66%": { marginTop: "-128px" },
          "71%": { marginTop: "0px" },
          "99.99%": { marginTop: "0px" },
          "100%": { marginTop: "-384px" },
        },
      },
    },
  },
  plugins: [],
};
