/**
 * 骨架屏脉冲动画
 */

import { h, defineComponent } from 'vue'

export interface SkeletonProps {
  /**
   * 骨架屏类型
   */
  type?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /**
   * 宽度
   */
  width?: string | number
  /**
   * 高度
   */
  height?: string | number
  /**
   * 是否显示动画
   */
  animated?: boolean
  /**
   * 自定义样式
   */
  style?: Record<string, any>
}

/**
 * 骨架屏组件
 */
export const HSkeleton = defineComponent({
  name: 'HSkeleton',
  props: {
    type: {
      type: String as () => SkeletonProps['type'],
      default: 'text',
    },
    width: {
      type: [String, Number] as () => SkeletonProps['width'],
      default: undefined,
    },
    height: {
      type: [String, Number] as () => SkeletonProps['height'],
      default: undefined,
    },
    animated: {
      type: Boolean,
      default: true,
    },
    style: {
      type: Object as () => SkeletonProps['style'],
      default: () => ({}),
    },
  },
  setup(props) {
    const getStyles = () => {
      const styles: Record<string, string> = {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        ...props.style,
      }

      // 处理宽度
      if (props.width !== undefined) {
        styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }

      // 处理高度
      if (props.height !== undefined) {
        styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
      }

      // 根据类型设置默认尺寸和圆角
      switch (props.type) {
        case 'text':
          styles.height = styles.height || '1em'
          styles.borderRadius = '4px'
          break
        case 'circular':
          styles.borderRadius = '50%'
          styles.width = styles.width || '40px'
          styles.height = styles.height || '40px'
          break
        case 'rectangular':
          styles.borderRadius = '0'
          break
        case 'rounded':
          styles.borderRadius = '8px'
          break
      }

      return styles
    }

    return () =>
      h('span', {
        class: [
          'haura-skeleton',
          {
            'haura-skeleton--animated': props.animated,
          },
        ],
        style: getStyles(),
      })
  },
})

/**
 * 骨架屏组合 - 用于模拟复杂布局
 */
export const HSkeletonGroup = defineComponent({
  name: 'HSkeletonGroup',
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: 'haura-skeleton-group',
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          },
        },
        slots.default
          ? slots.default()
          : Array.from({ length: props.rows }, (_, i) =>
              h(HSkeleton, {
                key: i,
                type: 'text',
                width: i === props.rows - 1 ? '60%' : '100%',
                animated: props.animated,
              })
            )
      )
  },
})

/**
 * 添加骨架屏动画样式
 */
export function injectSkeletonStyles() {
  if (typeof document === 'undefined') return

  if (!document.getElementById('haura-skeleton-style')) {
    const style = document.createElement('style')
    style.id = 'haura-skeleton-style'
    style.textContent = `
      @keyframes haura-skeleton-pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }
      
      @keyframes haura-skeleton-wave {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      
      .haura-skeleton {
        display: inline-block;
        position: relative;
        overflow: hidden;
      }
      
      .haura-skeleton--animated {
        animation: haura-skeleton-pulse 1.5s ease-in-out infinite;
      }
      
      .haura-skeleton--animated::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: haura-skeleton-wave 1.5s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
  }
}