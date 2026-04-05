# Form 表单

由输入框、选择器、单选框、多选框等控件组成，用于收集、校验和提交数据。

## 交互演示

<ComponentPlayground
  component="form"
>
  <template #default>
    <HForm :model="formData" style="width: 400px;">
      <HFormItem label="用户名">
        <HInput v-model="formData.name" placeholder="请输入用户名" />
      </HFormItem>
      <HFormItem label="邮箱">
        <HInput v-model="formData.email" placeholder="请输入邮箱" />
      </HFormItem>
      <HFormItem label="性别">
        <HRadio v-model="formData.gender" label="male">男</HRadio>
        <HRadio v-model="formData.gender" label="female">女</HRadio>
      </HFormItem>
      <HFormItem label="爱好">
        <HCheckbox v-model="formData.hobbies" label="reading">阅读</HCheckbox>
        <HCheckbox v-model="formData.hobbies" label="sports">运动</HCheckbox>
      </HFormItem>
      <HFormItem>
        <HButton type="primary">提交</HButton>
        <HButton>重置</HButton>
      </HFormItem>
    </HForm>
  </template>
</ComponentPlayground>

## 表单验证

<ComponentPlayground
  component="form"
>
  <template #default>
    <HForm :model="formData2" :rules="rules" style="width: 400px;">
      <HFormItem label="用户名" prop="name">
        <HInput v-model="formData2.name" placeholder="请输入用户名" />
      </HFormItem>
      <HFormItem label="邮箱" prop="email">
        <HInput v-model="formData2.email" placeholder="请输入邮箱" />
      </HFormItem>
      <HFormItem>
        <HButton type="primary">提交</HButton>
      </HFormItem>
    </HForm>
  </template>
</ComponentPlayground>

## 行内表单

<ComponentPlayground
  component="form"
>
  <template #default>
    <HForm :model="formData3" layout="inline">
      <HFormItem label="用户名">
        <HInput v-model="formData3.name" placeholder="用户名" />
      </HFormItem>
      <HFormItem label="状态">
        <HSelect v-model="formData3.status" :options="statusOptions" placeholder="状态" />
      </HFormItem>
      <HFormItem>
        <HButton type="primary">查询</HButton>
      </HFormItem>
    </HForm>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据 | `object` | `{}` |
| rules | 验证规则 | `object` | — |
| layout | 布局方式 | `string` | `horizontal` |
| labelWidth | 标签宽度 | `string` / `number` | — |
| labelPosition | 标签位置 | `string` | `right` |
| size | 尺寸 | `string` | `default` |
| disabled | 禁用 | `boolean` | `false` |

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签 | `string` | — |
| prop | 字段名 | `string` | — |
| required | 必填 | `boolean` | `false` |
| rules | 验证规则 | `array` / `object` | — |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 提交时触发 | `(model: object)` |
| validate | 验证后触发 | `(valid: boolean, errors: array)` |
