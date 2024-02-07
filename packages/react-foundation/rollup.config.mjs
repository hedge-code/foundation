import preserveDirectives from "rollup-preserve-directives";
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
  plugins: [
    preserveDirectives(),
    nodeResolve(),
    commonjs(),
    swc({
      jsc: {},
      minify: true,
      env: {
        targets: "> 0.25%, not dead",
      },
    }),
  ],
  external: ["react"],
};
