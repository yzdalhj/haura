import type { CSSProperties, VNode, Component, Ref, ComputedRef } from 'vue'

export type FieldType =
  | 'input'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date'
  | 'daterange'
  | 'time'
  | 'slider'
  | 'rate'
  | 'color'
  | 'upload'
  | 'cascader'
  | 'custom'
  | 'group'
  | 'array'

export type FormLayout = 'horizontal' | 'vertical' | 'inline'

export type LabelPosition = 'left' | 'right' | 'top'

export type ValidateTrigger = 'blur' | 'change' | 'submit'

export type FormMode = 'edit' | 'view'

export interface FormRule {
  type?: 'required' | 'email' | 'phone' | 'url' | 'number' | 'integer' | 'date' | 'idcard'
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any, values: Record<string, any>) => boolean | string | Promise<boolean | string>
  trigger?: ValidateTrigger
  transform?: (value: any) => any
  async?: boolean
}

export interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  children?: SelectOption[]
}

export interface FieldBase {
  field: string
  label?: string
  type?: FieldType
  span?: number
  offset?: number
  visible?: boolean | ((values: Record<string, any>) => boolean)
  disabled?: boolean | ((values: Record<string, any>) => boolean)
  required?: boolean
  rules?: FormRule[]
  tooltip?: string
  placeholder?: string
  class?: string | string[]
  style?: CSSProperties
  labelClass?: string
  labelStyle?: CSSProperties
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  format?: (value: any, values: Record<string, any>) => any
  parse?: (value: any) => any
  transform?: (value: any) => any
  dependencies?: string[]
  onChange?: (value: any, form: FormInstance) => void
  onBlur?: (value: any, form: FormInstance) => void
  onFocus?: (value: any, form: FormInstance) => void
}

export interface InputField extends FieldBase {
  type: 'input'
  inputType?: 'text' | 'password' | 'email' | 'tel' | 'url'
  maxlength?: number
  showWordLimit?: boolean
  clearable?: boolean
  showPassword?: boolean
  prefixIcon?: string | VNode
  suffixIcon?: string | VNode
}

export interface NumberField extends FieldBase {
  type: 'number'
  min?: number
  max?: number
  step?: number
  precision?: number
  controls?: boolean
  controlsPosition?: '' | 'right'
}

export interface TextareaField extends FieldBase {
  type: 'textarea'
  rows?: number
  autosize?: boolean | { minRows?: number; maxRows?: number }
  maxlength?: number
  showWordLimit?: boolean
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

export interface SelectField extends FieldBase {
  type: 'select'
  options?: SelectOption[] | ((values: Record<string, any>) => SelectOption[])
  multiple?: boolean
  filterable?: boolean
  remote?: boolean
  remoteMethod?: (query: string) => Promise<SelectOption[]>
  clearable?: boolean
  loading?: boolean
}

export interface RadioField extends FieldBase {
  type: 'radio'
  options?: SelectOption[] | ((values: Record<string, any>) => SelectOption[])
  button?: boolean
}

export interface CheckboxField extends FieldBase {
  type: 'checkbox'
  options?: SelectOption[] | ((values: Record<string, any>) => SelectOption[])
  min?: number
  max?: number
  indeterminate?: boolean
}

export interface SwitchField extends FieldBase {
  type: 'switch'
  activeText?: string
  inactiveText?: string
  activeValue?: any
  inactiveValue?: any
}

export interface DateField extends FieldBase {
  type: 'date'
  dateType?: 'year' | 'month' | 'date' | 'dates' | 'week' | 'datetime' | 'datetimerange' | 'daterange' | 'monthrange'
  format?: string
  valueFormat?: string
  disabledDate?: (date: Date) => boolean
  shortcuts?: { text: string; value: Date | (() => Date) }[]
}

export interface SliderField extends FieldBase {
  type: 'slider'
  min?: number
  max?: number
  step?: number
  range?: boolean
  showInput?: boolean
  showStops?: boolean
  marks?: Record<number, string | { style: CSSProperties; label: string }>
}

export interface RateField extends FieldBase {
  type: 'rate'
  max?: number
  allowHalf?: boolean
  showText?: boolean
  showScore?: boolean
  texts?: string[]
  colors?: string[]
}

export interface ColorField extends FieldBase {
  type: 'color'
  showAlpha?: boolean
  colorFormat?: 'hex' | 'rgb' | 'hsl'
  predefine?: string[]
}

export interface UploadField extends FieldBase {
  type: 'upload'
  action?: string
  multiple?: boolean
  accept?: string
  limit?: number
  listType?: 'text' | 'picture' | 'picture-card'
  autoUpload?: boolean
  drag?: boolean
}

export interface CascaderField extends FieldBase {
  type: 'cascader'
  options?: SelectOption[]
  props?: {
    expandTrigger?: 'click' | 'hover'
    multiple?: boolean
    checkStrictly?: boolean
    emitPath?: boolean
    lazy?: boolean
    lazyLoad?: (node: any, resolve: (data: any[]) => void) => void
  }
  filterable?: boolean
  clearable?: boolean
}

export interface CustomField extends FieldBase {
  type: 'custom'
  component: Component
  componentProps?: Record<string, any>
  componentEmits?: Record<string, (...args: any[]) => void>
  slot?: string
}

export interface GroupField extends FieldBase {
  type: 'group'
  title?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  fields: FormConfig[]
}

export interface ArrayField extends FieldBase {
  type: 'array'
  maxItems?: number
  minItems?: number
  itemTemplate: FormConfig[]
  addItemText?: string
  removeItemText?: string
  showIndex?: boolean
}

export type FormConfig =
  | InputField
  | NumberField
  | TextareaField
  | SelectField
  | RadioField
  | CheckboxField
  | SwitchField
  | DateField
  | SliderField
  | RateField
  | ColorField
  | UploadField
  | CascaderField
  | CustomField
  | GroupField
  | ArrayField

export interface FormProps {
  config: FormConfig[]
  modelValue?: Record<string, any>
  mode?: FormMode
  layout?: FormLayout
  labelWidth?: string | number
  labelPosition?: LabelPosition
  labelAlign?: 'start' | 'center' | 'end'
  columns?: number
  gap?: number | string
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  showFooter?: boolean
  submitText?: string
  resetText?: string
  cancelText?: string
  validateTrigger?: ValidateTrigger
  scrollToError?: boolean
  scrollToErrorOffset?: number
  showErrorMessage?: boolean
  inlineMessage?: boolean
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  size?: 'small' | 'default' | 'large'
  transform?: (values: Record<string, any>) => Record<string, any>
  class?: string | string[]
  style?: CSSProperties
}

export interface FormEmits {
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'submit', values: Record<string, any>): void
  (e: 'reset'): void
  (e: 'cancel'): void
  (e: 'validate', valid: boolean, errors: Record<string, string>): void
  (e: 'fieldChange', field: string, value: any): void
  (e: 'fieldBlur', field: string): void
}

export interface FormInstance {
  id: string
  values: Ref<Record<string, any>>
  errors: Ref<Record<string, string>>
  touched: Ref<Record<string, boolean>>
  dirty: Ref<boolean>
  valid: ComputedRef<boolean>
  submitting: Ref<boolean>

  validate: (fields?: string | string[]) => Promise<boolean>
  validateField: (field: string) => Promise<boolean>
  reset: () => void
  resetField: (field: string) => void
  resetValidation: (field?: string) => void
  submit: () => Promise<void>
  scrollToField: (field: string) => void

  setValues: (values: Record<string, any>) => void
  setFieldValue: (path: string, value: any) => void
  getFieldValue: (path: string) => any
  getValues: () => Record<string, any>
  setFieldOptions: (field: string, options: SelectOption[]) => void

  setErrors: (errors: Record<string, string>) => void
  setFieldError: (field: string, error: string) => void
  clearErrors: () => void
  clearFieldError: (field: string) => void

  setTouched: (field: string, value?: boolean) => void
  isTouched: (field: string) => boolean

  addArrayItem: (field: string, index?: number, value?: any) => void
  removeArrayItem: (field: string, index: number) => void
  moveArrayItem: (field: string, from: number, to: number) => void

  getFormData: () => FormData

  getConfig: (field: string) => FormConfig | undefined
  setConfig: (field: string, config: Partial<FormConfig>) => void
}

export interface FormItemProps {
  field: string
  label?: string
  required?: boolean
  rules?: FormRule[]
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: 'small' | 'default' | 'large'
  labelWidth?: string | number
  labelPosition?: LabelPosition
  span?: number
  offset?: number
  class?: string | string[]
  style?: CSSProperties
}

export const formPropsDefaults: Partial<FormProps> = {
  mode: 'edit',
  layout: 'horizontal',
  labelPosition: 'right',
  labelAlign: 'start',
  columns: 1,
  gap: 0,
  disabled: false,
  readonly: false,
  loading: false,
  showFooter: false,
  submitText: '提交',
  resetText: '重置',
  cancelText: '取消',
  validateTrigger: 'blur',
  scrollToError: true,
  scrollToErrorOffset: 0,
  showErrorMessage: true,
  inlineMessage: false,
  hideRequiredAsterisk: false,
  showMessage: true,
  size: 'default',
}

export const formItemPropsDefaults: Partial<FormItemProps> = {
  showMessage: true,
  inlineMessage: false,
  size: 'default',
  labelPosition: 'right',
}