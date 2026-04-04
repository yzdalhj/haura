# Input 输入框

通过键盘输入内容，支持多种格式。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="input" placeholder="请输入内容" />
    <p>输入的值: {{ input }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
:::

## 禁用状态

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="input" disabled placeholder="禁用状态" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('禁用内容')
</script>
:::

## 可清空

使用 `clearable` 属性即可开启清空功能。

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="input" clearable placeholder="可清空" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
:::

## 密码输入框

使用 `showPassword` 属性即可开启密码显示切换。

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="password" type="password" show-password placeholder="请输入密码" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const password = ref('')
</script>
:::

## 输入框尺寸

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="input" size="small" placeholder="小型输入框" />
    <HInput v-model="input" placeholder="默认输入框" />
    <HInput v-model="input" size="large" placeholder="大型输入框" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
:::

## 带图标

使用 `prefix-icon` 和 `suffix-icon` 属性添加前缀和后缀图标。

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="input" prefix-icon="search" placeholder="搜索" />
    <HInput v-model="input" suffix-icon="calendar" placeholder="选择日期" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
:::

## 文本域

设置 `type` 为 `textarea` 即可使用文本域。

:::demo
<template>
  <div class="demo-block">
    <HInput 
      v-model="textarea" 
      type="textarea" 
      :rows="4" 
      placeholder="请输入多行文本" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textarea = ref('')
</script>
:::

## 输入验证

使用 `status` 属性显示验证状态。

:::demo
<template>
  <div class="demo-block">
    <HInput v-model="input" status="success" placeholder="验证成功" />
    <HInput v-model="input" status="warning" placeholder="警告" />
    <HInput v-model="input" status="error" placeholder="验证失败" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 绑定值 | `string` / `number` | — | — |
| type | 输入框类型 | `string` | `text` / `password` / `textarea` / `number` / `email` / `tel` / `url` | `text` |
| size | 输入框尺寸 | `string` | `small` / `default` / `large` | `default` |
| placeholder | 占位文本 | `string` | — | — |
| disabled | 是否禁用 | `boolean` | — | `false` |
| readonly | 是否只读 | `boolean` | — | `false` |
| clearable | 是否可清空 | `boolean` | — | `false` |
| showPassword | 是否显示密码切换 | `boolean` | — | `false` |
| maxlength | 最大输入长度 | `number` | — | — |
| minlength | 最小输入长度 | `number` | — | — |
| showWordLimit | 是否显示字数统计 | `boolean` | — | `false` |
| prefixIcon | 前缀图标 | `string` | — | — |
| suffixIcon | 后缀图标 | `string` | — | — |
| rows | 文本域行数 | `number` | — | `2` |
| autosize | 自适应高度 | `boolean` / `object` | — | `false` |
| status | 验证状态 | `string` | `success` / `warning` / `error` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值变化时触发 | `(value: string \| number)` |
| input | 输入时触发 | `(value: string)` |
| change | 值改变时触发 | `(value: string)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |
| clear | 清空时触发 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| prefix | 前缀内容 |
| suffix | 后缀内容 |
| prepend | 前置内容 |
| append | 后置内容 |

### Methods

通过 `ref` 调用：

| 方法名 | 说明 |
|--------|------|
| focus | 获得焦点 |
| blur | 失去焦点 |
| select | 选中内容 |
| clear | 清空内容 |