# Checkbox 多选框

多选框组件，支持多选、半选状态。

## 交互演示

<ComponentPlayground
  component="checkbox"
  :defaultProps="{ label: '选项', modelValue: false }"
  :propConfig="{
    modelValue: {
      type: 'boolean',
      label: '选中状态',
      default: false
    },
    disabled: {
      type: 'boolean',
      label: '禁用',
      default: false
    },
    indeterminate: {
      type: 'boolean',
      label: '半选状态',
      default: false
    },
    bordered: {
      type: 'boolean',
      label: '边框样式',
      default: false
    }
  }"
  :events="['change']"
>
  <template #default="{ props, on }">
    <HCheckbox 
      v-bind="props" 
      @change="on('change', $event)"
    />
  </template>
</ComponentPlayground>

## 多选组

<ComponentPlayground
  component="checkbox"
>
  <template #default>
    <HCheckbox v-model="checked1" label="选项一" />
    <HCheckbox v-model="checked2" label="选项二" />
    <HCheckbox v-model="checked3" label="选项三" />
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` / `array` | `false` |
| label | 选项值 | `string` / `number` / `boolean` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 半选状态 | `boolean` | `false` |
| bordered | 显示边框 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |
| size | 尺寸 | `string` | `default` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: boolean)` |
