# Icon 图标

基于 SVG 的图标组件，支持多种动效。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HIcon name="home" :size="24" />
    <HIcon name="setting" :size="24" />
    <HIcon name="user" :size="24" />
    <HIcon name="search" :size="24" />
  </div>
</template>
:::

## 图标尺寸

提供 `small`、`default`、`large` 三种尺寸，也可自定义数值。

:::demo
<template>
  <div class="demo-block">
    <HIcon name="star" size="small" />
    <HIcon name="star" />
    <HIcon name="star" size="large" />
    <HIcon name="star" :size="32" />
  </div>
</template>
:::

## 图标颜色

使用 `color` 属性设置图标颜色。

:::demo
<template>
  <div class="demo-block">
    <HIcon name="heart" color="#f43f5e" :size="24" />
    <HIcon name="heart" color="#0ea5e9" :size="24" />
    <HIcon name="heart" color="#22c55e" :size="24" />
    <HIcon name="heart" color="#f59e0b" :size="24" />
  </div>
</template>
:::

## 图标动效

支持旋转、脉冲、悬停效果。

:::demo
<template>
  <div class="demo-block">
    <HIcon name="loading" :size="24" spin />
    <HIcon name="heart" :size="24" pulse />
    <HIcon name="star" :size="24" hover-scale />
    <HIcon name="setting" :size="24" hover-rotate />
  </div>
</template>
:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| name | 图标名称 | `string` | — | — |
| size | 图标尺寸 | `string` / `number` | `small` / `default` / `large` | `default` |
| color | 图标颜色 | `string` | — | — |
| spin | 是否旋转 | `boolean` | — | `false` |
| pulse | 是否脉冲 | `boolean` | — | `false` |
| hoverScale | 悬停缩放 | `boolean` | — | `false` |
| hoverRotate | 悬停旋转 | `boolean` | — | `false` |
| clickBounce | 点击弹跳 | `boolean` | — | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | `(event: MouseEvent)` |