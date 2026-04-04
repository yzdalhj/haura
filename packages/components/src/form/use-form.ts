import { ref, reactive, computed, type Ref, type ComputedRef, provide, inject, watch } from 'vue'
import { get, set, deepClone } from './utils/path'
import { validateRules, getInitialValues } from './utils/validate'
import type { FormConfig, FormInstance, FormProps, FormRule, SelectOption } from './form'

export function useForm(props: FormProps): FormInstance {
  const id = `form_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  const values = ref<Record<string, any>>(props.modelValue ? deepClone(props.modelValue) : getInitialValues(props.config))
  const errors = ref<Record<string, string>>({})
  const touched = ref<Record<string, boolean>>({})
  const submitting = ref(false)

  const dirty = computed(() => {
    const initial = props.modelValue || getInitialValues(props.config)
    return JSON.stringify(values.value) !== JSON.stringify(initial)
  })

  const valid = computed(() => Object.keys(errors.value).length === 0)

  const fieldOptions = reactive<Record<string, SelectOption[]>>({})

  watch(() => props.modelValue, (newVal) => {
    if (newVal) {
      values.value = deepClone(newVal)
    }
  }, { deep: true })

  watch(values, (newVal) => {
    emit('update:modelValue', newVal)
  }, { deep: true })

  const emit: any = () => {}

  async function validate(fields?: string | string[]): Promise<boolean> {
    const fieldList = fields
      ? Array.isArray(fields)
        ? fields
        : [fields]
      : getAllFields(props.config)

    let isValid = true
    const newErrors: Record<string, string> = {}

    for (const field of fieldList) {
      const config = getFieldConfig(props.config, field)
      if (!config) continue

      const value = getFieldValue(field)
      const rules = config.rules || []

      if (config.required && !rules.find(r => r.required || r.type === 'required')) {
        rules.unshift({ required: true, message: `${config.label || field}为必填项` })
      }

      const error = await validateRules(value, rules, values.value)
      if (error) {
        isValid = false
        newErrors[field] = error
      }
    }

    errors.value = newErrors
    return isValid
  }

  async function validateField(field: string): Promise<boolean> {
    const config = getFieldConfig(props.config, field)
    if (!config) return true

    const value = getFieldValue(field)
    const rules = config.rules || []

    if (config.required && !rules.find(r => r.required || r.type === 'required')) {
      rules.unshift({ required: true, message: `${config.label || field}为必填项` })
    }

    const error = await validateRules(value, rules, values.value)
    if (error) {
      errors.value[field] = error
      return false
    } else {
      delete errors.value[field]
      return true
    }
  }

  function reset(): void {
    values.value = props.modelValue
      ? deepClone(props.modelValue)
      : getInitialValues(props.config)
    errors.value = {}
    touched.value = {}
  }

  function resetField(field: string): void {
    const initial = props.modelValue || getInitialValues(props.config)
    const initialValue = get(initial, field)
    setFieldValue(field, initialValue)
    delete errors.value[field]
    delete touched.value[field]
  }

  function resetValidation(field?: string): void {
    if (field) {
      delete errors.value[field]
    } else {
      errors.value = {}
    }
  }

  async function submit(): Promise<void> {
    const isValid = await validate()
    if (!isValid) {
      if (props.scrollToError) {
        const firstError = Object.keys(errors.value)[0]
        if (firstError) {
          scrollToField(firstError)
        }
      }
      return
    }

    submitting.value = true
    try {
      let submitData = values.value
      if (props.transform) {
        submitData = props.transform(deepClone(values.value))
      }

      const transformedData = applyFieldTransforms(props.config, submitData)

      emit('submit', transformedData)
    } finally {
      submitting.value = false
    }
  }

  function applyFieldTransforms(config: FormConfig[], data: Record<string, any>): Record<string, any> {
    const result = deepClone(data)

    function processConfig(items: FormConfig[]) {
      for (const item of items) {
        if (item.type === 'group' && 'fields' in item) {
          processConfig(item.fields)
        } else if (item.field && item.transform) {
          const value = get(result, item.field)
          set(result, item.field, item.transform(value))
        }
      }
    }

    processConfig(config)
    return result
  }

  function scrollToField(field: string): void {
    const el = document.querySelector(`[data-field="${field}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function setValues(newValues: Record<string, any>): void {
    for (const key in newValues) {
      set(values.value, key, newValues[key])
    }
  }

  function setFieldValue(path: string, value: any): void {
    set(values.value, path, value)
    emit('fieldChange', path, value)
  }

  function getFieldValue(path: string): any {
    return get(values.value, path)
  }

  function getValues(): Record<string, any> {
    return deepClone(values.value)
  }

  function setFieldOptions(field: string, options: SelectOption[]): void {
    fieldOptions[field] = options
  }

  function getFieldOptions(field: string): SelectOption[] | undefined {
    return fieldOptions[field]
  }

  function setErrors(newErrors: Record<string, string>): void {
    errors.value = { ...newErrors }
  }

  function setFieldError(field: string, error: string): void {
    errors.value[field] = error
  }

  function clearErrors(): void {
    errors.value = {}
  }

  function clearFieldError(field: string): void {
    delete errors.value[field]
  }

  function setTouched(field: string, value: boolean = true): void {
    touched.value[field] = value
  }

  function isTouched(field: string): boolean {
    return !!touched.value[field]
  }

  function addArrayItem(field: string, index?: number, value?: any): void {
    const arr = getFieldValue(field) || []
    const defaultItem = getArrayItemDefault(props.config, field)

    if (index !== undefined) {
      arr.splice(index, 0, value ?? defaultItem)
    } else {
      arr.push(value ?? defaultItem)
    }

    setFieldValue(field, arr)
  }

  function removeArrayItem(field: string, index: number): void {
    const arr = getFieldValue(field) || []
    arr.splice(index, 1)
    setFieldValue(field, arr)
  }

  function moveArrayItem(field: string, from: number, to: number): void {
    const arr = getFieldValue(field) || []
    const [item] = arr.splice(from, 1)
    arr.splice(to, 0, item)
    setFieldValue(field, arr)
  }

  function getFormData(): FormData {
    const formData = new FormData()
    const data = values.value

    function appendData(obj: any, prefix: string = '') {
      for (const key in obj) {
        const path = prefix ? `${prefix}.${key}` : key
        const value = obj[key]

        if (value instanceof File) {
          formData.append(path, value)
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${path}[${index}]`, item)
            } else if (typeof item === 'object' && item !== null) {
              appendData(item, `${path}[${index}]`)
            } else {
              formData.append(`${path}[${index}]`, String(item))
            }
          })
        } else if (typeof value === 'object' && value !== null) {
          appendData(value, path)
        } else if (value !== null && value !== undefined) {
          formData.append(path, String(value))
        }
      }
    }

    appendData(data)
    return formData
  }

  function getConfig(field: string): FormConfig | undefined {
    return getFieldConfig(props.config, field)
  }

  function setConfig(field: string, config: Partial<FormConfig>): void {
    const item = getFieldConfig(props.config, field)
    if (item) {
      Object.assign(item, config)
    }
  }

  return {
    id,
    values,
    errors,
    touched,
    dirty,
    valid,
    submitting,
    validate,
    validateField,
    reset,
    resetField,
    resetValidation,
    submit,
    scrollToField,
    setValues,
    setFieldValue,
    getFieldValue,
    getValues,
    setFieldOptions,
    setErrors,
    setFieldError,
    clearErrors,
    clearFieldError,
    setTouched,
    isTouched,
    addArrayItem,
    removeArrayItem,
    moveArrayItem,
    getFormData,
    getConfig,
    setConfig,
  }
}

function getAllFields(config: FormConfig[]): string[] {
  const fields: string[] = []

  function processConfig(items: FormConfig[]) {
    for (const item of items) {
      if (item.type === 'group' && 'fields' in item) {
        processConfig(item.fields)
      } else if (item.field) {
        fields.push(item.field)
      }
    }
  }

  processConfig(config)
  return fields
}

function getFieldConfig(config: FormConfig[], field: string): FormConfig | undefined {
  for (const item of config) {
    if (item.type === 'group' && 'fields' in item) {
      const found = getFieldConfig(item.fields, field)
      if (found) return found
    } else if (item.field === field) {
      return item
    }
  }
  return undefined
}

function getArrayItemDefault(config: FormConfig[], field: string): any {
  const fieldConfig = config.find(c => c.type === 'array' && c.field === field)
  if (fieldConfig && 'itemTemplate' in fieldConfig) {
    const item: Record<string, any> = {}
    for (const template of fieldConfig.itemTemplate) {
      if (template.field) {
        const templateField = template.field.replace(/\[\d+\]/g, '[0]')
        item[templateField.split('.').pop() || templateField] = getDefaultValue(template)
      }
    }
    return item
  }
  return {}
}

function getDefaultValue(item: FormConfig): any {
  switch (item.type) {
    case 'input':
    case 'textarea':
      return ''
    case 'number':
    case 'slider':
      return 0
    case 'switch':
      return false
    case 'select':
      return (item as any).multiple ? [] : ''
    case 'checkbox':
      return (item as any).options ? [] : false
    case 'radio':
      return ''
    case 'date':
      return null
    case 'rate':
      return 0
    case 'color':
      return ''
    case 'upload':
      return []
    default:
      return undefined
  }
}

export function provideForm(instance: FormInstance): void {
  provide('hForm', instance)
}

export function useFormInstance(): FormInstance | undefined {
  return inject<FormInstance>('hForm')
}