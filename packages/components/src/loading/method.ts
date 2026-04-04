/**
 * HLoading 服务方法和指令
 */

import { createApp, h, ref, reactive, type App, type Directive, type DirectiveBinding } from 'vue'
import LoadingComponent from './loading.vue'
import type { LoadingProps, LoadingInstance, LoadingServiceOptions } from './loading'
import { loadingPropsDefaults } from './loading'

// 存储加载实例
const instances = new Map<HTMLElement, LoadingInstance>()

/**
 * 创建加载实例
 */
function createLoading(options: LoadingServiceOptions): LoadingInstance {
  const container = document.createElement('div')
  const visible = ref(false)
  const progress = ref(options.progress ?? 0)
  const text = ref(options.text ?? '')

  const props = reactive<LoadingProps>({
    ...loadingPropsDefaults,
    ...options,
    modelValue: visible.value,
    progress: progress.value,
    text: text.value,
  })

  // 同步 props
  const app = createApp({
    render() {
      return h(LoadingComponent, {
        ...props,
        modelValue: visible.value,
        progress: progress.value,
        text: text.value,
        'onUpdate:modelValue': (val: boolean) => {
          visible.value = val
        },
      })
    },
  })

  const instance = app.mount(container) as LoadingInstance

  // 实例方法
  const loadingInstance: LoadingInstance = {
    visible: visible.value,
    close: () => {
      visible.value = false
      setTimeout(() => {
        app.unmount()
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      }, 300)
    },
    setProgress: (val: number) => {
      progress.value = val
    },
    setText: (val: string) => {
      text.value = val
    },
  }

  // 监听 visible 变化
  Object.defineProperty(loadingInstance, 'visible', {
    get: () => visible.value,
  })

  return loadingInstance
}

/**
 * 全屏加载服务
 */
function loadingService(options: LoadingServiceOptions = {}): LoadingInstance {
  const instance = createLoading({
    ...options,
    fullscreen: true,
  })

  // 挂载到 body
  document.body.appendChild(instance.$el || (instance as any).$el)

  // 显示加载
  setTimeout(() => {
    instance.visible = true
  }, 0)

  return instance
}

/**
 * 指令式加载
 */
export const vLoading: Directive<HTMLElement, boolean | LoadingServiceOptions> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean | LoadingServiceOptions>) {
    const options: LoadingServiceOptions = typeof binding.value === 'boolean'
      ? { loading: binding.value }
      : { ...binding.value }

    // 设置容器样式
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }

    // 创建实例
    const instance = createLoading({
      ...options,
      fullscreen: false,
    })

    // 挂载到元素
    el.appendChild((instance as any).$el || el.lastElementChild)
    instances.set(el, instance)

    // 初始显示状态
    if (options.loading !== false) {
      instance.visible = true
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding<boolean | LoadingServiceOptions>) {
    const instance = instances.get(el)
    if (!instance) return

    const options: LoadingServiceOptions = typeof binding.value === 'boolean'
      ? { loading: binding.value }
      : { ...binding.value }

    if (options.loading !== undefined) {
      instance.visible = options.loading
    }

    if (options.progress !== undefined) {
      instance.setProgress(options.progress)
    }

    if (options.text !== undefined) {
      instance.setText(options.text)
    }
  },

  unmounted(el: HTMLElement) {
    const instance = instances.get(el)
    if (instance) {
      instance.close()
      instances.delete(el)
    }
  },
}

/**
 * Loading 组件
 */
export const HLoading = Object.assign(LoadingComponent, {
  service: loadingService,
  directive: vLoading,
})

export { loadingService as service }

export type { LoadingInstance, LoadingServiceOptions }