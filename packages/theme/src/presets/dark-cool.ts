/**
 * Dark Cool Preset - 暗色冷色调主题
 */

import {
  coolPrimary,
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

export const darkCoolTheme = {
  name: 'dark-cool',
  colors: {
    primary: coolPrimary,
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
    primary: 'rgba(129, 140, 248, 0.2)',
    success: 'rgba(74, 222, 128, 0.2)',
    warning: 'rgba(251, 191, 36, 0.2)',
    danger: 'rgba(248, 113, 113, 0.2)',
  },
}

export default darkCoolTheme