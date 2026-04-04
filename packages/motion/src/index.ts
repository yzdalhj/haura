/**
 * Haura Motion - 动效系统
 */

// 核心动效
export { useRipple, vRipple } from './ripple'
export { useHoverIndicator, vHoverIndicator } from './hover-indicator'
export { HSkeleton, HSkeletonGroup, injectSkeletonStyles } from './skeleton'
export { useCountUp, HCountUp } from './count-up'
export { HMorphIcon, predefinedIcons } from './morph'

// 过渡组件
export {
  HFadeTransition,
  HSlideTransition,
  HScaleTransition,
  HCollapseTransition,
  HStaggerTransition,
} from './transitions'

// 类型导出
export type { RippleOptions } from './ripple'
export type { HoverIndicatorOptions } from './hover-indicator'
export type { SkeletonProps } from './skeleton'
export type { CountUpOptions } from './count-up'
export type { MorphIconProps } from './morph'