<template>
  <div :class="['h-table-search', { 'is-collapsed': isCollapsed }]">
    <div class="h-table-search__fields">
      <div
        v-for="field in visibleFields"
        :key="field.prop"
        :class="['h-table-search__field', `is-span-${field.span || 4}`]"
      >
        <label v-if="field.label" class="h-table-search__label">
          {{ field.label }}
        </label>
        
        <!-- 输入框 -->
        <HInput
          v-if="field.type === 'input' || !field.type"
          v-model="searchValues[field.prop]"
          :placeholder="field.placeholder || `请输入${field.label || ''}`"
          :clearable="field.clearable !== false"
          size="default"
          @keyup.enter="handleSearch"
        />
        
        <!-- 选择框 -->
        <HSelect
          v-else-if="field.type === 'select'"
          v-model="searchValues[field.prop]"
          :options="field.options"
          :placeholder="field.placeholder || `请选择${field.label || ''}`"
          :clearable="field.clearable !== false"
          :filterable="field.filterable"
          :multiple="field.multiple"
          size="default"
        />
        
        <!-- 自定义组件 -->
        <component
          v-else-if="field.type === 'custom' && field.component"
          :is="field.component"
          v-model="searchValues[field.prop]"
          v-bind="field.componentProps"
        />
        
        <!-- 其他类型 -->
        <HInput
          v-else
          v-model="searchValues[field.prop]"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          size="default"
        />
      </div>
      
      <!-- 操作按钮 -->
      <div class="h-table-search__actions">
        <slot name="prefix" />
        
        <HButton
          v-if="config.showSearchButton !== false"
          type="primary"
          @click="handleSearch"
        >
          {{ config.searchButtonText || '搜索' }}
        </HButton>
        
        <HButton
          v-if="config.showResetButton !== false"
          @click="handleReset"
        >
          {{ config.resetButtonText || '重置' }}
        </HButton>
        
        <button
          v-if="showCollapseBtn"
          class="h-table-search__collapse-btn"
          @click="toggleCollapse"
        >
          {{ isCollapsed ? '展开' : '收起' }}
          <svg viewBox="0 0 24 24" width="14" height="14" :class="{ 'is-collapsed': isCollapsed }">
            <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
        
        <slot name="suffix" />
        
        <!-- 工具栏 -->
        <div class="h-table-search__toolbar">
          <button
            v-if="config.columns"
            class="h-table-search__tool-btn"
            title="列配置"
            @click="handleColumnsClick"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"/>
            </svg>
          </button>
          
          <button
            v-if="config.refresh"
            class="h-table-search__tool-btn"
            title="刷新"
            @click="handleRefreshClick"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
          
          <button
            v-if="config.fullscreen"
            class="h-table-search__tool-btn"
            :title="isFullscreen ? '退出全屏' : '全屏'"
            @click="toggleFullscreen"
          >
            <svg v-if="!isFullscreen" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
          
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SearchConfig, TableColumn } from './table'
import HInput from '../input/input.vue'
import HSelect from '../select/select.vue'
import HButton from '../button/button.vue'

const props = defineProps<{
  columns: TableColumn[]
  config: SearchConfig
  modelValue: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'search', value: Record<string, any>): void
  (e: 'reset'): void
}>()

const searchValues = ref<Record<string, any>>({ ...props.modelValue })
const isCollapsed = ref(props.config.defaultCollapsed || false)
const isFullscreen = ref(false)

// 搜索字段
const fields = computed(() => {
  return props.columns
    .filter(col => col.searchable)
    .map(col => {
      const searchConfig = typeof col.searchable === 'object' ? col.searchable : {}
      return {
        prop: col.prop,
        label: col.label,
        type: searchConfig.type || 'input',
        span: searchConfig.span || 4,
        placeholder: searchConfig.placeholder || col.searchPlaceholder,
        options: col.options,
        clearable: searchConfig.clearable !== false,
        filterable: searchConfig.filterable,
        multiple: searchConfig.multiple,
        component: searchConfig.component,
        componentProps: searchConfig.componentProps,
      }
    })
})

// 可见字段（根据折叠状态）
const visibleFields = computed(() => {
  if (!isCollapsed.value) {
    return fields.value
  }
  const collapseRows = props.config.collapseRows || 1
  const itemsPerRow = 24 / 4 // 假设每项默认占 4
  return fields.value.slice(0, collapseRows * itemsPerRow)
})

// 是否显示折叠按钮
const showCollapseBtn = computed(() => {
  return fields.value.length > (props.config.collapseRows || 1) * (24 / 4)
})

// 监听值变化
watch(searchValues, (val) => {
  emit('update:modelValue', val)
}, { deep: true })

// 方法
function handleSearch() {
  emit('search', { ...searchValues.value })
}

function handleReset() {
  searchValues.value = {}
  emit('reset')
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function handleColumnsClick() {
  // TODO: 显示列配置面板
}

function handleRefreshClick() {
  handleSearch()
}

function toggleFullscreen() {
  if (!isFullscreen.value) {
    document.body.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
  isFullscreen.value = !isFullscreen.value
}
</script>

<style scoped>
.h-table-search {
  padding: 16px;
  background: var(--aura-bg-elevated, #fafafa);
  border-radius: 8px;
  margin-bottom: 16px;
}

.h-table-search__fields {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
}

.h-table-search__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.h-table-search__field.is-span-2 { width: calc((100% - 12px * 11) / 12 * 2 + 12px); }
.h-table-search__field.is-span-3 { width: calc((100% - 12px * 11) / 12 * 3 + 12px * 2); }
.h-table-search__field.is-span-4 { width: calc((100% - 12px * 11) / 12 * 4 + 12px * 3); }
.h-table-search__field.is-span-5 { width: calc((100% - 12px * 11) / 12 * 5 + 12px * 4); }
.h-table-search__field.is-span-6 { width: calc((100% - 12px * 11) / 12 * 6 + 12px * 5); }

.h-table-search__label {
  font-size: 14px;
  color: var(--aura-text-secondary, #525252);
}

.h-table-search__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.h-table-search__collapse-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 14px;
  color: var(--aura-text-secondary, #525252);
  background: none;
  border: none;
  cursor: pointer;
}

.h-table-search__collapse-btn svg {
  transition: transform 0.2s;
}

.h-table-search__collapse-btn svg.is-collapsed {
  transform: rotate(180deg);
}

.h-table-search__toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid var(--aura-border-default, #e5e5e5);
}

.h-table-search__tool-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--aura-text-tertiary, #a3a3a3);
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.h-table-search__tool-btn:hover {
  background: var(--aura-bg-elevated, #f5f5f5);
  color: var(--aura-text-primary, #171717);
}
</style>