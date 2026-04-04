import type { CSSProperties, VNode } from 'vue'

export type SpaceSize = 'small' | 'default' | 'large' | number

export type SpaceDirection = 'horizontal' | 'vertical'

export type SpaceAlignment = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export type SpaceWrap = boolean | 'reverse'

export type SpaceFill = boolean | 'always'

export interface SpaceProps {
  alignment?: SpaceAlignment
  class?: string | string[] | Record<string, boolean>
  direction?: SpaceDirection
  prefixCls?: string
  spacer?: string | VNode | number
  size?: SpaceSize | [number, number]
  wrap?: SpaceWrap
  fill?: SpaceFill
  fillRatio?: number
  style?: CSSProperties
  separator?: string | VNode
  itemStyle?: CSSProperties
}

export interface SpaceEmits {
  (e: 'click', event: MouseEvent): void
}

export interface SpaceItemProps {
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
}

export const spaceSizePresets: Record<string, number> = {
  small: 8,
  default: 12,
  large: 16,
}

export const spacePropsDefaults: Partial<SpaceProps> = {
  alignment: 'center',
  direction: 'horizontal',
  size: 'default',
  wrap: false,
  fill: false,
  fillRatio: 100,
}