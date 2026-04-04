import type { PropType, ExtractPropTypes } from 'vue'

export type SelectSize = 'large' | 'default' | 'small'

export interface SelectOption {
  label: string
  value: string | number | boolean | object
  disabled?: boolean
}

export const selectProps = {
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<any>,
    default: undefined,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<SelectSize>,
    default: 'default',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  collapseTags: {
    type: Boolean,
    default: false,
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  multipleLimit: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  allowCreate: {
    type: Boolean,
    default: false,
  },
  filterMethod: {
    type: Function as PropType<(query: string) => void>,
    default: undefined,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  remoteMethod: {
    type: Function as PropType<(query: string) => void>,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: '加载中',
  },
  noMatchText: {
    type: String,
    default: '无匹配数据',
  },
  noDataText: {
    type: String,
    default: '无数据',
  },
  popperClass: {
    type: String,
    default: '',
  },
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  defaultFirstOption: {
    type: Boolean,
    default: false,
  },
  teleported: {
    type: Boolean,
    default: true,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  automaticDropdown: {
    type: Boolean,
    default: false,
  },
  fitInputWidth: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: String,
    default: '',
  },
  suffixTransition: {
    type: Boolean,
    default: true,
  },
  tagType: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger'>,
    default: 'info',
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  // Haura 扩展
  hoverIndicator: {
    type: Boolean,
    default: true,
  },
  glassDropdown: {
    type: Boolean,
    default: false,
  },
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  'update:modelValue': (value: any) => true,
  change: (value: any) => true,
  visibleChange: (visible: boolean) => true,
  removeTag: (tagValue: any) => true,
  clear: () => true,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
}