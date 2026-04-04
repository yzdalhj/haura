# Row/Col 栅格

通过 24 分栏布局，快速构建响应式页面。

## 基础用法

使用 `span` 属性设置列宽度。

:::demo
<template>
  <div class="demo-block">
    <HRow :gutter="20">
      <HCol :span="6"><div class="grid-item">span-6</div></HCol>
      <HCol :span="6"><div class="grid-item">span-6</div></HCol>
      <HCol :span="6"><div class="grid-item">span-6</div></HCol>
      <HCol :span="6"><div class="grid-item">span-6</div></HCol>
    </HRow>
  </div>
</template>

<style scoped>
.grid-item {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}
</style>
:::

## 分栏偏移

使用 `offset` 属性设置偏移量。

:::demo
<template>
  <div class="demo-block">
    <HRow :gutter="20">
      <HCol :span="6"><div class="grid-item">span-6</div></HCol>
      <HCol :span="6" :offset="6"><div class="grid-item">span-6 offset-6</div></HCol>
    </HRow>
  </div>
</template>

<style scoped>
.grid-item {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}
</style>
:::

## 响应式布局

预设五个响应尺寸：`xs`、`sm`、`md`、`lg`、`xl`。

:::demo
<template>
  <div class="demo-block">
    <HRow :gutter="20">
      <HCol :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-item">响应式</div></HCol>
      <HCol :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-item">响应式</div></HCol>
      <HCol :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-item">响应式</div></HCol>
      <HCol :xs="24" :sm="12" :md="8" :lg="6"><div class="grid-item">响应式</div></HCol>
    </HRow>
  </div>
</template>

<style scoped>
.grid-item {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}
</style>
:::

## 对齐方式

使用 `justify` 和 `align` 属性设置对齐方式。

:::demo
<template>
  <div class="demo-block">
    <HRow justify="center" align="middle">
      <HCol :span="6"><div class="grid-item" style="height: 60px;">居中</div></HCol>
      <HCol :span="6"><div class="grid-item" style="height: 40px;">居中</div></HCol>
      <HCol :span="6"><div class="grid-item" style="height: 80px;">居中</div></HCol>
    </HRow>
  </div>
</template>

<style scoped>
.grid-item {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}
</style>
:::

## API

### Row Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | 栅格间隔 | `number` / `object` | `0` |
| justify | 水平对齐 | `string` | `start` |
| align | 垂直对齐 | `string` | `top` |
| wrap | 是否换行 | `boolean` | `true` |

### Col Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 栅格占位 | `number` | `24` |
| offset | 栅格偏移 | `number` | `0` |
| push | 栅格右移 | `number` | `0` |
| pull | 栅格左移 | `number` | `0` |
| xs | `<576px` | `number` / `object` | — |
| sm | `≥576px` | `number` / `object` | — |
| md | `≥768px` | `number` / `object` | — |
| lg | `≥992px` | `number` / `object` | — |
| xl | `≥1200px` | `number` / `object` | — |