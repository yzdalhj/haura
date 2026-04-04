# Tabs 标签页

分隔内容区域的标签页组件。

## 基础用法

基础的标签页用法。

## 样式类型

支持 `line`、`card`、`segment` 四种样式。

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` | — |
| type | 样式类型 | `string` | `line` |
| tabPosition | 标签位置 | `string` | `top` |
| closable | 可关闭 | `boolean` | `false` |
| addable | 可新增 | `boolean` | `false` |
| stretch | 撑满容器 | `boolean` | `false` |
| animated | 动画效果 | `boolean` | `true` |

### TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 标签名称 | `string` / `number` | — |
| label | 标签文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| closable | 可关闭 | `boolean` | `false` |

### Events

| 事件名 | 说明 |
|--------|------|
| tab-click | 点击标签时触发 |
| tab-remove | 移除标签时触发 |
| tab-add | 新增标签时触发 |