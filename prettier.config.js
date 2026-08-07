const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  printWidth: 100,
  endOfLine: "lf",

  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/index.css",
  tailwindFunctions: ["cn", "clsx", "cva"],
};

export default config;
