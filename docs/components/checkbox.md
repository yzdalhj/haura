# Checkbox 复选框

多选框组件，支持单独使用和组合使用。

## 基础用法

单独的 Checkbox 受 `v-model`（或 `modelValue`）控制选中状态。

<ComponentPlayground
  component="checkbox"
  :defaultProps="{ label: '选项', modelValue: true }"
  :propConfig="{
    label: {
      type: 'text',
      label: '标签文字',
      default: '选项'
    },
    modelValue: {
      type: 'boolean',
      label: '是否选中',
      default: false
    },
    disabled: {
      type: 'boolean',
      label: '禁用',
      default: false
    },
    size: {
      type: 'select',
      label: '尺寸',
      default: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' }
      ]
    }
  }"
  :events="['change', 'update:modelValue']"
>
  <template #default="{ props, on }">
    <HCheckbox
      v-bind="props"
      @change="on('change', $event)"
      @update:modelValue="on('update:modelValue', $event)"
    >{{ props.label }}</HCheckbox>
  </template>
</ComponentPlayground>

## 组合使用

使用 `HCheckboxGroup` 包裹多个 `HCheckbox`，通过 `v-model` 控制数组。

<ComponentPlayground
  component="checkbox"
  :defaultProps="{ }"
  :propConfig="{
    disabled: {
      type: 'boolean',
      label: '整组禁用',
      default: false
    },
    size: {
      type: 'select',
      label: '尺寸',
      default: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' }
      ]
    }
  }"
  :events="['change']"
>
  <template #default="{ props, on }">
    <HCheckboxGroup
      :disabled="props.disabled"
      :size="props.size"
      @change="on('change', $event)"
    >
      <HCheckbox label="选项一" />
      <HCheckbox label="选项二" />
      <HCheckbox label="选项三" />
    </HCheckboxGroup>
  </template>
</ComponentPlayground>

## 高级配置

控制选中值、自定义选中/未选中语义值，以及半选中状态。

<ComponentPlayground
  component="checkbox"
  :defaultProps="{ trueValue: 'yes', falseValue: 'no' }"
  :propConfig="{
    modelValue: {
      type: 'boolean',
      label: '是否选中',
      default: false
    },
    trueValue: {
      type: 'text',
      label: '选中值',
      default: 'yes'
    },
    falseValue: {
      type: 'text',
      label: '未选中值',
      default: 'no'
    },
    indeterminate: {
      type: 'boolean',
      label: '半选中状态',
      default: false
    },
    border: {
      type: 'boolean',
      label: '显示边框',
      default: false
    },
    validateEvent: {
      type: 'boolean',
      label: '触发表单验证',
      default: true
    }
  }"
>
  <template #default="{ props }">
    <HCheckbox
      v-model="props.modelValue"
      :true-value="props.trueValue"
      :false-value="props.falseValue"
      :indeterminate="props.indeterminate"
      :border="props.border"
      :validate-event="props.validateEvent"
    >自定义值复选框</HCheckbox>
  </template>
</ComponentPlayground>

## 组合数量限制

通过 `min` 和 `max` 限制最多/最少选中数量。

<ComponentPlayground
  component="checkbox"
  :propConfig="{
    min: {
      type: 'number',
      label: '最少选中',
      default: 0,
      min: 0,
      max: 3,
      step: 1
    },
    max: {
      type: 'number',
      label: '最多选中',
      default: 3,
      min: 1,
      max: 3,
      step: 1
    }
  }"
>
  <template #default="{ props }">
    <HCheckboxGroup :min="props.min" :max="props.max">
      <HCheckbox label="选项一" />
      <HCheckbox label="选项二" />
      <HCheckbox label="选项三" />
    </HCheckboxGroup>
  </template>
</ComponentPlayground>

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 是否选中 | `boolean` / `string` / `number` | `false` |
| label | 标签文本（单独使用时） | `string` / `number` / `boolean` | — |
| disabled | 禁用状态 | `boolean` | `false` |
| indeterminate | 半选中状态 | `boolean` | `false` |
| border | 显示边框 | `boolean` | `false` |
| size | 尺寸 | `string` | `'default'` |
| true-value | 选中时的值 | `string` / `number` / `boolean` | `true` |
| false-value | 未选中时的值 | `string` / `number` / `boolean` | `false` |
| validate-event | 是否触发表单验证 | `boolean` | `true` |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 选中值数组 | `(string \| number \| boolean)[]` | `[]` |
| disabled | 整组禁用 | `boolean` | `false` |
| size | 尺寸 | `string` | `'default'` |
| min | 最少选中数 | `number` | `0` |
| max | 最多选中数 | `number` | `Infinity` |
| validate-event | 是否触发表单验证 | `boolean` | `true` |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中状态变化时触发 | `(value: any)` |
| update:modelValue | 双向绑定更新 | `(value: any)` |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中值变化时触发 | `(value: any[])` |

### Checkbox Slots

| 插槽名 | 说明 |
|--------|------|
| default | 复选框标签内容 |

### CheckboxGroup Slots

| 插槽名 | 说明 |
|--------|------|
| default | 复选框列表 |
