import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

function useColsSystem() {
  const colsSystem = 12;

  return {
    "col-1": `calc(1/${colsSystem}*100%)`,
    "col-2": `calc(2/${colsSystem}*100%)`,
    "col-3": `calc(3/${colsSystem}*100%)`,
    "col-4": `calc(4/${colsSystem}*100%)`,
    "col-5": `calc(5/${colsSystem}*100%)`,
    "col-6": `calc(6/${colsSystem}*100%)`,
    "col-7": `calc(7/${colsSystem}*100%)`,
    "col-8": `calc(8/${colsSystem}*100%)`,
    "col-9": `calc(9/${colsSystem}*100%)`,
    "col-10": `calc(10/${colsSystem}*100%)`,
    "col-11": `calc(11/${colsSystem}*100%)`,
    "col-12": `calc(12/${colsSystem}*100%)`,
  };
}

export default {
  content: {
    files: [
      "./src/**/*.pug",
      "./src/**/*.ts",
      "./src/**/*.js",
      "./src/**/*.css",
      "./src/**/*.scss",
      "./src/**/*.sass",
    ],
    extract,
  },
  theme: {
    screens,
    fontSize: {
      ...fontSize,
      xl: ["1.25rem", "1.3"],
      sm: ["0.875rem", "1.3"],
    },
    extend: {
      screens: {
        md2: "62rem",
      },
      fontFamily: {
        sans: ["Montserrat", ...fontFamily.sans],
      },
      fontSize: {
        // 40px at 640px and 80px at 1536px
        title: ["clamp(2.5rem, 0.7143rem + 4.4643vw, 5rem)", "1.3"],
        // 32px at 640px and 48px at 1536px
        h1: ["clamp(2rem, 1.2857rem + 1.7857vw, 3rem)", "1.2"],
        // 24px at 640px and 36px at 1536px
        h2: ["clamp(1.5rem, 0.9643rem + 1.3393vw, 2.25rem)", "1.2"],
        // 16 at 640px and 18px at 1536px
        basicL: ["clamp(1rem, 0.9107rem + 0.2232vw, 1.125rem)", "1.4"],
        basicS: ["0.875rem", "1.3"],
      },
      colors: {
        background: "#FFFFFF",
        brand: {
          DEFAULT: "#002134",
        },
        primary: {
          DEFAULT: "#013553",
        },
        secondary: {
          DEFAULT: "#1F5372",
        },
        muted: {
          DEFAULT: "#85909A",
          foreground: "#E5E5E5",
          background: "#B2B2B2",
        },
        text: {
          background: "#1D1D1B",
          foreground: "#E4E6EF",
        },
      },
      margin: {
        ...useColsSystem(),
      },
      padding: {
        ...useColsSystem(),
      },
      width: {
        ...useColsSystem(),
      },
      keyframes: {
        floatingImage: {
          "0%": {
            transform: "translate(0px,0)",
          },
          "50%": {
            transform: "translate(-10%,0)",
          },
          "100%": {
            transform: "translate(0,0)",
          },
        },
      },
      animation: {
        floatingImage: "floatingImage 40s linear infinite",
      },
    },
  },
  plugins: [
    fluid({
      checkSC144: false,
    }),
  ],
} satisfies Config;
