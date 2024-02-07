import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import swc from "rollup-plugin-swc3";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.umd.js",
      format: "umd",
      name: pkg.name,
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
