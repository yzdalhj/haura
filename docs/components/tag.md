# Tag 标签

用于标记和分类的标签组件。

## 基础用法


## 可关闭

使用 `closable` 属性显示关闭按钮。


## 不同尺寸


## 自定义颜色

使用 `color` 属性自定义标签颜色。


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 标签类型 | `string` | `default` |
| size | 标签尺寸 | `string` | `default` |
| color | 自定义颜色 | `string` | — |
| closable | 可关闭 | `boolean` | `false` |
| round | 圆角样式 | `boolean` | `false` |

### Events

| 事件名 | 说明 |
|--------|------|
| close | 关闭时触发 |
| click | 点击时触发 |