# 快速上手

本节将帮助您从头开始搭建一个 Haura UI 项目。

## 安装

::: code-group

```bash [pnpm]
pnpm add haura-ui
```

```bash [npm]
npm install haura-ui
```

```bash [yarn]
yarn add haura-ui
```

:::

## 引入组件

### 完整引入

```ts
// main.ts
import { createApp } from 'vue'
import HauraUI from 'haura-ui'
import 'haura-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(HauraUI)
app.mount('#app')
```

### 按需引入

```ts
// main.ts
import { createApp } from 'vue'
import { HButton, HInput, HSelect } from 'haura-ui'
import 'haura-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(HButton)
app.use(HInput)
app.use(HSelect)
app.mount('#app')
```

### 自动导入

配合 `unplugin-vue-components` 和 `unplugin-auto-import` 实现自动导入。

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { HauraResolver } from 'haura-ui/resolver'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [HauraResolver()],
    }),
    Components({
      resolvers: [HauraResolver()],
    }),
  ],
})
```

## 基础使用

现在你可以开始在项目中使用 Haura UI 组件了：

```vue
<template>
  <HButton type="primary" @click="handleClick">
    点击我
  </HButton>
  
  <HInput v-model="input" placeholder="请输入内容" />
  
  <HSelect v-model="select" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const select = ref('')

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

const handleClick = () => {
  console.log('clicked')
}
</script>
```

## 配置主题

Haura UI 提供 6 套预设主题：

```ts
import { createApp } from 'vue'
import HauraUI from 'haura-ui'
import App from './App.vue'

const app = createApp(App)
app.use(HauraUI, {
  theme: 'dark-warm',  // light | dark | light-warm | dark-warm | light-cool | dark-cool
})
app.mount('#app')
```

## 下一步

- [组件列表](/components/button) — 查看所有可用组件
- [主题配置](/guide/theme) — 了解如何自定义主题
- [动效系统](/guide/motion) — 了解动效的使用方式