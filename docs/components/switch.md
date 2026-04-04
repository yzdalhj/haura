# Switch 开关

开关组件，用于表示两种状态之间的切换。

## 交互演示

<ComponentPlayground
  component="switch"
  :defaultProps="{ modelValue: false }"
  :propConfig="{
    disabled: {
      type: 'boolean',
      label: '禁用',
      default: false
    },
    loading: {
      type: 'boolean',
      label: '加载',
      default: false
    },
    size: {
      type: 'select',
      label: '尺寸',
      default: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' },
      ]
    }
  }"
  :events="['change']"
>
  <template #default="{ props, on }">
    <HSwitch 
      v-bind="props" 
      @change="on('change', $event)"
    />
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="switch"
>
  <template #default>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <HSwitch v-model="value1" />
        <span>{{ value1 ? '开启' : '关闭' }}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <HSwitch v-model="value2" />
        <span>{{ value2 ? '开启' : '关闭' }}</span>
      </div>
    </div>
  </template>
</ComponentPlayground>

## 文字描述

<ComponentPlayground
  component="switch"
>
  <template #default>
    <HSwitch 
      v-model="value" 
      active-text="开启" 
      inactive-text="关闭" 
    />
  </template>
</ComponentPlayground>

## 禁用状态

<ComponentPlayground
  component="switch"
>
  <template #default>
    <div style="display: flex; gap: 12px;">
      <HSwitch v-model="value1" disabled />
      <HSwitch v-model="value2" disabled />
    </div>
  </template>
</ComponentPlayground>

## 加载状态

<ComponentPlayground
  component="switch"
>
  <template #default>
    <HSwitch v-model="value" :loading="loading" @change="handleChange" />
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| activeText | 开启文字 | `string` | — |
| inactiveText | 关闭文字 | `string` | — |
| activeValue | 开启值 | `any` | `true` |
| inactiveValue | 关闭值 | `any` | `false` |
| size | 尺寸 | `string` | `default` |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |