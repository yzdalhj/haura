---
layout: home

hero:
  name: Haura UI
  text: 克制而精致的 Vue 3 组件库
  tagline: 微妙光效 · 动效节奏 · 完整 Props
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
    title: 微妙光效系统
    details: 聚焦、悬停、选中时的柔和光晕，克制的视觉反馈
  - icon: 🎭
    title: 动效节奏感
    details: 独特的缓动曲线和时序编排，让交互充满韵律
  - icon: 📦
    title: 完整 Props
    details: 对标主流 UI 库的属性配置，扩展动效属性
  - icon: 🎨
    title: 6 套主题
    details: 亮色/暗色 × 中性/暖色/冷色，开箱即用
  - icon: 🌐
    title: 国际化
    details: 内置多语言支持，轻松扩展
  - icon: 📱
    title: 响应式
    details: 移动端适配，触控友好
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

## 设计理念

**克制而精致，耐看而不乏味**

Haura UI 追求的是一种克制的精致感。我们不堆砌特效，而是通过微妙的光效和节奏感的动效，让界面在细节处展现品质。

- **微妙光效** — 聚焦、悬停、选中时的柔和光晕
- **动效节奏** — 独特的缓动曲线和时序编排
- **完整 Props** — 丰富的配置项，满足各种需求

## 浏览器支持

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| ≥ 90   | ≥ 88    | ≥ 15   | ≥ 90 |