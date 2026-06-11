/**
 * This entry file is for esbuild plugin.
 *
 * @module
 */

import { Oss } from "./index";

/**
 * Esbuild plugin
 *
 * @example
 * ```ts
 * import { build } from 'esbuild'
 * import Oss from 'unplugin-aliyun-oss/esbuild'
 * 
 * build({ plugins: [Oss()] })
```
 */
const esbuild = Oss.esbuild as typeof Oss.esbuild;
export default esbuild;
export { esbuild as "module.exports" };
