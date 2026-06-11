# unplugin-oss

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Upload build assets to Aliyun OSS after bundling. Powered by [unplugin](https://github.com/unjs/unplugin).

## Support

- Vite 4+ is implemented and tested with Vite 4.5.
- Webpack 4+ is implemented and tested with Webpack 4.47 and Webpack 5.
- Rollup, Rolldown, esbuild, Rspack, and Farm entries are exported for future support, but are currently TODO.

## Installation

```bash
npm i -D unplugin-oss
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import { defineConfig } from "vite";
import Oss from "unplugin-oss/vite";

export default defineConfig({
  plugins: [
    Oss({
      from: "dist/**/*",
      dist: "/static",
      region: "oss-cn-hangzhou",
      accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
      bucket: "my-bucket",
    }),
  ],
});
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import path from "node:path";
import Oss from "unplugin-oss/webpack";

export default {
  output: {
    path: path.resolve("dist"),
  },
  plugins: [
    Oss({
      from: "dist/**/*",
      dist: "/static",
      region: "oss-cn-hangzhou",
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: "my-bucket",
      quitWpOnError: true,
    }),
  ],
};
```

<br></details>

## Options

```ts
interface Options {
  region?: string;
  accessKeyId?: string;
  accessKeySecret?: string;
  bucket?: string;
  from: string | string[];
  test?: boolean;
  verbose?: boolean;
  dist?: string;
  buildRoot?: string;
  deleteOrigin?: boolean;
  deleteEmptyDir?: boolean;
  timeout?: number;
  setOssPath?: (filePath: string) => string | false | null | undefined;
  overwrite?: boolean;
  quitWpOnError?: boolean;
  version?: string;
  setVersion?: (data: { version: string }) => void | Promise<void>;
}
```

- `region`, `accessKeyId`, `accessKeySecret`, and `bucket` are required unless `test: true`.
- `from` supports glob patterns such as `dist/**` and `dist/**/*`. Directories matched by the glob are ignored before uploading, so only files are sent to OSS.
- `dist` is used as the OSS object key prefix.
- `buildRoot` controls how local paths are converted to OSS object keys. Vite uses `build.outDir`; Webpack uses `output.path` when `buildRoot` is not provided.
- `setOssPath` can override the generated OSS object key for each file.
- `overwrite: false` skips existing objects and sends `x-oss-forbid-overwrite`.
- `test: true` is a dry run. It discovers files and prints target paths without creating an OSS client.
- `verbose: true` prints colored grouped logs with source file, OSS key, object status, action, result URL, and failures. Existing objects are logged as `skipped` when `overwrite: false`, so skipped files are not reported as `uploading`.
- `quitWpOnError` makes Webpack builds fail when an upload fails.

## TODO

- Rollup
- Rolldown / tsdown
- esbuild
- Rspack
- Farm

## License

[MIT](./LICENSE) License © 2025-PRESENT [Drswith](https://github.com/Drswith)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-oss.svg
[npm-version-href]: https://npmjs.com/package/unplugin-oss
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-oss
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-oss?interval=30
[unit-test-src]: https://github.com/Drswith/unplugin-oss/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/Drswith/unplugin-oss/actions/workflows/unit-test.yml
