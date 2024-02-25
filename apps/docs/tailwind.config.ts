import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

export default {
  content: [
    "./pages/**/*.{md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@hedgecode/foundation/**/*.{cjs,mjs}",
  ],
  presets: [sharedConfig],
} satisfies Pick<Config, "prefix" | "presets" | "content">;
