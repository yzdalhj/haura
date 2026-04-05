# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、分页等操作。

## 基础用法

<ComponentPlayground
  component="table"
>
  <template #default>
    <HTable :data="tableData" :columns="columns" style="width: 100%;" />
  </template>
</ComponentPlayground>

## 带斑马纹

<ComponentPlayground
  component="table"
>
  <template #default>
    <HTable :data="tableData" :columns="columns" stripe style="width: 100%;" />
  </template>
</ComponentPlayground>

## 带边框

<ComponentPlayground
  component="table"
>
  <template #default>
    <HTable :data="tableData" :columns="columns" border style="width: 100%;" />
  </template>
</ComponentPlayground>

## 加载状态

<ComponentPlayground
  component="table"
>
  <template #default>
    <HTable :data="[]" :columns="columns" loading style="width: 100%;" />
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据 | `array` | `[]` |
| columns | 列配置 | `array` | `[]` |
| stripe | 斑马纹 | `boolean` | `false` |
| border | 边框 | `boolean` | `false` |
| size | 尺寸 | `string` | `default` |
| loading | 加载状态 | `boolean` | `false` |
| highlightOnHover | 悬停高亮 | `boolean` | `true` |
| emptyText | 空数据文案 | `string` | `暂无数据` |

### Column Props

| 属性 | 说明 | 类型 |
|------|------|------|
| prop | 字段名 | `string` |
| label | 列标题 | `string` |
| width | 列宽度 | `number` / `string` |
| align | 对齐方式 | `string` |
| sortable | 是否可排序 | `boolean` |
| fixed | 固定列 | `string` / `boolean` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| row-click | 行点击 | `(row: object, index: number)` |
| cell-click | 单元格点击 | `(row: object, column: object)` |
| sort-change | 排序变化 | `(prop: string, order: string)` |
