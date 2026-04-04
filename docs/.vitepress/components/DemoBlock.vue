<script setup lang="ts">
import { ref, computed, useSlots, shallowRef, onMounted, watch, type VNode } from 'vue'
import { compile, h } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  code?: string
  controls?: Record<string, any>
}>()

const slots = useSlots()

const showCode = ref(false)
const copied = ref(false)
const activeTab = ref<'preview' | 'code'>('preview')

// 动态编译的组件
const DemoComponent = shallowRef<any>(null)
const error = ref<string | null>(null)

// 控制面板的值
const controlValues = ref<Record<string, any>>({})

// 初始化控制值
const initControls = () => {
  if (props.controls) {
    for (const [key, config] of Object.entries(props.controls)) {
      controlValues.value[key] = config.value ?? config.default
    }
  }
}

// 编译代码
const compileCode = (code: string) => {
  try {
    error.value = null
    // 简单的模板编译（仅用于演示）
    const template = code.trim()
    DemoComponent.value = defineComponent({
      template,
      setup() {
        return { ...controlValues.value }
      }
    })
  } catch (e: any) {
    error.value = e.message
    DemoComponent.value = null
  }
}

// 复制代码
const copyCode = async () => {
  if (!props.code) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy:', e)
  }
}

// 重置控制值
const resetControls = () => {
  initControls()
}

// 监听控制值变化
watch(controlValues, () => {
  // 可以在这里处理控制值变化
}, { deep: true })

onMounted(() => {
  initControls()
})
</script>

<template>
  <div class="demo-container">
    <!-- 标题和描述 -->
    <div v-if="title || description" class="demo-header">
      <h4 v-if="title" class="demo-title">{{ title }}</h4>
      <p v-if="description" class="demo-description">{{ description }}</p>
    </div>

    <!-- 控制面板 -->
    <div v-if="controls && Object.keys(controls).length > 0" class="demo-controls">
      <div class="demo-controls-header">
        <span>控制面板</span>
        <button class="demo-controls-reset" @click="resetControls">重置</button>
      </div>
      <div class="demo-controls-body">
        <div v-for="(config, key) in controls" :key="key" class="demo-control-item">
          <label class="demo-control-label">{{ config.label || key }}</label>
          
          <!-- 开关类型 -->
          <template v-if="config.type === 'switch' || config.type === 'boolean'">
            <input 
              type="checkbox" 
              v-model="controlValues[key]"
              class="demo-control-switch"
            />
          </template>
          
          <!-- 选择类型 -->
          <template v-else-if="config.type === 'select' || config.options">
            <select v-model="controlValues[key]" class="demo-control-select">
              <option v-for="opt in config.options" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </template>
          
          <!-- 数字类型 -->
          <template v-else-if="config.type === 'number'">
            <input 
              type="number"
              v-model.number="controlValues[key]"
              :min="config.min"
              :max="config.max"
              :step="config.step || 1"
              class="demo-control-input"
            />
          </template>
          
          <!-- 文本类型 -->
          <template v-else>
            <input 
              type="text"
              v-model="controlValues[key]"
              class="demo-control-input"
            />
          </template>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="demo-preview" :class="{ 'is-fullscreen': false }">
      <div class="demo-preview-content">
        <slot :controls="controlValues">
          <!-- 默认插槽内容 -->
          <div class="demo-placeholder">请添加演示内容</div>
        </slot>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="demo-footer">
      <div class="demo-footer-tabs">
        <button 
          :class="['demo-tab', { 'is-active': activeTab === 'preview' }]"
          @click="activeTab = 'preview'"
        >
          预览
        </button>
        <button 
          v-if="code"
          :class="['demo-tab', { 'is-active': activeTab === 'code' }]"
          @click="activeTab = 'code'"
        >
          代码
        </button>
      </div>
      <div class="demo-footer-actions">
        <button v-if="code" class="demo-action" @click="copyCode">
          <span v-if="copied">已复制</span>
          <span v-else>复制代码</span>
        </button>
      </div>
    </div>

    <!-- 代码展示 -->
    <div v-if="code && activeTab === 'code'" class="demo-code">
      <pre class="demo-code-content"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.demo-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-description {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-controls {
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-controls-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-controls-reset {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: none;
  border: none;
  cursor: pointer;
}

.demo-controls-body {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.demo-control-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 120px;
}

.demo-control-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.demo-control-input,
.demo-control-select {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-size: 13px;
  outline: none;
}

.demo-control-input:focus,
.demo-control-select:focus {
  border-color: var(--vp-c-brand-1);
}

.demo-control-switch {
  width: 40px;
  height: 20px;
  cursor: pointer;
}

.demo-preview {
  min-height: 100px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-preview-content {
  width: 100%;
}

.demo-placeholder {
  color: var(--vp-c-text-3);
  text-align: center;
  padding: 40px;
}

.demo-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.demo-footer-tabs {
  display: flex;
  gap: 4px;
}

.demo-tab {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.demo-tab.is-active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.demo-footer-actions {
  display: flex;
  gap: 8px;
}

.demo-action {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-action:hover {
  color: var(--vp-c-brand-1);
}

.demo-code {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-code-block-bg, #1e1e1e);
}

.demo-code-content {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
}

.demo-code-content code {
  color: var(--vp-code-color, #e1e1e1);
  font-family: var(--vp-font-family-mono);
}
</style>