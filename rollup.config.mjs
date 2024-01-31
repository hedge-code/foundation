import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import preserveDirectives from "rollup-preserve-directives";
import eslint from "@rollup/plugin-eslint";
import { dts } from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs"
      },
      {
        file: "dist/esm/index.js",
        format: "esm"
      },
    ],
    plugins: [
      del({ targets: "dist/*" }),
      eslint(),
      peerDepsExternal(),
      preserveDirectives(),
      swc(
        defineRollupSwcOption({
          jsc: {},
          minify: true,
          env: {
            targets: "> 0.25%, not dead",
          },
        })
      ),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()]
  },
];
