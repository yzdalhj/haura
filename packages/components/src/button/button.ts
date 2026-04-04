/**
 * HButton - 按钮组件
 * Props 对标 Element Plus，并扩展动效相关属性
 */

import type { PropType, ExtractPropTypes, VNode } from 'vue'

// 按钮类型
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'link'

// 按钮尺寸
export type ButtonSize = 'large' | 'default' | 'small'

// 原生按钮类型
export type NativeType = 'button' | 'submit' | 'reset'

// Props 定义
export const buttonProps = {
  /**
   * 按钮尺寸 - 对标 Element Plus
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default',
  },
  /**
   * 按钮类型 - 对标 Element Plus
   */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  /**
   * 是否为朴素按钮 - 对标 Element Plus
   */
  plain: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为圆角按钮 - 对标 Element Plus
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为圆形按钮 - 对标 Element Plus
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为加载中状态 - 对标 Element Plus
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用 - 对标 Element Plus
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标类名 - 对标 Element Plus
   */
  icon: {
    type: String,
    default: '',
  },
  /**
   * 是否为块级元素 - 对标 Element Plus
   */
  block: {
    type: Boolean,
    default: false,
  },
  /**
   * 原生 type 属性 - 对标 Element Plus
   */
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button',
  },
  /**
   * 是否自动聚焦 - 对标 Element Plus
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载中显示的文本 - 对标 Element Plus
   */
  loadingIcon: {
    type: String,
    default: '',
  },
  /**
   * 自定义加载图标 - 对标 Element Plus
   */
  loadingSlot: {
    type: [String, Object] as PropType<string | VNode>,
    default: '',
  },
  /**
   * 节流等待时间（毫秒）- 对标 Element Plus
   */
  throttle: {
    type: Number,
    default: 0,
  },
  /**
   * 防抖等待时间（毫秒）- 对标 Element Plus
   */
  debounce: {
    type: Number,
    default: 0,
  },
  /**
   * 自定义元素标签 - 对标 Element Plus
   */
  tag: {
    type: String as PropType<string | object>,
    default: 'button',
  },
  /**
   * 是否显示涟漪效果 - Haura 扩展
   */
  ripple: {
    type: Boolean,
    default: true,
  },
  /**
   * 涟漪颜色 - Haura 扩展
   */
  rippleColor: {
    type: String,
    default: 'currentColor',
  },
  /**
   * 悬停时是否上浮 - Haura 扩展
   */
  hoverLift: {
    type: Boolean,
    default: true,
  },
  /**
   * 悬停时是否发光 - Haura 扩展
   */
  hoverGlow: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击时是否缩放 - Haura 扩展
   */
  pressScale: {
    type: Boolean,
    default: true,
  },
  /**
   * 光效颜色 - Haura 扩展
   */
  glowColor: {
    type: String,
    default: '',
  },
  /**
   * 玻璃效果 - Haura 扩展
   */
  glass: {
    type: Boolean,
    default: false,
  },
  /**
   * 渐变背景 - Haura 扩展
   */
  gradient: {
    type: Boolean,
    default: false,
  },
} as const

// Props 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

// Emits 定义
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
  mousedown: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseup: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

// Emits 类型
export type ButtonEmits = typeof buttonEmits