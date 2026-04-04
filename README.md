# Haura UI

> 下一代 Vue 3 交互体验系统

不是组件库。是界面的生命体征。

---

## 光感动态引擎

每一次悬停，都是一次微型光场重构。

不是阴影叠加。是基于视觉层级与空间深度的光子模拟系统。聚焦时的光晕、悬停时的微光、选中时的能量脉冲——让界面拥有温度。

## 智能动效编排

AI-inspired 的时序预测算法。

界面学会"呼吸"。动效不是装饰，而是有生命的反馈语言。贝塞尔曲线的精密调校，让每一次交互都充满韵律。

## 感知自适应系统

- **prefers-reduced-motion** — 尊重用户的静谧偏好
- **prefers-color-scheme** — 随系统主题智能切换
- **RTL 布局感知** — 全球化界面，无国界体验

## 一键接入

```bash
npm install haura-ui
```

```ts
import { createApp } from 'vue'
import HauraUI from 'haura-ui'
import 'haura-ui/style.css'

createApp(App)
  .use(HauraUI, {
    theme: 'auto',      // 感知系统主题
    motion: 'natural',  // 自然动效模式
  })
  .mount('#app')
```

## 设计令牌宇宙

6 套预设主题。无限扩展可能。

```css
/* 自定义你的光 */
:root {
  --aura-primary: #0ea5e9;
  --aura-glow-spread: 12px;
  --aura-motion-speed: 0.3s;
}
```

## 组件矩阵

| 基础 | 表单 | 数据 | 反馈 | 布局 |
|------|------|------|------|------|
| Button | Input | Table | Message | Grid |
| Icon | Select | Card | Dialog | Space |
| | Checkbox | Tag | Drawer | Tabs |
| | Radio | | Loading | |
| | Switch | | | |
| | Form | | | |

## 沉浸体验，即刻开始

📘 [完整文档](https://yzdalhj.github.io/haura/)  
🎮 [在线演练场](https://yzdalhj.github.io/haura/guide/quick-start.html)  
💬 [GitHub Discussions](https://github.com/yzdalhj/haura/discussions)

---

**Haura** — 你的光环。

MIT License © 2024
