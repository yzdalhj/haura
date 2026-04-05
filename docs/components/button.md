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
      default: 'primary',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
        { label: 'Info', value: 'info' },
        { label: 'Text', value: 'text' },
        { label: 'Link', value: 'link' }
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
    disabled: {
      type: 'boolean',
      label: '禁用',
      default: false
    },
    loading: {
      type: 'boolean',
      label: '加载中',
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

<ComponentPlayground
  component="button"
>
  <template #default>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <HButton>默认</HButton>
      <HButton type="primary">主要</HButton>
      <HButton type="success">成功</HButton>
      <HButton type="warning">警告</HButton>
      <HButton type="danger">危险</HButton>
      <HButton type="info">信息</HButton>
      <HButton type="text">文字</HButton>
      <HButton type="link">链接</HButton>
    </div>
  </template>
</ComponentPlayground>

## 按钮形状

<ComponentPlayground
  component="button"
>
  <template #default>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <HButton type="primary" plain>朴素按钮</HButton>
      <HButton type="primary" round>圆角按钮</HButton>
      <HButton type="primary" circle icon="plus" />
      <HButton type="primary" circle>✓</HButton>
    </div>
  </template>
</ComponentPlayground>

## 动效配置

<ComponentPlayground
  component="button"
  :propConfig="{
    glass: {
      type: 'boolean',
      label: '玻璃效果',
      default: false
    },
    gradient: {
      type: 'boolean',
      label: '渐变背景',
      default: false
    },
    hoverGlow: {
      type: 'boolean',
      label: '悬停发光',
      default: false
    },
    ripple: {
      type: 'boolean',
      label: '涟漪效果',
      default: true
    }
  }"
>
  <template #default="{ props }">
    <HButton type="primary" v-bind="props">动效演示</HButton>
  </template>
</ComponentPlayground>

## 块级按钮

<ComponentPlayground
  component="button"
  :propConfig="{
    block: {
      type: 'boolean',
      label: '块级按钮',
      default: false
    }
  }"
>
  <template #default="{ props }">
    <HButton type="primary" v-bind="props">块级按钮</HButton>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| type | 按钮类型 | `string` | `default` / `primary` / `success` / `warning` / `danger` / `info` / `text` / `link` | `default` |
| size | 按钮尺寸 | `string` | `small` / `default` / `large` | `default` |
| disabled | 禁用状态 | `boolean` | — | `false` |
| loading | 加载状态 | `boolean` | — | `false` |
| plain | 朴素按钮 | `boolean` | — | `false` |
| round | 圆角按钮 | `boolean` | — | `false` |
| circle | 圆形按钮 | `boolean` | — | `false` |
| block | 块级按钮 | `boolean` | — | `false` |
| icon | 图标类名 | `string` | — | — |
| nativeType | 原生 type | `string` | `button` / `submit` / `reset` | `button` |
| autofocus | 自动聚焦 | `boolean` | — | `false` |
| tag | 自定义标签 | `string` | — | `'button'` |

**动效相关 Props**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| ripple | 涟漪效果 | `boolean` | `true` |
| rippleColor | 涟漪颜色 | `string` | `'currentColor'` |
| hoverLift | 悬停上浮 | `boolean` | `true` |
| hoverGlow | 悬停发光 | `boolean` | `false` |
| pressScale | 点击缩放 | `boolean` | `true` |
| glowColor | 发光颜色 | `string` | — |
| glass | 玻璃效果 | `boolean` | `false` |
| gradient | 渐变背景 | `boolean` | `false` |

**节流防抖 Props**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| throttle | 节流时间(ms) | `number` | `0` |
| debounce | 防抖时间(ms) | `number` | `0` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击时触发 | `(event: MouseEvent)` |
| mousedown | 鼠标按下 | `(event: MouseEvent)` |
| mouseup | 鼠标释放 | `(event: MouseEvent)` |
| mouseenter | 鼠标移入 | `(event: MouseEvent)` |
| mouseleave | 鼠标移出 | `(event: MouseEvent)` |
| focus | 获得焦点 | `(event: FocusEvent)` |
| blur | 失去焦点 | `(event: FocusEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标 |
| loading | 自定义加载图标 |