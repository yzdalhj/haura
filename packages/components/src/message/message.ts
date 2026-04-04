import type { VNode } from 'vue'

export type MessageType = 'info' | 'success' | 'warning' | 'error'

export interface MessageOptions {
  message?: string | VNode
  type?: MessageType
  icon?: string
  showClose?: boolean
  duration?: number
  center?: boolean
  onClose?: () => void
  offset?: number
  appendTo?: string | HTMLElement
  grouping?: boolean
  repeatNum?: number
}

export interface MessageInstance {
  id: string
  vnode: VNode
  vm: any
  close: () => void
}