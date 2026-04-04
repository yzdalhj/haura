import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/index.css'

// 直接导入本地组件
import HButton from '../../../packages/components/src/button/button.vue'
import HIcon from '../../../packages/components/src/icon/icon.vue'
import HInput from '../../../packages/components/src/input/input.vue'
import HSelect from '../../../packages/components/src/select/select.vue'
import HCheckbox from '../../../packages/components/src/checkbox/checkbox.vue'
import HRadio from '../../../packages/components/src/radio/radio.vue'
import HSwitch from '../../../packages/components/src/switch/switch.vue'
import HCard from '../../../packages/components/src/card/card.vue'
import HTag from '../../../packages/components/src/tag/tag.vue'
import HDrawer from '../../../packages/components/src/drawer/drawer.vue'
import HLoading from '../../../packages/components/src/loading/loading.vue'
import HRow from '../../../packages/components/src/grid/row.vue'
import HCol from '../../../packages/components/src/grid/col.vue'
import HSpace from '../../../packages/components/src/space/space.vue'
import HTabs from '../../../packages/components/src/tabs/tabs.vue'
import HTabPane from '../../../packages/components/src/tabs/tab-pane.vue'
import HDialog from '../../../packages/components/src/dialog/dialog.vue'
import HForm from '../../../packages/components/src/form/form.vue'
import HFormItem from '../../../packages/components/src/form/form-item.vue'
import HTable from '../../../packages/components/src/table/table.vue'

// 导入消息组件
import message from '../../../packages/components/src/message/method'

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
    // 注册所有组件
    app.component('HButton', HButton)
    app.component('HIcon', HIcon)
    app.component('HInput', HInput)
    app.component('HSelect', HSelect)
    app.component('HCheckbox', HCheckbox)
    app.component('HRadio', HRadio)
    app.component('HSwitch', HSwitch)
    app.component('HCard', HCard)
    app.component('HTag', HTag)
    app.component('HDrawer', HDrawer)
    app.component('HLoading', HLoading)
    app.component('HRow', HRow)
    app.component('HCol', HCol)
    app.component('HSpace', HSpace)
    app.component('HTabs', HTabs)
    app.component('HTabPane', HTabPane)
    app.component('HDialog', HDialog)
    app.component('HForm', HForm)
    app.component('HFormItem', HFormItem)
    app.component('HTable', HTable)
    
    // 注册全局演示组件
    app.component('DemoBlock', DemoBlock)
    app.component('InteractiveDemo', InteractiveDemo)
    app.component('ComponentPlayground', ComponentPlayground)
    
    // 注册全局属性
    app.config.globalProperties.$message = message
  }
} satisfies Theme