import type { CSSProperties, VNode } from 'vue'

export type LoadingType = 'spinner' | 'dots' | 'circle' | 'pulse' | 'bars' | 'ring' | 'progress'

export type LoadingSize = 'small' | 'default' | 'large'

export type LoadingPosition = 'center' | 'top' | 'bottom'

export interface LoadingProps {
  modelValue?: boolean
  type?: LoadingType
  size?: LoadingSize
  text?: string
  textPosition?: 'top' | 'bottom' | 'right'
  icon?: string | VNode
  color?: string
  background?: string
  backgroundOpacity?: number
  fullscreen?: boolean
  lock?: boolean
  customClass?: string
  customStyle?: CSSProperties
  spinnerSize?: number | string
  progress?: number
  showProgress?: boolean
  duration?: number
  minimumDisplayTime?: number
  zIndex?: number
  spinner?: boolean
  spinnerType?: LoadingType
  svgViewBox?: string
  svg?: string
  target?: string | HTMLElement
  body?: boolean
  visible?: boolean
}

export interface LoadingEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:progress', value: number): void
}

export interface LoadingDirectiveOptions extends Partial<LoadingProps> {
  target?: string | HTMLElement
  loading?: boolean
}

export interface LoadingInstance {
  close: () => void
  setProgress: (progress: number) => void
  setText: (text: string) => void
  visible: boolean
  $el?: HTMLElement
}

export interface LoadingServiceOptions extends LoadingProps {
  target?: string | HTMLElement
  body?: boolean
  fullscreen?: boolean
  lock?: boolean
  text?: string
  spinner?: boolean
  background?: string
  customClass?: string
}

export const loadingPropsDefaults: Partial<LoadingProps> = {
  type: 'spinner',
  size: 'default',
  textPosition: 'bottom',
  backgroundOpacity: 0.9,
  fullscreen: false,
  lock: true,
  showProgress: true,
  duration: 300,
  minimumDisplayTime: 0,
  progress: 0,
  spinner: true,
  body: true,
  visible: true,
}

export const loadingSizePresets: Record<LoadingSize, number> = {
  small: 20,
  default: 32,
  large: 48,
}