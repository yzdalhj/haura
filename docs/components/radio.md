# Radio 单选框

单选框组件，用于在一组选项中选择一个。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HRadio.Group v-model="value">
      <HRadio value="1">选项一</HRadio>
      <HRadio value="2">选项二</HRadio>
      <HRadio value="3">选项三</HRadio>
    </HRadio.Group>
    <p>当前值: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('1')
</script>
:::

## 禁用状态

:::demo
<template>
  <div class="demo-block">
    <HRadio.Group v-model="value" disabled>
      <HRadio value="1">选项一</HRadio>
      <HRadio value="2">选项二</HRadio>
    </HRadio.Group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('1')
</script>
:::

## 按钮样式

使用 `button` 属性显示为按钮样式。

:::demo
<template>
  <div class="demo-block">
    <HRadio.Group v-model="value">
      <HRadio value="1" button>选项一</HRadio>
      <HRadio value="2" button>选项二</HRadio>
      <HRadio value="3" button>选项三</HRadio>
    </HRadio.Group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('1')
</script>
:::

## 带边框

使用 `border` 属性显示边框。

:::demo
<template>
  <div class="demo-block">
    <HRadio.Group v-model="value">
      <HRadio value="1" border>选项一</HRadio>
      <HRadio value="2" border>选项二</HRadio>
      <HRadio value="3" border>选项三</HRadio>
    </HRadio.Group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('1')
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` | — |
| value | 选项值 | `string` / `number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| button | 按钮样式 | `boolean` | `false` |
| border | 显示边框 | `boolean` | `false` |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |