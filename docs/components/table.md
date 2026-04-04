# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、分页等操作。

## 基础用法


## 带搜索栏

设置 `search` 属性开启搜索栏，列配置中设置 `searchable` 标记可搜索字段。


## 排序

设置 `sortable` 属性开启排序功能。


## 单元格渲染

支持 `slot`、`render`、`type`、`format` 多种渲染方式。


## 分页

设置 `pagination` 属性开启分页。


## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据 | `array` | `[]` |
| columns | 列配置 | `array` | `[]` |
| rowKey | 行唯一标识 | `string` / `function` | — |
| height | 表格高度 | `number` / `string` | — |
| maxHeight | 最大高度 | `number` / `string` | — |
| stripe | 斑马纹 | `boolean` | `false` |
| border | 边框 | `boolean` | `false` |
| size | 尺寸 | `string` | `default` |
| showHeader | 显示表头 | `boolean` | `true` |
| highlightOnHover | 悬停高亮 | `boolean` | `true` |
| loading | 加载状态 | `boolean` | `false` |
| emptyText | 空数据文案 | `string` | `暂无数据` |
| search | 搜索配置 | `boolean` / `object` | `false` |
| pagination | 分页配置 | `boolean` / `object` | `false` |

### Column Props

| 属性 | 说明 | 类型 |
|------|------|------|
| prop | 字段名 | `string` |
| label | 列标题 | `string` |
| type | 列类型 | `string` |
| width | 列宽度 | `number` / `string` |
| align | 对齐方式 | `string` |
| sortable | 是否可排序 | `boolean` / `string` |
| filterable | 是否可筛选 | `boolean` |
| options | 选项配置 | `array` |
| format | 格式化函数 | `function` |
| render | 渲染函数 | `function` |
| slot | 插槽名 | `string` |
| searchable | 搜索配置 | `boolean` / `object` |

### Events

| 事件名 | 说明 |
|--------|------|
| sort-change | 排序变化 |
| page-change | 页码变化 |
| page-size-change | 每页条数变化 |
| search | 搜索 |
| reset | 重置 |
| row-click | 行点击 |
| cell-click | 单元格点击 |

### Methods

| 方法名 | 说明 |
|--------|------|
| clearSelection | 清空选择 |
| toggleRowSelection | 切换行选择 |
| toggleAllSelection | 全选/取消全选 |
| sort | 手动排序 |
| clearSort | 清空排序 |
| clearFilter | 清空筛选 |
| search | 执行搜索 |
| reset | 重置 |