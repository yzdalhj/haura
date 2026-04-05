# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮类型、尺寸、禁用和加载状态。

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
    type: {
      type: 'select',
      label: '类型',
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

## 按钮形状

通过 `plain`、`round`、`circle`、`block` 组合出不同的视觉形态。

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
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
    circle: {
      type: 'boolean',
      label: '圆形',
      default: false
    },
    block: {
      type: 'boolean',
      label: '块级按钮',
      default: false
    }
  }"
>
  <template #default="{ props }">
    <HButton v-bind="props">{{ props.circle ? '+' : '按钮' }}</HButton>
  </template>
</ComponentPlayground>

## 动效配置

Haura 扩展的微交互动效，可自由组合。

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
    ripple: {
      type: 'boolean',
      label: '涟漪效果',
      default: true
    },
    rippleColor: {
      type: 'select',
      label: '涟漪颜色',
      default: 'currentColor',
      options: [
        { label: '默认', value: 'currentColor' },
        { label: '白色', value: '#ffffff' },
        { label: '金色', value: '#fbbf24' },
        { label: '青色', value: '#22d3d3' }
      ]
    },
    hoverLift: {
      type: 'boolean',
      label: '悬停上浮',
      default: true
    },
    hoverGlow: {
      type: 'boolean',
      label: '悬停发光',
      default: false
    },
    pressScale: {
      type: 'boolean',
      label: '点击缩放',
      default: true
    },
    glowColor: {
      type: 'select',
      label: '发光颜色',
      default: '',
      options: [
        { label: '默认', value: '' },
        { label: '蓝色', value: '#3b82f6' },
        { label: '紫色', value: '#8b5cf6' },
        { label: '粉色', value: '#ec4899' }
      ]
    },
    glass: {
      type: 'boolean',
      label: '玻璃效果',
      default: false
    },
    gradient: {
      type: 'boolean',
      label: '渐变背景',
      default: false
    }
  }"
>
  <template #default="{ props }">
    <HButton v-bind="props">动效演示</HButton>
  </template>
</ComponentPlayground>

## 图标按钮

支持通过 `icon` 属性或 `icon` 插槽插入图标，`loadingSlot` 可自定义加载图标。

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
    icon: {
      type: 'select',
      label: '图标',
      default: '',
      options: [
        { label: '无', value: '' },
        { label: 'Search', value: 'el-icon-search' },
        { label: 'Edit', value: 'el-icon-edit' },
        { label: 'Delete', value: 'el-icon-delete' },
        { label: 'Plus', value: 'el-icon-plus' },
        { label: 'Star', value: 'el-icon-star-on' }
      ]
    },
    loading: {
      type: 'boolean',
      label: '加载状态',
      default: false
    },
    circle: {
      type: 'boolean',
      label: '圆形',
      default: false
    }
  }"
>
  <template #default="{ props }">
    <HButton v-bind="props">
      {{ props.circle ? '' : '按钮' }}
    </HButton>
  </template>
</ComponentPlayground>

## 性能优化

通过 `throttle`（节流）和 `debounce`（防抖）控制高频触发场景下的回调次数。

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
    throttle: {
      type: 'number',
      label: '节流(ms)',
      default: 0,
      min: 0,
      max: 3000,
      step: 100
    },
    debounce: {
      type: 'number',
      label: '防抖(ms)',
      default: 0,
      min: 0,
      max: 3000,
      step: 100
    }
  }"
  :events="['click']"
>
  <template #default="{ props, on }">
    <HButton v-bind="props" @click="on('click')">快速连续点击试试</HButton>
  </template>
</ComponentPlayground>

## 原生属性

控制按钮作为原生 HTML 元素时的行为，如 `tag` 将按钮渲染为 `<a>` 或 `<div>` 等标签。

<ComponentPlayground
  component="button"
  :defaultProps="{ type: 'primary' }"
  :propConfig="{
    nativeType: {
      type: 'select',
      label: '原生类型',
      default: 'button',
      options: [
        { label: 'button', value: 'button' },
        { label: 'submit', value: 'submit' },
        { label: 'reset', value: 'reset' }
      ]
    },
    autofocus: {
      type: 'boolean',
      label: '自动聚焦',
      default: false
    },
    tag: {
      type: 'select',
      label: '渲染标签',
      default: 'button',
      options: [
        { label: 'button', value: 'button' },
        { label: 'a', value: 'a' },
        { label: 'div', value: 'div' }
      ]
    }
  }"
>
  <template #default="{ props }">
    <HButton v-bind="props">原生属性</HButton>
  </template>
</ComponentPlayground>

## API

### Props

**基础属性**

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

**动效属性（Haura 扩展）**

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

**性能属性**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| throttle | 节流时间（毫秒） | `number` | `0` |
| debounce | 防抖时间（毫秒） | `number` | `0` |

**原生属性**

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|--------|--------|--------|
| nativeType | 原生 type | `string` | `button` / `submit` / `reset` | `button` |
| autofocus | 自动聚焦 | `boolean` | — | `false` |
| tag | 自定义渲染标签 | `string` | `button` / `a` / `div` / … | `'button'` |

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
