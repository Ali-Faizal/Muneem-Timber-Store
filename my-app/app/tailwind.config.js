module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
keyframes: {
  marquee: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(-50%)" },
  },
},
animation: {
  marquee: "marquee 20s linear infinite",
},
  },
  plugins: [],
};