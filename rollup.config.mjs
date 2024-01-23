import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import del from "rollup-plugin-delete";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
  },
  plugins: [
    del({ targets: "dist/*" }),
    peerDepsExternal(),
    swc(
      defineRollupSwcOption({
        jsc: {},
        minify: true,
      })
    ),
  ],
};
