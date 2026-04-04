/**
 * 悬停指示器跟随效果
 * 列表项悬停时，背景高亮条平滑滑动跟随
 */

import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Ref } from 'vue'

export interface HoverIndicatorOptions {
  selector?: string
  duration?: number
  easing?: string
  className?: string
}

/**
 * 创建悬停指示器跟随效果
 */
export function useHoverIndicator(
  containerRef: Ref<HTMLElement | null>,
  options: HoverIndicatorOptions = {}
) {
  const {
    selector = '[data-hoverable]',
    duration = 200,
    easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    className = 'haura-hover-indicator',
  } = options

  const indicatorRef = ref<HTMLElement | null>(null)
  let currentTarget: HTMLElement | null = null

  const createIndicator = () => {
    const indicator = document.createElement('div')
    indicator.className = className
    indicator.style.cssText = `
      position: absolute;
      pointer-events: none;
      z-index: 0;
      transition: all ${duration}ms ${easing};
      opacity: 0;
      border-radius: 6px;
    `
    return indicator
  }

  const moveIndicator = (target: HTMLElement) => {
    if (!indicatorRef.value || !containerRef.value) return

    const container = containerRef.value
    const indicator = indicatorRef.value
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    // 计算相对于容器的位置
    const top = targetRect.top - containerRect.top + container.scrollTop
    const left = targetRect.left - containerRect.left + container.scrollLeft
    const width = targetRect.width
    const height = targetRect.height

    // 应用位置和尺寸
    indicator.style.transform = 'none'
    indicator.style.top = `${top}px`
    indicator.style.left = `${left}px`
    indicator.style.width = `${width}px`
    indicator.style.height = `${height}px`
    indicator.style.opacity = '1'
  }

  const hideIndicator = () => {
    if (indicatorRef.value) {
      indicatorRef.value.style.opacity = '0'
    }
  }

  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.matches(selector)) return

    currentTarget = target
    moveIndicator(target)
  }

  const handleMouseLeave = (e: MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement
    
    // 检查是否移动到另一个可悬停元素
    if (relatedTarget && relatedTarget.matches(selector)) {
      currentTarget = relatedTarget
      moveIndicator(relatedTarget)
    } else {
      currentTarget = null
      hideIndicator()
    }
  }

  onMounted(() => {
    nextTick(() => {
      const container = containerRef.value
      if (!container) return

      // 创建指示器
      const indicator = createIndicator()
      container.appendChild(indicator)
      indicatorRef.value = indicator

      // 确保容器有相对定位
      const computedStyle = window.getComputedStyle(container)
      if (computedStyle.position === 'static') {
        container.style.position = 'relative'
      }

      // 添加事件监听
      container.addEventListener('mouseenter', handleMouseEnter, true)
      container.addEventListener('mouseleave', handleMouseLeave, true)
    })
  })

  onUnmounted(() => {
    const container = containerRef.value
    if (container) {
      container.removeEventListener('mouseenter', handleMouseEnter, true)
      container.removeEventListener('mouseleave', handleMouseLeave, true)
    }
    if (indicatorRef.value) {
      indicatorRef.value.remove()
    }
  })

  return {
    indicator: indicatorRef,
    moveTo: moveIndicator,
    hide: hideIndicator,
  }
}

/**
 * 悬停指示器指令
 */
export const vHoverIndicator = {
  mounted(el: HTMLElement, binding: { value?: HoverIndicatorOptions }) {
    const options = binding.value || {}
    const {
      selector = '[data-hoverable]',
      duration = 200,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
    } = options

    let indicator: HTMLElement | null = null
    let currentTarget: HTMLElement | null = null

    const createIndicator = () => {
      const ind = document.createElement('div')
      ind.className = 'haura-hover-indicator'
      ind.style.cssText = `
        position: absolute;
        pointer-events: none;
        z-index: 0;
        transition: all ${duration}ms ${easing};
        opacity: 0;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.04);
      `
      return ind
    }

    const moveIndicator = (target: HTMLElement) => {
      if (!indicator) return

      const containerRect = el.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()

      const top = targetRect.top - containerRect.top + el.scrollTop
      const left = targetRect.left - containerRect.left + el.scrollLeft
      const width = targetRect.width
      const height = targetRect.height

      indicator.style.transform = 'none'
      indicator.style.top = `${top}px`
      indicator.style.left = `${left}px`
      indicator.style.width = `${width}px`
      indicator.style.height = `${height}px`
      indicator.style.opacity = '1'
    }

    const hideIndicator = () => {
      if (indicator) {
        indicator.style.opacity = '0'
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.matches(selector)) return

      currentTarget = target
      moveIndicator(target)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement
      
      if (relatedTarget && relatedTarget.matches(selector)) {
        currentTarget = relatedTarget
        moveIndicator(relatedTarget)
      } else {
        currentTarget = null
        hideIndicator()
      }
    }

    // 初始化
    indicator = createIndicator()
    el.appendChild(indicator)

    const computedStyle = window.getComputedStyle(el)
    if (computedStyle.position === 'static') {
      el.style.position = 'relative'
    }

    el.addEventListener('mouseenter', handleMouseEnter, true)
    el.addEventListener('mouseleave', handleMouseLeave, true)

    // 保存清理函数
    ;(el as any)._hoverIndicatorCleanup = () => {
      el.removeEventListener('mouseenter', handleMouseEnter, true)
      el.removeEventListener('mouseleave', handleMouseLeave, true)
      if (indicator) {
        indicator.remove()
      }
    }
  },
  unmounted(el: HTMLElement) {
    if ((el as any)._hoverIndicatorCleanup) {
      ;(el as any)._hoverIndicatorCleanup()
    }
  },
}