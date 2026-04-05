<template>
  <div
    :class="[
      'h-tabs',
      `h-tabs--${type}`,
      `h-tabs--${tabPosition}`,
      `h-tabs--${size}`,
      {
        'is-stretch': stretch,
        'is-card': type === 'card',
        'is-border-card': type === 'border-card',
        'is-segment': type === 'segment',
        'is-hide-nav': hideNav,
      },
      props.class,
    ]"
    :style="props.style"
  >
    <div
      v-if="!hideNav"
      :class="['h-tabs__header', `is-${tabPosition}`]"
      ref="headerRef"
    >
      <div class="h-tabs__nav-wrap" ref="navWrapRef">
        <span
          v-if="showPrevArrow"
          class="h-tabs__nav-prev"
          @click="scrollPrev"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </span>
        <span
          v-if="showNextArrow"
          class="h-tabs__nav-next"
          @click="scrollNext"
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </span>

        <div
          class="h-tabs__nav-scroll"
          ref="navScrollRef"
          @wheel="handleWheel"
        >
          <div
            class="h-tabs__nav"
            ref="navRef"
            role="tablist"
          >
            <div
              v-if="type === 'segment'"
              class="h-tabs__segment-bg"
              :style="segmentBgStyle"
            />

            <div
              v-for="pane in panes"
              :key="pane.name"
              :class="[
                'h-tabs__item',
                `is-${tabPosition}`,
                {
                  'is-active': pane.name === modelValue,
                  'is-disabled': pane.disabled,
                  'is-closable': pane.closable || closable,
                  'is-focus': focusTab === pane.name,
                },
              ]"
              :tabindex="pane.disabled ? -1 : 0"
              role="tab"
              :aria-selected="pane.name === modelValue"
              :aria-disabled="pane.disabled"
              @click="handleTabClick($event, pane)"
              @keydown="handleKeydown($event, pane)"
            >
              <span class="h-tabs__item-label">
                <component :is="pane.label" v-if="typeof pane.label === 'function'" />
                <template v-else>{{ pane.label }}</template>
              </span>
              <span
                v-if="(pane.closable || closable) && !pane.disabled"
                class="h-tabs__item-close"
                @click.stop="handleTabRemove(pane.name, $event)"
              >
                <svg viewBox="0 0 24 24" width="12" height="12">
                  <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </span>
            </div>

            <div
              v-if="type === 'line' && showBar"
              class="h-tabs__active-bar"
              :style="barStyle"
            />
          </div>
        </div>
      </div>

      <span
        v-if="addable || editable"
        class="h-tabs__new-tab"
        @click="handleAdd"
      >
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </span>
    </div>

    <div class="h-tabs__content">
      <Transition
        :name="animated ? 'h-tabs-slide' : ''"
        mode="out-in"
      >
        <div
          v-if="currentPane && (!currentPane.lazy || currentPane.name === modelValue || renderedPanes.has(currentPane.name))"
          :key="currentPane.name"
          class="h-tabs__pane"
          role="tabpanel"
        >
          <slot :name="currentPane.name" :pane="currentPane" />
        </div>
      </Transition>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, provide, nextTick, type VNode, type CSSProperties } from 'vue'
import { tabsPropsDefaults } from './tabs'
import type { TabsProps, TabsEmits, TabPaneInstance } from './tabs'

const props = withDefaults(defineProps<TabsProps>(), tabsPropsDefaults)

const emit = defineEmits<TabsEmits>()

const headerRef = ref<HTMLElement>()
const navWrapRef = ref<HTMLElement>()
const navScrollRef = ref<HTMLElement>()
const navRef = ref<HTMLElement>()

const panes = ref<TabPaneInstance[]>([])
const focusTab = ref<string | number | null>(null)
const barOffset = ref(0)
const barWidth = ref(0)
const scrollOffset = ref(0)
const showPrevArrow = ref(false)
const showNextArrow = ref(false)
const renderedPanes = ref<Set<string | number>>(new Set())

const currentPane = computed(() => {
  return panes.value.find((p) => p.name === props.modelValue)
})

const barStyle = computed<CSSProperties>(() => {
  if (props.type !== 'line') return {}

  const style: CSSProperties = {
    transform: props.tabPosition === 'top' || props.tabPosition === 'bottom'
      ? `translateX(${barOffset.value}px)`
      : `translateY(${barOffset.value}px)`,
  }

  if (props.barWidth) {
    style.width = typeof props.barWidth === 'number' ? `${props.barWidth}px` : props.barWidth
  } else {
    style.width = `${barWidth.value}px`
  }

  if (props.barHeight) {
    style.height = typeof props.barHeight === 'number' ? `${props.barHeight}px` : props.barHeight
  }

  return style
})

const segmentBgStyle = computed<CSSProperties>(() => {
  if (props.type !== 'segment') return {}

  const activeIndex = panes.value.findIndex((p) => p.name === props.modelValue)
  if (activeIndex === -1) return {}

  return {
    transform: `translateX(${activeIndex * 100}%)`,
    width: `${100 / panes.value.length}%`,
  }
})

const updateBar = () => {
  nextTick(() => {
    if (!navRef.value || props.type !== 'line') return

    const activeTab = navRef.value.querySelector('.h-tabs__item.is-active') as HTMLElement
    if (!activeTab) return

    if (props.tabPosition === 'top' || props.tabPosition === 'bottom') {
      barOffset.value = activeTab.offsetLeft
      barWidth.value = activeTab.offsetWidth
    } else {
      barOffset.value = activeTab.offsetTop
      barWidth.value = activeTab.offsetHeight
    }
  })
}

const updateArrows = () => {
  if (!navScrollRef.value || !navWrapRef.value) return

  const scrollWidth = navScrollRef.value.scrollWidth
  const clientWidth = navScrollRef.value.clientWidth

  showPrevArrow.value = scrollOffset.value > 0
  showNextArrow.value = scrollOffset.value < scrollWidth - clientWidth - 1
}

const scrollPrev = () => {
  if (!navScrollRef.value) return
  const scrollLeft = navScrollRef.value.scrollLeft
  const clientWidth = navScrollRef.value.clientWidth
  navScrollRef.value.scrollLeft = Math.max(0, scrollLeft - clientWidth)
}

const scrollNext = () => {
  if (!navScrollRef.value) return
  const scrollLeft = navScrollRef.value.scrollLeft
  const clientWidth = navScrollRef.value.clientWidth
  const scrollWidth = navScrollRef.value.scrollWidth
  navScrollRef.value.scrollLeft = Math.min(scrollWidth - clientWidth, scrollLeft + clientWidth)
}

const handleWheel = (e: WheelEvent) => {
  if (!navScrollRef.value) return

  const delta = e.deltaY || e.deltaX
  const scrollLeft = navScrollRef.value.scrollLeft

  if (Math.abs(delta) > 0) {
    navScrollRef.value.scrollLeft = scrollLeft + delta
    e.preventDefault()
  }
}

const handleTabClick = (e: MouseEvent, pane: TabPaneInstance) => {
  if (pane.disabled) return

  const oldName = props.modelValue
  const newName = pane.name

  if (props.beforeLeave) {
    const result = props.beforeLeave(newName, oldName)
    if (result === false) return
    if (result instanceof Promise) {
      result.then((canLeave) => {
        if (canLeave) {
          setCurrentName(newName)
        }
      })
      return
    }
  }

  setCurrentName(newName)
  emit('tabClick', pane, e)
}

const handleTabRemove = (name: string | number, e: MouseEvent) => {
  e.stopPropagation()
  emit('tabRemove', name)
  emit('edit', 'remove', name)
}

const handleAdd = () => {
  emit('tabAdd')
  emit('edit', 'add')
}

const handleKeydown = (e: KeyboardEvent, pane: TabPaneInstance) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleTabClick(e as any, pane)
    e.preventDefault()
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    const currentIndex = panes.value.findIndex((p) => p.name === pane.name)
    const nextPane = panes.value[(currentIndex + 1) % panes.value.length]
    if (nextPane && !nextPane.disabled) {
      focusTab.value = nextPane.name
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    const currentIndex = panes.value.findIndex((p) => p.name === pane.name)
    const prevPane = panes.value[(currentIndex - 1 + panes.value.length) % panes.value.length]
    if (prevPane && !prevPane.disabled) {
      focusTab.value = prevPane.name
    }
  } else if (e.key === 'Delete' && (pane.closable || props.closable)) {
    handleTabRemove(pane.name, e as any)
  }
}

const setCurrentName = (name: string | number) => {
  emit('update:modelValue', name)
  emit('tabChange', name)
  renderedPanes.value.add(name)
}

const registerPane = (pane: TabPaneInstance) => {
  panes.value.push(pane)
  updateBar()
  updateArrows()
}

const unregisterPane = (name: string | number) => {
  const index = panes.value.findIndex((p) => p.name === name)
  if (index !== -1) {
    panes.value.splice(index, 1)
    updateBar()
    updateArrows()
  }
}

provide('hTabs', {
  registerPane,
  unregisterPane,
  currentName: computed(() => props.modelValue),
})

watch(() => props.modelValue, updateBar)

onMounted(() => {
  updateBar()
  updateArrows()
  if (props.modelValue) {
    renderedPanes.value.add(props.modelValue)
  }
})

defineExpose({
  currentPane,
  panes,
})
</script>

<style scoped>
.h-tabs {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.h-tabs--left,
.h-tabs--right {
  flex-direction: row;
}

.h-tabs--right {
  flex-direction: row-reverse;
}

.h-tabs__header {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.h-tabs--left .h-tabs__header,
.h-tabs--right .h-tabs__header {
  flex-direction: column;
}

.h-tabs__nav-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.h-tabs__nav-prev,
.h-tabs__nav-next {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  cursor: pointer;
  color: var(--aura-text-tertiary);
  z-index: 1;
  background: linear-gradient(90deg, var(--aura-bg-base) 0%, transparent 100%);
}

.h-tabs__nav-prev:hover,
.h-tabs__nav-next:hover {
  color: var(--aura-text-primary);
}

.h-tabs__nav-prev {
  left: 0;
}

.h-tabs__nav-next {
  right: 0;
  transform: rotate(180deg);
}

.h-tabs__nav-scroll {
  overflow: hidden;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.h-tabs__nav-scroll::-webkit-scrollbar {
  display: none;
}

.h-tabs__nav {
  position: relative;
  display: flex;
  white-space: nowrap;
}

.h-tabs--left .h-tabs__nav,
.h-tabs--right .h-tabs__nav {
  flex-direction: column;
}

.h-tabs__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 40px;
  cursor: pointer;
  color: var(--aura-text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  user-select: none;
  position: relative;
}

.h-tabs--left .h-tabs__item,
.h-tabs--right .h-tabs__item {
  justify-content: flex-start;
  padding: 0 16px;
  height: 40px;
}

.h-tabs--small .h-tabs__item {
  height: 32px;
  padding: 0 16px;
  font-size: 13px;
}

.h-tabs--large .h-tabs__item {
  height: 48px;
  padding: 0 24px;
  font-size: 15px;
}

.h-tabs__item:hover {
  color: var(--aura-color-primary-500);
}

.h-tabs__item.is-active {
  color: var(--aura-color-primary-500);
}

.h-tabs__item.is-disabled {
  cursor: not-allowed;
  color: var(--aura-text-disabled);
}

.h-tabs__item.is-disabled:hover {
  color: var(--aura-text-disabled);
}

.h-tabs__item.is-focus {
  box-shadow: inset 0 0 0 2px var(--aura-color-primary-200);
}

.h-tabs__item-label {
  display: inline-flex;
  align-items: center;
}

.h-tabs__item-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  border-radius: 50%;
  transition: all 0.2s;
}

.h-tabs__item-close:hover {
  background-color: var(--aura-bg-elevated);
  color: var(--aura-text-primary);
}

.h-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--aura-color-primary-500);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s;
  z-index: 1;
}

.h-tabs--bottom .h-tabs__active-bar {
  bottom: auto;
  top: 0;
}

.h-tabs--left .h-tabs__active-bar {
  right: 0;
  left: auto;
  bottom: auto;
  top: 0;
  width: 2px;
  height: auto;
}

.h-tabs--right .h-tabs__active-bar {
  left: 0;
  bottom: auto;
  top: 0;
  width: 2px;
  height: auto;
}

.h-tabs--card .h-tabs__item {
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
  margin-right: -1px;
}

.h-tabs--card .h-tabs__item.is-active {
  background-color: var(--aura-bg-base);
  border-color: var(--aura-border-default);
  border-bottom-color: transparent;
}

.h-tabs--border-card {
  border: 1px solid var(--aura-border-default);
  border-radius: 4px;
  background-color: var(--aura-bg-base);
}

.h-tabs--border-card .h-tabs__header {
  background-color: var(--aura-bg-elevated);
  border-bottom: 1px solid var(--aura-border-default);
}

.h-tabs--segment .h-tabs__nav {
  background-color: var(--aura-bg-elevated);
  border-radius: 8px;
  padding: 4px;
  position: relative;
}

.h-tabs--segment .h-tabs__item {
  border-radius: 6px;
  position: relative;
  z-index: 1;
}

.h-tabs__segment-bg {
  position: absolute;
  top: 4px;
  left: 4px;
  bottom: 4px;
  background-color: var(--aura-bg-base);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.h-tabs--stretch .h-tabs__item {
  flex: 1;
}

.h-tabs__new-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--aura-text-tertiary);
  transition: all 0.2s;
}

.h-tabs__new-tab:hover {
  background-color: var(--aura-bg-elevated);
  color: var(--aura-color-primary-500);
}

.h-tabs__content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.h-tabs__pane {
  width: 100%;
  height: 100%;
}

.h-tabs-slide-enter-active,
.h-tabs-slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.h-tabs-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.h-tabs-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.h-tabs--left .h-tabs-slide-enter-from {
  transform: translateX(-20px);
}

.h-tabs--left .h-tabs-slide-leave-to {
  transform: translateX(20px);
}

.h-tabs--right .h-tabs-slide-enter-from {
  transform: translateX(20px);
}

.h-tabs--right .h-tabs-slide-leave-to {
  transform: translateX(-20px);
}
</style>