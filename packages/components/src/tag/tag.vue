<template>
  <transition name="h-tag">
    <span
      v-if="!closed"
      :class="[
        'h-tag',
        `h-tag--${type}`,
        `h-tag--${size}`,
        {
          'is-plain': plain,
          'is-round': round,
          'is-closable': closable,
        },
      ]"
      @click="handleClick"
    >
      <slot />
      <i
        v-if="closable"
        class="h-tag__close"
        @click.stop="handleClose"
      >
        <svg viewBox="0 0 24 24" width="12" height="12">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </i>
    </span>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Transition } from 'vue'

const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  plain: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
})

const emit = defineEmits(['click', 'close'])

const closed = ref(false)

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

const handleClose = (evt: MouseEvent) => {
  closed.value = true
  emit('close', evt)
}
</script>

<style scoped>
.h-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 1;
  border-radius: 4px;
  background-color: var(--aura-neutral-100);
  color: var(--aura-text-primary);
  transition: all 0.2s;
}

/* 类型 */
.h-tag--default {
  background-color: var(--aura-neutral-100);
  color: var(--aura-text-primary);
}

.h-tag--primary {
  background-color: var(--aura-color-primary-100);
  color: var(--aura-color-primary-600);
}

.h-tag--success {
  background-color: var(--aura-color-success-100);
  color: var(--aura-color-success-600);
}

.h-tag--warning {
  background-color: var(--aura-color-warning-100);
  color: var(--aura-color-warning-600);
}

.h-tag--danger {
  background-color: var(--aura-color-danger-100);
  color: var(--aura-color-danger-600);
}

/* 朴素 */
.h-tag.is-plain {
  background-color: transparent;
  border: 1px solid currentColor;
}

/* 圆角 */
.h-tag.is-round {
  border-radius: 9999px;
}

/* 尺寸 */
.h-tag--large {
  padding: 6px 16px;
  font-size: 14px;
}

.h-tag--small {
  padding: 2px 8px;
  font-size: 11px;
}

/* 关闭按钮 */
.h-tag__close {
  display: inline-flex;
  margin-left: 6px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.h-tag__close:hover {
  opacity: 1;
}

/* 动画 */
.h-tag-enter-active,
.h-tag-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.h-tag-enter-from,
.h-tag-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>