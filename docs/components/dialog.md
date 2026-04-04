# Dialog 对话框

模态对话框，支持多种交互方式。

## 基础用法


## 指令式调用

使用 `useDialog` Hook 快速调用。


## 确认框

使用 `useDialog.confirm` 显示确认框。


## 自定义按钮


## 可拖拽

使用 `draggable` 属性使对话框可拖拽。


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| width | 宽度 | `string` / `number` | `500px` |
| fullscreen | 全屏 | `boolean` | `false` |
| modal | 显示遮罩 | `boolean` | `true` |
| draggable | 可拖拽 | `boolean` | `false` |
| resizable | 可调整大小 | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| beforeClose | 关闭前回调 | `function` | — |

### Methods

| 方法名 | 说明 |
|--------|------|
| useDialog.confirm | 确认框 |
| useDialog.alert | 提示框 |
| useDialog.prompt | 输入框 |
| useDialog.closeAll | 关闭所有对话框 |