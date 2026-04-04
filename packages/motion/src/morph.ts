/**
 * 图标 Morph 形变动画
 * SVG 路径变形动画
 */

import { h, defineComponent, ref, computed } from 'vue'

export interface MorphIconProps {
  /**
   * 当前状态
   */
  state: string
  /**
   * 图标配置
   */
  icons: Record<string, string>
  /**
   * 尺寸
   */
  size?: number | string
  /**
   * 颜色
   */
  color?: string
  /**
   * 动画时长
   */
  duration?: number
}

/**
 * 简单的路径插值（用于相似路径）
 */
function interpolatePath(path1: string, path2: string, progress: number): string {
  // 提取路径中的数字
  const extractNumbers = (path: string): number[] => {
    const matches = path.match(/-?\d+\.?\d*/g)
    return matches ? matches.map(Number) : []
  }

  const nums1 = extractNumbers(path1)
  const nums2 = extractNumbers(path2)

  if (nums1.length !== nums2.length) {
    // 路径不匹配，直接返回目标路径
    return progress > 0.5 ? path2 : path1
  }

  const interpolated = nums1.map((n1, i) => {
    const n2 = nums2[i]
    return n1 + (n2 - n1) * progress
  })

  // 替换原路径中的数字
  let result = path1
  let index = 0
  return result.replace(/-?\d+\.?\d*/g, () => {
    const val = interpolated[index++]
    return Number.isInteger(val) ? String(val) : val.toFixed(2)
  })
}

/**
 * Morph 图标组件
 */
export const HMorphIcon = defineComponent({
  name: 'HMorphIcon',
  props: {
    state: {
      type: String,
      required: true,
    },
    icons: {
      type: Object as () => Record<string, string>,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
    duration: {
      type: Number,
      default: 300,
    },
  },
  setup(props) {
    const previousState = ref(props.state)
    const animationProgress = ref(1)
    const isAnimating = ref(false)

    const currentPath = computed(() => {
      if (!isAnimating.value) {
        return props.icons[props.state] || ''
      }

      const fromPath = props.icons[previousState.value] || ''
      const toPath = props.icons[props.state] || ''

      return interpolatePath(fromPath, toPath, animationProgress.value)
    })

    const sizeValue = computed(() => {
      return typeof props.size === 'number' ? `${props.size}px` : props.size
    })

    // 监听状态变化
    watch(
      () => props.state,
      (newState, oldState) => {
        if (newState !== oldState) {
          previousState.value = oldState
          isAnimating.value = true
          animationProgress.value = 0

          // 执行动画
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / props.duration, 1)

            animationProgress.value = progress

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              isAnimating.value = false
              previousState.value = newState
            }
          }

          requestAnimationFrame(animate)
        }
      }
    )

    return () =>
      h(
        'svg',
        {
          width: sizeValue.value,
          height: sizeValue.value,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: props.color,
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          class: 'haura-morph-icon',
          style: {
            transition: `all ${props.duration}ms ease`,
          },
        },
        [
          h('path', {
            d: currentPath.value,
            style: {
              transition: `d ${props.duration}ms ease`,
            },
          }),
        ]
      )
  },
})

// 预定义的图标路径
export const predefinedIcons = {
  // 播放/暂停
  play: 'M5 3l14 9-14 9V3z',
  pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z',

  // 菜单/关闭
  menu: 'M3 12h18M3 6h18M3 18h18',
  close: 'M18 6L6 18M6 6l12 12',

  // 展开/收起（箭头）
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp: 'M18 15l-6-6-6 6',

  // 勾选
  check: 'M20 6L9 17l-5-5',

  // 加载
  loader: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83',
}

import { watch } from 'vue'