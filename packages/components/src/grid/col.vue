<template>
  <component
    :is="tag"
    :class="[
      'h-col',
      span !== undefined ? `h-col--${span}` : '',
      offset !== undefined ? `h-col--offset-${offset}` : '',
      push !== undefined ? `h-col--push-${push}` : '',
      pull !== undefined ? `h-col--pull-${pull}` : '',
      order !== undefined ? `h-col--order-${order}` : '',
      responsiveClasses,
      props.class,
    ]"
    :style="colStyle"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject, type CSSProperties, type ComputedRef, type Ref } from 'vue'
import { colPropsDefaults } from './grid'
import type { ColProps, ColEmits, Breakpoint, ResponsiveConfig } from './grid'

const props = withDefaults(defineProps<ColProps>(), colPropsDefaults)

const emit = defineEmits<ColEmits>()

const gutter = inject<ComputedRef<number | [number, number] | undefined>>('hRowGutter')
const currentBreakpoint = inject<Ref<Breakpoint>>('hRowBreakpoint')

const colStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    ...props.style,
  }

  if (gutter?.value !== undefined) {
    if (typeof gutter.value === 'number') {
      style.paddingLeft = `${gutter.value / 2}px`
      style.paddingRight = `${gutter.value / 2}px`
    } else if (Array.isArray(gutter.value)) {
      const [horizontal, vertical] = gutter.value
      style.paddingLeft = `${horizontal / 2}px`
      style.paddingRight = `${horizontal / 2}px`
      style.paddingTop = `${vertical / 2}px`
      style.paddingBottom = `${vertical / 2}px`
    }
  }

  if (props.flex !== undefined) {
    style.flex = typeof props.flex === 'number' ? `${props.flex}` : props.flex
  }

  return style
})

const responsiveClasses = computed(() => {
  const classes: string[] = []
  const bpList: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

  bpList.forEach((bp) => {
    const value = props[bp]
    if (value !== undefined) {
      if (typeof value === 'number') {
        classes.push(`h-col--${bp}-${value}`)
      } else {
        const config = value as ResponsiveConfig
        if (config.span !== undefined) {
          classes.push(`h-col--${bp}-${config.span}`)
        }
        if (config.offset !== undefined) {
          classes.push(`h-col--${bp}-offset-${config.offset}`)
        }
        if (config.push !== undefined) {
          classes.push(`h-col--${bp}-push-${config.push}`)
        }
        if (config.pull !== undefined) {
          classes.push(`h-col--${bp}-pull-${config.pull}`)
        }
        if (config.order !== undefined) {
          classes.push(`h-col--${bp}-order-${config.order}`)
        }
      }
    }
  })

  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.h-col {
  position: relative;
  box-sizing: border-box;
  min-height: 1px;
  flex: 0 0 auto;
}

.h-col--0 { display: none; }
.h-col--1 { width: 4.16666667%; }
.h-col--2 { width: 8.33333333%; }
.h-col--3 { width: 12.5%; }
.h-col--4 { width: 16.66666667%; }
.h-col--5 { width: 20.83333333%; }
.h-col--6 { width: 25%; }
.h-col--7 { width: 29.16666667%; }
.h-col--8 { width: 33.33333333%; }
.h-col--9 { width: 37.5%; }
.h-col--10 { width: 41.66666667%; }
.h-col--11 { width: 45.83333333%; }
.h-col--12 { width: 50%; }
.h-col--13 { width: 54.16666667%; }
.h-col--14 { width: 58.33333333%; }
.h-col--15 { width: 62.5%; }
.h-col--16 { width: 66.66666667%; }
.h-col--17 { width: 70.83333333%; }
.h-col--18 { width: 75%; }
.h-col--19 { width: 79.16666667%; }
.h-col--20 { width: 83.33333333%; }
.h-col--21 { width: 87.5%; }
.h-col--22 { width: 91.66666667%; }
.h-col--23 { width: 95.83333333%; }
.h-col--24 { width: 100%; }

.h-col--offset-0 { margin-left: 0; }
.h-col--offset-1 { margin-left: 4.16666667%; }
.h-col--offset-2 { margin-left: 8.33333333%; }
.h-col--offset-3 { margin-left: 12.5%; }
.h-col--offset-4 { margin-left: 16.66666667%; }
.h-col--offset-5 { margin-left: 20.83333333%; }
.h-col--offset-6 { margin-left: 25%; }
.h-col--offset-7 { margin-left: 29.16666667%; }
.h-col--offset-8 { margin-left: 33.33333333%; }
.h-col--offset-9 { margin-left: 37.5%; }
.h-col--offset-10 { margin-left: 41.66666667%; }
.h-col--offset-11 { margin-left: 45.83333333%; }
.h-col--offset-12 { margin-left: 50%; }
.h-col--offset-13 { margin-left: 54.16666667%; }
.h-col--offset-14 { margin-left: 58.33333333%; }
.h-col--offset-15 { margin-left: 62.5%; }
.h-col--offset-16 { margin-left: 66.66666667%; }
.h-col--offset-17 { margin-left: 70.83333333%; }
.h-col--offset-18 { margin-left: 75%; }
.h-col--offset-19 { margin-left: 79.16666667%; }
.h-col--offset-20 { margin-left: 83.33333333%; }
.h-col--offset-21 { margin-left: 87.5%; }
.h-col--offset-22 { margin-left: 91.66666667%; }
.h-col--offset-23 { margin-left: 95.83333333%; }
.h-col--offset-24 { margin-left: 100%; }

.h-col--push-0 { left: auto; }
.h-col--push-1 { left: 4.16666667%; }
.h-col--push-2 { left: 8.33333333%; }
.h-col--push-3 { left: 12.5%; }
.h-col--push-4 { left: 16.66666667%; }
.h-col--push-5 { left: 20.83333333%; }
.h-col--push-6 { left: 25%; }
.h-col--push-7 { left: 29.16666667%; }
.h-col--push-8 { left: 33.33333333%; }
.h-col--push-9 { left: 37.5%; }
.h-col--push-10 { left: 41.66666667%; }
.h-col--push-11 { left: 45.83333333%; }
.h-col--push-12 { left: 50%; }
.h-col--push-13 { left: 54.16666667%; }
.h-col--push-14 { left: 58.33333333%; }
.h-col--push-15 { left: 62.5%; }
.h-col--push-16 { left: 66.66666667%; }
.h-col--push-17 { left: 70.83333333%; }
.h-col--push-18 { left: 75%; }
.h-col--push-19 { left: 79.16666667%; }
.h-col--push-20 { left: 83.33333333%; }
.h-col--push-21 { left: 87.5%; }
.h-col--push-22 { left: 91.66666667%; }
.h-col--push-23 { left: 95.83333333%; }
.h-col--push-24 { left: 100%; }

.h-col--pull-0 { right: auto; }
.h-col--pull-1 { right: 4.16666667%; }
.h-col--pull-2 { right: 8.33333333%; }
.h-col--pull-3 { right: 12.5%; }
.h-col--pull-4 { right: 16.66666667%; }
.h-col--pull-5 { right: 20.83333333%; }
.h-col--pull-6 { right: 25%; }
.h-col--pull-7 { right: 29.16666667%; }
.h-col--pull-8 { right: 33.33333333%; }
.h-col--pull-9 { right: 37.5%; }
.h-col--pull-10 { right: 41.66666667%; }
.h-col--pull-11 { right: 45.83333333%; }
.h-col--pull-12 { right: 50%; }
.h-col--pull-13 { right: 54.16666667%; }
.h-col--pull-14 { right: 58.33333333%; }
.h-col--pull-15 { right: 62.5%; }
.h-col--pull-16 { right: 66.66666667%; }
.h-col--pull-17 { right: 70.83333333%; }
.h-col--pull-18 { right: 75%; }
.h-col--pull-19 { right: 79.16666667%; }
.h-col--pull-20 { right: 83.33333333%; }
.h-col--pull-21 { right: 87.5%; }
.h-col--pull-22 { right: 91.66666667%; }
.h-col--pull-23 { right: 95.83333333%; }
.h-col--pull-24 { right: 100%; }

.h-col--order-0 { order: 0; }
.h-col--order-1 { order: 1; }
.h-col--order-2 { order: 2; }
.h-col--order-3 { order: 3; }
.h-col--order-4 { order: 4; }
.h-col--order-5 { order: 5; }
.h-col--order-6 { order: 6; }
.h-col--order-7 { order: 7; }
.h-col--order-8 { order: 8; }
.h-col--order-9 { order: 9; }
.h-col--order-10 { order: 10; }
.h-col--order-11 { order: 11; }
.h-col--order-12 { order: 12; }
.h-col--order-13 { order: 13; }
.h-col--order-14 { order: 14; }
.h-col--order-15 { order: 15; }
.h-col--order-16 { order: 16; }
.h-col--order-17 { order: 17; }
.h-col--order-18 { order: 18; }
.h-col--order-19 { order: 19; }
.h-col--order-20 { order: 20; }
.h-col--order-21 { order: 21; }
.h-col--order-22 { order: 22; }
.h-col--order-23 { order: 23; }
.h-col--order-24 { order: 24; }

@media (max-width: 575.98px) {
  .h-col--xs-0 { display: none; }
  .h-col--xs-1 { width: 4.16666667%; }
  .h-col--xs-2 { width: 8.33333333%; }
  .h-col--xs-3 { width: 12.5%; }
  .h-col--xs-4 { width: 16.66666667%; }
  .h-col--xs-5 { width: 20.83333333%; }
  .h-col--xs-6 { width: 25%; }
  .h-col--xs-7 { width: 29.16666667%; }
  .h-col--xs-8 { width: 33.33333333%; }
  .h-col--xs-9 { width: 37.5%; }
  .h-col--xs-10 { width: 41.66666667%; }
  .h-col--xs-11 { width: 45.83333333%; }
  .h-col--xs-12 { width: 50%; }
  .h-col--xs-13 { width: 54.16666667%; }
  .h-col--xs-14 { width: 58.33333333%; }
  .h-col--xs-15 { width: 62.5%; }
  .h-col--xs-16 { width: 66.66666667%; }
  .h-col--xs-17 { width: 70.83333333%; }
  .h-col--xs-18 { width: 75%; }
  .h-col--xs-19 { width: 79.16666667%; }
  .h-col--xs-20 { width: 83.33333333%; }
  .h-col--xs-21 { width: 87.5%; }
  .h-col--xs-22 { width: 91.66666667%; }
  .h-col--xs-23 { width: 95.83333333%; }
  .h-col--xs-24 { width: 100%; }

  .h-col--xs-offset-0 { margin-left: 0; }
  .h-col--xs-offset-1 { margin-left: 4.16666667%; }
  .h-col--xs-offset-2 { margin-left: 8.33333333%; }
  .h-col--xs-offset-3 { margin-left: 12.5%; }
  .h-col--xs-offset-4 { margin-left: 16.66666667%; }
  .h-col--xs-offset-5 { margin-left: 20.83333333%; }
  .h-col--xs-offset-6 { margin-left: 25%; }
  .h-col--xs-offset-7 { margin-left: 29.16666667%; }
  .h-col--xs-offset-8 { margin-left: 33.33333333%; }
  .h-col--xs-offset-9 { margin-left: 37.5%; }
  .h-col--xs-offset-10 { margin-left: 41.66666667%; }
  .h-col--xs-offset-11 { margin-left: 45.83333333%; }
  .h-col--xs-offset-12 { margin-left: 50%; }
  .h-col--xs-offset-13 { margin-left: 54.16666667%; }
  .h-col--xs-offset-14 { margin-left: 58.33333333%; }
  .h-col--xs-offset-15 { margin-left: 62.5%; }
  .h-col--xs-offset-16 { margin-left: 66.66666667%; }
  .h-col--xs-offset-17 { margin-left: 70.83333333%; }
  .h-col--xs-offset-18 { margin-left: 75%; }
  .h-col--xs-offset-19 { margin-left: 79.16666667%; }
  .h-col--xs-offset-20 { margin-left: 83.33333333%; }
  .h-col--xs-offset-21 { margin-left: 87.5%; }
  .h-col--xs-offset-22 { margin-left: 91.66666667%; }
  .h-col--xs-offset-23 { margin-left: 95.83333333%; }
  .h-col--xs-offset-24 { margin-left: 100%; }
}

@media (min-width: 576px) {
  .h-col--sm-0 { display: none; }
  .h-col--sm-1 { width: 4.16666667%; }
  .h-col--sm-2 { width: 8.33333333%; }
  .h-col--sm-3 { width: 12.5%; }
  .h-col--sm-4 { width: 16.66666667%; }
  .h-col--sm-5 { width: 20.83333333%; }
  .h-col--sm-6 { width: 25%; }
  .h-col--sm-7 { width: 29.16666667%; }
  .h-col--sm-8 { width: 33.33333333%; }
  .h-col--sm-9 { width: 37.5%; }
  .h-col--sm-10 { width: 41.66666667%; }
  .h-col--sm-11 { width: 45.83333333%; }
  .h-col--sm-12 { width: 50%; }
  .h-col--sm-13 { width: 54.16666667%; }
  .h-col--sm-14 { width: 58.33333333%; }
  .h-col--sm-15 { width: 62.5%; }
  .h-col--sm-16 { width: 66.66666667%; }
  .h-col--sm-17 { width: 70.83333333%; }
  .h-col--sm-18 { width: 75%; }
  .h-col--sm-19 { width: 79.16666667%; }
  .h-col--sm-20 { width: 83.33333333%; }
  .h-col--sm-21 { width: 87.5%; }
  .h-col--sm-22 { width: 91.66666667%; }
  .h-col--sm-23 { width: 95.83333333%; }
  .h-col--sm-24 { width: 100%; }
}

@media (min-width: 768px) {
  .h-col--md-0 { display: none; }
  .h-col--md-1 { width: 4.16666667%; }
  .h-col--md-2 { width: 8.33333333%; }
  .h-col--md-3 { width: 12.5%; }
  .h-col--md-4 { width: 16.66666667%; }
  .h-col--md-5 { width: 20.83333333%; }
  .h-col--md-6 { width: 25%; }
  .h-col--md-7 { width: 29.16666667%; }
  .h-col--md-8 { width: 33.33333333%; }
  .h-col--md-9 { width: 37.5%; }
  .h-col--md-10 { width: 41.66666667%; }
  .h-col--md-11 { width: 45.83333333%; }
  .h-col--md-12 { width: 50%; }
  .h-col--md-13 { width: 54.16666667%; }
  .h-col--md-14 { width: 58.33333333%; }
  .h-col--md-15 { width: 62.5%; }
  .h-col--md-16 { width: 66.66666667%; }
  .h-col--md-17 { width: 70.83333333%; }
  .h-col--md-18 { width: 75%; }
  .h-col--md-19 { width: 79.16666667%; }
  .h-col--md-20 { width: 83.33333333%; }
  .h-col--md-21 { width: 87.5%; }
  .h-col--md-22 { width: 91.66666667%; }
  .h-col--md-23 { width: 95.83333333%; }
  .h-col--md-24 { width: 100%; }
}

@media (min-width: 992px) {
  .h-col--lg-0 { display: none; }
  .h-col--lg-1 { width: 4.16666667%; }
  .h-col--lg-2 { width: 8.33333333%; }
  .h-col--lg-3 { width: 12.5%; }
  .h-col--lg-4 { width: 16.66666667%; }
  .h-col--lg-5 { width: 20.83333333%; }
  .h-col--lg-6 { width: 25%; }
  .h-col--lg-7 { width: 29.16666667%; }
  .h-col--lg-8 { width: 33.33333333%; }
  .h-col--lg-9 { width: 37.5%; }
  .h-col--lg-10 { width: 41.66666667%; }
  .h-col--lg-11 { width: 45.83333333%; }
  .h-col--lg-12 { width: 50%; }
  .h-col--lg-13 { width: 54.16666667%; }
  .h-col--lg-14 { width: 58.33333333%; }
  .h-col--lg-15 { width: 62.5%; }
  .h-col--lg-16 { width: 66.66666667%; }
  .h-col--lg-17 { width: 70.83333333%; }
  .h-col--lg-18 { width: 75%; }
  .h-col--lg-19 { width: 79.16666667%; }
  .h-col--lg-20 { width: 83.33333333%; }
  .h-col--lg-21 { width: 87.5%; }
  .h-col--lg-22 { width: 91.66666667%; }
  .h-col--lg-23 { width: 95.83333333%; }
  .h-col--lg-24 { width: 100%; }
}

@media (min-width: 1200px) {
  .h-col--xl-0 { display: none; }
  .h-col--xl-1 { width: 4.16666667%; }
  .h-col--xl-2 { width: 8.33333333%; }
  .h-col--xl-3 { width: 12.5%; }
  .h-col--xl-4 { width: 16.66666667%; }
  .h-col--xl-5 { width: 20.83333333%; }
  .h-col--xl-6 { width: 25%; }
  .h-col--xl-7 { width: 29.16666667%; }
  .h-col--xl-8 { width: 33.33333333%; }
  .h-col--xl-9 { width: 37.5%; }
  .h-col--xl-10 { width: 41.66666667%; }
  .h-col--xl-11 { width: 45.83333333%; }
  .h-col--xl-12 { width: 50%; }
  .h-col--xl-13 { width: 54.16666667%; }
  .h-col--xl-14 { width: 58.33333333%; }
  .h-col--xl-15 { width: 62.5%; }
  .h-col--xl-16 { width: 66.66666667%; }
  .h-col--xl-17 { width: 70.83333333%; }
  .h-col--xl-18 { width: 75%; }
  .h-col--xl-19 { width: 79.16666667%; }
  .h-col--xl-20 { width: 83.33333333%; }
  .h-col--xl-21 { width: 87.5%; }
  .h-col--xl-22 { width: 91.66666667%; }
  .h-col--xl-23 { width: 95.83333333%; }
  .h-col--xl-24 { width: 100%; }
}

@media (min-width: 1600px) {
  .h-col--xxl-0 { display: none; }
  .h-col--xxl-1 { width: 4.16666667%; }
  .h-col--xxl-2 { width: 8.33333333%; }
  .h-col--xxl-3 { width: 12.5%; }
  .h-col--xxl-4 { width: 16.66666667%; }
  .h-col--xxl-5 { width: 20.83333333%; }
  .h-col--xxl-6 { width: 25%; }
  .h-col--xxl-7 { width: 29.16666667%; }
  .h-col--xxl-8 { width: 33.33333333%; }
  .h-col--xxl-9 { width: 37.5%; }
  .h-col--xxl-10 { width: 41.66666667%; }
  .h-col--xxl-11 { width: 45.83333333%; }
  .h-col--xxl-12 { width: 50%; }
  .h-col--xxl-13 { width: 54.16666667%; }
  .h-col--xxl-14 { width: 58.33333333%; }
  .h-col--xxl-15 { width: 62.5%; }
  .h-col--xxl-16 { width: 66.66666667%; }
  .h-col--xxl-17 { width: 70.83333333%; }
  .h-col--xxl-18 { width: 75%; }
  .h-col--xxl-19 { width: 79.16666667%; }
  .h-col--xxl-20 { width: 83.33333333%; }
  .h-col--xxl-21 { width: 87.5%; }
  .h-col--xxl-22 { width: 91.66666667%; }
  .h-col--xxl-23 { width: 95.83333333%; }
  .h-col--xxl-24 { width: 100%; }
}
</style>