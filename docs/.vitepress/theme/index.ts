import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HauraUI from '@haura/components'
import '@haura/theme/style.css'
import './styles/index.css'

// 导入演示组件
import DemoBlock from '../components/DemoBlock.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'
import ComponentPlayground from '../components/ComponentPlayground.vue'

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
    
    // 注册全局演示组件
    app.component('DemoBlock', DemoBlock)
    app.component('InteractiveDemo', InteractiveDemo)
    app.component('ComponentPlayground', ComponentPlayground)
  }
} satisfies Theme