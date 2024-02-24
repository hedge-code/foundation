import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

export default {
  content: [
    "./pages/**/*.{js,md,mdx}",
    "./node_modules/@hedgecode/foundation/**/*.{cjs,mjs}",
  ],
  presets: [sharedConfig],
} satisfies Pick<Config, "prefix" | "presets" | "content">;
