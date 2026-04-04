# Space 间距

设置元素之间的间距。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HSpace>
      <HButton>按钮一</HButton>
      <HButton>按钮二</HButton>
      <HButton>按钮三</HButton>
    </HSpace>
  </div>
</template>
:::

## 间距大小

使用 `size` 属性设置间距大小。

:::demo
<template>
  <div class="demo-block">
    <HSpace size="small">
      <HButton>Small</HButton>
      <HButton>Small</HButton>
    </HSpace>
    <HSpace>
      <HButton>Default</HButton>
      <HButton>Default</HButton>
    </HSpace>
    <HSpace size="large">
      <HButton>Large</HButton>
      <HButton>Large</HButton>
    </HSpace>
    <HSpace :size="32">
      <HButton>32px</HButton>
      <HButton>32px</HButton>
    </HSpace>
  </div>
</template>
:::

## 垂直布局

使用 `direction` 属性设置布局方向。

:::demo
<template>
  <div class="demo-block">
    <HSpace direction="vertical">
      <HButton>按钮一</HButton>
      <HButton>按钮二</HButton>
      <HButton>按钮三</HButton>
    </HSpace>
  </div>
</template>
:::

## 分隔符

使用 `separator` 属性设置分隔符。

:::demo
<template>
  <div class="demo-block">
    <HSpace separator="|">
      <span>首页</span>
      <span>产品</span>
      <span>关于</span>
    </HSpace>
    <HSpace separator="/">
      <span>首页</span>
      <span>产品</span>
      <span>关于</span>
    </HSpace>
  </div>
</template>
:::

## 自动换行

使用 `wrap` 属性控制是否自动换行。

:::demo
<template>
  <div class="demo-block">
    <HSpace wrap>
      <HButton v-for="i in 10" :key="i">按钮 {{ i }}</HButton>
    </HSpace>
  </div>
</template>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 间距大小 | `string` / `number` / `array` | `default` |
| direction | 排列方向 | `string` | `horizontal` |
| wrap | 是否换行 | `boolean` | `false` |
| align | 对齐方式 | `string` | `center` |
| separator | 分隔符 | `string` / `VNode` | — |