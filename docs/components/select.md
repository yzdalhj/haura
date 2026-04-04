# Select 选择器

下拉选择器，支持单选、多选、搜索等功能。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HSelect v-model="value" :options="options" placeholder="请选择" />
    <p>当前值: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
:::

## 禁用状态

:::demo
<template>
  <div class="demo-block">
    <HSelect v-model="value" disabled placeholder="禁用状态" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
:::

## 可清空

使用 `clearable` 属性即可开启清空功能。

:::demo
<template>
  <div class="demo-block">
    <HSelect v-model="value" :options="options" clearable placeholder="可清空" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('1')

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
:::

## 多选

设置 `multiple` 属性开启多选模式。

:::demo
<template>
  <div class="demo-block">
    <HSelect v-model="value" :options="options" multiple placeholder="请选择多项" />
    <p>当前值: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]
</script>
:::

## 可搜索

设置 `filterable` 属性开启搜索功能。

:::demo
<template>
  <div class="demo-block">
    <HSelect v-model="value" :options="options" filterable placeholder="可搜索" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>
:::

## 分组

使用 `options` 中的 `group` 字段实现分组。

:::demo
<template>
  <div class="demo-block">
    <HSelect v-model="value" :options="options" placeholder="请选择城市" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  { label: '热门城市', group: true },
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广东省', group: true },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` / `array` | — |
| options | 选项数据 | `array` | `[]` |
| multiple | 是否多选 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | `请选择` |
| size | 尺寸 | `string` | `default` |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |
| clear | 清空时触发 |
| visible-change | 下拉框显示/隐藏时触发 |