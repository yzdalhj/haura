/**
 * Color Tokens - 颜色设计令牌
 * 定义所有颜色值，支持主题定制
 */

// 基础色系
export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string // 主色
  600: string
  700: string
  800: string
  900: string
}

// 中性色（灰度）
export interface NeutralScale {
  0: string  // 纯白
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string // 接近纯黑
}

// 语义色
export interface SemanticColors {
  primary: ColorScale
  success: ColorScale
  warning: ColorScale
  danger: ColorScale
  info: ColorScale
}

// 默认主色（天空蓝）
export const defaultPrimary: ColorScale = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
}

// 暖色调主色（橙红）
export const warmPrimary: ColorScale = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
}

// 冷色调主色（靛蓝）
export const coolPrimary: ColorScale = {
  50: '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
}

// 成功色（绿色）
export const success: ColorScale = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
}

// 警告色（黄色/橙色）
export const warning: ColorScale = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
}

// 危险色（红色）
export const danger: ColorScale = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
}

// 信息色（蓝色）
export const info: ColorScale = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
}

// 亮色模式中性色
export const neutralLight: NeutralScale = {
  0: '#ffffff',
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
}

// 暗色模式中性色
export const neutralDark: NeutralScale = {
  0: '#ffffff',
  50: '#f2f2f2',
  100: '#e6e6e6',
  200: '#cccccc',
  300: '#b3b3b3',
  400: '#999999',
  500: '#808080',
  600: '#666666',
  700: '#4d4d4d',
  800: '#333333',
  900: '#1a1a1a',
  950: '#0d0d0d',
}

// 亮色模式背景色
export const backgroundLight = {
  base: '#ffffff',
  elevated: '#fafafa',
  overlay: 'rgba(255, 255, 255, 0.8)',
  glass: 'rgba(255, 255, 255, 0.7)',
}

// 暗色模式背景色
export const backgroundDark = {
  base: '#0a0a0a',
  elevated: '#141414',
  overlay: 'rgba(10, 10, 10, 0.8)',
  glass: 'rgba(20, 20, 20, 0.6)',
}

// 文字色
export const textLight = {
  primary: '#171717',
  secondary: '#525252',
  tertiary: '#737373',
  disabled: '#a3a3a3',
  inverse: '#ffffff',
}

export const textDark = {
  primary: '#f2f2f2',
  secondary: '#b3b3b3',
  tertiary: '#999999',
  disabled: '#666666',
  inverse: '#0a0a0a',
}

// 边框色
export const borderLight = {
  default: '#e5e5e5',
  hover: '#d4d4d4',
  active: '#a3a3a3',
}

export const borderDark = {
  default: '#333333',
  hover: '#4d4d4d',
  active: '#666666',
}

// 阴影色
export const shadowLight = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
}

export const shadowDark = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
}

// 光效色
export const glowLight = {
  primary: 'rgba(14, 165, 233, 0.3)',
  success: 'rgba(34, 197, 94, 0.3)',
  warning: 'rgba(245, 158, 11, 0.3)',
  danger: 'rgba(239, 68, 68, 0.3)',
}

export const glowDark = {
  primary: 'rgba(56, 189, 248, 0.2)',
  success: 'rgba(74, 222, 128, 0.2)',
  warning: 'rgba(251, 191, 36, 0.2)',
  danger: 'rgba(248, 113, 113, 0.2)',
}