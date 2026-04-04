import type { FormRule } from './form'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneRegex = /^1[3-9]\d{9}$/
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
const idcardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

const validators: Record<string, (value: any, rule: FormRule) => boolean | string> = {
  required: (value, rule) => {
    if (value === null || value === undefined) return rule.message || '此项为必填项'
    if (typeof value === 'string' && value.trim() === '') return rule.message || '此项为必填项'
    if (Array.isArray(value) && value.length === 0) return rule.message || '请至少选择一项'
    return true
  },

  email: (value, rule) => {
    if (!value) return true
    return emailRegex.test(value) || rule.message || '请输入正确的邮箱地址'
  },

  phone: (value, rule) => {
    if (!value) return true
    return phoneRegex.test(value) || rule.message || '请输入正确的手机号码'
  },

  url: (value, rule) => {
    if (!value) return true
    return urlRegex.test(value) || rule.message || '请输入正确的网址'
  },

  number: (value, rule) => {
    if (!value && value !== 0) return true
    return !isNaN(Number(value)) || rule.message || '请输入数字'
  },

  integer: (value, rule) => {
    if (!value && value !== 0) return true
    return Number.isInteger(Number(value)) || rule.message || '请输入整数'
  },

  date: (value, rule) => {
    if (!value) return true
    const date = new Date(value)
    return !isNaN(date.getTime()) || rule.message || '请输入正确的日期'
  },

  idcard: (value, rule) => {
    if (!value) return true
    return idcardRegex.test(value) || rule.message || '请输入正确的身份证号码'
  },

  min: (value, rule) => {
    if (value === null || value === undefined || value === '') return true
    const min = rule.min!
    if (typeof value === 'number') {
      return value >= min || rule.message || `数值不能小于 ${min}`
    }
    if (typeof value === 'string') {
      return value.length >= min || rule.message || `长度不能少于 ${min} 个字符`
    }
    if (Array.isArray(value)) {
      return value.length >= min || rule.message || `至少选择 ${min} 项`
    }
    return true
  },

  max: (value, rule) => {
    if (value === null || value === undefined || value === '') return true
    const max = rule.max!
    if (typeof value === 'number') {
      return value <= max || rule.message || `数值不能大于 ${max}`
    }
    if (typeof value === 'string') {
      return value.length <= max || rule.message || `长度不能超过 ${max} 个字符`
    }
    if (Array.isArray(value)) {
      return value.length <= max || rule.message || `最多选择 ${max} 项`
    }
    return true
  },

  pattern: (value, rule) => {
    if (!value || !rule.pattern) return true
    return rule.pattern.test(value) || rule.message || '格式不正确'
  },
}

export function validateRule(
  value: any,
  rule: FormRule,
  values: Record<string, any>
): boolean | string | Promise<boolean | string> {
  if (rule.required || rule.type === 'required') {
    const result = validators.required(value, rule)
    if (result !== true) return result
  }

  if (rule.type && validators[rule.type]) {
    const result = validators[rule.type](value, rule)
    if (result !== true) return result
  }

  if (rule.min !== undefined) {
    const result = validators.min(value, { ...rule, message: rule.message })
    if (result !== true) return result
  }

  if (rule.max !== undefined) {
    const result = validators.max(value, { ...rule, message: rule.message })
    if (result !== true) return result
  }

  if (rule.pattern) {
    const result = validators.pattern(value, rule)
    if (result !== true) return result
  }

  if (rule.validator) {
    return rule.validator(value, values)
  }

  return true
}

export async function validateRules(
  value: any,
  rules: FormRule[],
  values: Record<string, any>
): Promise<string | null> {
  for (const rule of rules) {
    const result = validateRule(value, rule, values)

    if (result instanceof Promise) {
      const asyncResult = await result
      if (asyncResult !== true) {
        return typeof asyncResult === 'string' ? asyncResult : rule.message || '验证失败'
      }
    } else if (result !== true) {
      return typeof result === 'string' ? result : rule.message || '验证失败'
    }
  }

  return null
}

export function getInitialValues(config: FormConfig[]): Record<string, any> {
  const values: Record<string, any> = {}

  function processConfig(items: FormConfig[]) {
    for (const item of items) {
      if (item.type === 'group' && 'fields' in item) {
        processConfig(item.fields)
      } else if (item.type === 'array' && 'itemTemplate' in item) {
        values[item.field] = []
      } else if (item.field) {
        const defaultValue = getDefaultValue(item)
        if (defaultValue !== undefined) {
          values[item.field] = defaultValue
        }
      }
    }
  }

  processConfig(config)
  return values
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
    case 'cascader':
      return (item as any).props?.multiple ? [] : ''
    default:
      return undefined
  }
}