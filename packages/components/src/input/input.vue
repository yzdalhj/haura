<template>
  <div
    :class="[
      'h-input',
      `h-input--${size}`,
      {
        'is-disabled': disabled,
        'is-exceed': isExceed,
        'has-prefix': prefixIcon || $slots.prefix,
        'has-suffix': suffixIcon || $slots.suffix || clearable || showPassword,
        'has-glow': glowOnFocus,
      },
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 前缀 -->
    <span v-if="prefixIcon || $slots.prefix" class="h-input__prefix">
      <slot name="prefix">
        <i :class="prefixIcon" />
      </slot>
    </span>

    <!-- 输入框 -->
    <input
      v-if="type !== 'textarea'"
      ref="inputRef"
      :type="showPasswordVisible ? 'text' : type"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :tabindex="tabindex"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      class="h-input__inner"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
    />

    <!-- 文本域 -->
    <textarea
      v-else
      ref="textareaRef"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :tabindex="tabindex"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :style="textareaStyle"
      class="h-input__inner h-input__textarea"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
    />

    <!-- 后缀 -->
    <span v-if="suffixVisible" class="h-input__suffix">
      <slot name="suffix">
        <!-- 清空按钮 -->
        <i
          v-if="showClear"
          class="h-input__icon h-input__clear"
          @click="handleClear"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
          </svg>
        </i>
        <!-- 密码切换 -->
        <i
          v-else-if="showPwdVisible"
          class="h-input__icon h-input__password"
          @click="handlePasswordVisible"
        >
          <svg v-if="showPasswordVisible" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
          </svg>
        </i>
        <!-- 后缀图标 -->
        <i v-else-if="suffixIcon" :class="suffixIcon" />
      </slot>
    </span>

    <!-- 字数统计 -->
    <span v-if="showWordLimit && maxlength" class="h-input__count">
      {{ textLength }}/{{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { inputProps, inputEmits } from './input'

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const inputRef = ref<HTMLInputElement>()
const textareaRef = ref<HTMLTextAreaElement>()
const focused = ref(false)
const hovering = ref(false)
const showPasswordVisible = ref(false)

// 计算文本长度
const textLength = computed(() => {
  return String(props.modelValue || '').length
})

// 是否超出限制
const isExceed = computed(() => {
  return props.maxlength && textLength.value > Number(props.maxlength)
})

// 是否显示清空按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && (focused.value || hovering.value) && props.modelValue
})

// 是否显示密码切换
const showPwdVisible = computed(() => {
  return props.showPassword && !props.disabled && !props.readonly
})

// 后缀是否可见
const suffixVisible = computed(() => {
  return showClear.value || showPwdVisible.value || props.suffixIcon || !!props.$slots?.suffix
})

// 文本域样式
const textareaStyle = computed(() => {
  if (!props.autosize || props.type !== 'textarea') return {}
  
  const style: Record<string, string> = {}
  if (props.resize) {
    style.resize = props.resize
  }
  return style
})

// 获取输入元素
const getInput = () => {
  return inputRef.value || textareaRef.value
}

// 聚焦
const focus = () => {
  nextTick(() => {
    getInput()?.focus()
  })
}

// 失焦
const blur = () => {
  getInput()?.blur()
}

// 选择
const select = () => {
  getInput()?.select()
}

// 处理输入
const handleInput = (evt: Event) => {
  const value = (evt.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

// 处理 change
const handleChange = (evt: Event) => {
  emit('change', (evt.target as HTMLInputElement).value)
}

// 处理聚焦
const handleFocus = (evt: FocusEvent) => {
  focused.value = true
  emit('focus', evt)
}

// 处理失焦
const handleBlur = (evt: FocusEvent) => {
  focused.value = false
  emit('blur', evt)
}

// 处理清空
const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  focus()
}

// 处理密码可见切换
const handlePasswordVisible = () => {
  showPasswordVisible.value = !showPasswordVisible.value
  focus()
}

// 处理鼠标进入
const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true
  emit('mouseenter', evt)
}

// 处理鼠标离开
const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false
  emit('mouseleave', evt)
}

// 处理键盘事件
const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt)
}

const handleKeyup = (evt: KeyboardEvent) => {
  emit('keyup', evt)
}

// 暴露方法
defineExpose({
  input: inputRef,
  textarea: textareaRef,
  focus,
  blur,
  select,
})
</script>

<style scoped>
.h-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-input--large {
  font-size: 16px;
}

.h-input--small {
  font-size: 12px;
}

.h-input__inner {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  line-height: 1;
  border: 1px solid var(--aura-border-default);
  border-radius: 6px;
  background-color: white;
  color: var(--aura-text-primary);
  font-size: inherit;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-input--large .h-input__inner {
  height: 40px;
  padding: 0 16px;
}

.h-input--small .h-input__inner {
  height: 24px;
  padding: 0 8px;
}

.h-input__inner:hover {
  border-color: var(--aura-border-hover);
}

.h-input__inner:focus {
  border-color: var(--aura-color-primary-500);
}

.h-input.has-glow .h-input__inner:focus {
  box-shadow: 0 0 0 3px var(--aura-glow-primary);
}

.h-input.is-disabled .h-input__inner {
  background-color: var(--aura-neutral-100);
  color: var(--aura-text-disabled);
  cursor: not-allowed;
}

.h-input.is-exceed .h-input__inner {
  border-color: var(--aura-color-danger-500);
}

.h-input.is-exceed.has-glow .h-input__inner:focus {
  box-shadow: 0 0 0 3px var(--aura-glow-danger);
}

/* 文本域 */
.h-input__textarea {
  height: auto;
  min-height: 60px;
  padding: 8px 12px;
  line-height: 1.5;
  resize: vertical;
}

/* 前缀后缀 */
.h-input__prefix,
.h-input__suffix {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--aura-text-tertiary);
  pointer-events: none;
}

.h-input__prefix {
  left: 0;
  padding-left: 12px;
}

.h-input__suffix {
  right: 0;
  padding-right: 12px;
}

.h-input.has-prefix .h-input__inner {
  padding-left: 36px;
}

.h-input.has-suffix .h-input__inner {
  padding-right: 36px;
}

.h-input__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  cursor: pointer;
  pointer-events: auto;
  transition: color 0.2s;
}

.h-input__icon:hover {
  color: var(--aura-text-primary);
}

/* 字数统计 */
.h-input__count {
  position: absolute;
  right: 12px;
  bottom: -20px;
  font-size: 12px;
  color: var(--aura-text-tertiary);
}

.h-input.is-exceed .h-input__count {
  color: var(--aura-color-danger-500);
}
</style>