import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import swc from "rollup-plugin-swc3";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.umd.js",
      format: "umd",
      name: "@hedgecode/foundation",
      globals: {
        react: "React",
      },
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [nodeResolve(), commonjs(), swc()],
  external: ["react"],
};