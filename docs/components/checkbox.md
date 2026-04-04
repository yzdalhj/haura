# Checkbox 多选框

多选框组件，支持多选、半选状态。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HCheckbox v-model="checked">选项</HCheckbox>
    <p>当前状态: {{ checked }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
:::

## 禁用状态

:::demo
<template>
  <div class="demo-block">
    <HCheckbox v-model="checked" disabled>禁用未选中</HCheckbox>
    <HCheckbox v-model="checked2" disabled>禁用已选中</HCheckbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
const checked2 = ref(true)
</script>
:::

## 多选组

使用 `HCheckbox.Group` 组合多个复选框。

:::demo
<template>
  <div class="demo-block">
    <HCheckbox.Group v-model="checkedList">
      <HCheckbox value="1">选项一</HCheckbox>
      <HCheckbox value="2">选项二</HCheckbox>
      <HCheckbox value="3">选项三</HCheckbox>
    </HCheckbox.Group>
    <p>选中值: {{ checkedList }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checkedList = ref(['1'])
</script>
:::

## 半选状态

设置 `indeterminate` 属性实现半选状态。

:::demo
<template>
  <div class="demo-block">
    <HCheckbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">
      全选
    </HCheckbox>
    <HCheckbox.Group v-model="checkedList">
      <HCheckbox value="1">选项一</HCheckbox>
      <HCheckbox value="2">选项二</HCheckbox>
      <HCheckbox value="3">选项三</HCheckbox>
    </HCheckbox.Group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const checkedList = ref(['1'])
const checkAll = ref(false)
const isIndeterminate = computed(() => checkedList.value.length > 0 && checkedList.value.length < 3)

const handleCheckAll = (val) => {
  checkedList.value = val ? ['1', '2', '3'] : []
}
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| value | 选项值 | `string` / `number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 半选状态 | `boolean` | `false` |
| label |显示文本 | `string` | — |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |