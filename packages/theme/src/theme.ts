/**
 * Theme Utilities - 主题工具函数
 */

import type { ColorScale, NeutralScale } from './tokens'

// 主题类型定义
export interface Theme {
  name: string
  colors: {
    primary: ColorScale
    success: ColorScale
    warning: ColorScale
    danger: ColorScale
    info: ColorScale
    neutral: NeutralScale
  }
  background: {
    base: string
    elevated: string
    overlay: string
    glass: string
  }
  text: {
    primary: string
    secondary: string
    tertiary: string
    disabled: string
    inverse: string
  }
  border: {
    default: string
    hover: string
    active: string
  }
  shadow: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  glow: {
    primary: string
    success: string
    warning: string
    danger: string
  }
}

// CSS 变量前缀
const CSS_VAR_PREFIX = '--aura-'

/**
 * 将主题应用到 CSS 变量
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return

  const root = document.documentElement

  // 颜色变量
  Object.entries(theme.colors).forEach(([colorName, scale]) => {
    if (typeof scale === 'object') {
      Object.entries(scale).forEach(([shade, value]) => {
        root.style.setProperty(`${CSS_VAR_PREFIX}color-${colorName}-${shade}`, value)
      })
    }
  })

  // 背景变量
  Object.entries(theme.background).forEach(([key, value]) => {
    root.style.setProperty(`${CSS_VAR_PREFIX}bg-${key}`, value)
  })

  // 文字变量
  Object.entries(theme.text).forEach(([key, value]) => {
    root.style.setProperty(`${CSS_VAR_PREFIX}text-${key}`, value)
  })

  // 边框变量
  Object.entries(theme.border).forEach(([key, value]) => {
    root.style.setProperty(`${CSS_VAR_PREFIX}border-${key}`, value)
  })

  // 阴影变量
  Object.entries(theme.shadow).forEach(([key, value]) => {
    root.style.setProperty(`${CSS_VAR_PREFIX}shadow-${key}`, value)
  })

  // 光效变量
  Object.entries(theme.glow).forEach(([key, value]) => {
    root.style.setProperty(`${CSS_VAR_PREFIX}glow-${key}`, value)
  })

  // 设置主题名称
  root.setAttribute('data-theme', theme.name)
}

/**
 * 获取当前主题名称
 */
export function getCurrentTheme(): string | null {
  if (typeof window === 'undefined') return null
  return document.documentElement.getAttribute('data-theme')
}

/**
 * 监听系统主题变化
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches)
  }

  mediaQuery.addEventListener('change', handler)
  
  // 立即回调当前值
  callback(mediaQuery.matches)

  return () => {
    mediaQuery.removeEventListener('change', handler)
  }
}

/**
 * 判断是否为暗色主题
 */
export function isDarkTheme(themeName: string): boolean {
  return themeName.includes('dark')
}

/**
 * 从 localStorage 读取主题偏好
 */
export function getStoredTheme(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('haura-theme')
}

/**
 * 保存主题偏好到 localStorage
 */
export function setStoredTheme(themeName: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('haura-theme', themeName)
}