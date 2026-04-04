# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 基础用法


## 不同方向

支持四个方向滑出。


## 自定义尺寸

使用 `size` 属性设置抽屉尺寸。


## 嵌套抽屉

抽屉可以嵌套使用。


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| direction | 打开方向 | `string` | `right` |
| size | 尺寸 | `string` / `number` | `30%` |
| modal | 显示遮罩 | `boolean` | `true` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| showHeader | 显示头部 | `boolean` | `true` |
| showFooter | 显示底部 | `boolean` | `false` |
| beforeClose | 关闭前回调 | `function` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| header | 自定义头部 |
| footer | 自定义底部 |