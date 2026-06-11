import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { build as viteBuild } from "vite";
import { afterEach, describe, expect, it } from "vitest";
import webpack, { type Configuration, type Stats } from "webpack";
import Oss from "../src/vite";
import WebpackOss from "../src/webpack";

const require = createRequire(import.meta.url);
const webpack4 = require("webpack4") as typeof webpack;
const tmpDirs: string[] = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { force: true, recursive: true })));
});

describe("builder adapters", () => {
  it("runs after a Vite 4 build", async () => {
    const root = await createTmpDir();
    const outDir = path.join(root, "dist");
    await fs.mkdir(path.join(root, "src"), { recursive: true });
    await fs.writeFile(
      path.join(root, "index.html"),
      '<script type="module" src="/src/main.js"></script>',
    );
    await fs.writeFile(path.join(root, "src", "main.js"), "document.body.textContent = 'vite';");

    await viteBuild({
      configFile: false,
      logLevel: "silent",
      plugins: [
        Oss({
          from: `${outDir}/**/*`,
          test: true,
          verbose: false,
        }),
      ],
      root,
      build: {
        emptyOutDir: true,
        outDir: "dist",
      },
    });

    await expect(fs.stat(path.join(outDir, "index.html"))).resolves.toBeTruthy();
  });

  it("runs after a webpack 5 build", async () => {
    const root = await createTmpDir();
    const outDir = path.join(root, "dist");
    await fs.mkdir(path.join(root, "src"), { recursive: true });
    await fs.writeFile(path.join(root, "src", "index.js"), "module.exports = 'webpack';");

    await runWebpack({
      context: root,
      entry: "./src/index.js",
      mode: "production",
      output: {
        filename: "bundle.js",
        path: outDir,
      },
      plugins: [
        WebpackOss({
          from: `${outDir}/**/*`,
          test: true,
          verbose: false,
        }),
      ],
    });

    await expect(fs.stat(path.join(outDir, "bundle.js"))).resolves.toBeTruthy();
  });

  it("runs after a webpack 4 build", async () => {
    const root = await createTmpDir();
    const outDir = path.join(root, "dist");
    await fs.mkdir(path.join(root, "src"), { recursive: true });
    await fs.writeFile(path.join(root, "src", "index.js"), "module.exports = 'webpack4';");

    await runWebpack(
      {
        context: root,
        devtool: false,
        entry: "./src/index.js",
        mode: "development",
        optimization: {
          minimize: false,
        },
        output: {
          filename: "bundle.js",
          hashFunction: "sha256",
          path: outDir,
        },
        plugins: [
          WebpackOss({
            from: `${outDir}/**/*`,
            test: true,
            verbose: false,
          }),
        ],
      },
      webpack4,
    );

    await expect(fs.stat(path.join(outDir, "bundle.js"))).resolves.toBeTruthy();
  });
});

async function createTmpDir(): Promise<string> {
  const baseDir = path.join(process.cwd(), "node_modules", ".tmp");
  await fs.mkdir(baseDir, { recursive: true });
  const dir = await fs.mkdtemp(path.join(baseDir, "unplugin-oss-builder-"));
  tmpDirs.push(dir);
  return dir;
}

async function runWebpack(config: Configuration, webpackFactory = webpack): Promise<Stats> {
  const compiler = webpackFactory(config);

  return new Promise<Stats>((resolve, reject) => {
    compiler.run((error, stats) => {
      closeCompiler(compiler, (closeError) => {
        const finalError = error ?? closeError;

        if (finalError) {
          reject(finalError);
          return;
        }

        if (!stats) {
          reject(new Error("webpack did not return stats."));
          return;
        }

        if (stats.hasErrors()) {
          reject(new Error(stats.toString("errors-only")));
          return;
        }

        resolve(stats);
      });
    });
  });
}

function closeCompiler(
  compiler: { close?: (callback: (error?: Error | null) => void) => void },
  callback: (error?: Error | null) => void,
): void {
  if ("close" in compiler && typeof compiler.close === "function") {
    compiler.close(callback);
    return;
  }

  callback();
}
