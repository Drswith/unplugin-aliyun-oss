/**
 * This entry file is for Rollup plugin.
 *
 * @module
 */

import { Oss } from "./index";

/**
 * Rollup plugin
 *
 * @example
 * ```ts
 * // rollup.config.js
 * import Oss from 'unplugin-aliyun-oss/rollup'
 *
 * export default {
 *   plugins: [Oss()],
 * }
 * ```
 */
const rollup = Oss.rollup as typeof Oss.rollup;
export default rollup;
export { rollup as "module.exports" };
