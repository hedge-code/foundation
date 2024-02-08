import peerDepsExternal from 'rollup-plugin-peer-deps-external';
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
        file: "dist/bundle.es.js",
        format: 'esm'
      },
      {
        file: "dist/bundle.cjs.js",
        format: "cjs",
      },
    ],
    plugins: [peerDepsExternal(), preserveDirectives(), nodeResolve(), commonjs(), swc()],
    external: ["react", "react-dom", "uuid", "classnames"],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
