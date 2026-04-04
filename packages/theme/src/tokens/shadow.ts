/**
 * Shadow Tokens - 阴影设计令牌
 */

import { shadowLight, shadowDark } from './colors'

export { shadowLight, shadowDark }

// 光效强度
export const glowIntensity = {
  sm: '0 0 10px',
  md: '0 0 20px',
  lg: '0 0 30px',
  xl: '0 0 40px',
}

// 聚焦光环
export const focusRing = {
  light: '0 0 0 3px rgba(14, 165, 233, 0.2)',
  dark: '0 0 0 3px rgba(56, 189, 248, 0.2)',
}

// 悬停光效
export const hoverGlow = {
  light: {
    primary: '0 4px 20px rgba(14, 165, 233, 0.3)',
    success: '0 4px 20px rgba(34, 197, 94, 0.3)',
    warning: '0 4px 20px rgba(245, 158, 11, 0.3)',
    danger: '0 4px 20px rgba(239, 68, 68, 0.3)',
  },
  dark: {
    primary: '0 4px 20px rgba(56, 189, 248, 0.2)',
    success: '0 4px 20px rgba(74, 222, 128, 0.2)',
    warning: '0 4px 20px rgba(251, 191, 36, 0.2)',
    danger: '0 4px 20px rgba(248, 113, 113, 0.2)',
  },
}