# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HButton @click="visible = true">从右侧打开</HButton>
    <HDrawer v-model="visible" title="抽屉标题">
      <p>这是抽屉内容</p>
    </HDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
:::

## 不同方向

支持四个方向滑出。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="direction = 'left'; visible = true">左侧</HButton>
    <HButton @click="direction = 'right'; visible = true">右侧</HButton>
    <HButton @click="direction = 'top'; visible = true">顶部</HButton>
    <HButton @click="direction = 'bottom'; visible = true">底部</HButton>
    <HDrawer v-model="visible" :direction="direction" title="抽屉">
      <p>从 {{ direction }} 方向滑出</p>
    </HDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const direction = ref('right')
</script>
:::

## 自定义尺寸

使用 `size` 属性设置抽屉尺寸。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="visible = true">30% 宽度</HButton>
    <HDrawer v-model="visible" title="自定义尺寸" size="30%">
      <p>宽度为 30%</p>
    </HDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
:::

## 嵌套抽屉

抽屉可以嵌套使用。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="visible1 = true">打开外层抽屉</HButton>
    <HDrawer v-model="visible1" title="外层抽屉">
      <HButton @click="visible2 = true">打开内层抽屉</HButton>
      <HDrawer v-model="visible2" title="内层抽屉">
        <p>这是内层抽屉内容</p>
      </HDrawer>
    </HDrawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| direction | 打开方向 | `string` | `right` |
| size | 尺寸 | `string` / `number` | `30%` |
| modal | 显示遮罩 | `boolean` | `true` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| showHeader | 显示头部 | `boolean` | `true` |
| showFooter | 显示底部 | `boolean` | `false` |
| beforeClose | 关闭前回调 | `function` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| header | 自定义头部 |
| footer | 自定义底部 |