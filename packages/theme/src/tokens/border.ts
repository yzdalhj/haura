/**
 * Border Tokens - 边框和圆角设计令牌
 */

// 圆角
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
}

// 边框宽度
export const borderWidth = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
}

// 组件圆角
export const componentRadius = {
  button: borderRadius.md,  // 8px
  input: borderRadius.md,   // 8px
  card: borderRadius.lg,    // 12px
  tag: borderRadius.full,   // pill shape
  modal: borderRadius.lg,   // 12px
  tooltip: borderRadius.md, // 8px
}