import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import eslint from '@rollup/plugin-eslint';
import del from "rollup-plugin-delete";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
  },
  plugins: [
    del({ targets: "dist/*" }),
    eslint(),
    peerDepsExternal(),
    swc(
      defineRollupSwcOption({
        jsc: {},
        minify: true,
      })
    ),
  ],
};
