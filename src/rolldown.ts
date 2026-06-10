/**
 * This entry file is for Rolldown plugin.
 *
 * @module
 */

import { Oss } from "./index";

/**
 * Rolldown plugin
 *
 * @example
 * ```ts
 * // rolldown.config.js
 * import Oss from 'unplugin-oss/rolldown'
 *
 * export default {
 *   plugins: [Oss()],
 * }
 * ```
 */
const rolldown = Oss.rolldown as typeof Oss.rolldown;
export default rolldown;
export { rolldown as "module.exports" };
