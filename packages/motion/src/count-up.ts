/**
 * 数字滚动动画
 */

import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'

export interface CountUpOptions {
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
  useEasing?: boolean
  easingFn?: (t: number) => number
}

/**
 * 默认缓动函数 - easeOutExpo
 */
const defaultEasing = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * 数字滚动 Hook
 */
export function useCountUp(
  targetValue: Ref<number> | number,
  options: CountUpOptions = {}
) {
  const {
    duration = 800,
    decimals = 0,
    separator = ',',
    prefix = '',
    suffix = '',
    useEasing = true,
    easingFn = defaultEasing,
  } = options

  const currentValue = ref(0)
  const isAnimating = ref(false)

  const displayValue = computed(() => {
    let value = currentValue.value

    // 格式化数字
    if (decimals > 0) {
      value = parseFloat(value.toFixed(decimals))
    }

    // 添加千分位分隔符
    let formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

    // 替换分隔符
    if (separator !== ',') {
      formatted = formatted.replace(/,/g, separator)
    }

    return `${prefix}${formatted}${suffix}`
  })

  let animationId: number | null = null
  let startTime: number | null = null
  let startValue = 0
  let endValue = typeof targetValue === 'number' ? targetValue : targetValue.value

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)

    const easedProgress = useEasing ? easingFn(progress) : progress
    currentValue.value = startValue + (endValue - startValue) * easedProgress

    if (progress < 1) {
      animationId = requestAnimationFrame(animate)
    } else {
      currentValue.value = endValue
      isAnimating.value = false
      startTime = null
    }
  }

  const start = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    startValue = currentValue.value
    endValue = typeof targetValue === 'number' ? targetValue : targetValue.value
    isAnimating.value = true
    startTime = null
    animationId = requestAnimationFrame(animate)
  }

  const reset = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    currentValue.value = 0
    isAnimating.value = false
    startTime = null
  }

  // 监听目标值变化
  if (typeof targetValue !== 'number') {
    watch(targetValue, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        startValue = currentValue.value
        endValue = newVal
        isAnimating.value = true
        startTime = null
        animationId = requestAnimationFrame(animate)
      }
    })
  }

  return {
    value: currentValue,
    displayValue,
    isAnimating,
    start,
    reset,
  }
}

/**
 * 数字滚动组件
 */
import { defineComponent, h } from 'vue'

export const HCountUp = defineComponent({
  name: 'HCountUp',
  props: {
    value: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 800,
    },
    decimals: {
      type: Number,
      default: 0,
    },
    separator: {
      type: String,
      default: ',',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { displayValue, start } = useCountUp(
      computed(() => props.value),
      {
        duration: props.duration,
        decimals: props.decimals,
        separator: props.separator,
        prefix: props.prefix,
        suffix: props.suffix,
      }
    )

    if (props.autoplay) {
      start()
    }

    return () => h('span', { class: 'haura-count-up' }, displayValue.value)
  },
})