import { createVNode, render, VNode } from 'vue'
import MessageConstructor from './message.vue'
import type { MessageOptions, MessageInstance, MessageType } from './message'

// 消息实例列表
let instances: MessageInstance[] = []
let seed = 1

// 消息偏移量
const GAP = 16

/**
 * 创建消息
 */
const createMessage = (options: MessageOptions): MessageInstance => {
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  // 计算偏移量
  const offset = options.offset || 20
  let verticalOffset = offset
  instances.forEach((item) => {
    verticalOffset += (item.vm.el?.offsetHeight || 0) + GAP
  })

  // 创建 vnode
  const props = {
    ...options,
    offset: verticalOffset,
    id,
    onClose: () => {
      closeMessage(id)
      if (userOnClose) {
        userOnClose()
      }
    },
    onDestroy: () => {
      // 从 DOM 中移除
      render(null, container)
    },
  }

  const container = document.createElement('div')
  const vnode = createVNode(MessageConstructor, props)
  vnode.props = props

  render(vnode, container)

  // 添加到 DOM
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const instance: MessageInstance = {
    id,
    vnode,
    vm,
    close: () => {
      vm.exposed!.visible.value = false
    },
  }

  instances.push(instance)
  return instance
}

/**
 * 关闭消息
 */
const closeMessage = (id: string) => {
  const index = instances.findIndex((item) => item.id === id)
  if (index === -1) return

  const instance = instances[index]
  const removedHeight = instance.vm.el?.offsetHeight || 0

  instances.splice(index, 1)

  // 调整剩余消息位置
  if (instances.length === 0) {
    seed = 1
    return
  }

  for (let i = index; i < instances.length; i++) {
    const item = instances[i]
    const el = item.vm.el as HTMLElement
    if (el) {
      const top = parseInt(el.style.top, 10) - removedHeight - GAP
      el.style.top = `${top}px`
    }
  }
}

/**
 * 关闭所有消息
 */
const closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

/**
 * 消息方法
 */
const message = (options: MessageOptions | string): MessageInstance => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createMessage(options)
}

/**
 * 类型方法
 */
message.success = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createMessage({ ...options, type: 'success' })
}

message.warning = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createMessage({ ...options, type: 'warning' })
}

message.error = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createMessage({ ...options, type: 'error' })
}

message.info = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  return createMessage({ ...options, type: 'info' })
}

message.closeAll = closeAll

export default message
export { message as HMessage }