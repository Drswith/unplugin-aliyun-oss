/**
 * This entry file is for Farm plugin.
 *
 * @module
 */

import { Oss } from './index'

/**
 * Farm plugin
 *
 * @example
 * ```ts
 * // farm.config.js
 * import Oss from 'unplugin-oss/farm'
 *
 * export default {
 *   plugins: [Oss()],
 * }
 * ```
 */
const farm = Oss.farm as typeof Oss.farm
export default farm
export { farm as 'module.exports' }
