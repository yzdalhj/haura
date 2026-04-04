<template>
  <label
    :class="[
      'h-radio',
      {
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-bordered': bordered,
      },
    ]"
  >
    <span class="h-radio__input">
      <input
        v-model="model"
        type="radio"
        :value="label"
        :disabled="disabled"
        :name="name"
        @change="handleChange"
      />
      <span class="h-radio__inner" />
    </span>
    <span v-if="$slots.default || label" class="h-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: '' },
  label: { type: [String, Number, Boolean], default: '' },
  disabled: { type: Boolean, default: false },
  bordered: { type: Boolean, default: false },
  name: { type: String, default: undefined },
  size: { type: String, default: 'default' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const radioGroup = inject('radioGroup', null as any)

const model = computed({
  get() {
    return radioGroup ? radioGroup.modelValue.value : props.modelValue
  },
  set(val) {
    if (radioGroup) {
      radioGroup.changeEvent(val)
    } else {
      emit('update:modelValue', val)
    }
  },
})

const isChecked = computed(() => {
  return model.value === props.label
})

const handleChange = () => {
  emit('change', props.label)
}
</script>

<style scoped>
.h-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-right: 16px;
}

.h-radio__input {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.h-radio__input input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.h-radio__inner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--aura-border-default);
  border-radius: 50%;
  background-color: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.h-radio__inner::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.h-radio:hover .h-radio__inner {
  border-color: var(--aura-color-primary-500);
}

.h-radio.is-checked .h-radio__inner {
  background-color: var(--aura-color-primary-500);
  border-color: var(--aura-color-primary-500);
}

.h-radio.is-checked .h-radio__inner::after {
  transform: translate(-50%, -50%) scale(1);
}

.h-radio.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.h-radio__label {
  margin-left: 8px;
  font-size: 14px;
  color: var(--aura-text-primary);
}

.h-radio.is-bordered {
  padding: 8px 12px;
  border: 1px solid var(--aura-border-default);
  border-radius: 6px;
}

.h-radio.is-bordered.is-checked {
  border-color: var(--aura-color-primary-500);
}
</style>