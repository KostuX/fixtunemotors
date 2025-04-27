/** @type {import('tailwindcss').Config} */
import { cfg_site as cfg } from "./config/cfg_site";

export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}", // Include HeroUI components
];

export const theme = {
  extend: {
    colors: {
      theme_secondary_dark: cfg.theme_secondary_dark,
      theme_secondary_light: cfg.theme_secondary_light,
    },
  },
};

export const darkMode = "class"; // Enable dark mode with the "class" strategy

export const plugins = []; // Remove the invalid HeroUI Tailwind plugin