import type { CSSProperties, VNode } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface ResponsiveConfig {
  span?: number
  offset?: number
  push?: number
  pull?: number
  order?: number
}

export type ResponsiveProps = Partial<Record<Breakpoint, ResponsiveConfig>>

export type Align = 'top' | 'middle' | 'bottom' | 'stretch'

export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'

export interface RowProps {
  gutter?: number | [number, number] | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  justify?: Justify
  align?: Align
  wrap?: boolean
  tag?: string
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
  flex?: boolean | string
}

export interface RowEmits {
  (e: 'click', event: MouseEvent): void
}

export interface ColProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
  order?: number
  responsive?: ResponsiveProps
  xs?: number | ResponsiveConfig
  sm?: number | ResponsiveConfig
  md?: number | ResponsiveConfig
  lg?: number | ResponsiveConfig
  xl?: number | ResponsiveConfig
  xxl?: number | ResponsiveConfig
  tag?: string
  class?: string | string[] | Record<string, boolean>
  style?: CSSProperties
  flex?: number | string
}

export interface ColEmits {
  (e: 'click', event: MouseEvent): void
}

export const rowPropsDefaults: Partial<RowProps> = {
  justify: 'start',
  align: 'top',
  wrap: true,
  tag: 'div',
  flex: false,
}

export const colPropsDefaults: Partial<ColProps> = {
  span: 24,
  tag: 'div',
}

export const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}