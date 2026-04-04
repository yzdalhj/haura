<script setup lang="ts">
import { ref, computed, watch, onMounted, shallowRef } from 'vue'

const props = defineProps<{
  component: string
  defaultProps?: Record<string, any>
  propConfig?: Record<string, {
    type: 'string' | 'number' | 'boolean' | 'select'
    label?: string
    options?: { label: string; value: any }[]
    min?: number
    max?: number
    step?: number
    default?: any
  }>
  slots?: Record<string, string>
  events?: string[]
}>()

// 当前 props 值
const currentProps = ref<Record<string, any>>({})

// 初始化默认值
const initProps = () => {
  const defaults = { ...props.defaultProps }
  if (props.propConfig) {
    for (const [key, config] of Object.entries(props.propConfig)) {
      defaults[key] = config.default
    }
  }
  currentProps.value = defaults
}

// 动态渲染的组件
const renderComponent = shallowRef<any>(null)

// 事件日志
const eventLogs = ref<{ event: string; args: any[]; time: Date }[]>([])

// 处理事件
const createEventHandler = (eventName: string) => {
  return (...args: any[]) => {
    eventLogs.value.unshift({
      event: eventName,
      args,
      time: new Date(),
    })
    if (eventLogs.value.length > 10) {
      eventLogs.value.pop()
    }
  }
}

// 清空日志
const clearLogs = () => {
  eventLogs.value = []
}

// 重置
const reset = () => {
  initProps()
  clearLogs()
}

// 格式化时间
const formatTime = (date: Date) => {
  return date.toLocaleTimeString()
}

// 格式化参数
const formatArgs = (args: any[]) => {
  return args.map(arg => {
    if (typeof arg === 'object') {
      return JSON.stringify(arg)
    }
    return String(arg)
  }).join(', ')
}

// 复制配置代码
const copyConfig = async () => {
  const code = `<${props.component}
${Object.entries(currentProps.value)
  .filter(([_, v]) => v !== undefined && v !== '')
  .map(([k, v]) => `  ${k}="${v}"`)
  .join('\n')}
/>`
  try {
    await navigator.clipboard.writeText(code)
  } catch (e) {
    console.error('Failed to copy:', e)
  }
}

onMounted(() => {
  initProps()
})
</script>

<template>
  <div class="interactive-demo">
    <!-- 左侧：控制面板 -->
    <div class="interactive-demo__controls">
      <div class="interactive-demo__controls-header">
        <h4>Props 配置</h4>
        <button class="interactive-demo__reset" @click="reset">重置</button>
      </div>
      
      <div class="interactive-demo__controls-body">
        <div v-for="(config, key) in propConfig" :key="key" class="control-item">
          <label class="control-label">{{ config.label || key }}</label>
          
          <!-- 布尔类型 -->
          <label v-if="config.type === 'boolean'" class="control-switch">
            <input type="checkbox" v-model="currentProps[key]" />
            <span class="switch-slider"></span>
          </label>
          
          <!-- 选择类型 -->
          <select v-else-if="config.type === 'select'" v-model="currentProps[key]" class="control-select">
            <option v-for="opt in config.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
          
          <!-- 数字类型 -->
          <input 
            v-else-if="config.type === 'number'"
            type="range"
            v-model.number="currentProps[key]"
            :min="config.min ?? 0"
            :max="config.max ?? 100"
            :step="config.step ?? 1"
            class="control-range"
          />
          <input 
            v-if="config.type === 'number'"
            type="number"
            v-model.number="currentProps[key]"
            :min="config.min"
            :max="config.max"
            :step="config.step ?? 1"
            class="control-number"
          />
          
          <!-- 文本类型 -->
          <input 
            v-else
            type="text"
            v-model="currentProps[key]"
            class="control-text"
          />
        </div>
      </div>

      <!-- 事件日志 -->
      <div v-if="events?.length" class="interactive-demo__events">
        <div class="events-header">
          <h4>事件日志</h4>
          <button class="clear-logs" @click="clearLogs">清空</button>
        </div>
        <div class="events-body">
          <div v-if="eventLogs.length === 0" class="events-empty">
            暂无事件触发
          </div>
          <div v-for="(log, index) in eventLogs" :key="index" class="event-item">
            <span class="event-name">@{{ log.event }}</span>
            <span class="event-args">({{ formatArgs(log.args) }})</span>
            <span class="event-time">{{ formatTime(log.time) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：预览区域 -->
    <div class="interactive-demo__preview">
      <div class="preview-container">
        <slot :props="currentProps" :on="createEventHandler">
          <!-- 动态渲染组件 -->
          <component 
            :is="component" 
            v-bind="currentProps"
            v-for="event in events"
            :key="event"
            @[event]="createEventHandler(event)"
          >
            <template v-for="(content, slotName) in slots" :key="slotName" #[slotName]>
              {{ content }}
            </template>
          </component>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interactive-demo {
  display: flex;
  gap: 24px;
  padding: 20px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  min-height: 300px;
}

.interactive-demo__controls {
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid var(--vp-c-divider);
  padding-right: 24px;
}

.interactive-demo__controls-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.interactive-demo__controls-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.interactive-demo__reset {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  cursor: pointer;
}

.interactive-demo__controls-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.control-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.control-text,
.control-select,
.control-number {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  outline: none;
}

.control-range {
  width: 100%;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.control-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
}

.control-switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.control-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: var(--vp-c-divider);
  border-radius: 10px;
  transition: 0.2s;
}

.switch-slider::before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: 0.2s;
}

.control-switch input:checked + .switch-slider {
  background: var(--vp-c-brand-1);
}

.control-switch input:checked + .switch-slider::before {
  transform: translateX(20px);
}

.interactive-demo__events {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.events-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.events-header h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.clear-logs {
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  cursor: pointer;
}

.events-body {
  max-height: 200px;
  overflow-y: auto;
}

.events-empty {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 16px;
}

.event-item {
  font-size: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.event-name {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
}

.event-args {
  color: var(--vp-c-text-2);
}

.event-time {
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.interactive-demo__preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.preview-container {
  padding: 24px;
}

@media (max-width: 768px) {
  .interactive-demo {
    flex-direction: column;
  }

  .interactive-demo__controls {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
    padding-right: 0;
    padding-bottom: 16px;
  }
}
</style>