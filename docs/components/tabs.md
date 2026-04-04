# Tabs 标签页

分隔内容区域的标签页组件。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HTabs v-model="activeTab">
      <HTabPane name="tab1" label="标签一">
        内容一
      </HTabPane>
      <HTabPane name="tab2" label="标签二">
        内容二
      </HTabPane>
      <HTabPane name="tab3" label="标签三">
        内容三
      </HTabPane>
    </HTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>
:::

## 样式类型

支持 `line`、`card`、`border-card`、`segment` 四种样式。

:::demo
<template>
  <div class="demo-block">
    <HTabs v-model="activeTab" type="card">
      <HTabPane name="tab1" label="卡片样式">内容一</HTabPane>
      <HTabPane name="tab2" label="卡片样式">内容二</HTabPane>
    </HTabs>
  </div>
  <div class="demo-block">
    <HTabs v-model="activeTab" type="segment">
      <HTabPane name="tab1" label="分段样式">内容一</HTabPane>
      <HTabPane name="tab2" label="分段样式">内容二</HTabPane>
    </HTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>
:::

## 标签位置

使用 `tabPosition` 属性设置标签位置。

:::demo
<template>
  <div class="demo-block">
    <HTabs v-model="activeTab" tab-position="left">
      <HTabPane name="tab1" label="标签一">内容一</HTabPane>
      <HTabPane name="tab2" label="标签二">内容二</HTabPane>
      <HTabPane name="tab3" label="标签三">内容三</HTabPane>
    </HTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>
:::

## 可关闭

使用 `closable` 属性显示关闭按钮。

:::demo
<template>
  <div class="demo-block">
    <HTabs v-model="activeTab" type="card" closable>
      <HTabPane v-for="tab in tabs" :key="tab.name" :name="tab.name" :label="tab.label">
        {{ tab.content }}
      </HTabPane>
    </HTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
const tabs = ref([
  { name: 'tab1', label: '标签一', content: '内容一' },
  { name: 'tab2', label: '标签二', content: '内容二' },
  { name: 'tab3', label: '标签三', content: '内容三' },
])
</script>
:::

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` | — |
| type | 样式类型 | `string` | `line` |
| tabPosition | 标签位置 | `string` | `top` |
| closable | 可关闭 | `boolean` | `false` |
| addable | 可新增 | `boolean` | `false` |
| stretch | 撑满容器 | `boolean` | `false` |
| animated | 动画效果 | `boolean` | `true` |

### TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 标签名称 | `string` / `number` | — |
| label | 标签文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| closable | 可关闭 | `boolean` | `false` |

### Events

| 事件名 | 说明 |
|--------|------|
| tab-click | 点击标签时触发 |
| tab-remove | 移除标签时触发 |
| tab-add | 新增标签时触发 |