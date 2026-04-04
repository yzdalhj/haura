<template>
  <form
    :class="[
      'h-form',
      `h-form--${layout}`,
      `h-form--${size}`,
      {
        'is-inline': layout === 'inline',
        'is-disabled': disabled,
        'is-loading': loading,
      },
      props.class,
    ]"
    :style="formStyle"
    @submit.prevent="handleSubmit"
  >
    <div
      :class="[
        'h-form__content',
        `h-form__content--columns-${columns}`,
      ]"
      :style="contentStyle"
    >
      <template v-for="(item, index) in flattenedConfig" :key="item.field || index">
        <HFormItem
          v-if="isFieldVisible(item)"
          :field="item.field"
          :label="item.label"
          :required="item.required"
          :rules="item.rules"
          :span="columns > 1 ? item.span : undefined"
          :offset="columns > 1 ? item.offset : undefined"
          :label-width="labelWidth"
          :label-position="labelPosition"
          :size="size"
          :show-message="showMessage"
          :inline-message="inlineMessage"
          :hide-required-asterisk="hideRequiredAsterisk"
          :tooltip="item.tooltip"
          :mode="mode"
          :disabled="disabled || isFieldDisabled(item)"
        >
          <template v-if="mode === 'view'">
            {{ formatFieldValue(item) }}
          </template>
          <template v-else>
            <component
              :is="getFieldComponent(item)"
              v-bind="getFieldProps(item)"
              :model-value="getFieldValue(item.field)"
              :disabled="disabled || isFieldDisabled(item)"
              @update:model-value="handleFieldChange(item.field, $event)"
              @blur="handleFieldBlur(item)"
            />
          </template>
        </HFormItem>
      </template>
    </div>

    <div v-if="showFooter" class="h-form__footer">
      <slot name="footer">
        <HButton
          v-if="showCancel"
          :disabled="loading"
          @click="handleCancel"
        >
          {{ cancelText }}
        </HButton>
        <HButton
          type="default"
          :disabled="loading"
          @click="handleReset"
        >
          {{ resetText }}
        </HButton>
        <HButton
          type="primary"
          :loading="loading || form.submitting.value"
          @click="handleSubmit"
        >
          {{ submitText }}
        </HButton>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, provide, watch, type CSSProperties } from 'vue'
import { formPropsDefaults } from './form'
import type { FormProps, FormConfig, SelectOption } from './form'
import { useForm, provideForm } from './use-form'
import { get } from './utils/path'
import HFormItem from './form-item.vue'
import HButton from '../button/button.vue'
import HInput from '../input/input.vue'
import HSelect from '../select/select.vue'
import HCheckbox from '../checkbox/checkbox.vue'
import HRadio from '../radio/radio.vue'
import HSwitch from '../switch/switch.vue'

const props = withDefaults(defineProps<FormProps>(), formPropsDefaults)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'submit', values: Record<string, any>): void
  (e: 'reset'): void
  (e: 'cancel'): void
  (e: 'validate', valid: boolean, errors: Record<string, string>): void
  (e: 'fieldChange', field: string, value: any): void
  (e: 'fieldBlur', field: string): void
}>()

const form = useForm(props)
provideForm(form)

watch(() => form.values.value, (val) => {
  emit('update:modelValue', val)
}, { deep: true })

watch(() => form.valid.value, (val) => {
  emit('validate', val, form.errors.value)
})

const flattenedConfig = computed(() => {
  return flattenConfig(props.config)
})

const formStyle = computed<CSSProperties>(() => ({
  ...props.style,
}))

const contentStyle = computed<CSSProperties>(() => ({
  gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
}))

const showCancel = computed(() => props.showFooter)

function flattenConfig(config: FormConfig[], result: FormConfig[] = []): FormConfig[] {
  for (const item of config) {
    if (item.type === 'group' && 'fields' in item) {
      flattenConfig(item.fields, result)
    } else if (item.field) {
      result.push(item)
    }
  }
  return result
}

function isFieldVisible(item: FormConfig): boolean {
  if (item.visible === undefined) return true
  if (typeof item.visible === 'boolean') return item.visible
  return item.visible(form.values.value)
}

function isFieldDisabled(item: FormConfig): boolean {
  if (item.disabled === undefined) return false
  if (typeof item.disabled === 'boolean') return item.disabled
  return item.disabled(form.values.value)
}

function getFieldValue(field: string): any {
  return get(form.values.value, field)
}

function handleFieldChange(field: string, value: any): void {
  form.setFieldValue(field, value)
  emit('fieldChange', field, value)

  if (props.validateTrigger === 'change') {
    form.validateField(field)
  }
}

function handleFieldBlur(item: FormConfig): void {
  form.setTouched(item.field, true)
  emit('fieldBlur', item.field)

  if (props.validateTrigger === 'blur') {
    form.validateField(item.field)
  }
}

function formatFieldValue(item: FormConfig): string {
  const value = getFieldValue(item.field)

  if (item.format) {
    return item.format(value, form.values.value)
  }

  if (item.type === 'select') {
    const options = getFieldOptions(item)
    if (Array.isArray(value)) {
      return value.map(v => options.find(o => o.value === v)?.label || v).join(', ')
    }
    return options.find(o => o.value === value)?.label || value || '-'
  }

  if (value === null || value === undefined || value === '') {
    return '-'
  }

  return String(value)
}

function getFieldOptions(item: FormConfig): SelectOption[] {
  if (item.type !== 'select' && item.type !== 'radio' && item.type !== 'checkbox') {
    return []
  }

  const options = (item as any).options
  if (typeof options === 'function') {
    return options(form.values.value)
  }

  return options || []
}

function getFieldComponent(item: FormConfig): any {
  switch (item.type) {
    case 'input':
      return HInput
    case 'number':
      return HInput
    case 'textarea':
      return HInput
    case 'select':
      return HSelect
    case 'checkbox':
      return HCheckbox
    case 'radio':
      return HRadio
    case 'switch':
      return HSwitch
    case 'custom':
      return (item as any).component
    default:
      return HInput
  }
}

function getFieldProps(item: FormConfig): Record<string, any> {
  const base: Record<string, any> = {
    placeholder: item.placeholder,
    size: props.size,
  }

  switch (item.type) {
    case 'input':
      return {
        ...base,
        type: (item as any).inputType || 'text',
        maxlength: (item as any).maxlength,
        showWordLimit: (item as any).showWordLimit,
        clearable: (item as any).clearable ?? true,
      }
    case 'number':
      return {
        ...base,
        type: 'number',
        min: (item as any).min,
        max: (item as any).max,
        step: (item as any).step,
        precision: (item as any).precision,
      }
    case 'textarea':
      return {
        ...base,
        type: 'textarea',
        rows: (item as any).rows,
        autosize: (item as any).autosize,
        maxlength: (item as any).maxlength,
        resize: (item as any).resize,
      }
    case 'select':
      return {
        ...base,
        options: getFieldOptions(item),
        multiple: (item as any).multiple,
        filterable: (item as any).filterable,
        clearable: (item as any).clearable ?? true,
      }
    case 'checkbox':
      return {
        ...base,
        options: getFieldOptions(item),
        modelValue: getFieldValue(item.field),
      }
    case 'radio':
      return {
        ...base,
        options: getFieldOptions(item),
        button: (item as any).button,
      }
    case 'switch':
      return {
        activeText: (item as any).activeText,
        inactiveText: (item as any).inactiveText,
      }
    case 'custom':
      return {
        ...(item as any).componentProps,
        ...(item as any).componentEmits,
      }
    default:
      return base
  }
}

async function handleSubmit(): Promise<void> {
  const isValid = await form.validate()
  if (!isValid) {
    if (props.scrollToError) {
      const firstError = Object.keys(form.errors.value)[0]
      if (firstError) {
        form.scrollToField(firstError)
      }
    }
    return
  }

  let submitData = form.getValues()
  if (props.transform) {
    submitData = props.transform(submitData)
  }

  emit('submit', submitData)
}

function handleReset(): void {
  form.reset()
  emit('reset')
}

function handleCancel(): void {
  emit('cancel')
}

defineExpose({
  ...form,
  validate: form.validate,
  reset: form.reset,
  submit: form.submit,
  setValues: form.setValues,
  setFieldValue: form.setFieldValue,
  getFieldValue: form.getFieldValue,
  setErrors: form.setErrors,
  clearErrors: form.clearErrors,
})
</script>

<style scoped>
.h-form {
  width: 100%;
  box-sizing: border-box;
}

.h-form--inline {
  display: inline-flex;
  flex-wrap: wrap;
}

.h-form--inline .h-form__content {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 16px;
}

.h-form__content {
  display: grid;
  grid-template-columns: repeat(var(--columns, 1), 1fr);
  gap: var(--gap, 0);
}

.h-form__content--columns-1 {
  --columns: 1;
}

.h-form__content--columns-2 {
  --columns: 2;
}

.h-form__content--columns-3 {
  --columns: 3;
}

.h-form__content--columns-4 {
  --columns: 4;
}

.h-form.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.h-form__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--aura-border-default, #e5e5e5);
}

.h-form--small .h-form__footer {
  margin-top: 16px;
  padding-top: 12px;
}

.h-form--large .h-form__footer {
  margin-top: 32px;
  padding-top: 20px;
}
</style>