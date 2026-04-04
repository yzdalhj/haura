import type { CSSProperties, VNode, Component } from 'vue'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export type DrawerSize = 'small' | 'default' | 'large' | 'full'

export type DrawerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt'

export type DrawerHeaderRenderer = (close: () => void) => VNode | VNode[]

export type DrawerFooterRenderer = (close: () => void) => VNode | VNode[]

export interface DrawerProps {
  modelValue?: boolean
  appendTo?: string | HTMLElement
  placement?: DrawerPlacement
  direction?: DrawerDirection
  size?: DrawerSize
  width?: string | number
  height?: string | number
  title?: string
  closable?: boolean
  closePosition?: 'header' | 'inside' | 'outside'
  modal?: boolean
  modalClass?: string
  modalStyle?: CSSProperties
  modalFade?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showHeader?: boolean
  showFooter?: boolean
  headerClass?: string
  headerStyle?: CSSProperties
  bodyClass?: string
  bodyStyle?: CSSProperties
  footerClass?: string
  footerStyle?: CSSProperties
  lockScroll?: boolean
  gestureDrag?: boolean
  gestureThreshold?: number
  duration?: number
  glass?: boolean
  drawerClass?: string
  drawerStyle?: CSSProperties
  zIndex?: number
  destroyOnClose?: boolean
  offset?: number
  headerRenderer?: DrawerHeaderRenderer
  footerRenderer?: DrawerFooterRenderer
  easing?: string
  beforeClose?: (done: () => void) => void
  appendToBody?: boolean
  withHeader?: boolean
  openDelay?: number
  closeDelay?: number
  trapFocus?: boolean
  center?: boolean
  alignCenter?: boolean
  overflow?: boolean
}

export interface DrawerEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
  (e: 'mousedown', event: MouseEvent): void
  (e: 'mouseup', event: MouseEvent): void
  (e: 'touchstart', event: TouchEvent): void
  (e: 'touchend', event: TouchEvent): void
  (e: 'openAutoFocus'): void
  (e: 'closeAutoFocus'): void
}

export interface DrawerSlots {
  default?: () => VNode | VNode[]
  header?: () => VNode | VNode[]
  footer?: () => VNode | VNode[]
  title?: () => VNode | VNode[]
  close?: () => VNode | VNode[]
}

export const drawerSizePresets: Record<DrawerSize, { width: string; height: string }> = {
  small: { width: '300px', height: '200px' },
  default: { width: '400px', height: '300px' },
  large: { width: '600px', height: '400px' },
  full: { width: '100%', height: '100%' },
}

export const drawerPropsDefaults: Partial<DrawerProps> = {
  placement: 'right',
  direction: 'rtl',
  size: 'default',
  closable: true,
  closePosition: 'header',
  modal: true,
  modalFade: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showHeader: true,
  showFooter: false,
  lockScroll: true,
  gestureDrag: true,
  gestureThreshold: 0.3,
  duration: 300,
  glass: false,
  destroyOnClose: false,
  appendToBody: true,
  withHeader: true,
  openDelay: 0,
  closeDelay: 0,
  trapFocus: true,
  center: false,
  overflow: true,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
}