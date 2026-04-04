<template>
  <div
    :class="[
      'h-form-item',
      `h-form-item--${size}`,
      `h-form-item--label-${labelPosition}`,
      {
        'is-required': isRequired && !hideRequiredAsterisk,
        'is-error': hasError,
        'is-disabled': disabled,
        'is-view': mode === 'view',
      },
      props.class,
    ]"
    :style="itemStyle"
    :data-field="field"
  >
    <slot name="label">
      <label
        v-if="showLabel"
        :class="['h-form-item__label', labelClass]"
        :style="labelStyleComputed"
        :for="field"
      >
        <span class="h-form-item__label-text">{{ label }}</span>
        <span v-if="tooltip" class="h-form-item__tooltip">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
          <span class="h-form-item__tooltip-content">{{ tooltip }}</span>
        </span>
      </label>
    </slot>

    <div class="h-form-item__content" :style="contentStyle">
      <slot>
        <template v-if="mode === 'view'">
          <div class="h-form-item__view-value">{{ formattedValue }}</div>
        </template>
        <template v-else>
          <slot name="field" />
        </template>
      </slot>

      <transition name="h-form-item-error">
        <div
          v-if="showError && hasError"
          :class="['h-form-item__error', { 'is-inline': inlineMessage }]"
        >
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type CSSProperties } from 'vue'
import { formItemPropsDefaults } from './form'
import type { FormItemProps } from './form'
import type { FormInstance } from './use-form'
import { get } from './utils/path'

const props = withDefaults(defineProps<FormItemProps & {
  tooltip?: string
  hideRequiredAsterisk?: boolean
  inlineMessage?: boolean
  mode?: 'edit' | 'view'
  columns?: number
  gap?: number | string
}>(), {
  ...formItemPropsDefaults,
  showMessage: true,
  hideRequiredAsterisk: false,
  inlineMessage: false,
  mode: 'edit',
  columns: 1,
  gap: 0,
})

const form = inject<FormInstance>('hForm')

const showLabel = computed(() => props.label && props.labelPosition !== 'top')

const isRequired = computed(() => {
  if (props.required) return true
  return false
})

const hasError = computed(() => {
  return !!(form && form.errors.value[props.field])
})

const errorMessage = computed(() => {
  return form?.errors.value[props.field] || ''
})

const showError = computed(() => {
  return props.showMessage && hasError.value
})

const formattedValue = computed(() => {
  if (!form) return ''

  const value = get(form.values.value, props.field)
  const config = form.getConfig?.(props.field)

  if (config?.format) {
    return config.format(value, form.values.value)
  }

  return value ?? '-'
})

const disabled = computed(() => {
  return form?.disabled || props.disabled
})

const labelStyleComputed = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  if (props.labelWidth !== undefined) {
    style.width = typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth
  }

  if (props.labelStyle) {
    Object.assign(style, props.labelStyle)
  }

  return style
})

const itemStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = { ...props.style }

  if (props.span !== undefined) {
    style.gridColumn = `span ${props.span}`
  }

  if (props.offset !== undefined && props.offset > 0) {
    style.gridColumn = `${props.offset + 1} / span ${props.span || 1}`
  }

  return style
})

const contentStyle = computed<CSSProperties>(() => ({}))
</script>

<style scoped>
.h-form-item {
  display: grid;
  grid-template-columns: var(--label-width, auto) 1fr;
  gap: 8px;
  margin-bottom: 18px;
  position: relative;
}

.h-form-item--label-top {
  grid-template-columns: 1fr;
  gap: 4px;
}

.h-form-item--small {
  margin-bottom: 14px;
}

.h-form-item--large {
  margin-bottom: 22px;
}

.h-form-item__label {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: var(--aura-text-primary, #171717);
  line-height: 32px;
  flex-shrink: 0;
}

.h-form-item--label-right .h-form-item__label {
  justify-content: flex-end;
}

.h-form-item--label-left .h-form-item__label {
  justify-content: flex-start;
}

.h-form-item__label-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.h-form-item__tooltip {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  color: var(--aura-text-tertiary, #a3a3a3);
  cursor: help;
  position: relative;
}

.h-form-item__tooltip-content {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  background: var(--aura-text-primary, #171717);
  color: white;
  font-size: 12px;
  white-space: nowrap;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  z-index: 10;
}

.h-form-item__tooltip:hover .h-form-item__tooltip-content {
  opacity: 1;
  visibility: visible;
}

.h-form-item__content {
  position: relative;
  min-height: 32px;
}

.h-form-item__view-value {
  font-size: 14px;
  color: var(--aura-text-primary, #171717);
  line-height: 32px;
  word-break: break-all;
}

.h-form-item__error {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 4px;
  font-size: 12px;
  color: var(--aura-color-danger-500, #ef4444);
  line-height: 1.2;
}

.h-form-item__error.is-inline {
  position: static;
  padding-top: 0;
  margin-left: 8px;
}

.h-form-item.is-required .h-form-item__label-text::before {
  content: '*';
  color: var(--aura-color-danger-500, #ef4444);
  margin-right: 4px;
}

.h-form-item.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.h-form-item-error-enter-active,
.h-form-item-error-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.h-form-item-error-enter-from,
.h-form-item-error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>