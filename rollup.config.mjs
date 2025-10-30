import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" with { type: "json" };
import dts from "rollup-plugin-dts";
import image from "@rollup/plugin-image";

const config = [
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: packageJson.main
    },
    plugins: [
      peerDepsExternal({
        includeDependencies: true,
      }),
      image(),
      resolve(),
      commonjs(),
      typescript({
        exclude: ["**/*.stories.*", "**/*.test.*"],
        compilerOptions: {
        outDir: 'dist',
        }
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      format: "esm",
      sourcemap: true,
      file: packageJson.module,
      banner: "'use client';",
    },
    plugins: [
      peerDepsExternal({
        includeDependencies: true,
      }),
      image(),
      resolve(),
      commonjs(),
      typescript({
        exclude: ["**/*.stories.*", "**/*.test.*"],
        compilerOptions: {
        outDir: 'dist',
        }
      }),
      postcss({
        extensions: [".css"],
      }),
    ],
  },
  {
    input: "dist/dts/src/index.d.ts",
    output: {
      file: packageJson.types,
      format: "es",
    },
    plugins: [
      peerDepsExternal({
        includeDependencies: true,
      }),
      dts({
        compilerOptions: {
          baseUrl: "src",
        },
      }),
    ],
  },
];

export default config;