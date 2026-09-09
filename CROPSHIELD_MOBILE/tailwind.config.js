/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        soil: {
          dark: '#1C1A14',
          DEFAULT: '#26231B',
          light: '#3A362B',
        },
        field: {
          green: '#2D5A1B',
          dark: '#1E3E12',
          light: '#3C7725',
        },
        growth: {
          DEFAULT: '#5C9E31',
          light: '#72BC3E',
          dark: '#457724',
        },
        warning: {
          amber: '#C8820A',
          light: '#E59B1E',
          dark: '#9E6607',
        },
        danger: {
          red: '#B03A2E',
          light: '#CF4B3D',
          dark: '#872C23',
        },
        sky: {
          blue: '#3B7FC4',
          light: '#5B9BE0',
          dark: '#2A5D91',
        },
        harvest: {
          gold: '#D4A017',
          light: '#E8B62F',
          dark: '#A67C0E',
        },
        parchment: {
          DEFAULT: '#F5F0E8',
          dark: '#E8DFD0',
          light: '#FAF7F2',
        },
        mist: {
          DEFAULT: '#EAF0E6',
          dark: '#D5E2CF',
          light: '#F4F7F2',
        },
      },
    },
  },
  plugins: [],
}
