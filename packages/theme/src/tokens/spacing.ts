/**
 * Spacing Tokens - 间距设计令牌
 */

export interface SpacingScale {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  12: string
  14: string
  16: string
  20: string
  24: string
  28: string
  32: string
  36: string
  40: string
  44: string
  48: string
  52: string
  56: string
  60: string
  64: string
  72: string
  80: string
  96: string
}

export const spacing: SpacingScale = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
}

// 组件内边距
export const componentPadding = {
  xs: spacing[1],  // 4px
  sm: spacing[2],  // 8px
  md: spacing[3],  // 12px
  lg: spacing[4],  // 16px
  xl: spacing[6],  // 24px
}

// 页面边距
export const pagePadding = {
  sm: spacing[4],  // 16px
  md: spacing[6],  // 24px
  lg: spacing[8],  // 32px
  xl: spacing[12], // 48px
}