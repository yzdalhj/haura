import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HauraUI from '@haura/components'
import '@haura/theme/style.css'
import './styles/index.css'

export default {
  extends: DefaultTheme,
  
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 自定义插槽
    })
  },
  
  enhanceApp({ app }) {
    // 注册 Haura UI
    app.use(HauraUI)
  }
} satisfies Theme