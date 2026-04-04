<template>
  <Teleport :to="teleportTarget" :disabled="!appendToBody && !appendTo">
    <Transition
      name="h-drawer-fade"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="visible"
        ref="drawerWrapperRef"
        :class="[
          'h-drawer-wrapper',
          `h-drawer-wrapper--${computedPlacement}`,
          {
            'is-modal': modal,
            'is-glass': glass,
            'is-center': alignCenter || center,
          },
        ]"
        :style="wrapperStyle"
        @click.self="handleWrapperClick"
      >
        <div
          v-if="modal"
          ref="modalRef"
          :class="['h-drawer__modal', modalClass]"
          :style="modalStyle"
          @click="handleModalClick"
        />

        <div
          ref="drawerRef"
          :class="[
            'h-drawer',
            `h-drawer--${computedPlacement}`,
            `h-drawer--${size}`,
            {
              'is-open': visible && !isDragging,
              'is-dragging': isDragging,
              'has-header': computedShowHeader,
              'has-footer': showFooter,
              'is-overflow': overflow,
            },
            drawerClass,
          ]"
          :style="drawerStyleComputed"
          role="dialog"
          :aria-modal="modal"
          :aria-label="title"
          @mousedown="handleDrawerMousedown"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div v-if="computedShowHeader" :class="['h-drawer__header', headerClass]" :style="headerStyle">
            <slot name="header">
              <div class="h-drawer__title">
                <slot name="title">{{ title }}</slot>
              </div>
            </slot>

            <button
              v-if="closable && closePosition === 'header'"
              type="button"
              class="h-drawer__close"
              aria-label="关闭"
              @click="handleClose"
            >
              <slot name="close">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </slot>
            </button>
          </div>

          <button
            v-if="closable && closePosition === 'inside'"
            type="button"
            class="h-drawer__close h-drawer__close--inside"
            aria-label="关闭"
            @click="handleClose"
          >
            <slot name="close">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </slot>
          </button>

          <button
            v-if="closable && closePosition === 'outside'"
            type="button"
            class="h-drawer__close h-drawer__close--outside"
            aria-label="关闭"
            @click="handleClose"
          >
            <slot name="close">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </slot>
          </button>

          <div :class="['h-drawer__body', bodyClass]" :style="bodyStyle">
            <slot />
          </div>

          <div v-if="showFooter" :class="['h-drawer__footer', footerClass]" :style="footerStyle">
            <slot name="footer" :close="handleClose" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { CSSProperties } from 'vue'
import { drawerPropsDefaults, drawerSizePresets } from './drawer'
import type { DrawerProps, DrawerEmits, DrawerPlacement, DrawerDirection } from './drawer'

const props = withDefaults(defineProps<DrawerProps>(), drawerPropsDefaults)

const emit = defineEmits<DrawerEmits>()

const drawerWrapperRef = ref<HTMLElement>()
const drawerRef = ref<HTMLElement>()
const modalRef = ref<HTMLElement>()

const visible = ref(false)
const isDragging = ref(false)
const dragOffset = ref(0)

let touchStartX = 0
let touchStartY = 0
let touchCurrentX = 0
let touchCurrentY = 0

let scrollBarWidth = 0
let originalBodyOverflow = ''
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

const computedPlacement = computed<DrawerPlacement>(() => {
  if (props.placement) return props.placement
  const dir = props.direction
  if (dir === 'ltr') return 'left'
  if (dir === 'rtl') return 'right'
  if (dir === 'ttb') return 'top'
  if (dir === 'btt') return 'bottom'
  return 'right'
})

const computedShowHeader = computed(() => {
  return props.showHeader ?? props.withHeader ?? true
})

const teleportTarget = computed(() => {
  if (props.appendTo) {
    if (typeof props.appendTo === 'string') {
      return document.querySelector(props.appendTo) || 'body'
    }
    return props.appendTo
  }
  return 'body'
})

const sizeComputed = computed(() => {
  const preset = drawerSizePresets[props.size]

  if (computedPlacement.value === 'left' || computedPlacement.value === 'right') {
    const w = props.width ?? preset.width
    return {
      width: typeof w === 'number' ? `${w}px` : w,
      height: '100%',
    }
  } else {
    const h = props.height ?? preset.height
    return {
      width: '100%',
      height: typeof h === 'number' ? `${h}px` : h,
    }
  }
})

const wrapperStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex ?? 2000,
  '--drawer-duration': `${props.duration}ms`,
  '--drawer-easing': props.easing,
}))

const drawerStyleComputed = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    ...sizeComputed.value,
    ...props.drawerStyle,
  }

  if (props.offset) {
    switch (computedPlacement.value) {
      case 'left':
        styles.marginLeft = `${props.offset}px`
        break
      case 'right':
        styles.marginRight = `${props.offset}px`
        break
      case 'top':
        styles.marginTop = `${props.offset}px`
        break
      case 'bottom':
        styles.marginBottom = `${props.offset}px`
        break
    }
  }

  if (isDragging.value && dragOffset.value !== 0) {
    switch (computedPlacement.value) {
      case 'left':
        styles.transform = `translateX(${-dragOffset.value}px)`
        break
      case 'right':
        styles.transform = `translateX(${dragOffset.value}px)`
        break
      case 'top':
        styles.transform = `translateY(${-dragOffset.value}px)`
        break
      case 'bottom':
        styles.transform = `translateY(${dragOffset.value}px)`
        break
    }
  }

  return styles
})

const lockBodyScroll = () => {
  if (!props.lockScroll) return
  originalBodyOverflow = document.body.style.overflow
  scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`
  }
}

const unlockBodyScroll = () => {
  document.body.style.overflow = originalBodyOverflow
  document.body.style.paddingRight = ''
}

const open = () => {
  if (openTimer) clearTimeout(openTimer)
  if (closeTimer) clearTimeout(closeTimer)

  if (props.openDelay && props.openDelay > 0) {
    openTimer = setTimeout(() => {
      visible.value = true
    }, props.openDelay)
  } else {
    visible.value = true
  }
}

const close = () => {
  if (openTimer) clearTimeout(openTimer)
  if (closeTimer) clearTimeout(closeTimer)

  if (props.closeDelay && props.closeDelay > 0) {
    closeTimer = setTimeout(() => {
      doClose()
    }, props.closeDelay)
  } else {
    doClose()
  }
}

const doClose = () => {
  if (props.beforeClose) {
    props.beforeClose(() => {
      visible.value = false
    })
  } else {
    visible.value = false
  }
}

const handleClose = () => {
  emit('close')
  close()
}

const handleModalClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

const handleWrapperClick = (e: MouseEvent) => {
  if (e.target === drawerWrapperRef.value && props.closeOnClickModal) {
    handleClose()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnPressEscape && visible.value) {
    handleClose()
  }
}

const handleTouchStart = (e: TouchEvent) => {
  if (!props.gestureDrag) return
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  touchCurrentX = touchStartX
  touchCurrentY = touchStartY
  emit('touchstart', e)
}

const handleTouchMove = (e: TouchEvent) => {
  if (!props.gestureDrag) return

  touchCurrentX = e.touches[0].clientX
  touchCurrentY = e.touches[0].clientY

  const deltaX = touchCurrentX - touchStartX
  const deltaY = touchCurrentY - touchStartY

  let isValidDirection = false
  let offset = 0

  switch (computedPlacement.value) {
    case 'left':
      isValidDirection = deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)
      offset = Math.abs(deltaX)
      break
    case 'right':
      isValidDirection = deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)
      offset = Math.abs(deltaX)
      break
    case 'top':
      isValidDirection = deltaY < 0 && Math.abs(deltaY) > Math.abs(deltaX)
      offset = Math.abs(deltaY)
      break
    case 'bottom':
      isValidDirection = deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX)
      offset = Math.abs(deltaY)
      break
  }

  if (isValidDirection) {
    isDragging.value = true
    dragOffset.value = Math.max(0, offset)
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!props.gestureDrag || !isDragging.value) return
  emit('touchend', e)

  const drawerSize = getDrawerSize()
  const threshold = drawerSize * props.gestureThreshold

  isDragging.value = false

  if (dragOffset.value > threshold) {
    handleClose()
  }

  dragOffset.value = 0
}

const handleDrawerMousedown = (e: MouseEvent) => {
  emit('mousedown', e)
}

const getDrawerSize = () => {
  if (!drawerRef.value) return 0

  switch (computedPlacement.value) {
    case 'left':
    case 'right':
      return drawerRef.value.offsetWidth
    case 'top':
    case 'bottom':
      return drawerRef.value.offsetHeight
    default:
      return 0
  }
}

const onBeforeEnter = () => {
  lockBodyScroll()
  emit('open')
}

const onAfterEnter = () => {
  emit('opened')
}

const onBeforeLeave = () => {
  emit('close')
}

const onAfterLeave = () => {
  unlockBodyScroll()
  emit('closed')
}

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

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (openTimer) clearTimeout(openTimer)
  if (closeTimer) clearTimeout(closeTimer)
  unlockBodyScroll()
})

defineExpose({
  open,
  close,
  visible,
})
</script>

<style scoped>
.h-drawer-wrapper {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.h-drawer-wrapper.is-modal {
  pointer-events: auto;
}

.h-drawer__modal {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity var(--drawer-duration, 300ms) var(--drawer-easing, cubic-bezier(0.4, 0, 0.2, 1));
}

.h-drawer-wrapper.is-glass .h-drawer__modal {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

.h-drawer {
  position: absolute;
  background-color: var(--aura-bg-elevated, #ffffff);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform var(--drawer-duration, 300ms) var(--drawer-easing, cubic-bezier(0.4, 0, 0.2, 1));
}

.h-drawer.is-overflow {
  overflow: visible;
}

.h-drawer--left {
  left: 0;
  top: 0;
  bottom: 0;
  transform: translateX(-100%);
}

.h-drawer--right {
  right: 0;
  top: 0;
  bottom: 0;
  transform: translateX(100%);
}

.h-drawer--top {
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);
}

.h-drawer--bottom {
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(100%);
}

.h-drawer.is-open {
  transform: translateX(0) translateY(0);
}

.h-drawer.is-dragging {
  transition: none;
}

.h-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--aura-border-default, #e5e5e5);
  flex-shrink: 0;
}

.h-drawer__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--aura-text-primary, #171717);
  margin: 0;
  line-height: 1.5;
}

.h-drawer__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--aura-text-tertiary, #737373);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.h-drawer__close:hover {
  background-color: var(--aura-bg-elevated, #f5f5f5);
  color: var(--aura-text-primary, #171717);
}

.h-drawer__close--inside {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}

.h-drawer__close--outside {
  position: absolute;
  top: 8px;
  left: -40px;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.h-drawer--left .h-drawer__close--outside {
  left: auto;
  right: -40px;
}

.h-drawer--top .h-drawer__close--outside {
  top: auto;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
}

.h-drawer--bottom .h-drawer__close--outside {
  top: -40px;
  bottom: auto;
  left: 50%;
  transform: translateX(-50%);
}

.h-drawer__body {
  flex: 1;
  padding: 20px;
  overflow: auto;
  color: var(--aura-text-primary, #171717);
}

.h-drawer__footer {
  padding: 16px 20px;
  border-top: 1px solid var(--aura-border-default, #e5e5e5);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.h-drawer-fade-enter-active,
.h-drawer-fade-leave-active {
  transition: opacity var(--drawer-duration, 300ms) var(--drawer-easing, cubic-bezier(0.4, 0, 0.2, 1));
}

.h-drawer-fade-enter-active .h-drawer,
.h-drawer-fade-leave-active .h-drawer {
  transition: transform var(--drawer-duration, 300ms) var(--drawer-easing, cubic-bezier(0.4, 0, 0.2, 1));
}

.h-drawer-fade-enter-from,
.h-drawer-fade-leave-to {
  opacity: 0;
}

.h-drawer--small.h-drawer--left,
.h-drawer--small.h-drawer--right {
  width: 300px;
}

.h-drawer--default.h-drawer--left,
.h-drawer--default.h-drawer--right {
  width: 400px;
}

.h-drawer--large.h-drawer--left,
.h-drawer--large.h-drawer--right {
  width: 600px;
}

.h-drawer--full.h-drawer--left,
.h-drawer--full.h-drawer--right {
  width: 100%;
}

.h-drawer--small.h-drawer--top,
.h-drawer--small.h-drawer--bottom {
  height: 200px;
}

.h-drawer--default.h-drawer--top,
.h-drawer--default.h-drawer--bottom {
  height: 300px;
}

.h-drawer--large.h-drawer--top,
.h-drawer--large.h-drawer--bottom {
  height: 400px;
}

.h-drawer--full.h-drawer--top,
.h-drawer--full.h-drawer--bottom {
  height: 100%;
}
</style>