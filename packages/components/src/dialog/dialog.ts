import type { CSSProperties, VNode, Component, Raw, Ref } from 'vue'

export type DialogType = 'alert' | 'confirm' | 'prompt'

export type DialogSize = 'small' | 'default' | 'large' | 'full'

export type DialogAnimation = 'scale' | 'slide' | 'fade' | 'none'

export type DialogPosition = 'center' | 'top' | 'bottom'

export interface DialogButton {
  text?: string
  action: 'confirm' | 'cancel' | 'close' | string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  plain?: boolean
  round?: boolean
  disabled?: boolean
  loading?: boolean
  show?: boolean
  onClick?: (instance: DialogInstance) => void | Promise<void>
}

export interface DialogProps {
  modelValue?: boolean
  title?: string
  width?: string | number
  height?: string | number
  top?: string | number
  left?: string | number
  fullscreen?: boolean
  modal?: boolean
  modalClass?: string
  modalStyle?: CSSProperties
  lockScroll?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  draggable?: boolean
  overflow?: boolean
  bounds?: HTMLElement | string | { left: number; top: number; right: number; bottom: number }
  center?: boolean
  alignCenter?: boolean
  destroyOnClose?: boolean
  appendToBody?: boolean
  appendTo?: string | HTMLElement
  beforeClose?: (done: () => void) => void
  zIndex?: number
  trapFocus?: boolean
  size?: DialogSize
  animation?: DialogAnimation
  glass?: boolean
  resizable?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  maximizable?: boolean
  minimizable?: boolean
  stickable?: boolean
  headerClass?: string
  headerStyle?: CSSProperties
  bodyClass?: string
  bodyStyle?: CSSProperties
  footerClass?: string
  footerStyle?: CSSProperties
  customClass?: string
  customStyle?: CSSProperties
  showHeader?: boolean
  showFooter?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  confirmType?: DialogButton['type']
  cancelType?: DialogButton['type']
  confirmLoading?: boolean
  cancelLoading?: boolean
  buttons?: DialogButton[]
  duration?: number
  autoClose?: number
  content?: string | VNode | Component
  dangerouslyUseHTMLString?: boolean
  inputType?: string
  inputPlaceholder?: string
  inputValue?: string | number
  inputValidator?: (value: string | number) => boolean | string
  inputErrorMessage?: string
  inputPattern?: RegExp
  inputValueRequired?: boolean
  inputClass?: string
  inputStyle?: CSSProperties
  round?: boolean
  shadow?: boolean | 'always' | 'hover' | 'never'
  overlay?: boolean
}

export interface DialogEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
  (e: 'dragStart', event: { x: number; y: number }): void
  (e: 'dragEnd', event: { x: number; y: number }): void
  (e: 'resizeStart', event: { width: number; height: number }): void
  (e: 'resizeEnd', event: { width: number; height: number }): void
  (e: 'maximize'): void
  (e: 'minimize'): void
  (e: 'restore'): void
  (e: 'stick'): void
  (e: 'unstick'): void
}

export interface DialogInstance {
  id: string
  visible: Ref<boolean>
  close: () => void
  open: () => void
  confirm: () => void
  cancel: () => void
  setConfirmLoading: (loading: boolean) => void
  setCancelLoading: (loading: boolean) => void
  setTitle: (title: string) => void
  setContent: (content: string | VNode) => void
  maximize: () => void
  minimize: () => void
  restore: () => void
  stick: () => void
  unstick: () => void
  isMaximized: Ref<boolean>
  isMinimized: Ref<boolean>
  isSticked: Ref<boolean>
}

export interface DialogOptions extends Partial<DialogProps> {
  component?: Component | Raw<Component>
  componentProps?: Record<string, any>
  componentEmits?: Record<string, (...args: any[]) => void>
  onConfirm?: (instance: DialogInstance, done: () => void) => void | Promise<void>
  onCancel?: (instance: DialogInstance, done: () => void) => void | Promise<void>
  onClose?: (instance: DialogInstance) => void | Promise<void>
  onOpen?: (instance: DialogInstance) => void | Promise<void>
  onConfirmLoading?: boolean
  onCancelLoading?: boolean
}

export interface AlertOptions extends Partial<DialogProps> {
  message?: string | VNode
}

export interface ConfirmOptions extends Partial<DialogProps> {
  message?: string | VNode
}

export interface PromptOptions extends Partial<DialogProps> {
  message?: string | VNode
  inputType?: string
  inputPlaceholder?: string
  inputValue?: string | number
  inputValidator?: (value: string | number) => boolean | string
  inputErrorMessage?: string
  inputPattern?: RegExp
  inputValueRequired?: boolean
}

export interface UseDialogReturn {
  dialog: DialogInstance
  confirm: () => Promise<boolean>
  cancel: () => Promise<boolean>
  close: () => void
  open: () => void
  then: (onFulfilled: (value: boolean) => void) => UseDialogReturn
  catch: (onRejected: (reason: any) => void) => UseDialogReturn
  finally: (onFinally: () => void) => UseDialogReturn
}

export const dialogPropsDefaults: Partial<DialogProps> = {
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  draggable: false,
  overflow: true,
  center: false,
  alignCenter: true,
  destroyOnClose: false,
  appendToBody: true,
  trapFocus: true,
  size: 'default',
  animation: 'scale',
  glass: false,
  resizable: false,
  maximizable: false,
  minimizable: false,
  stickable: false,
  showHeader: true,
  showFooter: true,
  showConfirm: true,
  showCancel: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmType: 'primary',
  cancelType: 'default',
  confirmLoading: false,
  cancelLoading: false,
  duration: 300,
  round: false,
  shadow: true,
  overlay: true,
}

export const dialogSizePresets: Record<DialogSize, { width: string }> = {
  small: { width: '400px' },
  default: { width: '500px' },
  large: { width: '700px' },
  full: { width: '100%' },
}