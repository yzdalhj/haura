# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 属性来定义按钮的样式。

:::demo
<template>
  <div class="demo-block">
    <HButton>默认按钮</HButton>
    <HButton type="primary">主要按钮</HButton>
    <HButton type="success">成功按钮</HButton>
    <HButton type="warning">警告按钮</HButton>
    <HButton type="danger">危险按钮</HButton>
    <HButton type="info">信息按钮</HButton>
  </div>
</template>
:::

## 禁用状态

使用 `disabled` 属性来控制按钮是否禁用。

:::demo
<template>
  <div class="demo-block">
    <HButton disabled>禁用按钮</HButton>
    <HButton type="primary" disabled>主要按钮</HButton>
    <HButton type="success" disabled>成功按钮</HButton>
  </div>
</template>
:::

## 按钮尺寸

使用 `size` 属性设置按钮尺寸，提供 `small`、`default`、`large` 三种尺寸。

:::demo
<template>
  <div class="demo-block">
    <HButton size="small">小型按钮</HButton>
    <HButton>默认按钮</HButton>
    <HButton size="large">大型按钮</HButton>
  </div>
  <div class="demo-block">
    <HButton size="small" type="primary">小型按钮</HButton>
    <HButton type="primary">默认按钮</HButton>
    <HButton size="large" type="primary">大型按钮</HButton>
  </div>
</template>
:::

## 加载状态

通过 `loading` 属性设置按钮加载状态。

:::demo
<template>
  <div class="demo-block">
    <HButton type="primary" :loading="loading" @click="handleLoad">
      {{ loading ? '加载中...' : '点击加载' }}
    </HButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleLoad = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
:::

## 图标按钮

使用 `icon` 属性设置图标，或使用 `icon` 插槽。

:::demo
<template>
  <div class="demo-block">
    <HButton icon="search" type="primary">搜索</HButton>
    <HButton icon="edit" type="primary" />
    <HButton icon="delete" type="danger" />
    <HButton type="primary">
      <template #icon>🔍</template>
      自定义图标
    </HButton>
  </div>
</template>
:::

## 按钮组

使用 `<HButton.Group>` 组合多个按钮。

:::demo
<template>
  <div class="demo-block">
    <HButton.Group>
      <HButton type="primary">上一页</HButton>
      <HButton type="primary">下一页</HButton>
    </HButton.Group>
  </div>
</template>
:::

## 动效配置

Haura Button 内置多种动效，可通过 `effect` 属性配置。

:::demo
<template>
  <div class="demo-block">
    <HButton type="primary" effect="ripple">涟漪效果</HButton>
    <HButton type="primary" effect="glow">光效效果</HButton>
    <HButton type="primary" effect="glass">玻璃效果</HButton>
    <HButton type="primary" effect="gradient">渐变效果</HButton>
  </div>
</template>
:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | `string` | `default` / `primary` / `success` / `warning` / `danger` / `info` | `default` |
| size | 按钮尺寸 | `string` | `small` / `default` / `large` | `default` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| loading | 是否加载中 | `boolean` | — | `false` |
| icon | 图标名称 | `string` | — | — |
| effect | 动效类型 | `string` | `ripple` / `glow` / `glass` / `gradient` / `none` | `ripple` |
| effectDuration | 动效时长 | `number` | — | `600` |
| plain | 朴素按钮 | `boolean` | — | `false` |
| round | 圆角按钮 | `boolean` | — | `false` |
| circle | 圆形按钮 | `boolean` | — | `false` |
| nativeType | 原生 type 属性 | `string` | `button` / `submit` / `reset` | `button` |
| block | 宽度撑满父容器 | `boolean` | — | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标 |