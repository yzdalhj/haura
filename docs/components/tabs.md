# Tabs 标签页

分隔内容区域的标签页组件。

## 交互演示

<ComponentPlayground
  component="tabs"
  :defaultProps="{ type: 'line' }"
  :propConfig="{
    type: {
      type: 'select',
      label: '类型',
      default: 'line',
      options: [
        { label: 'Line', value: 'line' },
        { label: 'Card', value: 'card' },
        { label: 'Segment', value: 'segment' }
      ]
    },
    size: {
      type: 'select',
      label: '尺寸',
      default: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' }
      ]
    }
  }"
>
  <template #default="{ props }">
    <HTabs v-bind="props" v-model="activeTab" style="width: 100%;">
      <HTabPane label="用户管理" name="first">用户管理内容</HTabPane>
      <HTabPane label="配置管理" name="second">配置管理内容</HTabPane>
      <HTabPane label="角色管理" name="third">角色管理内容</HTabPane>
    </HTabs>
  </template>
</ComponentPlayground>

## 禁用标签

<ComponentPlayground
  component="tabs"
>
  <template #default>
    <HTabs v-model="activeTab2">
      <HTabPane label="可点击" name="first">内容一</HTabPane>
      <HTabPane label="已禁用" name="second" disabled>内容二</HTabPane>
      <HTabPane label="可点击" name="third">内容三</HTabPane>
    </HTabs>
  </template>
</ComponentPlayground>

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 绑定值 | `string` / `number` | — |
| type | 类型 | `string` | `line` |
| size | 尺寸 | `string` | `default` |
| tabPosition | 标签位置 | `string` | `top` |
| closable | 可关闭 | `boolean` | `false` |
| stretch | 撑满容器 | `boolean` | `false` |

### TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 标签名称 | `string` / `number` | — |
| label | 标签文本 | `string` | — |
| disabled | 禁用 | `boolean` | `false` |
| closable | 可关闭 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| tab-click | 点击标签时触发 | `(tab: TabPane)` |
