/**
 * Animation Tokens - 动画设计令牌
 */

// 动画时长
export const duration = {
  fastest: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  slowest: '500ms',
}

// 缓动曲线
export const easing = {
  // 自然减速
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  // 平衡自然
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // 轻微弹跳
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  // 流畅柔和
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  // 干脆利落
  snappy: 'cubic-bezier(0.6, 0, 0.7, 0.35)',
}

// 组件动画配置
export const componentAnimation = {
  // 按钮
  button: {
    hover: { duration: duration.fast, easing: easing.easeOut },
    press: { duration: duration.fastest, easing: easing.snappy },
    ripple: { duration: '600ms', easing: easing.easeOut },
  },
  // 输入框
  input: {
    focus: { duration: duration.normal, easing: easing.easeInOut },
  },
  // 悬停指示器
  hoverIndicator: {
    move: { duration: '200ms', easing: easing.easeOut },
  },
  // 下拉展开
  dropdown: {
    open: { duration: duration.slow, easing: easing.easeOut },
    close: { duration: duration.fast, easing: easing.easeInOut },
  },
  // 模态框
  modal: {
    overlay: { duration: duration.slow, easing: easing.easeOut },
    content: { duration: duration.slower, easing: easing.bounce },
  },
  // 抽屉
  drawer: {
    slide: { duration: duration.slow, easing: easing.easeOut },
  },
  // 消息
  message: {
    enter: { duration: duration.slow, easing: easing.easeOut },
    exit: { duration: duration.fast, easing: easing.easeInOut },
  },
  // 骨架屏
  skeleton: {
    pulse: { duration: '1.5s', easing: easing.easeInOut },
  },
  // 数字滚动
  countUp: { duration: '800ms', easing: easing.easeOut },
  // 列表编排
  stagger: {
    delay: 50, // ms
    duration: duration.slow,
  },
}

// 过渡属性
export const transition = {
  default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'background-color, border-color, color, fill, stroke 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
}