/**
 * Dark Warm Preset - 暗色暖色调主题
 */

import {
  warmPrimary,
  success,
  warning,
  danger,
  info,
  neutralDark,
  backgroundDark,
  textDark,
  borderDark,
  shadowDark,
} from '../tokens'

export const darkWarmTheme = {
  name: 'dark-warm',
  colors: {
    primary: warmPrimary,
    success,
    warning,
    danger,
    info,
    neutral: neutralDark,
  },
  background: backgroundDark,
  text: textDark,
  border: borderDark,
  shadow: shadowDark,
  glow: {
    primary: 'rgba(251, 146, 60, 0.2)',
    success: 'rgba(74, 222, 128, 0.2)',
    warning: 'rgba(251, 191, 36, 0.2)',
    danger: 'rgba(248, 113, 113, 0.2)',
  },
}

export default darkWarmTheme