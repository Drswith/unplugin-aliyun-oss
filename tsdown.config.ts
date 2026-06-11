import { defineConfig } from "tsdown/config";

const entries = ["api", "esbuild", "farm", "rolldown", "rollup", "rspack", "vite", "webpack"];

export default defineConfig({
  dts: true,
  entry: "src/*.ts",
  exports: {
    customExports() {
      return {
        ".": exportEntry("index"),
        ...Object.fromEntries(entries.map((entry) => [`./${entry}`, exportEntry(entry)])),
        "./package.json": "./package.json",
      };
    },
  },
  platform: "node",
});

function exportEntry(entry: string) {
  return {
    types: `./dist/${entry}.d.mts`,
    import: `./dist/${entry}.mjs`,
    default: `./dist/${entry}.mjs`,
  };
}
