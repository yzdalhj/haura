/**
 * Light Cool Preset - 亮色冷色调主题
 */

import {
  coolPrimary,
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

export const lightCoolTheme = {
  name: 'light-cool',
  colors: {
    primary: coolPrimary,
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
    primary: 'rgba(99, 102, 241, 0.3)',
    success: 'rgba(34, 197, 94, 0.3)',
    warning: 'rgba(245, 158, 11, 0.3)',
    danger: 'rgba(239, 68, 68, 0.3)',
  },
}

export default lightCoolTheme