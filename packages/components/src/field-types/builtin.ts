import { registerFieldType } from './index'

// 导入组件
import HInput from '../input/input.vue'
import HSelect from '../select/select.vue'
import HCheckbox from '../checkbox/checkbox.vue'
import HRadio from '../radio/radio.vue'
import HSwitch from '../switch/switch.vue'
import HTag from '../tag/tag.vue'
import HIcon from '../icon/icon.vue'

// 表单 + 展示组件
registerFieldType('input', {
  component: HInput,
  type: 'both',
  defaultValue: '',
})

registerFieldType('textarea', {
  component: HInput,
  type: 'form',
  defaultValue: '',
  defaultProps: { type: 'textarea' },
})

registerFieldType('number', {
  component: HInput,
  type: 'both',
  defaultValue: 0,
  defaultProps: { type: 'number' },
})

registerFieldType('select', {
  component: HSelect,
  type: 'both',
  defaultValue: '',
})

registerFieldType('checkbox', {
  component: HCheckbox,
  type: 'both',
  defaultValue: false,
})

registerFieldType('radio', {
  component: HRadio,
  type: 'form',
  defaultValue: '',
})

registerFieldType('switch', {
  component: HSwitch,
  type: 'both',
  defaultValue: false,
})

// 展示组件
registerFieldType('tag', {
  component: HTag,
  type: 'display',
  defaultValue: '',
})

registerFieldType('icon', {
  component: HIcon,
  type: 'display',
  defaultValue: '',
})

// 简单展示类型（无组件，内置渲染）
registerFieldType('link', {
  component: null,
  type: 'display',
  defaultValue: '',
})

registerFieldType('image', {
  component: null,
  type: 'display',
  defaultValue: '',
})

registerFieldType('dot', {
  component: null,
  type: 'display',
  defaultValue: false,
})

registerFieldType('ellipsis', {
  component: null,
  type: 'display',
  defaultValue: '',
})

registerFieldType('progress', {
  component: null,
  type: 'display',
  defaultValue: 0,
})

registerFieldType('badge', {
  component: null,
  type: 'display',
  defaultValue: 0,
})

// 特殊类型
registerFieldType('index', {
  component: null,
  type: 'display',
  defaultValue: null,
})

registerFieldType('selection', {
  component: HCheckbox,
  type: 'form',
  defaultValue: false,
})

registerFieldType('expand', {
  component: null,
  type: 'display',
  defaultValue: false,
})

registerFieldType('action', {
  component: null,
  type: 'display',
  defaultValue: null,
})