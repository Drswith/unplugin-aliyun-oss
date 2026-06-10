import { createUnplugin, type UnpluginInstance } from "unplugin";
import { resolveOptions, type Options } from "./core/options";

export const Oss: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (rawOptions = {}) => {
    const options = resolveOptions(rawOptions);

    const name = "unplugin-oss";
    return {
      name,
      enforce: options.enforce,

      transform: {
        filter: {
          id: { include: options.include, exclude: options.exclude },
        },
        handler(code, _id) {
          return `// unplugin-oss injected\n${code}`;
        },
      },
    };
  },
);
