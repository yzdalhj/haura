# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用于收集、校验和提交数据。

## 基础用法

通过 `config` 配置字段，自动生成表单。

:::demo
<template>
  <div class="demo-block">
    <HForm :config="config" :model-value="formData" @submit="handleSubmit" show-footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = [
  { prop: 'name', label: '姓名', type: 'input', required: true },
  { prop: 'age', label: '年龄', type: 'number', span: 12 },
  { 
    prop: 'gender', 
    label: '性别', 
    type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
    span: 12,
  },
  { prop: 'bio', label: '简介', type: 'textarea', rows: 3 },
]

const formData = ref({
  name: '',
  age: null,
  gender: '',
  bio: '',
})

const handleSubmit = (values) => {
  console.log('提交数据:', values)
}
</script>
:::

## 表单验证

通过 `rules` 配置验证规则。

:::demo
<template>
  <div class="demo-block">
    <HForm ref="formRef" :config="config" :model-value="formData" show-footer @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const config = [
  { 
    prop: 'email', 
    label: '邮箱', 
    type: 'input',
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '请输入正确的邮箱格式' },
    ]
  },
  { 
    prop: 'password', 
    label: '密码', 
    type: 'input',
    inputType: 'password',
    rules: [
      { required: true, message: '请输入密码' },
      { min: 6, max: 20, message: '密码长度为 6-20 位' },
    ]
  },
]

const formData = ref({
  email: '',
  password: '',
})

const handleSubmit = (values) => {
  console.log('提交:', values)
}
</script>
:::

## 查看模式

设置 `mode="view"` 显示为只读描述列表。

:::demo
<template>
  <div class="demo-block">
    <HForm :config="config" :model-value="formData" mode="view" />
  </div>
</template>

<script setup>
const config = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄', format: v => `${v} 岁` },
  { prop: 'status', label: '状态', type: 'tag', options: [
    { label: '启用', value: 1, type: 'success' },
    { label: '禁用', value: 0, type: 'danger' },
  ]},
]

const formData = {
  name: '张三',
  age: 28,
  status: 1,
}
</script>
:::

## 深度属性绑定

支持嵌套对象和数组路径绑定。

:::demo
<template>
  <div class="demo-block">
    <HForm :config="config" :model-value="formData" show-footer @submit="handleSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const config = [
  { prop: 'user.name', label: '用户名' },
  { prop: 'user.profile.email', label: '邮箱' },
  { prop: 'user.address.city', label: '城市' },
  { prop: 'tags[0]', label: '标签1' },
  { prop: 'tags[1]', label: '标签2' },
]

const formData = ref({
  user: {
    name: '张三',
    profile: {
      email: 'zhangsan@example.com',
    },
    address: {
      city: '北京',
    },
  },
  tags: ['Vue', 'TypeScript'],
})

const handleSubmit = (values) => {
  console.log('提交:', values)
}
</script>
:::

## 字段联动

通过 `onChange` 实现字段间联动。

:::demo
<template>
  <div class="demo-block">
    <HForm :config="config" :model-value="formData" show-footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cities = {
  beijing: [
    { label: '朝阳区', value: 'chaoyang' },
    { label: '海淀区', value: 'haidian' },
  ],
  shanghai: [
    { label: '浦东新区', value: 'pudong' },
    { label: '黄浦区', value: 'huangpu' },
  ],
}

const config = [
  {
    prop: 'province',
    label: '省份',
    type: 'select',
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
    ],
    onChange: (value, form) => {
      form.setFieldValue('city', '')
      form.setFieldOptions('city', cities[value] || [])
    }
  },
  {
    prop: 'city',
    label: '城市',
    type: 'select',
    options: [],
  },
]

const formData = ref({
  province: '',
  city: '',
})
</script>
:::

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