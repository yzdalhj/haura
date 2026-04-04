<template>
  <component
    :is="tag"
    :class="[
      'h-row',
      `h-row--justify-${justify}`,
      `h-row--align-${align}`,
      {
        'is-wrap': wrap,
        'is-no-wrap': !wrap,
        'is-flex': flex,
      },
      props.class,
    ]"
    :style="rowStyle"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide, ref, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { rowPropsDefaults, breakpoints } from './grid'
import type { RowProps, RowEmits, Breakpoint } from './grid'

const props = withDefaults(defineProps<RowProps>(), rowPropsDefaults)

const emit = defineEmits<RowEmits>()

const currentBreakpoint = ref<Breakpoint>('xs')

const updateBreakpoint = () => {
  const width = window.innerWidth
  if (width >= breakpoints.xxl) currentBreakpoint.value = 'xxl'
  else if (width >= breakpoints.xl) currentBreakpoint.value = 'xl'
  else if (width >= breakpoints.lg) currentBreakpoint.value = 'lg'
  else if (width >= breakpoints.md) currentBreakpoint.value = 'md'
  else if (width >= breakpoints.sm) currentBreakpoint.value = 'sm'
  else currentBreakpoint.value = 'xs'
}

const getGutter = computed(() => {
  if (props.gutter === undefined) return 0

  if (typeof props.gutter === 'number') {
    return props.gutter
  }

  if (Array.isArray(props.gutter)) {
    return props.gutter
  }

  if (typeof props.gutter === 'object') {
    const bpOrder: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
    for (const bp of bpOrder) {
      if (props.gutter[bp] !== undefined) {
        return props.gutter[bp]
      }
    }
    return 0
  }

  return 0
})

provide('hRowGutter', getGutter)
provide('hRowBreakpoint', currentBreakpoint)

const rowStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    ...props.style,
  }

  if (props.flex) {
    style.display = 'flex'
  }

  const gutter = getGutter.value
  if (gutter !== undefined && gutter !== 0) {
    if (typeof gutter === 'number') {
      style.marginLeft = `${-gutter / 2}px`
      style.marginRight = `${-gutter / 2}px`
    } else if (Array.isArray(gutter)) {
      const [horizontal, vertical] = gutter
      style.marginLeft = `${-horizontal / 2}px`
      style.marginRight = `${-horizontal / 2}px`
      style.marginTop = `${-vertical / 2}px`
      style.marginBottom = `${-vertical / 2}px`
    }
  }

  return style
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

onMounted(() => {
  updateBreakpoint()
  window.addEventListener('resize', updateBreakpoint)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBreakpoint)
})
</script>

<style scoped>
.h-row {
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
}

.h-row--justify-start {
  justify-content: flex-start;
}

.h-row--justify-end {
  justify-content: flex-end;
}

.h-row--justify-center {
  justify-content: center;
}

.h-row--justify-space-around {
  justify-content: space-around;
}

.h-row--justify-space-between {
  justify-content: space-between;
}

.h-row--justify-space-evenly {
  justify-content: space-evenly;
}

.h-row--align-top {
  align-items: flex-start;
}

.h-row--align-middle {
  align-items: center;
}

.h-row--align-bottom {
  align-items: flex-end;
}

.h-row--align-stretch {
  align-items: stretch;
}

.h-row.is-wrap {
  flex-wrap: wrap;
}

.h-row.is-no-wrap {
  flex-wrap: nowrap;
}

.h-row.is-flex {
  display: flex;
}
</style>