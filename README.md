# unplugin-oss

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

OSS plugin powered by [unplugin](https://github.com/unjs/unplugin).

## Installation

```bash
npm i -D unplugin-oss
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Oss from 'unplugin-oss/vite'

export default defineConfig({
  plugins: [Oss()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Oss from 'unplugin-oss/rollup'

export default {
  plugins: [Oss()],
}
```

<br></details>

<details>
<summary>Rolldown / tsdown</summary><br>

```ts
// rolldown.config.ts / tsdown.config.ts
import Oss from 'unplugin-oss/rolldown'

export default {
  plugins: [Oss()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import Oss from 'unplugin-oss/esbuild'

build({
  plugins: [Oss()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import Oss from 'unplugin-oss/webpack'

export default {
  /* ... */
  plugins: [Oss()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import Oss from 'unplugin-oss/rspack'

export default {
  /* ... */
  plugins: [Oss()],
}
```

<br></details>

## License

[MIT](./LICENSE) License © 2025-PRESENT [Drswith](https://github.com/Drswith)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-oss.svg
[npm-version-href]: https://npmjs.com/package/unplugin-oss
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-oss
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-oss?interval=30
[unit-test-src]: https://github.com/Drswith/unplugin-oss/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/Drswith/unplugin-oss/actions/workflows/unit-test.yml
