<template>
  <Teleport :to="teleportTarget" :disabled="!appendToBody && !appendTo">
    <Transition
      name="h-dialog-fade"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="visible"
        ref="wrapperRef"
        :class="[
          'h-dialog-wrapper',
          {
            'is-modal': modal,
            'is-center': alignCenter || center,
            'is-glass': glass,
          },
        ]"
        :style="wrapperStyle"
      >
        <div
          v-if="overlay && modal"
          ref="modalRef"
          :class="['h-dialog__modal', modalClass]"
          :style="modalStyle"
          @click="handleModalClick"
        />

        <div
          ref="dialogRef"
          :class="[
            'h-dialog',
            `h-dialog--${size}`,
            `h-dialog--animation-${animation}`,
            {
              'is-fullscreen': isMaximized,
              'is-minimized': isMinimized,
              'is-sticked': isSticked,
              'is-dragging': isDragging,
              'is-resizing': isResizing,
              'is-glass': glass,
              'has-shadow': shadow === true || shadow === 'always',
              'has-shadow-hover': shadow === 'hover',
              'is-round': round,
            },
            customClass,
          ]"
          :style="dialogStyleComputed"
          role="dialog"
          :aria-modal="modal"
          :aria-label="title"
        >
          <div
            v-if="showHeader"
            ref="headerRef"
            :class="['h-dialog__header', headerClass]"
            :style="headerStyle"
            @mousedown="handleDragStart"
          >
            <div class="h-dialog__title">
              <slot name="title">{{ title }}</slot>
            </div>

            <div class="h-dialog__header-actions">
              <button
                v-if="stickable"
                type="button"
                class="h-dialog__action-btn"
                @click="handleStick"
              >
                <svg v-if="isSticked" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 13H5v-2h14v2z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>

              <button
                v-if="minimizable"
                type="button"
                class="h-dialog__action-btn"
                @click="handleMinimize"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 13H5v-2h14v2z"/>
                </svg>
              </button>

              <button
                v-if="maximizable"
                type="button"
                class="h-dialog__action-btn"
                @click="handleMaximize"
              >
                <svg v-if="isMaximized" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M5 16h3v3h2V14H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                </svg>
              </button>

              <button
                v-if="showClose"
                type="button"
                class="h-dialog__close"
                @click="handleClose"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          <div :class="['h-dialog__body', bodyClass]" :style="bodyStyle">
            <slot>
              <component
                v-if="component"
                :is="component"
                ref="componentRef"
                v-bind="componentProps"
                v-on="componentEmits"
              />
              <div v-else-if="dangerouslyUseHTMLString" v-html="content as string" />
              <template v-else>{{ content }}</template>
            </slot>

            <div v-if="isPrompt" class="h-dialog__prompt">
              <input
                ref="inputRef"
                v-model="inputValueModel"
                :type="inputType"
                :placeholder="inputPlaceholder"
                :class="['h-dialog__input', inputClass, { 'is-error': inputError }]"
                :style="inputStyle"
                @keydown.enter="handleConfirm"
              />
              <div v-if="inputError" class="h-dialog__input-error">
                {{ inputError }}
              </div>
            </div>
          </div>

          <div v-if="showFooter" :class="['h-dialog__footer', footerClass]" :style="footerStyle">
            <slot name="footer">
              <template v-if="buttons && buttons.length > 0">
                <HButton
                  v-for="(btn, index) in visibleButtons"
                  :key="index"
                  :type="btn.type || 'default'"
                  :plain="btn.plain"
                  :round="btn.round ?? round"
                  :disabled="btn.disabled"
                  :loading="btn.loading"
                  @click="handleButtonClick(btn)"
                >
                  {{ btn.text }}
                </HButton>
              </template>
              <template v-else>
                <HButton
                  v-if="showCancel"
                  :type="cancelType"
                  :round="round"
                  :loading="cancelLoading"
                  @click="handleCancel"
                >
                  {{ cancelText }}
                </HButton>
                <HButton
                  v-if="showConfirm"
                  :type="confirmType"
                  :round="round"
                  :loading="confirmLoading"
                  @click="handleConfirm"
                >
                  {{ confirmText }}
                </HButton>
              </template>
            </slot>
          </div>

          <div
            v-if="resizable && !isMaximized"
            class="h-dialog__resize-handle"
            @mousedown="handleResizeStart"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, provide, type Component, type CSSProperties } from 'vue'
import { dialogPropsDefaults, dialogSizePresets } from './dialog'
import type { DialogProps, DialogEmits, DialogInstance, DialogButton, DialogSize } from './dialog'
import HButton from '../button/button.vue'

const props = withDefaults(defineProps<DialogProps>(), dialogPropsDefaults)

const emit = defineEmits<DialogEmits>()

const wrapperRef = ref<HTMLElement>()
const dialogRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const modalRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const componentRef = ref<any>()

const visible = ref(false)
const isDragging = ref(false)
const isResizing = ref(false)
const isMaximized = ref(false)
const isMinimized = ref(false)
const isSticked = ref(false)
const confirmLoading = ref(false)
const cancelLoading = ref(false)

const dragX = ref(0)
const dragY = ref(0)
const resizeWidth = ref<number | null>(null)
const resizeHeight = ref<number | null>(null)

const inputValueModel = ref(props.inputValue ?? '')
const inputError = ref('')

let dragStartX = 0
let dragStartY = 0
let dragStartLeft = 0
let dragStartTop = 0
let resizeStartX = 0
let resizeStartY = 0
let resizeStartWidth = 0
let resizeStartHeight = 0

let originalBodyOverflow = ''
let scrollBarWidth = 0
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

const isPrompt = computed(() => props.inputType !== undefined || props.inputPlaceholder !== undefined)

const component = ref<Component | null>(null)
const componentProps = ref<Record<string, any>>({})
const componentEmits = ref<Record<string, any>>({})

const teleportTarget = computed(() => {
  if (props.appendTo) {
    if (typeof props.appendTo === 'string') {
      return document.querySelector(props.appendTo) || 'body'
    }
    return props.appendTo
  }
  return 'body'
})

const wrapperStyle = computed<CSSProperties>(() => ({
  zIndex: props.zIndex ?? 2000,
}))

const sizeWidth = computed(() => {
  if (props.width !== undefined) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.fullscreen || isMaximized.value) {
    return '100%'
  }
  if (resizeWidth.value !== null) {
    return `${resizeWidth.value}px`
  }
  return dialogSizePresets[props.size as DialogSize]?.width ?? '500px'
})

const dialogStyleComputed = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: sizeWidth.value,
    ...props.customStyle,
  }

  if (props.height !== undefined) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (resizeHeight.value !== null) {
    style.height = `${resizeHeight.value}px`
  }

  if (!isMaximized.value && !isMinimized.value) {
    if (props.alignCenter || props.center) {
      style.margin = 'auto'
    } else if (props.top !== undefined) {
      style.marginTop = typeof props.top === 'number' ? `${props.top}px` : props.top
    }
    if (props.left !== undefined) {
      style.marginLeft = typeof props.left === 'number' ? `${props.left}px` : props.left
    }
  }

  if (isDragging.value) {
    style.marginLeft = `${dragX.value}px`
    style.marginTop = `${dragY.value}px`
    style.position = 'relative'
  }

  if (isMinimized.value) {
    style.height = '48px'
    style.minHeight = '48px'
    style.overflow = 'hidden'
  }

  if (props.resizable) {
    style.minWidth = props.minWidth ? `${props.minWidth}px` : '300px'
    style.minHeight = props.minHeight ? `${props.minHeight}px` : '150px'
    if (props.maxWidth) style.maxWidth = `${props.maxWidth}px`
    if (props.maxHeight) style.maxHeight = `${props.maxHeight}px`
  }

  return style
})

const visibleButtons = computed(() => {
  if (!props.buttons) return []
  return props.buttons.filter(btn => btn.show !== false)
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
  visible.value = true
}

const close = () => {
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

const handleConfirm = () => {
  if (isPrompt.value) {
    const valid = validateInput()
    if (!valid) return
  }
  emit('confirm')
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleModalClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnPressEscape && visible.value && !isSticked.value) {
    handleClose()
  }
}

const handleDragStart = (e: MouseEvent) => {
  if (!props.draggable || isMaximized.value || isMinimized.value) return

  isDragging.value = true
  dragStartX = e.clientX
  dragStartY = e.clientY
  dragStartLeft = dragX.value
  dragStartTop = dragY.value

  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)

  emit('dragStart', { x: dragX.value, y: dragY.value })
}

const handleDragMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - dragStartX
  const deltaY = e.clientY - dragStartY

  dragX.value = dragStartLeft + deltaX
  dragY.value = dragStartTop + deltaY

  if (props.overflow === false) {
    const bounds = dialogRef.value?.parentElement?.getBoundingClientRect()
    const dialogBounds = dialogRef.value?.getBoundingClientRect()

    if (bounds && dialogBounds) {
      if (dragX.value < -dialogBounds.width / 2) {
        dragX.value = -dialogBounds.width / 2
      }
      if (dragX.value > bounds.width / 2) {
        dragX.value = bounds.width / 2
      }
      if (dragY.value < -dialogBounds.height / 2) {
        dragY.value = -dialogBounds.height / 2
      }
      if (dragY.value > bounds.height / 2) {
        dragY.value = bounds.height / 2
      }
    }
  }
}

const handleDragEnd = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)

  emit('dragEnd', { x: dragX.value, y: dragY.value })
}

const handleResizeStart = (e: MouseEvent) => {
  if (!props.resizable || isMaximized.value) return

  e.preventDefault()
  e.stopPropagation()

  isResizing.value = true
  resizeStartX = e.clientX
  resizeStartY = e.clientY
  resizeStartWidth = dialogRef.value?.offsetWidth ?? 0
  resizeStartHeight = dialogRef.value?.offsetHeight ?? 0

  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeEnd)

  emit('resizeStart', { width: resizeStartWidth, height: resizeStartHeight })
}

const handleResizeMove = (e: MouseEvent) => {
  if (!isResizing.value) return

  const deltaX = e.clientX - resizeStartX
  const deltaY = e.clientY - resizeStartY

  const newWidth = Math.max(props.minWidth ?? 300, resizeStartWidth + deltaX)
  const newHeight = Math.max(props.minHeight ?? 150, resizeStartHeight + deltaY)

  resizeWidth.value = newWidth
  resizeHeight.value = newHeight
}

const handleResizeEnd = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)

  emit('resizeEnd', { width: resizeWidth.value ?? 0, height: resizeHeight.value ?? 0 })
}

const handleMaximize = () => {
  if (isMaximized.value) {
    isMaximized.value = false
    emit('restore')
  } else {
    isMaximized.value = true
    emit('maximize')
  }
}

const handleMinimize = () => {
  isMinimized.value = true
  emit('minimize')
}

const handleStick = () => {
  if (isSticked.value) {
    isSticked.value = false
    emit('unstick')
  } else {
    isSticked.value = true
    emit('stick')
  }
}

const handleButtonClick = (btn: DialogButton) => {
  if (btn.onClick) {
    btn.onClick(getInstance())
  }
  if (btn.action === 'confirm') {
    handleConfirm()
  } else if (btn.action === 'cancel') {
    handleCancel()
  } else if (btn.action === 'close') {
    handleClose()
  }
}

const validateInput = (): boolean => {
  const value = inputValueModel.value

  if (props.inputValueRequired && !value) {
    inputError.value = props.inputErrorMessage ?? '此项为必填项'
    return false
  }

  if (props.inputPattern && !props.inputPattern.test(String(value))) {
    inputError.value = props.inputErrorMessage ?? '格式不正确'
    return false
  }

  if (props.inputValidator) {
    const result = props.inputValidator(value)
    if (result === false) {
      inputError.value = props.inputErrorMessage ?? '验证失败'
      return false
    }
    if (typeof result === 'string') {
      inputError.value = result
      return false
    }
  }

  inputError.value = ''
  return true
}

const setTitle = (title: string) => {
  props.title = title
}

const setContent = (content: string) => {
  props.content = content
}

const setConfirmLoading = (loading: boolean) => {
  confirmLoading.value = loading
}

const setCancelLoading = (loading: boolean) => {
  cancelLoading.value = loading
}

const getInstance = (): DialogInstance => ({
  id: 'dialog',
  visible,
  close: handleClose,
  open: () => { visible.value = true },
  confirm: handleConfirm,
  cancel: handleCancel,
  setConfirmLoading,
  setCancelLoading,
  setTitle,
  setContent,
  maximize: handleMaximize,
  minimize: handleMinimize,
  restore: () => { isMaximized.value = false; isMinimized.value = false },
  stick: () => { isSticked.value = true },
  unstick: () => { isSticked.value = false },
  isMaximized,
  isMinimized,
  isSticked,
})

const onBeforeEnter = () => {
  lockBodyScroll()
  emit('open')
}

const onAfterEnter = () => {
  emit('opened')
  if (props.autoClose && props.autoClose > 0) {
    autoCloseTimer = setTimeout(() => {
      handleClose()
    }, props.autoClose)
  }
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const onBeforeLeave = () => {
  emit('close')
}

const onAfterLeave = () => {
  unlockBodyScroll()
  emit('closed')
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    open()
  } else {
    visible.value = false
  }
}, { immediate: true })

watch(visible, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.confirmLoading, (val) => {
  confirmLoading.value = val ?? false
})

watch(() => props.cancelLoading, (val) => {
  cancelLoading.value = val ?? false
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
  unlockBodyScroll()
})

const setComponent = (comp: Component, compProps?: Record<string, any>, compEmits?: Record<string, any>) => {
  component.value = comp
  componentProps.value = compProps ?? {}
  componentEmits.value = compEmits ?? {}
}

provide('hDialogInstance', getInstance)

defineExpose({
  open,
  close: handleClose,
  visible,
  setComponent,
  setConfirmLoading,
  setCancelLoading,
  isMaximized,
  isMinimized,
  isSticked,
  inputValue: inputValueModel,
})
</script>

<style scoped>
.h-dialog-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.h-dialog-wrapper.is-modal {
  pointer-events: auto;
}

.h-dialog-wrapper.is-center {
  align-items: center;
  justify-content: center;
}

.h-dialog__modal {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.h-dialog-wrapper.is-glass .h-dialog__modal {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

.h-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--aura-bg-base, #ffffff);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  pointer-events: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-dialog.has-shadow {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.h-dialog.has-shadow-hover:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
}

.h-dialog.is-round {
  border-radius: 16px;
}

.h-dialog.is-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.h-dialog.is-fullscreen {
  position: fixed;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
  max-width: 100%;
  max-height: 100%;
  border-radius: 0;
}

.h-dialog.is-minimized {
  width: 200px !important;
  height: 48px !important;
  cursor: pointer;
}

.h-dialog.is-dragging {
  transition: none;
}

.h-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--aura-border-default, #e5e5e5);
  flex-shrink: 0;
  cursor: move;
  user-select: none;
}

.h-dialog__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--aura-text-primary, #171717);
  margin: 0;
  line-height: 1.5;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.h-dialog__header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.h-dialog__action-btn,
.h-dialog__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  color: var(--aura-text-tertiary, #737373);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.h-dialog__action-btn:hover,
.h-dialog__close:hover {
  background-color: var(--aura-bg-elevated, #f5f5f5);
  color: var(--aura-text-primary, #171717);
}

.h-dialog__body {
  flex: 1;
  padding: 20px;
  overflow: auto;
  color: var(--aura-text-primary, #171717);
  font-size: 14px;
  line-height: 1.6;
}

.h-dialog__prompt {
  margin-top: 16px;
}

.h-dialog__input {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid var(--aura-border-default, #d9d9d9);
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
}

.h-dialog__input:focus {
  border-color: var(--aura-color-primary-500);
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
}

.h-dialog__input.is-error {
  border-color: var(--aura-color-danger-500);
}

.h-dialog__input-error {
  margin-top: 4px;
  font-size: 12px;
  color: var(--aura-color-danger-500);
}

.h-dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--aura-border-default, #e5e5e5);
  flex-shrink: 0;
}

.h-dialog__resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: se-resize;
}

.h-dialog__resize-handle::before {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--aura-text-tertiary, #a3a3a3);
  border-bottom: 2px solid var(--aura-text-tertiary, #a3a3a3);
}

.h-dialog-fade-enter-active,
.h-dialog-fade-leave-active {
  transition: opacity 0.3s;
}

.h-dialog-fade-enter-active .h-dialog,
.h-dialog-fade-leave-active .h-dialog {
  transition: transform 0.3s, opacity 0.3s;
}

.h-dialog-fade-enter-from,
.h-dialog-fade-leave-to {
  opacity: 0;
}

.h-dialog--animation-scale.h-dialog-fade-enter-from {
  transform: scale(0.9);
}

.h-dialog--animation-scale.h-dialog-fade-leave-to {
  transform: scale(0.9);
}

.h-dialog--animation-slide.h-dialog-fade-enter-from {
  transform: translateY(-20px);
}

.h-dialog--animation-slide.h-dialog-fade-leave-to {
  transform: translateY(-20px);
}
</style>