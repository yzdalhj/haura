<template>
  <div
    :class="[
      'h-card',
      `h-card--${size}`,
      {
        'is-hoverable': hoverable,
        'is-bordered': bordered,
        'has-glass': glass,
        'has-glow': glow,
      },
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 头部 -->
    <div v-if="$slots.header || title" class="h-card__header">
      <slot name="header">
        <span class="h-card__title">{{ title }}</span>
        <span v-if="extra" class="h-card__extra">{{ extra }}</span>
      </slot>
    </div>

    <!-- 封面 -->
    <div v-if="$slots.cover" class="h-card__cover">
      <slot name="cover" />
    </div>

    <!-- 内容 -->
    <div class="h-card__body" :style="bodyStyle">
      <slot />
    </div>

    <!-- 底部 -->
    <div v-if="$slots.footer" class="h-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  extra: { type: String, default: '' },
  size: { type: String, default: 'default' },
  hoverable: { type: Boolean, default: true },
  bordered: { type: Boolean, default: true },
  glass: { type: Boolean, default: false },
  glow: { type: Boolean, default: false },
  padding: { type: [String, Number], default: undefined },
})

const emit = defineEmits(['mouseenter', 'mouseleave'])

const bodyStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.padding !== undefined) {
    style.padding = typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  }
  return style
})

const handleMouseEnter = (evt: MouseEvent) => {
  emit('mouseenter', evt)
}

const handleMouseLeave = (evt: MouseEvent) => {
  emit('mouseleave', evt)
}
</script>

<style scoped>
.h-card {
  position: relative;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-card.is-bordered {
  border: 1px solid var(--aura-border-default);
}

.h-card.is-hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.h-card.has-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.h-card.has-glow:hover {
  box-shadow: 0 0 30px var(--aura-glow-primary);
}

/* 头部 */
.h-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--aura-border-default);
}

.h-card__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--aura-text-primary);
}

.h-card__extra {
  font-size: 14px;
  color: var(--aura-text-secondary);
}

/* 封面 */
.h-card__cover {
  width: 100%;
  overflow: hidden;
}

.h-card__cover img {
  width: 100%;
  height: auto;
  display: block;
}

/* 内容 */
.h-card__body {
  padding: 20px;
}

/* 底部 */
.h-card__footer {
  padding: 12px 20px;
  border-top: 1px solid var(--aura-border-default);
  background-color: var(--aura-neutral-50);
}

/* 尺寸 */
.h-card--small .h-card__body {
  padding: 12px;
}

.h-card--large .h-card__body {
  padding: 28px;
}
</style>