<template>
  <component
    :is="tag"
    ref="buttonRef"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :class="[
      'h-button',
      `h-button--${type}`,
      `h-button--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-loading': loading,
        'is-disabled': disabled,
        'is-block': block,
        'is-glass': glass,
        'is-gradient': gradient,
        'has-ripple': ripple,
        'has-hover-lift': hoverLift && !disabled && !loading,
        'has-hover-glow': hoverGlow,
        'has-press-scale': pressScale,
      },
    ]"
    :style="buttonStyle"
    @click="handleClick"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- 加载图标 -->
    <span
      v-if="loading"
      class="h-button__loading-icon"
    >
      <slot name="loading">
        <span class="h-button__spinner" />
      </slot>
    </span>
    
    <!-- 普通图标 -->
    <span
      v-else-if="icon"
      class="h-button__icon"
    >
      <i :class="icon" />
    </span>
    
    <!-- 默认插槽 -->
    <span
      v-if="$slots.default"
      class="h-button__content"
      :class="{ 'is-expand': loading || icon }"
    >
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { buttonProps, buttonEmits } from './button'
import { useRipple } from '@haura/motion'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const buttonRef = ref<HTMLElement>()

// 涟漪效果
if (props.ripple) {
  useRipple(buttonRef, {
    color: props.rippleColor,
    duration: 600,
  })
}

// 按钮样式
const buttonStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.glowColor) {
    styles['--button-glow-color'] = props.glowColor
  }
  
  return styles
})

// 点击处理
const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', evt)
}

const handleMousedown = (evt: MouseEvent) => {
  emit('mousedown', evt)
}

const handleMouseup = (evt: MouseEvent) => {
  emit('mouseup', evt)
}

const handleMouseenter = (evt: MouseEvent) => {
  emit('mouseenter', evt)
}

const handleMouseleave = (evt: MouseEvent) => {
  emit('mouseleave', evt)
}

const handleFocus = (evt: FocusEvent) => {
  emit('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  emit('blur', evt)
}
</script>

<style scoped>
.h-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  border: 1px solid transparent;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

/* 尺寸 */
.h-button--large {
  height: 40px;
  padding: 0 24px;
  font-size: 16px;
  border-radius: 8px;
}

.h-button--default {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 6px;
}

.h-button--small {
  height: 24px;
  padding: 0 12px;
  font-size: 12px;
  border-radius: 4px;
}

/* 类型 - 主要 */
.h-button--primary {
  background-color: var(--aura-color-primary-500);
  color: white;
  border-color: var(--aura-color-primary-500);
}

.h-button--primary:hover:not(.is-disabled) {
  background-color: var(--aura-color-primary-600);
  border-color: var(--aura-color-primary-600);
}

.h-button--primary.is-plain {
  background-color: transparent;
  color: var(--aura-color-primary-500);
}

.h-button--primary.is-plain:hover:not(.is-disabled) {
  background-color: var(--aura-color-primary-50);
}

/* 类型 - 成功 */
.h-button--success {
  background-color: var(--aura-color-success-500);
  color: white;
  border-color: var(--aura-color-success-500);
}

.h-button--success:hover:not(.is-disabled) {
  background-color: var(--aura-color-success-600);
  border-color: var(--aura-color-success-600);
}

/* 类型 - 警告 */
.h-button--warning {
  background-color: var(--aura-color-warning-500);
  color: white;
  border-color: var(--aura-color-warning-500);
}

.h-button--warning:hover:not(.is-disabled) {
  background-color: var(--aura-color-warning-600);
  border-color: var(--aura-color-warning-600);
}

/* 类型 - 危险 */
.h-button--danger {
  background-color: var(--aura-color-danger-500);
  color: white;
  border-color: var(--aura-color-danger-500);
}

.h-button--danger:hover:not(.is-disabled) {
  background-color: var(--aura-color-danger-600);
  border-color: var(--aura-color-danger-600);
}

/* 类型 - 默认 */
.h-button--default {
  background-color: white;
  color: var(--aura-text-primary);
  border-color: var(--aura-border-default);
}

.h-button--default:hover:not(.is-disabled) {
  border-color: var(--aura-color-primary-500);
  color: var(--aura-color-primary-500);
}

/* 类型 - 文字 */
.h-button--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--aura-color-primary-500);
  padding-left: 0;
  padding-right: 0;
}

.h-button--text:hover:not(.is-disabled) {
  color: var(--aura-color-primary-600);
}

/* 类型 - 链接 */
.h-button--link {
  background-color: transparent;
  border-color: transparent;
  color: var(--aura-color-primary-500);
  text-decoration: underline;
}

/* 形状 */
.h-button.is-round {
  border-radius: 9999px;
}

.h-button.is-circle {
  border-radius: 50%;
  padding: 0;
}

.h-button--large.is-circle {
  width: 40px;
}

.h-button--default.is-circle {
  width: 32px;
}

.h-button--small.is-circle {
  width: 24px;
}

/* 块级 */
.h-button.is-block {
  display: flex;
  width: 100%;
}

/* 禁用 */
.h-button.is-disabled,
.h-button.is-loading {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 加载图标 */
.h-button__loading-icon {
  display: inline-flex;
  margin-right: 6px;
}

.h-button__spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: h-button-spin 1s linear infinite;
}

@keyframes h-button-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 图标 */
.h-button__icon {
  display: inline-flex;
  margin-right: 6px;
}

.h-button.is-circle .h-button__icon,
.h-button.is-circle .h-button__loading-icon {
  margin-right: 0;
}

/* Haura 扩展 - 悬停上浮 */
.h-button.has-hover-lift:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Haura 扩展 - 悬停发光 */
.h-button.has-hover-glow:hover:not(.is-disabled) {
  box-shadow: 0 0 20px var(--button-glow-color, var(--aura-glow-primary));
}

/* Haura 扩展 - 点击缩放 */
.h-button.has-press-scale:active:not(.is-disabled) {
  transform: scale(0.95);
}

/* Haura 扩展 - 玻璃效果 */
.h-button.is-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Haura 扩展 - 渐变 */
.h-button.is-gradient {
  background: linear-gradient(135deg, var(--aura-color-primary-500), var(--aura-color-primary-700));
}
</style>