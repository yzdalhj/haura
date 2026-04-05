# Loading 加载

加载数据时显示的加载状态。

## 交互演示

<ComponentPlayground
  component="loading"
  :defaultProps="{ modelValue: true, type: 'spinner', text: '加载中...' }"
  :propConfig="{
    modelValue: {
      type: 'boolean',
      label: '显示',
      default: true
    },
    type: {
      type: 'select',
      label: '类型',
      default: 'spinner',
      options: [
        { label: 'Spinner', value: 'spinner' },
        { label: 'Dots', value: 'dots' },
        { label: 'Pulse', value: 'pulse' },
        { label: 'Bars', value: 'bars' },
        { label: 'Ring', value: 'ring' }
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
    text: {
      type: 'string',
      label: '文字',
      default: '加载中...'
    }
  }"
>
  <template #default="{ props }">
    <div style="height: 200px; position: relative; border: 1px solid var(--vp-c-divider); border-radius: 8px;">
      <HLoading v-bind="props" :visible="props.modelValue" />
      <div v-if="!props.modelValue" style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--vp-c-text-2);">
        加载完成
      </div>
    </div>
  </template>
</ComponentPlayground>

## 指令用法

```vue
<template>
  <div v-loading="loading" loading-text="加载中...">
    内容区域
  </div>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible / modelValue | 是否显示 | `boolean` | `false` |
| type | 加载类型 | `string` | `spinner` |
| size | 尺寸 | `string` | `default` |
| text | 文字描述 | `string` | — |
| textPosition | 文字位置 | `string` | `bottom` |
| color | 颜色 | `string` | — |
| background | 背景色 | `string` | — |
| fullscreen | 全屏显示 | `boolean` | `false` |

### Directive

| 参数 | 说明 | 类型 |
|------|------|------|
| v-loading | 是否显示 | `boolean` |
| loading-text | 文字描述 | `string` |
| loading-background | 背景色 | `string` |
