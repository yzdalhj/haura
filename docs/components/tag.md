# Tag 标签

用于标记和分类的标签组件。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HTag>默认标签</HTag>
    <HTag type="primary">主要标签</HTag>
    <HTag type="success">成功标签</HTag>
    <HTag type="warning">警告标签</HTag>
    <HTag type="danger">危险标签</HTag>
    <HTag type="info">信息标签</HTag>
  </div>
</template>
:::

## 可关闭

使用 `closable` 属性显示关闭按钮。

:::demo
<template>
  <div class="demo-block">
    <HTag v-for="tag in tags" :key="tag" closable @close="handleClose(tag)">
      {{ tag }}
    </HTag>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref(['标签一', '标签二', '标签三'])

const handleClose = (tag) => {
  tags.value = tags.value.filter(t => t !== tag)
}
</script>
:::

## 不同尺寸

:::demo
<template>
  <div class="demo-block">
    <HTag size="small">小型标签</HTag>
    <HTag size="default">默认标签</HTag>
    <HTag size="large">大型标签</HTag>
  </div>
</template>
:::

## 自定义颜色

使用 `color` 属性自定义标签颜色。

:::demo
<template>
  <div class="demo-block">
    <HTag color="#f43f5e">自定义颜色</HTag>
    <HTag color="#0ea5e9">自定义颜色</HTag>
    <HTag color="#22c55e">自定义颜色</HTag>
  </div>
</template>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 标签类型 | `string` | `default` |
| size | 标签尺寸 | `string` | `default` |
| color | 自定义颜色 | `string` | — |
| closable | 可关闭 | `boolean` | `false` |
| round | 圆角样式 | `boolean` | `false` |

### Events

| 事件名 | 说明 |
|--------|------|
| close | 关闭时触发 |
| click | 点击时触发 |