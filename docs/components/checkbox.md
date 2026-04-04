# Checkbox 多选框

多选框组件，支持多选、半选状态。

## 基础用法


## 禁用状态


## 多选组

使用 `HCheckbox.Group` 组合多个复选框。


## 半选状态

设置 `indeterminate` 属性实现半选状态。


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| value | 选项值 | `string` / `number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 半选状态 | `boolean` | `false` |
| label |显示文本 | `string` | — |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |