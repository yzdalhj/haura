# 主题配置

Haura UI 提供 6 套预设主题，开箱即用。

## 预设主题

| 主题 | 说明 |
|------|------|
| `light` | 亮色中性主题 |
| `dark` | 暗色中性主题 |
| `light-warm` | 亮色暖色主题 |
| `dark-warm` | 暗色暖色主题 |
| `light-cool` | 亮色冷色主题 |
| `dark-cool` | 暗色冷色主题 |

## 使用方式

```ts
import { createApp } from 'vue'
import HauraUI from 'haura-ui'
import App from './App.vue'

const app = createApp(App)
app.use(HauraUI, {
  theme: 'dark-warm',
})
app.mount('#app')
```

## CSS 变量

Haura UI 使用 CSS 变量实现主题切换，你可以覆盖这些变量来自定义主题：

```css
:root {
  --aura-color-primary-500: #0ea5e9;
  --aura-bg-base: #ffffff;
  --aura-text-primary: #171717;
}
```