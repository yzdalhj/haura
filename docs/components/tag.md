# Tag 标签

用于标记和分类的标签组件。

## 交互演示

<ComponentPlayground
  component="tag"
  :defaultProps="{ type: 'default', size: 'default' }"
  :propConfig="{
    type: {
      type: 'select',
      label: '类型',
      default: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' }
      ]
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
    },
    plain: {
      type: 'boolean',
      label: '朴素样式',
      default: false
    },
    round: {
      type: 'boolean',
      label: '圆角',
      default: false
    },
    closable: {
      type: 'boolean',
      label: '可关闭',
      default: false
    }
  }"
  :events="['click', 'close']"
>
  <template #default="{ props, on }">
    <HTag 
      v-bind="props" 
      @click="on('click', $event)"
      @close="on('close', $event)"
    >标签</HTag>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="tag"
>
  <template #default>
    <HTag>默认标签</HTag>
    <HTag type="primary">主要标签</HTag>
    <HTag type="success">成功标签</HTag>
    <HTag type="warning">警告标签</HTag>
    <HTag type="danger">危险标签</HTag>
  </template>
</ComponentPlayground>

## 可关闭

<ComponentPlayground
  component="tag"
>
  <template #default>
    <HTag closable>可关闭</HTag>
    <HTag closable type="primary">可关闭</HTag>
    <HTag closable type="success">可关闭</HTag>
  </template>
</ComponentPlayground>

## 不同尺寸

<ComponentPlayground
  component="tag"
>
  <template #default>
    <HTag size="small">小型标签</HTag>
    <HTag>默认标签</HTag>
    <HTag size="large">大型标签</HTag>
  </template>
</ComponentPlayground>

## 朴素样式

<ComponentPlayground
  component="tag"
>
  <template #default>
    <HTag plain>朴素</HTag>
    <HTag type="primary" plain>朴素</HTag>
    <HTag type="success" plain>朴素</HTag>
  </template>
</ComponentPlayground>

## 圆角样式

<ComponentPlayground
  component="tag"
>
  <template #default>
    <HTag round>圆角标签</HTag>
    <HTag round type="primary">圆角标签</HTag>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 类型 | `string` | `default` / `primary` / `success` / `warning` / `danger` | `default` |
| size | 尺寸 | `string` | `small` / `default` / `large` | `default` |
| plain | 朴素样式 | `boolean` | — | `false` |
| round | 圆角样式 | `boolean` | — | `false` |
| closable | 可关闭 | `boolean` | — | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | `(event: MouseEvent)` |
| close | 关闭时触发 | `(event: MouseEvent)` |
