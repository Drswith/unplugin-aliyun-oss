import path from "node:path";
import { createUnplugin, type UnpluginInstance, type UnpluginOptions } from "unplugin";
import { resolveOptions, type Options } from "./core/options";
import { uploadMatchedFiles } from "./core/uploader";

export const Oss: UnpluginInstance<Options, false> = createUnplugin((rawOptions, meta) => {
  const name = "unplugin-oss";

  switch (meta.framework) {
    case "vite":
      return {
        name,
        ...createViteHooks(rawOptions),
      };
    case "webpack":
      return {
        name,
        ...createWebpackHooks(rawOptions, meta.webpack.compiler.options.output.path),
      };
    default:
      return {
        name,
      };
  }
});

export type { Options, OssOptions, OptionalOptions, VersionPayload } from "./core/options";

type ViteHooks = Pick<UnpluginOptions, "vite" | "writeBundle">;
type WebpackHooks = Pick<UnpluginOptions, "writeBundle">;

function createViteHooks(rawOptions: Options): ViteHooks {
  let outputPath: string | undefined;

  return {
    vite: {
      configResolved(config) {
        outputPath = path.isAbsolute(config.build.outDir)
          ? config.build.outDir
          : path.resolve(config.root, config.build.outDir);
      },
    },
    async writeBundle() {
      const options = resolveOptions(rawOptions);
      await uploadMatchedFiles(options, {
        framework: "vite",
        outputPath,
      });
    },
  };
}

function createWebpackHooks(rawOptions: Options, outputPath: string | undefined): WebpackHooks {
  return {
    async writeBundle() {
      const options = resolveOptions(rawOptions);
      await uploadMatchedFiles(options, {
        framework: "webpack",
        outputPath,
      });
    },
  };
}
