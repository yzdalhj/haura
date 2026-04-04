<script setup lang="ts">
import { ref, computed, watch, onMounted, shallowRef, h, type Component } from 'vue'
import * as HauraComponents from '@haura/components'

const props = defineProps<{
  component: string
  defaultProps?: Record<string, any>
  propConfig?: Record<string, any>
  slots?: Record<string, string>
  events?: string[]
}>()

// 动态获取组件
const ComponentDemo = computed(() => {
  const componentName = `H${props.component.charAt(0).toUpperCase() + props.component.slice(1)}`
  return (HauraComponents as any)[componentName]
})

// 当前 props 值
const currentProps = ref<Record<string, any>>({})

// 事件日志
const eventLogs = ref<{ event: string; args: any[]; time: Date }[]>([])

// 控制值
const controlValues = ref<Record<string, any>>({})

// 初始化
const init = () => {
  if (props.defaultProps) {
    currentProps.value = { ...props.defaultProps }
  }
  if (props.propConfig) {
    for (const [key, config] of Object.entries(props.propConfig)) {
      controlValues.value[key] = (config as any).value ?? (config as any).default
    }
  }
}

// 创建事件处理器
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
  init()
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

// 监听控制值变化
watch(controlValues, (val) => {
  currentProps.value = { ...currentProps.value, ...val }
}, { deep: true })

onMounted(() => {
  init()
})
</script>

<template>
  <div class="component-playground">
    <!-- 预览区域 -->
    <div class="playground-preview">
      <div class="preview-content">
        <slot :props="{ ...currentProps, ...controlValues }" :on="createEventHandler">
          <component
            :is="ComponentDemo"
            v-if="ComponentDemo"
            v-bind="{ ...currentProps, ...controlValues }"
          >
            <template v-for="(content, slotName) in slots" :key="slotName" #[slotName]>
              {{ content }}
            </template>
          </component>
          <div v-else class="preview-error">
            组件 {{ component }} 未找到
          </div>
        </slot>
      </div>
    </div>

    <!-- 控制面板 -->
    <div class="playground-controls">
      <div class="controls-header">
        <span class="controls-title">Props 控制</span>
        <button class="controls-reset" @click="reset">重置</button>
      </div>

      <div class="controls-body">
        <div v-for="(config, key) in propConfig" :key="key" class="control-item">
          <label class="control-label">{{ config.label || key }}</label>

          <!-- 布尔类型 -->
          <template v-if="config.type === 'boolean'">
            <label class="toggle-switch">
              <input type="checkbox" v-model="controlValues[key]" />
              <span class="toggle-slider"></span>
            </label>
          </template>

          <!-- 选择类型 -->
          <template v-else-if="config.type === 'select'">
            <select v-model="controlValues[key]" class="control-select">
              <option v-for="opt in config.options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </template>

          <!-- 数字类型 -->
          <template v-else-if="config.type === 'number'">
            <div class="control-number-group">
              <input
                type="range"
                v-model.number="controlValues[key]"
                :min="config.min ?? 0"
                :max="config.max ?? 100"
                :step="config.step ?? 1"
                class="control-range"
              />
              <input
                type="number"
                v-model.number="controlValues[key]"
                :min="config.min"
                :max="config.max"
                class="control-number"
              />
            </div>
          </template>

          <!-- 文本类型 -->
          <template v-else>
            <input
              type="text"
              v-model="controlValues[key]"
              class="control-input"
            />
          </template>
        </div>
      </div>

      <!-- 事件日志 -->
      <div v-if="events?.length" class="events-panel">
        <div class="events-header">
          <span>事件日志</span>
          <button class="clear-btn" @click="clearLogs">清空</button>
        </div>
        <div class="events-list">
          <div v-if="eventLogs.length === 0" class="events-empty">
            暂无事件
          </div>
          <div v-for="(log, i) in eventLogs" :key="i" class="event-item">
            <code class="event-name">@{{ log.event }}</code>
            <span class="event-args">({{ formatArgs(log.args) }})</span>
            <span class="event-time">{{ formatTime(log.time) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-playground {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.playground-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 32px;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
}

.preview-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.preview-error {
  color: var(--vp-c-danger-1);
  font-size: 14px;
}

.playground-controls {
  border-left: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow-y: auto;
}

.controls-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.controls-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.controls-reset {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  cursor: pointer;
}

.controls-body {
  padding: 16px;
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
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.control-input,
.control-select,
.control-number {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
}

.control-input:focus,
.control-select:focus,
.control-number:focus {
  border-color: var(--vp-c-brand-1);
}

.control-number-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.control-range {
  flex: 1;
  height: 4px;
  background: var(--vp-c-divider);
  border-radius: 2px;
  -webkit-appearance: none;
}

.control-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
}

.control-number {
  width: 60px;
  text-align: center;
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 22px;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  inset: 0;
  background: var(--vp-c-divider);
  border-radius: 11px;
  transition: background 0.2s;
}

.toggle-slider::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  left: 2px;
  bottom: 2px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.toggle-switch input:checked + .toggle-slider {
  background: var(--vp-c-brand-1);
}

.toggle-switch input:checked + .toggle-slider::before {
  transform: translateX(22px);
}

.events-panel {
  margin-top: 16px;
  padding: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.events-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
}

.clear-btn {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: none;
  border: none;
  cursor: pointer;
}

.events-list {
  max-height: 160px;
  overflow-y: auto;
}

.events-empty {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 16px;
}

.event-item {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
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

@media (max-width: 768px) {
  .component-playground {
    grid-template-columns: 1fr;
  }

  .playground-controls {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}
</style>