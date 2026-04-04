/**
 * Dark Preset - 暗色中性主题
 */

import {
  defaultPrimary,
  success,
  warning,
  danger,
  info,
  neutralDark,
  backgroundDark,
  textDark,
  borderDark,
  shadowDark,
  glowDark,
} from '../tokens'

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: defaultPrimary,
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
  glow: glowDark,
}

export default darkTheme