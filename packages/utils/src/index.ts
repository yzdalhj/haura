/**
 * Haura UI 工具函数
 */

import type { App, Plugin, Component } from 'vue'

/**
 * 为组件添加 install 方法
 */
export function withInstall<T extends Component>(component: T): T & Plugin {
  const c = component as T & Plugin
  c.install = (app: App, options?: Record<string, unknown>) => {
    const { prefix = 'H' } = options || {}
    const name = c.name || c.__name
    if (name) {
      app.component(`${prefix}${name.slice(1)}`, c)
    }
  }
  return c
}

/**
 * 为多个组件添加 install 方法
 */
export function withInstallAll<T extends Component>(components: T[]): { install: (app: App) => void } {
  return {
    install(app: App) {
      components.forEach((component) => {
        const name = (component as any).name || (component as any).__name
        if (name) {
          app.component(name, component)
        }
      })
    },
  }
}

/**
 * 类型断言：判断是否为函数
 */
export function isFunction<T extends (...args: any[]) => any>(val: unknown): val is T {
  return typeof val === 'function'
}

/**
 * 类型断言：判断是否为字符串
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

/**
 * 类型断言：判断是否为数字
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}

/**
 * 类型断言：判断是否为对象
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object'
}

/**
 * 类型断言：判断是否为数组
 */
export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

/**
 * 判断是否为空值
 */
export function isEmpty(val: unknown): boolean {
  if (val === null || val === undefined) return true
  if (isString(val) || isArray(val)) return val.length === 0
  if (isObject(val)) return Object.keys(val).length === 0
  return false
}

/**
 * 生成唯一 ID
 */
export function generateId(prefix = 'haura'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * 将数值转为带单位的字符串
 */
export function addUnit(value: string | number, unit = 'px'): string {
  if (isNumber(value)) {
    return `${value}${unit}`
  }
  if (isString(value) && !isNaN(Number(value))) {
    return `${value}${unit}`
  }
  return value as string
}

/**
 * 获取元素的 CSS 样式值
 */
export function getStyle(el: HTMLElement, property: string): string {
  return window.getComputedStyle(el).getPropertyValue(property)
}

/**
 * 设置元素的 CSS 样式
 */
export function setStyle(el: HTMLElement, styles: Record<string, string | number>): void {
  Object.entries(styles).forEach(([key, value]) => {
    el.style.setProperty(key, typeof value === 'number' ? `${value}px` : value)
  })
}

/**
 * 移除元素的 CSS 样式
 */
export function removeStyle(el: HTMLElement, properties: string | string[]): void {
  const props = isArray(properties) ? properties : [properties]
  props.forEach((prop) => {
    el.style.removeProperty(prop)
  })
}

/**
 * 判断元素是否可见
 */
export function isVisible(el: HTMLElement): boolean {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
}

/**
 * 判断元素是否在视口内
 */
export function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 获取滚动条宽度
 */
export function getScrollBarWidth(): number {
  const outer = document.createElement('div')
  outer.style.cssText = 'visibility:hidden;overflow:scroll;position:absolute;top:-9999px;width:100px'
  document.body.appendChild(outer)
  const width = outer.offsetWidth - outer.clientWidth
  document.body.removeChild(outer)
  return width
}

/**
 * 锁定 body 滚动
 */
export function lockBodyScroll(): () => void {
  const scrollBarWidth = getScrollBarWidth()
  const originalOverflow = document.body.style.overflow
  const originalPaddingRight = document.body.style.paddingRight

  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollBarWidth}px`

  return () => {
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight
  }
}

/**
 * 深拷贝
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 合并对象（浅拷贝）
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}

/**
 * 拾取对象属性
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}