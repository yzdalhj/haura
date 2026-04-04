/**
 * 涟漪效果 - 点击时从点击位置扩散的圆形波纹
 */

import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export interface RippleOptions {
  color?: string
  duration?: number
  maxScale?: number
}

/**
 * 创建涟漪效果
 */
export function useRipple(
  elementRef: Ref<HTMLElement | null>,
  options: RippleOptions = {}
) {
  const { color = 'currentColor', duration = 600, maxScale = 2.5 } = options

  const createRipple = (event: MouseEvent | TouchEvent) => {
    const element = elementRef.value
    if (!element) return

    // 获取点击位置
    const rect = element.getBoundingClientRect()
    let clientX: number, clientY: number

    if ('touches' in event) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = (event as MouseEvent).clientX
      clientY = (event as MouseEvent).clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    // 计算涟漪大小（取宽高中较大值，确保覆盖整个元素）
    const size = Math.max(rect.width, rect.height) * maxScale

    // 创建涟漪元素
    const ripple = document.createElement('span')
    ripple.className = 'haura-ripple'
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: ${color};
      opacity: 0.3;
      pointer-events: none;
      transform: scale(0);
      animation: haura-ripple ${duration}ms ease-out forwards;
      width: ${size}px;
      height: ${size}px;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
    `

    // 添加动画样式（如果不存在）
    if (!document.getElementById('haura-ripple-style')) {
      const style = document.createElement('style')
      style.id = 'haura-ripple-style'
      style.textContent = `
        @keyframes haura-ripple {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    // 确保元素有相对定位
    const computedStyle = window.getComputedStyle(element)
    if (computedStyle.position === 'static') {
      element.style.position = 'relative'
    }
    element.style.overflow = 'hidden'

    element.appendChild(ripple)

    // 动画结束后移除元素
    setTimeout(() => {
      ripple.remove()
    }, duration)
  }

  onMounted(() => {
    const element = elementRef.value
    if (element) {
      element.addEventListener('mousedown', createRipple)
      element.addEventListener('touchstart', createRipple)
    }
  })

  onUnmounted(() => {
    const element = elementRef.value
    if (element) {
      element.removeEventListener('mousedown', createRipple)
      element.removeEventListener('touchstart', createRipple)
    }
  })

  return { createRipple }
}

/**
 * 涟漪指令（用于 Vue 指令方式）
 */
export const vRipple = {
  mounted(el: HTMLElement, binding: { value?: RippleOptions }) {
    const options = binding.value || {}
    const { color = 'currentColor', duration = 600 } = options

    const createRipple = (event: MouseEvent | TouchEvent) => {
      const rect = el.getBoundingClientRect()
      let clientX: number, clientY: number

      if ('touches' in event) {
        clientX = event.touches[0].clientX
        clientY = event.touches[0].clientY
      } else {
        clientX = (event as MouseEvent).clientX
        clientY = (event as MouseEvent).clientY
      }

      const x = clientX - rect.left
      const y = clientY - rect.top
      const size = Math.max(rect.width, rect.height) * 2.5

      const ripple = document.createElement('span')
      ripple.className = 'haura-ripple'
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background-color: ${color};
        opacity: 0.3;
        pointer-events: none;
        transform: scale(0);
        animation: haura-ripple ${duration}ms ease-out forwards;
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `

      if (!document.getElementById('haura-ripple-style')) {
        const style = document.createElement('style')
        style.id = 'haura-ripple-style'
        style.textContent = `
          @keyframes haura-ripple {
            to {
              transform: scale(1);
              opacity: 0;
            }
          }
        `
        document.head.appendChild(style)
      }

      const computedStyle = window.getComputedStyle(el)
      if (computedStyle.position === 'static') {
        el.style.position = 'relative'
      }
      el.style.overflow = 'hidden'

      el.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, duration)
    }

    el.addEventListener('mousedown', createRipple)
    el.addEventListener('touchstart', createRipple)

    // 保存清理函数
    ;(el as any)._rippleCleanup = () => {
      el.removeEventListener('mousedown', createRipple)
      el.removeEventListener('touchstart', createRipple)
    }
  },
  unmounted(el: HTMLElement) {
    if ((el as any)._rippleCleanup) {
      ;(el as any)._rippleCleanup()
    }
  },
}