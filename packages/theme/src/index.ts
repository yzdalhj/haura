/**
 * Haura Theme - 主题系统
 */

// 导出设计令牌
export * from './tokens'

// 导出主题预设
export * from './presets'

// 导出主题工具
export * from './theme'
export * from './useTheme'

// 导入所有预设
import { lightTheme } from './presets/light'
import { darkTheme } from './presets/dark'
import { lightWarmTheme } from './presets/light-warm'
import { darkWarmTheme } from './presets/dark-warm'
import { lightCoolTheme } from './presets/light-cool'
import { darkCoolTheme } from './presets/dark-cool'

// 主题集合
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  'light-warm': lightWarmTheme,
  'dark-warm': darkWarmTheme,
  'light-cool': lightCoolTheme,
  'dark-cool': darkCoolTheme,
}

// 默认导出
export default themes