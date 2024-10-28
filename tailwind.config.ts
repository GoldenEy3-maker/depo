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
    fontSize,
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...fontFamily.sans],
      },
      colors: {
        background: "#FFFFFF",
        brend: {
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
    },
  },
  plugins: [fluid],
} satisfies Config;
