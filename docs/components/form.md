# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用于收集、校验和提交数据。

## 基础用法

通过 `config` 配置字段，自动生成表单。


## 表单验证

通过 `rules` 配置验证规则。


## 查看模式

设置 `mode="view"` 显示为只读描述列表。


## 深度属性绑定

支持嵌套对象和数组路径绑定。


## 字段联动

通过 `onChange` 实现字段间联动。


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| config | 字段配置 | `array` | `[]` |
| modelValue | 表单数据 | `object` | `{}` |
| mode | 模式 | `string` | `edit` |
| layout | 布局方式 | `string` | `horizontal` |
| labelWidth | 标签宽度 | `string` / `number` | `100px` |
| labelPosition | 标签位置 | `string` | `right` |
| columns | 列数 | `number` | `1` |
| disabled | 禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| showFooter | 显示底部 | `boolean` | `false` |
| validateTrigger | 验证触发时机 | `string` | `blur` |
| transform | 提交前转换 | `function` | — |

### Field Config

| 属性 | 说明 | 类型 |
|------|------|------|
| prop | 字段路径 | `string` |
| label | 标签文本 | `string` |
| type | 字段类型 | `string` |
| span | 栅格占位 | `number` |
| required | 是否必填 | `boolean` |
| rules | 验证规则 | `array` |
| visible | 是否显示 | `boolean` / `function` |
| disabled | 是否禁用 | `boolean` / `function` |
| format | 显示格式化 | `function` |
| onChange | 值变化回调 | `function` |

### Methods

通过 `ref` 调用：

| 方法名 | 说明 |
|--------|------|
| validate | 验证表单 |
| validateField | 验证单个字段 |
| reset | 重置表单 |
| resetField | 重置单个字段 |
| submit | 提交表单 |
| setValues | 设置多个值 |
| setFieldValue | 设置单个值 |
| getFieldValue | 获取单个值 |
| setFieldOptions | 设置字段选项 |
| setErrors | 设置错误信息 |
| clearErrors | 清空错误信息 |