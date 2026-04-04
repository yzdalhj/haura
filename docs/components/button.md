# Button 按钮

常用的操作按钮。

## 交互演示

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
    type: {
      type: 'select',
      label: '按钮类型',
      default: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
        { label: 'Info', value: 'info' },
      ]
    },
    size: {
      type: 'select',
      label: '按钮尺寸',
      default: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' },
      ]
    },
    disabled: {
      type: 'boolean',
      label: '禁用状态',
      default: false
    },
    loading: {
      type: 'boolean',
      label: '加载状态',
      default: false
    },
    round: {
      type: 'boolean',
      label: '圆角按钮',
      default: false
    },
    block: {
      type: 'boolean',
      label: '块级按钮',
      default: false
    }
  }"
  :events="['click']"
>
  <template #default="{ props, on }">
    <HButton v-bind="props" @click="on('click')">按钮</HButton>
  </template>
</ComponentPlayground>

## 按钮类型

不同的按钮类型代表不同的操作意图。

<ComponentPlayground
  component="button"
  :defaultProps="{}"
>
  <template #default>
    <HButton>默认按钮</HButton>
    <HButton type="primary">主要按钮</HButton>
    <HButton type="success">成功按钮</HButton>
    <HButton type="warning">警告按钮</HButton>
    <HButton type="danger">危险按钮</HButton>
    <HButton type="info">信息按钮</HButton>
  </template>
</ComponentPlayground>

## 按钮尺寸

提供三种尺寸：`small`、`default`、`large`。

<ComponentPlayground
  component="button"
  :defaultProps="{}"
>
  <template #default>
    <HButton size="small" type="primary">小型按钮</HButton>
    <HButton type="primary">默认按钮</HButton>
    <HButton size="large" type="primary">大型按钮</HButton>
  </template>
</ComponentPlayground>

## 加载状态

通过 `loading` 属性设置按钮加载状态。

<ComponentPlayground
  component="button"
  :propConfig="{
    loading: {
      type: 'boolean',
      label: '加载状态',
      default: false
    }
  }"
>
  <template #default="{ props }">
    <HButton type="primary" v-bind="props">加载按钮</HButton>
  </template>
</ComponentPlayground>

## 动效配置

Haura Button 内置多种动效，可通过 `effect` 属性配置。

<ComponentPlayground
  component="button"
  :propConfig="{
    effect: {
      type: 'select',
      label: '动效类型',
      default: 'ripple',
      options: [
        { label: '涟漪效果', value: 'ripple' },
        { label: '光效效果', value: 'glow' },
        { label: '玻璃效果', value: 'glass' },
        { label: '渐变效果', value: 'gradient' },
        { label: '无效果', value: 'none' },
      ]
    }
  }"
>
  <template #default="{ props }">
    <HButton type="primary" v-bind="props">动效演示</HButton>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | `string` | `default` / `primary` / `success` / `warning` / `danger` / `info` | `default` |
| size | 按钮尺寸 | `string` | `small` / `default` / `large` | `default` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| loading | 是否加载中 | `boolean` | — | `false` |
| icon | 图标名称 | `string` | — | — |
| effect | 动效类型 | `string` | `ripple` / `glow` / `glass` / `gradient` / `none` | `ripple` |
| effectDuration | 动效时长 | `number` | — | `600` |
| plain | 朴素按钮 | `boolean` | — | `false` |
| round | 圆角按钮 | `boolean` | — | `false` |
| circle | 圆形按钮 | `boolean` | — | `false` |
| nativeType | 原生 type 属性 | `string` | `button` / `submit` / `reset` | `button` |
| block | 宽度撑满父容器 | `boolean` | — | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标 |