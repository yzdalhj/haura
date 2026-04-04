<template>
  <div
    v-if="shouldRender"
    v-show="active"
    :class="['h-tab-pane', props.class]"
    :style="props.style"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${name}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, type ComputedRef } from 'vue'
import { tabPanePropsDefaults } from './tabs'
import type { TabPaneProps, TabPaneInstance } from './tabs'

const props = withDefaults(defineProps<TabPaneProps>(), tabPanePropsDefaults)

const tabsContext = inject<{
  registerPane: (pane: TabPaneInstance) => void
  unregisterPane: (name: string | number) => void
  currentName: ComputedRef<string | number | undefined>
}>('hTabs')

const active = computed(() => {
  return tabsContext?.currentName.value === props.name
})

const shouldRender = computed(() => {
  if (!props.lazy) return true
  if (active.value) return true
  return false
})

const instance: TabPaneInstance = {
  name: props.name ?? '',
  label: props.label ?? '',
  disabled: props.disabled ?? false,
  closable: props.closable ?? false,
  active: active.value,
  index: 0,
  get paneName() {
    return props.name ?? ''
  },
}

onMounted(() => {
  tabsContext?.registerPane(instance)
})

onUnmounted(() => {
  tabsContext?.unregisterPane(props.name ?? '')
})

defineExpose({
  active,
  name: props.name,
})
</script>

<style scoped>
.h-tab-pane {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>