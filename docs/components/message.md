# Message 消息提示

用于显示操作反馈的轻量级提示。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HButton @click="openMessage('info')">信息</HButton>
    <HButton @click="openMessage('success')">成功</HButton>
    <HButton @click="openMessage('warning')">警告</HButton>
    <HButton @click="openMessage('error')">错误</HButton>
  </div>
</template>

<script setup>
import { message } from '@haura/components'

const openMessage = (type) => {
  message[type](`这是一条${type}消息`)
}
</script>
:::

## 可关闭的消息

:::demo
<template>
  <div class="demo-block">
    <HButton @click="openClosable">可关闭消息</HButton>
  </div>
</template>

<script setup>
import { message } from '@haura/components'

const openClosable = () => {
  message({
    message: '这是一条可关闭的消息',
    showClose: true,
  })
}
</script>
:::

## 自定义时长

:::demo
<template>
  <div class="demo-block">
    <HButton @click="openDuration">显示 5 秒</HButton>
  </div>
</template>

<script setup>
import { message } from '@haura/components'

const openDuration = () => {
  message({
    message: '这条消息将显示 5 秒',
    duration: 5000,
  })
}
</script>
:::

## 全局方法

Message 提供了以下全局方法：

- `message(message)` - 默认消息
- `message.success(message)` - 成功消息
- `message.warning(message)` - 警告消息
- `message.error(message)` - 错误消息
- `message.info(message)` - 信息消息
- `message.closeAll()` - 关闭所有消息

## API

### Options

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息内容 | `string` / `VNode` | — |
| type | 消息类型 | `string` | `info` |
| duration | 显示时间(ms) | `number` | `3000` |
| showClose | 显示关闭按钮 | `boolean` | `false` |
| center | 文字居中 | `boolean` | `false` |
| onClose | 关闭回调 | `function` | — |