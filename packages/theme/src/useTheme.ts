/**
 * useTheme - Vue 组合式函数
 * 用于在组件中使用主题
 */

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { Theme } from './theme'
import { applyTheme, getCurrentTheme, watchSystemTheme, getStoredTheme, setStoredTheme } from './theme'

// 当前主题状态
const currentTheme = ref<string>('light')
const isDark = computed(() => currentTheme.value.includes('dark'))

// 系统主题监听器清理函数
let cleanupWatcher: (() => void) | null = null

/**
 * 使用主题的组合式函数
 */
export function useTheme() {
  /**
   * 设置主题
   */
  const setTheme = (theme: Theme | string) => {
    const themeName = typeof theme === 'string' ? theme : theme.name
    currentTheme.value = themeName
    
    if (typeof theme === 'object') {
      applyTheme(theme)
    }
    
    setStoredTheme(themeName)
  }

  /**
   * 切换亮/暗模式（保持色调）
   */
  const toggleDark = () => {
    const current = currentTheme.value
    let newTheme: string
    
    if (current.includes('warm')) {
      newTheme = current.includes('dark') ? 'light-warm' : 'dark-warm'
    } else if (current.includes('cool')) {
      newTheme = current.includes('dark') ? 'light-cool' : 'dark-cool'
    } else {
      newTheme = current.includes('dark') ? 'light' : 'dark'
    }
    
    // 触发主题切换事件，由 ThemeProvider 处理
    window.dispatchEvent(new CustomEvent('haura:theme-change', { detail: newTheme }))
  }

  /**
   * 获取当前主题名称
   */
  const themeName = computed(() => currentTheme.value)

  /**
   * 初始化主题
   */
  onMounted(() => {
    // 尝试读取存储的主题
    const stored = getStoredTheme()
    if (stored) {
      currentTheme.value = stored
      return
    }

    // 监听系统主题
    if (!cleanupWatcher) {
      cleanupWatcher = watchSystemTheme((dark) => {
        // 只有在没有存储偏好时才跟随系统
        if (!getStoredTheme()) {
          currentTheme.value = dark ? 'dark' : 'light'
        }
      })
    }
  })

  onUnmounted(() => {
    if (cleanupWatcher) {
      cleanupWatcher()
      cleanupWatcher = null
    }
  })

  return {
    theme: themeName,
    isDark,
    setTheme,
    toggleDark,
  }
}

/**
 * 创建主题 Provider（用于应用级别）
 */
export function createThemeProvider(themes: Record<string, Theme>) {
  const currentThemeName = ref<string>('light')

  const setTheme = (name: string) => {
    const theme = themes[name]
    if (theme) {
      currentThemeName.value = name
      applyTheme(theme)
      setStoredTheme(name)
    }
  }

  const init = () => {
    // 读取存储的主题或使用默认
    const stored = getStoredTheme()
    const initialTheme = stored && themes[stored] ? stored : 'light'
    setTheme(initialTheme)

    // 监听主题切换事件
    window.addEventListener('haura:theme-change', ((e: CustomEvent) => {
      const newTheme = e.detail
      if (themes[newTheme]) {
        setTheme(newTheme)
      }
    }) as EventListener)
  }

  return {
    currentTheme: currentThemeName,
    setTheme,
    init,
  }
}