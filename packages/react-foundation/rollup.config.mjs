import preserveDirectives from "rollup-preserve-directives";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import swc from "rollup-plugin-swc3";
import dts from "rollup-plugin-dts";

export default [
  {
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
    plugins: [preserveDirectives(), nodeResolve(), commonjs(), swc()],
    external: ["react"],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.d.ts",
      format: "es",
    },
    plugins: [dts()],
    external: ["classnames"]
  },
];
