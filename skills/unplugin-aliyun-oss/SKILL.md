---
name: unplugin-aliyun-oss
description: Use and maintain the `unplugin-aliyun-oss` package, an unplugin-based build plugin that uploads generated assets to Aliyun OSS. Use when an agent needs to integrate Aliyun OSS uploads into Vite, Webpack, Rollup, Rolldown, esbuild, Rspack, or Farm builds; configure package options such as `from`, `dist`, `buildRoot`, `setOssPath`, `overwrite`, `deleteOrigin`, `quitWpOnError`, or `setVersion`; debug OSS key generation, skipped uploads, dry runs, or build output path inference; or modify this source project.
---

# unplugin-aliyun-oss

## Overview

Use this skill to configure the published package in consuming projects or to change this source package. Treat the repository root as the directory that contains this `skills/` folder, and prefer live project files over copied notes when editing behavior.

Read `references/project.md` when you need implementation details, option semantics, validation commands, or package entrypoints.

## Workflow

1. Classify the task:
   - Consumer integration: edit the user's build config and import the adapter matching the bundler.
   - Runtime/config debugging: inspect `from`, build output path, `dist`, `buildRoot`, `setOssPath`, and `overwrite`.
   - Package maintenance: work from the repository root and follow its package manager scripts and tests.
2. Prefer dry-run verification before touching real OSS:
   - Use `test: true` when credentials are unavailable or the user only wants path discovery.
   - Do not invent Aliyun credentials. Use environment variables such as `OSS_ACCESS_KEY_ID` and `OSS_ACCESS_KEY_SECRET`.
3. Keep object key reasoning explicit:
   - `from` selects local files.
   - `buildRoot` or the bundler output path controls relative OSS object keys.
   - `dist` prefixes OSS object keys.
   - `setOssPath(filePath)` is the documented hook for custom keys and skip decisions; inspect the current installed/source version before relying on falsy return values for skipping.
4. Validate changes with the narrow relevant test first, then the project's standard checks before finishing.

## Consumer Usage

Install:

```bash
npm i -D unplugin-aliyun-oss
```

Vite example:

```ts
import { defineConfig } from "vite";
import Oss from "unplugin-aliyun-oss/vite";

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

Webpack example:

```js
import path from "node:path";
import Oss from "unplugin-aliyun-oss/webpack";

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

Use these adapter imports:

- `unplugin-aliyun-oss/vite`
- `unplugin-aliyun-oss/webpack`
- `unplugin-aliyun-oss/rollup`
- `unplugin-aliyun-oss/rolldown`
- `unplugin-aliyun-oss/esbuild`
- `unplugin-aliyun-oss/rspack`
- `unplugin-aliyun-oss/farm`

## Maintenance

When changing the package source:

- Use structural code search if the agent environment provides it; otherwise inspect the relevant files directly.
- Keep public API changes reflected in `README.md`, `src/core/options.ts`, and tests.
- Add or update focused tests in `tests/uploader.test.ts` for upload semantics and `tests/builders.test.ts` for adapter or output path behavior.
- Run the narrow test matching the change, then `pnpm run typecheck`, `pnpm run build`, and `pnpm run test`.
- Do not run real OSS uploads unless the user explicitly provides/approves credentials and target bucket behavior.

For details, read `references/project.md`.
