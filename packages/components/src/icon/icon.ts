/**
 * HIcon - 图标组件
 */

import type { PropType, ExtractPropTypes } from 'vue'

// 图标尺寸
export type IconSize = 'large' | 'default' | 'small' | number

// Props 定义
export const iconProps = {
  /**
   * 图标类名 - 对标 Element Plus
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * 图标尺寸 - 对标 Element Plus
   */
  size: {
    type: [String, Number] as PropType<IconSize>,
    default: 'default',
  },
  /**
   * 图标颜色 - 对标 Element Plus
   */
  color: {
    type: String,
    default: 'inherit',
  },
  /**
   * 是否旋转 - 对标 Element Plus
   */
  spin: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否脉冲高亮 - Haura 扩展
   */
  pulse: {
    type: Boolean,
    default: false,
  },
  /**
   * 悬停时是否缩放 - Haura 扩展
   */
  hoverScale: {
    type: Boolean,
    default: false,
  },
  /**
   * 悬停时是否旋转 - Haura 扩展
   */
  hoverRotate: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击时是否弹跳 - Haura 扩展
   */
  clickBounce: {
    type: Boolean,
    default: false,
  },
  /**
   * 过渡时长（毫秒）- Haura 扩展
   */
  transitionDuration: {
    type: Number,
    default: 200,
  },
} as const

// Props 类型
export type IconProps = ExtractPropTypes<typeof iconProps>

// Emits 定义
export const iconEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
}

// Emits 类型
export type IconEmits = typeof iconEmits