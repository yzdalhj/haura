# Select 选择器

下拉选择器，支持单选、多选、搜索等功能。

## 交互演示

<ComponentPlayground
  component="select"
  :defaultProps="{ placeholder: '请选择' }"
  :propConfig="{
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
    multiple: {
      type: 'boolean',
      label: '多选',
      default: false
    },
    filterable: {
      type: 'boolean',
      label: '可搜索',
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
  :events="['change', 'clear', 'visible-change']"
>
  <template #default="{ props, on }">
    <div style="width: 240px;">
      <HSelect 
        v-bind="props"
        :options="options"
        @change="on('change', $event)"
        @clear="on('clear')"
        @visible-change="on('visible-change', $event)"
      />
    </div>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="select"
>
  <template #default>
    <div style="width: 240px;">
      <HSelect v-model="value" :options="options" placeholder="请选择" />
    </div>
  </template>
</ComponentPlayground>

## 多选

<ComponentPlayground
  component="select"
>
  <template #default>
    <div style="width: 300px;">
      <HSelect v-model="values" :options="options" multiple placeholder="请选择多项" />
    </div>
  </template>
</ComponentPlayground>

## 可搜索

<ComponentPlayground
  component="select"
>
  <template #default>
    <div style="width: 240px;">
      <HSelect v-model="value" :options="options" filterable placeholder="可搜索" />
    </div>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | `string` / `number` / `array` | — |
| options | 选项数据 | `array` | `[]` |
| multiple | 是否多选 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| placeholder | 占位文本 | `string` | `请选择` |
| size | 尺寸 | `string` | `default` |

### Events

| 事件名 | 说明 |
|--------|------|
| change | 值变化时触发 |
| clear | 清空时触发 |
| visible-change | 下拉框显示/隐藏时触发 |