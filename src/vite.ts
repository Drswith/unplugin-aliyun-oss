/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import { Oss } from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Oss from 'unplugin-oss/vite'
 *
 * export default defineConfig({
 *   plugins: [Oss()],
 * })
 * ```
 */
const vite = Oss.vite as typeof Oss.vite
export default vite
export { vite as 'module.exports' }
