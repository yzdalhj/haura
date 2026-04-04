/**
 * Light Warm Preset - 亮色暖色调主题
 */

import {
  warmPrimary,
  success,
  warning,
  danger,
  info,
  neutralLight,
  backgroundLight,
  textLight,
  borderLight,
  shadowLight,
} from '../tokens'

export const lightWarmTheme = {
  name: 'light-warm',
  colors: {
    primary: warmPrimary,
    success,
    warning,
    danger,
    info,
    neutral: neutralLight,
  },
  background: backgroundLight,
  text: textLight,
  border: borderLight,
  shadow: shadowLight,
  glow: {
    primary: 'rgba(249, 115, 22, 0.3)',
    success: 'rgba(34, 197, 94, 0.3)',
    warning: 'rgba(245, 158, 11, 0.3)',
    danger: 'rgba(239, 68, 68, 0.3)',
  },
}

export default lightWarmTheme