# Dialog 对话框

模态对话框，支持多种交互方式。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HButton type="primary" @click="visible = true">打开对话框</HButton>
    <HDialog v-model="visible" title="对话框标题">
      <p>这是对话框内容</p>
    </HDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
:::

## 指令式调用

使用 `useDialog` Hook 快速调用。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="showDialog">指令式调用</HButton>
  </div>
</template>

<script setup>
import { useDialog } from '@haura/components'

const { open } = useDialog({
  title: '提示',
  content: '这是通过指令式调用的对话框',
})

const showDialog = () => {
  open()
}
</script>
:::

## 确认框

使用 `useDialog.confirm` 显示确认框。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="showConfirm">删除确认</HButton>
  </div>
</template>

<script setup>
import { useDialog } from '@haura/components'

const showConfirm = async () => {
  const confirmed = await useDialog.confirm('确定要删除吗？')
  if (confirmed) {
    console.log('已确认删除')
  }
}
</script>
:::

## 自定义按钮

:::demo
<template>
  <div class="demo-block">
    <HButton @click="showCustomButtons">自定义按钮</HButton>
  </div>
</template>

<script setup>
import { useDialog } from '@haura/components'

const showCustomButtons = () => {
  useDialog({
    title: '自定义按钮',
    content: '可以自定义按钮配置',
    buttons: [
      { text: '取消', action: 'cancel' },
      { text: '保存草稿', action: 'draft', type: 'default' },
      { text: '提交', action: 'confirm', type: 'primary' },
    ],
  })
}
</script>
:::

## 可拖拽

使用 `draggable` 属性使对话框可拖拽。

:::demo
<template>
  <div class="demo-block">
    <HButton @click="visible = true">可拖拽对话框</HButton>
    <HDialog v-model="visible" title="可拖拽" draggable>
      <p>尝试拖拽标题栏移动对话框</p>
    </HDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| width | 宽度 | `string` / `number` | `500px` |
| fullscreen | 全屏 | `boolean` | `false` |
| modal | 显示遮罩 | `boolean` | `true` |
| draggable | 可拖拽 | `boolean` | `false` |
| resizable | 可调整大小 | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| beforeClose | 关闭前回调 | `function` | — |

### Methods

| 方法名 | 说明 |
|--------|------|
| useDialog.confirm | 确认框 |
| useDialog.alert | 提示框 |
| useDialog.prompt | 输入框 |
| useDialog.closeAll | 关闭所有对话框 |