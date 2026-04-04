---
layout: home

hero:
  name: Haura UI
  text: 为细节而生的 Vue 3 组件库
  tagline: 每一处交互，都值得被认真对待
  image:
    src: /logo.svg
    alt: Haura UI
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick-start
    - theme: alt
      text: 组件列表
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/yzdalhj/haura

features:
  - icon: ✨
    title: 细腻光效
    details: 悬停时的微光、聚焦时的光晕，让每次交互都有温度
  - icon: 🎭
    title: 流畅动效
    details: 精心调校的动画曲线，让界面呼吸起来
  - icon: 📦
    title: 丰富配置
    details: 详尽的属性定义，满足各种场景需求
  - icon: 🎨
    title: 主题系统
    details: 6 套精心设计的主题，一键切换明暗冷暖
  - icon: 🌐
    title: 多语言支持
    details: 内置国际化方案，适配全球用户
  - icon: 📱
    title: 响应式设计
    details: 从桌面到移动端，体验始终如一
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
  --vp-home-hero-image-background-image: linear-gradient(135deg, #0ea5e9 50%, #8b5cf6 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPHero .image-bg {
  transition: all 0.5s ease;
}

.VPHero:hover .image-bg {
  transform: scale(1.1) rotate(5deg);
}
</style>

## 快速开始

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

## 浏览器支持

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| ≥ 90   | ≥ 88    | ≥ 15   | ≥ 90 |