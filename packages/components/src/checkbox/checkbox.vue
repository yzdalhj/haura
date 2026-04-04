<template>
  <label
    :class="[
      'h-checkbox',
      {
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-indeterminate': indeterminate,
        'is-bordered': bordered,
      },
    ]"
  >
    <span class="h-checkbox__input">
      <input
        v-model="model"
        type="checkbox"
        :value="label"
        :disabled="disabled"
        :name="name"
        @change="handleChange"
      />
      <span class="h-checkbox__inner">
        <svg v-if="indeterminate" viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M19 13H5v-2h14v2z"/>
        </svg>
        <svg v-else-if="isChecked" viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </span>
    </span>
    <span v-if="$slots.default || label" class="h-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

const props = defineProps({
  modelValue: { type: [Boolean, Array, String, Number], default: undefined },
  label: { type: [String, Number, Boolean], default: '' },
  disabled: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
  bordered: { type: Boolean, default: false },
  name: { type: String, default: undefined },
  size: { type: String, default: 'default' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const checkboxGroup = inject('checkboxGroup', null as any)

const model = computed({
  get() {
    return checkboxGroup ? checkboxGroup.modelValue.value : props.modelValue
  },
  set(val) {
    if (checkboxGroup) {
      checkboxGroup.changeEvent(val)
    } else {
      emit('update:modelValue', val)
    }
  },
})

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.includes(props.label)
  }
  return model.value === true
})

const handleChange = (evt: Event) => {
  const checked = (evt.target as HTMLInputElement).checked
  emit('change', checked)
}
</script>

<style scoped>
.h-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 16px;
}

.h-checkbox__input {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.h-checkbox__input input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.h-checkbox__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 2px solid var(--aura-border-default);
  border-radius: 4px;
  background-color: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
}

.h-checkbox:hover .h-checkbox__inner {
  border-color: var(--aura-color-primary-500);
}

.h-checkbox.is-checked .h-checkbox__inner {
  background-color: var(--aura-color-primary-500);
  border-color: var(--aura-color-primary-500);
}

.h-checkbox.is-indeterminate .h-checkbox__inner {
  background-color: var(--aura-color-primary-500);
  border-color: var(--aura-color-primary-500);
}

.h-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.h-checkbox__label {
  margin-left: 8px;
  font-size: 14px;
  color: var(--aura-text-primary);
}

.h-checkbox.is-bordered {
  padding: 8px 12px;
  border: 1px solid var(--aura-border-default);
  border-radius: 6px;
}

.h-checkbox.is-bordered.is-checked {
  border-color: var(--aura-color-primary-500);
}
</style>