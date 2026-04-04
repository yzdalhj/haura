<template>
  <div
    :class="[
      'h-switch',
      `h-switch--${size}`,
      {
        'is-checked': modelValue,
        'is-disabled': disabled,
        'is-loading': loading,
      },
    ]"
    @click="handleClick"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled || loading"
      @change="handleChange"
    />
    <span class="h-switch__core">
      <span class="h-switch__action">
        <span v-if="loading" class="h-switch__loading-icon" />
      </span>
    </span>
    <span v-if="activeText || inactiveText" class="h-switch__label">
      {{ modelValue ? activeText : inactiveText }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  size: { type: String, default: 'default' },
  activeText: { type: String, default: '' },
  inactiveText: { type: String, default: '' },
  activeValue: { type: Boolean, default: true },
  inactiveValue: { type: Boolean, default: false },
  activeColor: { type: String, default: '' },
  inactiveColor: { type: String, default: '' },
  beforeChange: { type: Function, default: undefined },
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleClick = async () => {
  if (props.disabled || props.loading) return

  if (props.beforeChange) {
    const result = await props.beforeChange()
    if (!result) return
  }

  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
}

const handleChange = (evt: Event) => {
  emit('change', (evt.target as HTMLInputElement).checked)
}
</script>

<style scoped>
.h-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.h-switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.h-switch__core {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: var(--aura-border-default);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-switch__action {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-switch.is-checked .h-switch__core {
  background-color: var(--aura-color-primary-500);
}

.h-switch.is-checked .h-switch__action {
  left: calc(100% - 18px);
}

.h-switch.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.h-switch__label {
  margin-left: 8px;
  font-size: 14px;
  color: var(--aura-text-primary);
}

/* 尺寸 */
.h-switch--large .h-switch__core {
  width: 50px;
  height: 26px;
  border-radius: 13px;
}

.h-switch--large .h-switch__action {
  width: 22px;
  height: 22px;
}

.h-switch--large.is-checked .h-switch__action {
  left: calc(100% - 24px);
}

.h-switch--small .h-switch__core {
  width: 32px;
  height: 16px;
  border-radius: 8px;
}

.h-switch--small .h-switch__action {
  width: 12px;
  height: 12px;
}

.h-switch--small.is-checked .h-switch__action {
  left: calc(100% - 14px);
}

/* 加载图标 */
.h-switch__loading-icon {
  width: 10px;
  height: 10px;
  border: 2px solid var(--aura-text-tertiary);
  border-right-color: transparent;
  border-radius: 50%;
  animation: h-switch-spin 1s linear infinite;
}

@keyframes h-switch-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>