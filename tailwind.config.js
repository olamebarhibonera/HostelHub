/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1a56db",
        "primary-dark": "#1e40af",
        background: "#f0f4ff",
        foreground: "#0d1b3e",
        muted: "#5a6a8a",
        secondary: "#e8eefb",
      },
      fontFamily: {
        jakarta: ["PlusJakartaSans_700Bold"],
        "jakarta-medium": ["PlusJakartaSans_600SemiBold"],
        "dm-sans": ["DMSans_400Regular"],
        "dm-sans-medium": ["DMSans_500Medium"],
      },
    },
  },
  plugins: [],
};
