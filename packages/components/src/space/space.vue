<template>
  <div
    :class="[
      'h-space',
      `h-space--${direction}`,
      `h-space--align-${alignment}`,
      {
        'is-wrap': wrapBoolean,
        'is-wrap-reverse': wrap === 'reverse',
        'is-fill': fill,
        'is-fill-always': fill === 'always',
      },
      props.class,
    ]"
    :style="spaceStyle"
    @click="handleClick"
  >
    <template v-if="hasSpacer">
      <template v-for="(item, index) in items" :key="index">
        <div
          class="h-space__item"
          :style="itemStyleComputed"
        >
          <component :is="item" v-if="typeof item === 'object'" />
          <template v-else>{{ item }}</template>
        </div>
        <div
          v-if="separator && index < items.length - 1"
          class="h-space__separator"
          :style="separatorStyle"
        >
          <component :is="separator" v-if="typeof separator === 'object'" />
          <template v-else-if="separator">{{ separator }}</template>
        </div>
      </template>
    </template>
    <template v-else>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="h-space__item"
        :style="itemStyleComputed"
      >
        <slot :name="index" :item="item">
          <component :is="item" v-if="typeof item === 'object'" />
          <template v-else>{{ item }}</template>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type CSSProperties, type VNode } from 'vue'
import { spacePropsDefaults, spaceSizePresets } from './space'
import type { SpaceProps, SpaceEmits } from './space'

const props = withDefaults(defineProps<SpaceProps>(), spacePropsDefaults)

const emit = defineEmits<SpaceEmits>()

const slots = useSlots()

const wrapBoolean = computed(() => {
  if (props.wrap === 'reverse') return true
  return props.wrap
})

const sizeValue = computed(() => {
  if (typeof props.size === 'number') {
    return props.size
  }
  if (Array.isArray(props.size)) {
    return props.size
  }
  return spaceSizePresets[props.size as string] || spaceSizePresets.default
})

const spaceStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    ...props.style,
  }

  if (Array.isArray(sizeValue.value)) {
    const [horizontal, vertical] = sizeValue.value
    style.gap = `${vertical}px ${horizontal}px`
  } else {
    style.gap = `${sizeValue.value}px`
  }

  return style
})

const itemStyleComputed = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    ...props.itemStyle,
  }

  if (props.fill) {
    style.flex = `1 1 ${props.fillRatio}%`
  }

  return style
})

const separatorStyle = computed<CSSProperties>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const items = computed(() => {
  if (slots.default) {
    return slots.default()
  }
  return []
})

const hasSpacer = computed(() => !!props.separator)

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.h-space {
  display: inline-flex;
  box-sizing: border-box;
}

.h-space--horizontal {
  flex-direction: row;
}

.h-space--vertical {
  flex-direction: column;
}

.h-space--align-start {
  align-items: flex-start;
}

.h-space--align-end {
  align-items: flex-end;
}

.h-space--align-center {
  align-items: center;
}

.h-space--align-baseline {
  align-items: baseline;
}

.h-space--align-stretch {
  align-items: stretch;
}

.h-space.is-wrap {
  flex-wrap: wrap;
}

.h-space.is-wrap-reverse {
  flex-wrap: wrap-reverse;
}

.h-space.is-fill {
  display: flex;
}

.h-space.is-fill .h-space__item {
  flex: 1 1 auto;
}

.h-space__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.h-space__separator {
  display: inline-flex;
  align-items: center;
  color: var(--aura-text-tertiary, #a3a3a3);
}
</style>