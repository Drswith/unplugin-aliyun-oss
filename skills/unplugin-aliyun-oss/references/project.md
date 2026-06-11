# unplugin-aliyun-oss Project Reference

## Source Of Truth

- Repository root: the project directory that contains this `skills/` folder.
- Package: `unplugin-aliyun-oss`.
- Purpose: upload build assets to Aliyun OSS after bundling through unplugin adapters.
- Runtime: ESM package, Node `>=20.19.0`, package manager `pnpm@11.5.2`.
- Build output: `tsdown` emits `dist/*.mjs` and `dist/*.d.mts`.

## Public Entrypoints

- Root export: `unplugin-aliyun-oss`
- Adapter exports: `./vite`, `./webpack`, `./rollup`, `./rolldown`, `./esbuild`, `./rspack`, `./farm`
- Extra export: `./api` currently exists as an empty entry.

## Main Source Map

- `src/index.ts`: creates the unplugin instance, selects framework hooks, infers output paths, and calls upload logic in `writeBundle`.
- `src/core/options.ts`: defines `Options`, `OssOptions`, defaults, validation, and `resolveOptions`.
- `src/core/uploader.ts`: performs glob matching, OSS client creation, key generation, existence checks, uploads, local deletion, and version callback handling.
- `src/core/logger.ts`: formats lifecycle logs.
- `src/core/path.ts`: normalizes Windows slashes and duplicate URL slashes.
- `src/{vite,webpack,rollup,rolldown,esbuild,rspack,farm}.ts`: adapter entry files exporting `Oss.<framework>`.
- `tests/builders.test.ts`: verifies adapter execution after real framework builds.
- `tests/uploader.test.ts`: verifies glob filtering, key generation, overwrite behavior, dry run mode, logging, and webpack abort behavior.

## Option Semantics

Required:

- `from`: glob string or array. Directories are filtered before upload.
- `region`, `accessKeyId`, `accessKeySecret`, `bucket`: required unless `test: true`.

Common optional fields:

- `test`: dry run mode. No Aliyun OSS client is created.
- `verbose`: logs grouped upload lifecycle details. Defaults to `true`.
- `dist`: OSS object key prefix. Defaults to `""`.
- `buildRoot`: local root used to make object keys relative. Defaults to `"."`, but most adapters infer the bundler output path when `buildRoot` is not supplied.
- `setOssPath(filePath)`: documented as overriding the generated OSS key for one file and skipping when it returns `false`, `null`, or `undefined`. In the current source, verify this behavior before relying on it because `getBasePath` and `getOssPath` make falsy return values a path-generation edge case.
- `overwrite`: defaults to `true`. When `false`, existing objects are skipped and upload requests include `x-oss-forbid-overwrite`.
- `deleteOrigin`: delete local files after successful upload.
- `deleteEmptyDir`: after `deleteOrigin`, prune empty parent directories up to the base path.
- `timeout`: OSS request timeout in milliseconds. Defaults to `60000`.
- `quitWpOnError`: only makes Webpack and Rspack builds fail on upload errors.
- `version` and `setVersion`: after successful non-test uploads, call `setVersion({ version })`; callback errors are logged and not rethrown.

## Object Key Rules

1. `uploadMatchedFiles` runs `glob(options.from, { nodir: true })`.
2. `getBasePath` returns `""` when `setOssPath` exists.
3. Otherwise, base path is:
   - explicit `buildRoot`, if provided by the user;
   - inferred bundler output path, if available;
   - `buildRoot` default `"."`.
4. `getOssPath` uses `setOssPath(filePath)` when it returns a truthy string.
5. Without a custom path, files under the base path become `/<relative-file-path>`.
6. Final key is `path.posix.join(options.dist, fileObjectPath)` normalized with forward slashes.

When debugging unexpected object keys, inspect the resolved local output directory, the glob in `from`, and whether `buildRoot` was explicitly provided.

## Adapter Behavior

- Vite: resolves `config.build.outDir` against `config.root` in `configResolved`.
- Rollup and Rolldown: use `output.dir`, or the dirname of `output.file`.
- esbuild: uses `outdir`, or dirname of `outfile`, resolved against `absWorkingDir` or `process.cwd()`.
- Webpack and Rspack: use `compiler.options.output.path`.
- Farm: uses `buildRoot` or the default unless the user configures it explicitly.

## Validation Commands

Run from the repository root.

Focused checks:

```bash
pnpm run test -- tests/uploader.test.ts
pnpm run test -- tests/builders.test.ts
```

Standard checks:

```bash
pnpm run typecheck
pnpm run build
pnpm run test
```

Formatting and linting:

```bash
pnpm run lint
pnpm run format:check
```

Use `test: true` or mocked clients for automated tests. Avoid real OSS network writes unless the user explicitly asks for live verification and provides credentials, bucket, and overwrite expectations.
