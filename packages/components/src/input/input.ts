import type { PropType, ExtractPropTypes } from 'vue'

export type InputSize = 'large' | 'default' | 'small'
export type InputType = 'text' | 'password' | 'textarea' | 'email' | 'number' | 'tel' | 'url'

export const inputProps = {
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'default',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
  minlength: {
    type: Number,
    default: undefined,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  suffixIcon: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 2,
  },
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
    default: false,
  },
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
    default: undefined,
  },
  // Haura 扩展
  glowOnFocus: {
    type: Boolean,
    default: true,
  },
  shakeOnError: {
    type: Boolean,
    default: true,
  },
  transitionDuration: {
    type: Number,
    default: 200,
  },
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string) => true,
  input: (value: string) => true,
  change: (value: string) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  keyup: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
}