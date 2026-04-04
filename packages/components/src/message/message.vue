<template>
  <transition
    name="h-message"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :class="[
        'h-message',
        `h-message--${type}`,
        {
          'is-center': center,
          'is-closable': showClose,
        },
      ]"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <!-- 图标 -->
      <span class="h-message__icon">
        <slot name="icon">
          <svg v-if="type === 'success'" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <svg v-else-if="type === 'error'" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </slot>
      </span>

      <!-- 内容 -->
      <span class="h-message__content">
        <slot>
          <span v-if="repeatNum > 1" class="h-message__badge">{{ repeatNum }}</span>
          {{ message }}
        </slot>
      </span>

      <!-- 关闭按钮 -->
      <span
        v-if="showClose"
        class="h-message__close"
        @click.stop="close"
      >
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { MessageOptions } from './message'

const props = withDefaults(defineProps<MessageOptions>(), {
  type: 'info',
  duration: 3000,
  showClose: false,
  center: false,
  offset: 20,
  repeatNum: 1,
})

const emit = defineEmits(['destroy', 'close'])

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

// 位置样式
const positionStyle = computed(() => {
  return {
    top: `${props.offset}px`,
  }
})

// 开始计时
const startTimer = () => {
  if (props.duration > 0 && !props.showClose) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

// 清除计时
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

// 关闭
const close = () => {
  visible.value = false
  clearTimer()
}

// 关闭回调
const onClose = () => {
  if (props.onClose) {
    props.onClose()
  }
  emit('close')
}

// 键盘关闭
const onKeydown = (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    close()
  }
}

onMounted(() => {
  visible.value = true
  startTimer()
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

// 暴露方法
defineExpose({
  visible,
  close,
})
</script>

<style scoped>
.h-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  transition: all 0.3s;
}

.h-message.is-center {
  justify-content: center;
}

/* 类型样式 */
.h-message--info {
  border-left: 4px solid var(--aura-color-primary-500);
}

.h-message--success {
  border-left: 4px solid var(--aura-color-success-500);
}

.h-message--warning {
  border-left: 4px solid var(--aura-color-warning-500);
}

.h-message--error {
  border-left: 4px solid var(--aura-color-danger-500);
}

/* 图标 */
.h-message__icon {
  display: flex;
  align-items: center;
  margin-right: 10px;
  flex-shrink: 0;
}

.h-message--info .h-message__icon {
  color: var(--aura-color-primary-500);
}

.h-message--success .h-message__icon {
  color: var(--aura-color-success-500);
}

.h-message--warning .h-message__icon {
  color: var(--aura-color-warning-500);
}

.h-message--error .h-message__icon {
  color: var(--aura-color-danger-500);
}

/* 内容 */
.h-message__content {
  flex: 1;
  font-size: 14px;
  color: var(--aura-text-primary);
  line-height: 1.5;
}

/* 徽章 */
.h-message__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  margin-right: 8px;
  background-color: var(--aura-color-danger-500);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9px;
}

/* 关闭按钮 */
.h-message__close {
  display: flex;
  align-items: center;
  margin-left: 12px;
  color: var(--aura-text-tertiary);
  cursor: pointer;
  transition: color 0.2s;
  flex-shrink: 0;
}

.h-message__close:hover {
  color: var(--aura-text-primary);
}

/* 动画 */
.h-message-enter-active,
.h-message-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-message-enter-from,
.h-message-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>