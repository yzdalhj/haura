# Input 输入框

通过键盘输入内容，支持多种格式。

## 交互演示

<ComponentPlayground
  component="input"
  :defaultProps="{ placeholder: '请输入内容' }"
  :propConfig="{
    size: {
      type: 'select',
      label: '尺寸',
      default: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' },
      ]
    },
    disabled: {
      type: 'boolean',
      label: '禁用',
      default: false
    },
    clearable: {
      type: 'boolean',
      label: '可清空',
      default: false
    },
    showPassword: {
      type: 'boolean',
      label: '显示密码',
      default: false
    },
    maxlength: {
      type: 'number',
      label: '最大长度',
      default: 0,
      min: 0,
      max: 100
    }
  }"
  :events="['input', 'focus', 'blur', 'clear']"
>
  <template #default="{ props, on }">
    <div style="width: 300px;">
      <HInput 
        v-bind="props" 
        :type="props.showPassword ? 'password' : 'text'"
        @input="on('input', $event)"
        @focus="on('focus')"
        @blur="on('blur')"
        @clear="on('clear')"
      />
    </div>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="input"
>
  <template #default>
    <div style="width: 300px;">
      <HInput v-model="input" placeholder="请输入内容" />
    </div>
  </template>
</ComponentPlayground>

## 禁用状态

<ComponentPlayground
  component="input"
>
  <template #default>
    <div style="width: 300px;">
      <HInput v-model="input" disabled placeholder="禁用状态" />
    </div>
  </template>
</ComponentPlayground>

## 可清空

使用 `clearable` 属性即可开启清空功能。

<ComponentPlayground
  component="input"
>
  <template #default>
    <div style="width: 300px;">
      <HInput v-model="input" clearable placeholder="可清空" />
    </div>
  </template>
</ComponentPlayground>

## 密码输入框

使用 `show-password` 属性即可开启密码显示切换。

<ComponentPlayground
  component="input"
>
  <template #default>
    <div style="width: 300px;">
      <HInput v-model="password" type="password" show-password placeholder="请输入密码" />
    </div>
  </template>
</ComponentPlayground>

## 输入框尺寸

<ComponentPlayground
  component="input"
>
  <template #default>
    <div style="display: flex; flex-direction: column; gap: 12px; width: 300px;">
      <HInput v-model="input" size="small" placeholder="小型输入框" />
      <HInput v-model="input" placeholder="默认输入框" />
      <HInput v-model="input" size="large" placeholder="大型输入框" />
    </div>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` | — |
| type | 输入框类型 | `string` | `text` |
| size | 输入框尺寸 | `string` | `default` |
| placeholder | 占位文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| showPassword | 是否显示密码切换 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number` | — |
| showWordLimit | 是否显示字数统计 | `boolean` | `false` |

### Events

| 事件名 | 说明 |
|--------|------|
| input | 输入时触发 |
| change | 值改变时触发 |
| focus | 获得焦点时触发 |
| blur | 失去焦点时触发 |
| clear | 清空时触发 |