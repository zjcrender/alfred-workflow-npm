import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";

const configs: RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/npm.js',
      format: 'cjs'
    },
    plugins: [
      typescript()
    ]
  }
];

export default configs;
