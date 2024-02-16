import peerDepsExternal from "rollup-plugin-peer-deps-external";
import preserveDirectives from "rollup-preserve-directives";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import swc from "rollup-plugin-swc3";
import ts from "rollup-plugin-ts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.mjs",
        format: "esm",
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      preserveDirectives(),
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      ts(),
      swc(),
    ],
    external: ["react", "react-dom", "classnames"],
  },
];
