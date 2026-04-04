# Loading 加载

加载数据时显示的加载状态。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HLoading />
    <HLoading type="spinner" />
    <HLoading type="dots" />
    <HLoading type="bars" />
    <HLoading type="pulse" />
    <HLoading type="progress" />
  </div>
</template>
:::

## 不同尺寸

:::demo
<template>
  <div class="demo-block">
    <HLoading size="small" />
    <HLoading />
    <HLoading size="large" />
  </div>
</template>
:::

## 文字描述

使用 `text` 属性显示文字描述。

:::demo
<template>
  <div class="demo-block">
    <HLoading text="加载中..." />
    <HLoading type="spinner" text="请稍候" />
  </div>
</template>
:::

## 指令用法

使用 `v-loading` 指令在元素上显示加载状态。

:::demo
<template>
  <div class="demo-block">
    <div 
      v-loading="loading" 
      style="width: 200px; height: 100px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center;"
    >
      内容区域
    </div>
    <HButton @click="loading = !loading">切换加载状态</HButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
:::

## 全屏加载

使用 `fullscreen` 属性全屏显示。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="showFullscreen">全屏加载</HButton>
  </div>
</template>

<script setup>
import { loadingService } from '@haura/components'

const showFullscreen = () => {
  const loading = loadingService({
    fullscreen: true,
    text: '加载中...',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 加载类型 | `string` | `spinner` |
| size | 尺寸 | `string` | `default` |
| text | 文字描述 | `string` | — |
| color | 颜色 | `string` | — |
| background | 背景色 | `string` | — |
| fullscreen | 全屏显示 | `boolean` | `false` |

### Directive

| 参数 | 说明 | 类型 |
|------|------|------|
| v-loading | 是否显示 | `boolean` |
| loading-text | 文字描述 | `string` |
| loading-background | 背景色 | `string` |
| loading-type | 加载类型 | `string` |

### Service

```ts
import { loadingService } from '@haura/components'

const loading = loadingService({
  fullscreen: true,
  text: '加载中...',
  type: 'spinner',
})

loading.close() // 关闭
```