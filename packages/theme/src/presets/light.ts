/**
 * Light Preset - 亮色中性主题（默认）
 */

import {
  defaultPrimary,
  success,
  warning,
  danger,
  info,
  neutralLight,
  backgroundLight,
  textLight,
  borderLight,
  shadowLight,
  glowLight,
} from '../tokens'

export const lightTheme = {
  name: 'light',
  colors: {
    primary: defaultPrimary,
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
  glow: glowLight,
}

export default lightTheme