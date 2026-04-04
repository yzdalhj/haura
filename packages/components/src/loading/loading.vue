<template>
  <Transition name="h-loading-fade">
    <div
      v-show="visible"
      :class="[
        'h-loading',
        {
          'is-fullscreen': fullscreen,
          'is-absolute': !fullscreen && isAbsolute,
        },
        customClass,
      ]"
      :style="loadingStyle"
    >
      <div
        class="h-loading__mask"
        :style="maskStyle"
      />

      <div class="h-loading__wrapper">
        <div v-if="text && textPosition === 'top'" class="h-loading__text h-loading__text--top">
          {{ text }}
        </div>

        <div class="h-loading__spinner">
          <template v-if="icon">
            <component v-if="typeof icon !== 'string'" :is="icon" class="h-loading__icon" />
            <i v-else :class="icon" class="h-loading__icon" />
          </template>

          <template v-else-if="svg">
            <svg :viewBox="svgViewBox || '0 0 50 50'" v-html="svg" class="h-loading__svg" />
          </template>

          <template v-else>
            <div v-if="type === 'spinner'" class="h-loading__spinner-default">
              <svg viewBox="0 0 50 50">
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  :stroke="spinnerColor"
                  stroke-width="4"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div v-else-if="type === 'dots'" class="h-loading__dots">
              <span v-for="i in 3" :key="i" :style="{ backgroundColor: spinnerColor }" />
            </div>

            <div v-else-if="type === 'pulse'" class="h-loading__pulse">
              <span :style="{ borderColor: spinnerColor }" />
            </div>

            <div v-else-if="type === 'bars'" class="h-loading__bars">
              <span v-for="i in 4" :key="i" :style="{ backgroundColor: spinnerColor }" />
            </div>

            <div v-else-if="type === 'ring'" class="h-loading__ring">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke-width="8"
                  :stroke="spinnerColor"
                  opacity="0.2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke-width="8"
                  :stroke="spinnerColor"
                  stroke-linecap="round"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="dashOffset"
                />
              </svg>
            </div>

            <div v-else-if="type === 'progress'" class="h-loading__progress">
              <svg viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke-width="8"
                  :stroke="spinnerColor"
                  opacity="0.15"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke-width="8"
                  :stroke="spinnerColor"
                  stroke-linecap="round"
                  :stroke-dasharray="progressCircumference"
                  :stroke-dashoffset="progressDashOffset"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <span v-if="showProgress" class="h-loading__progress-value">
                {{ Math.round(currentProgress) }}%
              </span>
            </div>
          </template>
        </div>

        <div
          v-if="text && (textPosition === 'bottom' || textPosition === 'right')"
          :class="['h-loading__text', `h-loading__text--${textPosition}`]"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import { loadingPropsDefaults, loadingSizePresets } from './loading'
import type { LoadingProps, LoadingEmits } from './loading'

const props = withDefaults(defineProps<LoadingProps>(), loadingPropsDefaults)

const emit = defineEmits<LoadingEmits>()

const visible = ref(false)
const isAbsolute = ref(false)
const currentProgress = ref(0)

let minDisplayTimer: ReturnType<typeof setTimeout> | null = null
let startTime = 0

const circumference = 2 * Math.PI * 40
const progressCircumference = 2 * Math.PI * 52

const spinnerColor = computed(() => {
  return props.color || 'var(--aura-color-primary-500)'
})

const spinnerSize = computed(() => {
  if (props.spinnerSize) {
    return typeof props.spinnerSize === 'number' ? `${props.spinnerSize}px` : props.spinnerSize
  }
  return `${loadingSizePresets[props.size]}px`
})

const dashOffset = computed(() => {
  return circumference * 0.75
})

const progressDashOffset = computed(() => {
  return progressCircumference * (1 - currentProgress.value / 100)
})

const loadingStyle = computed<CSSProperties>(() => ({
  '--loading-size': spinnerSize.value,
  '--loading-duration': `${props.duration}ms`,
  zIndex: props.zIndex ?? 2000,
  ...props.customStyle,
}))

const maskStyle = computed<CSSProperties>(() => ({
  backgroundColor: props.background || 'var(--aura-bg-base, #ffffff)',
  opacity: props.backgroundOpacity,
}))

const open = () => {
  startTime = Date.now()
  visible.value = true
}

const close = () => {
  const elapsed = Date.now() - startTime
  const remaining = props.minimumDisplayTime - elapsed

  if (remaining > 0) {
    minDisplayTimer = setTimeout(() => {
      visible.value = false
    }, remaining)
  } else {
    visible.value = false
  }
}

const setProgress = (progress: number) => {
  currentProgress.value = Math.min(100, Math.max(0, progress))
  emit('update:progress', currentProgress.value)
}

const setText = (text: string) => {}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      open()
    } else {
      close()
    }
  },
  { immediate: true }
)

watch(
  () => props.progress,
  (val) => {
    if (props.type === 'progress') {
      currentProgress.value = val
    }
  },
  { immediate: true }
)

watch(
  () => props.visible,
  (val) => {
    if (val !== undefined) {
      visible.value = val
    }
  },
  { immediate: true }
)

const lockBodyScroll = () => {
  if (props.fullscreen && props.lock) {
    document.body.style.overflow = 'hidden'
  }
}

const unlockBodyScroll = () => {
  if (props.fullscreen && props.lock) {
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  if (visible.value) {
    lockBodyScroll()
  }
})

onUnmounted(() => {
  if (minDisplayTimer) {
    clearTimeout(minDisplayTimer)
  }
  unlockBodyScroll()
})

watch(visible, (val) => {
  if (val) {
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
})

defineExpose({
  open,
  close,
  setProgress,
  setText,
  visible,
})
</script>

<style scoped>
.h-loading {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.h-loading.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 2000;
}

.h-loading.is-absolute {
  position: absolute;
  inset: 0;
}

.h-loading__mask {
  position: absolute;
  inset: 0;
  transition: opacity 0.3s;
}

.h-loading__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1;
}

.h-loading__spinner {
  width: var(--loading-size);
  height: var(--loading-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-loading__spinner svg,
.h-loading__svg {
  width: 100%;
  height: 100%;
  animation: h-loading-rotate 1.5s linear infinite;
}

.h-loading__spinner circle {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: h-loading-dash 1.5s ease-in-out infinite;
}

.h-loading__spinner-default {
  width: 100%;
  height: 100%;
}

.h-loading__dots {
  display: flex;
  gap: 6px;
}

.h-loading__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: h-loading-dots 1.4s infinite ease-in-out both;
}

.h-loading__dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.h-loading__dots span:nth-child(2) {
  animation-delay: -0.16s;
}

.h-loading__pulse {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.h-loading__pulse span {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 3px solid;
  animation: h-loading-pulse 1.2s ease-out infinite;
}

.h-loading__bars {
  display: flex;
  gap: 4px;
  height: 100%;
  align-items: flex-end;
}

.h-loading__bars span {
  width: 6px;
  height: 60%;
  border-radius: 3px;
  animation: h-loading-bars 1.2s ease-in-out infinite;
}

.h-loading__bars span:nth-child(1) {
  animation-delay: -0.4s;
}

.h-loading__bars span:nth-child(2) {
  animation-delay: -0.3s;
}

.h-loading__bars span:nth-child(3) {
  animation-delay: -0.2s;
}

.h-loading__bars span:nth-child(4) {
  animation-delay: -0.1s;
}

.h-loading__ring {
  width: 100%;
  height: 100%;
}

.h-loading__ring svg {
  animation: h-loading-rotate 1s linear infinite;
}

.h-loading__progress {
  position: relative;
  width: 100%;
  height: 100%;
}

.h-loading__progress svg {
  width: 100%;
  height: 100%;
}

.h-loading__progress-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--loading-size) * 0.28);
  font-weight: 600;
  color: var(--aura-color-primary-500);
}

.h-loading__text {
  font-size: 14px;
  color: var(--aura-text-secondary);
  white-space: nowrap;
}

.h-loading__text--top {
  order: -1;
}

.h-loading__text--right {
  margin-left: 12px;
  margin-top: 0;
}

@keyframes h-loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes h-loading-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes h-loading-dots {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes h-loading-pulse {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes h-loading-bars {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

.h-loading-fade-enter-active,
.h-loading-fade-leave-active {
  transition: opacity var(--loading-duration, 300ms) ease;
}

.h-loading-fade-enter-from,
.h-loading-fade-leave-to {
  opacity: 0;
}
</style>