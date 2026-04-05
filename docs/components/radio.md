# Radio 单选框

单选框组件，用于在一组选项中选择一个。

## 交互演示

<ComponentPlayground
  component="radio"
  :defaultProps="{ label: '选项', modelValue: '' }"
  :propConfig="{
    modelValue: {
      type: 'select',
      label: '选中值',
      default: '',
      options: [
        { label: '未选中', value: '' },
        { label: '选中', value: '选项' }
      ]
    },
    disabled: {
      type: 'boolean',
      label: '禁用',
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
    <HRadio 
      v-bind="props" 
      @change="on('change', $event)"
    />
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="radio"
>
  <template #default>
    <div>
      <HRadio v-model="radio" label="选项一" />
      <HRadio v-model="radio" label="选项二" />
      <HRadio v-model="radio" label="选项三" />
    </div>
    <p style="margin-top: 12px; color: var(--vp-c-text-2);">当前选中: {{ radio || '无' }}</p>
  </template>
</ComponentPlayground>

## 禁用状态

<ComponentPlayground
  component="radio"
>
  <template #default>
    <HRadio v-model="radio2" disabled label="禁用选项" />
    <HRadio :modelValue="'选中禁用'" disabled label="选中禁用" />
  </template>
</ComponentPlayground>

## 边框样式

<ComponentPlayground
  component="radio"
>
  <template #default>
    <HRadio v-model="radio3" label="选项一" bordered />
    <HRadio v-model="radio3" label="选项二" bordered />
    <HRadio v-model="radio3" label="选项三" bordered />
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` / `boolean` | — |
| label | 选项值 | `string` / `number` / `boolean` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| bordered | 显示边框 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |
| size | 尺寸 | `string` | `default` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 值变化时触发 | `(value: any)` |
