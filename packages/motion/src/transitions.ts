/**
 * 过渡动画组件
 */

import { h, defineComponent, Transition, TransitionGroup } from 'vue'
import type { VNode } from 'vue'

// 缓动曲线
const easings = {
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
}

/**
 * Fade 淡入淡出过渡
 */
export const HFadeTransition = defineComponent({
  name: 'HFadeTransition',
  props: {
    duration: {
      type: Number,
      default: 200,
    },
    mode: {
      type: String as () => 'default' | 'out-in' | 'in-out',
      default: 'default',
    },
    appear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Transition,
        {
          name: 'haura-fade',
          mode: props.mode,
          appear: props.appear,
          enterActiveClass: 'haura-fade-enter-active',
          leaveActiveClass: 'haura-fade-leave-active',
          enterFromClass: 'haura-fade-enter-from',
          leaveToClass: 'haura-fade-leave-to',
        },
        slots.default
      )
  },
})

/**
 * Slide 滑动过渡
 */
export const HSlideTransition = defineComponent({
  name: 'HSlideTransition',
  props: {
    direction: {
      type: String as () => 'up' | 'down' | 'left' | 'right',
      default: 'up',
    },
    duration: {
      type: Number,
      default: 300,
    },
    distance: {
      type: String,
      default: '20px',
    },
    mode: {
      type: String as () => 'default' | 'out-in' | 'in-out',
      default: 'default',
    },
    appear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const getTransform = (isEnter: boolean) => {
      const value = isEnter ? props.distance : `-${props.distance}`
      switch (props.direction) {
        case 'up':
          return `translateY(${value})`
        case 'down':
          return `translateY(-${value})`
        case 'left':
          return `translateX(${value})`
        case 'right':
          return `translateX(-${value})`
        default:
          return ''
      }
    }

    return () =>
      h(
        Transition,
        {
          name: `haura-slide-${props.direction}`,
          mode: props.mode,
          appear: props.appear,
          onEnter: (el: HTMLElement) => {
            el.style.transform = getTransform(false)
            el.style.opacity = '0'
            el.style.transition = `all ${props.duration}ms ${easings.easeOut}`
          },
          onAfterEnter: (el: HTMLElement) => {
            el.style.transform = ''
            el.style.opacity = ''
            el.style.transition = ''
          },
          onLeave: (el: HTMLElement) => {
            el.style.transform = ''
            el.style.opacity = '1'
            el.style.transition = `all ${props.duration}ms ${easings.easeOut}`
          },
          onAfterLeave: (el: HTMLElement) => {
            el.style.transform = ''
            el.style.opacity = ''
            el.style.transition = ''
          },
        },
        slots.default
      )
  },
})

/**
 * Scale 缩放过渡
 */
export const HScaleTransition = defineComponent({
  name: 'HScaleTransition',
  props: {
    duration: {
      type: Number,
      default: 200,
    },
    scale: {
      type: Number,
      default: 0.9,
    },
    origin: {
      type: String,
      default: 'center',
    },
    mode: {
      type: String as () => 'default' | 'out-in' | 'in-out',
      default: 'default',
    },
    appear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Transition,
        {
          name: 'haura-scale',
          mode: props.mode,
          appear: props.appear,
          onEnter: (el: HTMLElement) => {
            el.style.transform = `scale(${props.scale})`
            el.style.opacity = '0'
            el.style.transformOrigin = props.origin
            el.style.transition = `all ${props.duration}ms ${easings.easeOut}`
          },
          onAfterEnter: (el: HTMLElement) => {
            el.style.transform = ''
            el.style.opacity = ''
            el.style.transformOrigin = ''
            el.style.transition = ''
          },
          onLeave: (el: HTMLElement) => {
            el.style.transform = 'scale(1)'
            el.style.opacity = '1'
            el.style.transformOrigin = props.origin
            el.style.transition = `all ${props.duration}ms ${easings.easeOut}`
          },
          onAfterLeave: (el: HTMLElement) => {
            el.style.transform = ''
            el.style.opacity = ''
            el.style.transformOrigin = ''
            el.style.transition = ''
          },
        },
        slots.default
      )
  },
})

/**
 * Collapse 展开/收起过渡
 */
export const HCollapseTransition = defineComponent({
  name: 'HCollapseTransition',
  props: {
    duration: {
      type: Number,
      default: 300,
    },
    axis: {
      type: String as () => 'x' | 'y',
      default: 'y',
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        Transition,
        {
          name: `haura-collapse-${props.axis}`,
          onEnter: (el: HTMLElement) => {
            el.style.overflow = 'hidden'
            if (props.axis === 'y') {
              el.style.height = '0'
            } else {
              el.style.width = '0'
            }
            el.style.transition = `all ${props.duration}ms ${easings.easeInOut}`

            // 强制重绘
            el.offsetHeight

            if (props.axis === 'y') {
              el.style.height = `${el.scrollHeight}px`
            } else {
              el.style.width = `${el.scrollWidth}px`
            }
          },
          onAfterEnter: (el: HTMLElement) => {
            if (props.axis === 'y') {
              el.style.height = ''
            } else {
              el.style.width = ''
            }
            el.style.overflow = ''
            el.style.transition = ''
          },
          onLeave: (el: HTMLElement) => {
            el.style.overflow = 'hidden'
            if (props.axis === 'y') {
              el.style.height = `${el.scrollHeight}px`
            } else {
              el.style.width = `${el.scrollWidth}px`
            }
            el.style.transition = `all ${props.duration}ms ${easings.easeInOut}`

            // 强制重绘
            el.offsetHeight

            if (props.axis === 'y') {
              el.style.height = '0'
            } else {
              el.style.width = '0'
            }
          },
          onAfterLeave: (el: HTMLElement) => {
            if (props.axis === 'y') {
              el.style.height = ''
            } else {
              el.style.width = ''
            }
            el.style.overflow = ''
            el.style.transition = ''
          },
        },
        slots.default
      )
  },
})

/**
 * Stagger 列表编排过渡
 */
export const HStaggerTransition = defineComponent({
  name: 'HStaggerTransition',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    duration: {
      type: Number,
      default: 300,
    },
    stagger: {
      type: Number,
      default: 50,
    },
    appear: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    return () =>
      h(
        TransitionGroup,
        {
          tag: props.tag,
          name: 'haura-stagger',
          appear: props.appear,
          css: false,
          onEnter: (el: HTMLElement, done: () => void) => {
            const index = Array.from(el.parentElement?.children || []).indexOf(el)
            el.style.opacity = '0'
            el.style.transform = 'translateY(20px)'
            el.style.transition = `all ${props.duration}ms ${easings.easeOut}`

            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
              setTimeout(done, props.duration)
            }, index * props.stagger)
          },
          onLeave: (el: HTMLElement, done: () => void) => {
            el.style.transition = `all ${props.duration}ms ${easings.easeOut}`
            el.style.opacity = '0'
            el.style.transform = 'translateY(-20px)'
            setTimeout(done, props.duration)
          },
        },
        slots.default
      )
  },
})