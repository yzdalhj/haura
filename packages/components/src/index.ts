/**
 * Haura Components - 组件库入口
 */

// 基础组件
export { HButton } from './button'
export { HIcon } from './icon'

// 导出类型
export type { ButtonProps, ButtonEmits, ButtonType, ButtonSize, NativeType } from './button'
export type { IconProps, IconEmits, IconSize } from './icon'

// 组件列表
import { HButton } from './button'
import { HIcon } from './icon'

export const components = [HButton, HIcon]

// 插件安装
import type { App, Plugin } from 'vue'

export interface HauraOptions {
  prefix?: string
  zIndex?: number
  locale?: any
  theme?: string
}

const HauraUI: Plugin = {
  install(app: App, options: HauraOptions = {}) {
    const { prefix = 'H' } = options

    components.forEach((component) => {
      const name = component.name
      if (name) {
        app.component(`${prefix}${name.slice(1)}`, component)
      }
    })
  },
}

export default HauraUI