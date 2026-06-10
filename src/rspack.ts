/**
 * This entry file is for Rspack plugin.
 *
 * @module
 */

import { Oss } from './index'

/**
 * Rspack plugin
 *
 * @example
 * ```js
 * // rspack.config.js
 * import Oss from 'unplugin-oss/rspack'
 *
 * export default {
 *   plugins: [Oss()],
 * }
 * ```
 */
const rspack = Oss.rspack as typeof Oss.rspack
export default rspack
export { rspack as 'module.exports' }
