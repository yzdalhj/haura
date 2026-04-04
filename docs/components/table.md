# Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、分页等操作。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HTable :data="tableData" :columns="columns" />
  </div>
</template>

<script setup>
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' },
]

const tableData = [
  { name: '张三', age: 28, address: '北京市朝阳区' },
  { name: '李四', age: 32, address: '上海市浦东新区' },
  { name: '王五', age: 25, address: '广州市天河区' },
]
</script>
:::

## 带搜索栏

设置 `search` 属性开启搜索栏，列配置中设置 `searchable` 标记可搜索字段。

:::demo
<template>
  <div class="demo-block">
    <HTable 
      :data="tableData" 
      :columns="columns" 
      search
      :pagination="{ pageSize: 5 }"
    />
  </div>
</template>

<script setup>
const columns = [
  { prop: 'name', label: '姓名', searchable: true },
  { prop: 'age', label: '年龄', sortable: true },
  { 
    prop: 'status', 
    label: '状态',
    type: 'tag',
    searchable: true,
    searchType: 'select',
    options: [
      { label: '在职', value: '在职', type: 'success' },
      { label: '离职', value: '离职', type: 'danger' },
    ]
  },
]

const tableData = [
  { name: '张三', age: 28, status: '在职' },
  { name: '李四', age: 32, status: '在职' },
  { name: '王五', age: 25, status: '离职' },
]
</script>
:::

## 排序

设置 `sortable` 属性开启排序功能。

:::demo
<template>
  <div class="demo-block">
    <HTable :data="tableData" :columns="columns" />
  </div>
</template>

<script setup>
const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'score', label: '分数', width: 100, sortable: true },
]

const tableData = [
  { name: '张三', age: 28, score: 85 },
  { name: '李四', age: 32, score: 92 },
  { name: '王五', age: 25, score: 78 },
]
</script>
:::

## 单元格渲染

支持 `slot`、`render`、`type`、`format` 多种渲染方式。

:::demo
<template>
  <div class="demo-block">
    <HTable :data="tableData" :columns="columns">
      <template #avatar="{ value }">
        <img :src="value" style="width: 40px; height: 40px; border-radius: 50%;" />
      </template>
    </HTable>
  </div>
</template>

<script setup>
const columns = [
  { prop: 'avatar', label: '头像', type: 'image', imageConfig: { width: 40, height: 40 } },
  { prop: 'name', label: '姓名' },
  { prop: 'progress', label: '进度', type: 'progress' },
  { 
    prop: 'status', 
    label: '状态', 
    type: 'tag',
    options: [
      { label: '进行中', value: 'processing', type: 'primary' },
      { label: '已完成', value: 'done', type: 'success' },
    ]
  },
  { prop: 'price', label: '价格', format: v => `¥${v.toLocaleString()}`, align: 'right' },
]

const tableData = [
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', name: '张三', progress: 60, status: 'processing', price: 12800 },
  { avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', name: '李四', progress: 100, status: 'done', price: 25600 },
]
</script>
:::

## 分页

设置 `pagination` 属性开启分页。

:::demo
<template>
  <div class="demo-block">
    <HTable 
      :data="tableData" 
      :columns="columns" 
      :pagination="{ current: 1, pageSize: 5, total: 20 }"
    />
  </div>
</template>

<script setup>
const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]

const tableData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  email: `user${i + 1}@example.com`,
}))
</script>
:::

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