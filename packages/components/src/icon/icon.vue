<template>
  <span
    :class="[
      'h-icon',
      {
        'is-spin': spin,
        'is-pulse': pulse,
        'has-hover-scale': hoverScale,
        'has-hover-rotate': hoverRotate,
        'has-click-bounce': clickBounce,
      },
    ]"
    :style="iconStyle"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <i
      v-if="name"
      :class="name"
    />
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconProps, iconEmits } from './icon'

const props = defineProps(iconProps)
const emit = defineEmits(iconEmits)

// 图标样式
const iconStyle = computed(() => {
  const styles: Record<string, string> = {
    transition: `all ${props.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  }

  // 尺寸
  if (typeof props.size === 'number') {
    styles.fontSize = `${props.size}px`
  } else {
    switch (props.size) {
      case 'large':
        styles.fontSize = '24px'
        break
      case 'small':
        styles.fontSize = '16px'
        break
      default:
        styles.fontSize = '20px'
    }
  }

  // 颜色
  if (props.color && props.color !== 'inherit') {
    styles.color = props.color
  }

  return styles
})

// 事件处理
const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

const handleMouseenter = (evt: MouseEvent) => {
  emit('mouseenter', evt)
}

const handleMouseleave = (evt: MouseEvent) => {
  emit('mouseleave', evt)
}
</script>

<style scoped>
.h-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  position: relative;
}

.h-icon > i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 旋转动画 */
.h-icon.is-spin {
  animation: h-icon-spin 1s linear infinite;
}

@keyframes h-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 脉冲动画 */
.h-icon.is-pulse {
  animation: h-icon-pulse 2s ease-in-out infinite;
}

@keyframes h-icon-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 悬停缩放 */
.h-icon.has-hover-scale:hover {
  transform: scale(1.2);
}

/* 悬停旋转 */
.h-icon.has-hover-rotate:hover {
  transform: rotate(15deg);
}

/* 点击弹跳 */
.h-icon.has-click-bounce:active {
  animation: h-icon-bounce 0.3s ease;
}

@keyframes h-icon-bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
}
</style>