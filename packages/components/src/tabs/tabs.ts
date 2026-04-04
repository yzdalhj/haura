import type { CSSProperties, VNode, Component } from 'vue'

export type TabType = 'line' | 'card' | 'border-card' | 'segment'

export type TabPosition = 'top' | 'bottom' | 'left' | 'right'

export type TabSize = 'small' | 'default' | 'large'

export interface TabsProps {
  modelValue?: string | number
  type?: TabType
  closable?: boolean
  addable?: boolean
  editable?: boolean
  tabPosition?: TabPosition
  stretch?: boolean
  beforeLeave?: (activeName: string | number, oldName: string | number) => boolean | Promise<boolean>
  size?: TabSize
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
  animated?: boolean
  destroyOnHide?: boolean
  lazy?: boolean
  hideNav?: boolean
  showBar?: boolean
  barWidth?: string | number
  barHeight?: string | number
}

export interface TabsEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'tabClick', pane: TabPaneInstance, event: MouseEvent): void
  (e: 'tabChange', name: string | number): void
  (e: 'tabRemove', name: string | number): void
  (e: 'tabAdd'): void
  (e: 'edit', action: 'remove' | 'add', name?: string | number): void
}

export interface TabPaneProps {
  name?: string | number
  label?: string | (() => VNode | VNode[])
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
  destroyOnHide?: boolean
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
}

export interface TabPaneEmits {
  (e: 'click', event: MouseEvent): void
}

export interface TabPaneInstance {
  name: string | number
  label: string | (() => VNode | VNode[])
  disabled: boolean
  closable: boolean
  active: boolean
  index: number
  paneName: string | number
}

export const tabsPropsDefaults: Partial<TabsProps> = {
  type: 'line',
  closable: false,
  addable: false,
  editable: false,
  tabPosition: 'top',
  stretch: false,
  size: 'default',
  animated: true,
  destroyOnHide: false,
  lazy: false,
  hideNav: false,
  showBar: true,
}

export const tabPanePropsDefaults: Partial<TabPaneProps> = {
  disabled: false,
  closable: false,
  lazy: false,
  destroyOnHide: false,
}