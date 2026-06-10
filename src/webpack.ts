/**
 * This entry file is for webpack plugin.
 *
 * @module
 */

import { Oss } from './index'

/**
 * Webpack plugin
 *
 * @example
 * ```js
 * // webpack.config.js
 * import Oss from 'unplugin-oss/webpack'
 *
 * export default {
 *   plugins: [Oss()],
 * }
 * ```
 */
const webpack = Oss.webpack as typeof Oss.webpack
export default webpack
export { webpack as 'module.exports' }
