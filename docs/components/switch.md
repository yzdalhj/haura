# Switch 开关

开关组件，用于表示两种状态之间的切换。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HSwitch v-model="value" />
    <p>当前状态: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>
:::

## 禁用状态

:::demo
<template>
  <div class="demo-block">
    <HSwitch v-model="value" disabled />
    <HSwitch v-model="value2" disabled />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
const value2 = ref(true)
</script>
:::

## 文字描述

使用 `activeText` 和 `inactiveText` 设置文字描述。

:::demo
<template>
  <div class="demo-block">
    <HSwitch 
      v-model="value" 
      active-text="开启" 
      inactive-text="关闭" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>
:::

## 加载状态

:::demo
<template>
  <div class="demo-block">
    <HSwitch v-model="value" :loading="loading" @change="handleChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
const loading = ref(false)

const handleChange = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>
:::

## 自定义值

使用 `activeValue` 和 `inactiveValue` 设置绑定值。

:::demo
<template>
  <div class="demo-block">
    <HSwitch 
      v-model="value" 
      active-value="on" 
      inactive-value="off" 
    />
    <p>当前值: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('off')
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` / `string` / `number` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| activeText | 开启文字 | `string` | — |
| inactiveText | 关闭文字 | `string` | — |
| activeValue | 开启值 | `any` | `true` |
| inactiveValue | 关闭值 | `any` | `false` |
| size | 尺寸 | `string` | `default` |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |