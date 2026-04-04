<template>
  <div class="h-table-cell">
    <!-- 优先级1: slot 插槽 -->
    <slot
      v-if="$slots[column.slot || column.prop]"
      :name="column.slot || column.prop"
      :row="row"
      :value="value"
      :column="column"
      :index="index"
    />
    
    <!-- 优先级2: render 函数 -->
    <component
      v-else-if="column.render"
      :is="renderContent"
    />
    
    <!-- 优先级3: 内置类型 -->
    <template v-else-if="column.type">
      <!-- 序号 -->
      <template v-if="column.type === 'index'">
        {{ index + 1 }}
      </template>
      
      <!-- 多选 -->
      <template v-else-if="column.type === 'selection'">
        <HCheckbox
          :model-value="isSelected"
          @change="handleSelectChange"
        />
      </template>
      
      <!-- 展开 -->
      <template v-else-if="column.type === 'expand'">
        <button class="h-table-cell__expand-btn" @click="handleExpand">
          <svg viewBox="0 0 24 24" width="14" height="14" :class="{ 'is-expanded': isExpanded }">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </template>
      
      <!-- Tag 标签 -->
      <template v-else-if="column.type === 'tag'">
        <HTag
          :type="currentTag.type"
          :color="currentTag.color"
          :class="currentTag.class"
          :style="currentTag.style"
        >
          {{ currentTag.label }}
        </HTag>
      </template>
      
      <!-- Icon 图标 -->
      <template v-else-if="column.type === 'icon'">
        <HIcon
          :name="value"
          :size="column.iconConfig?.size || 16"
          :color="column.iconConfig?.color"
        />
      </template>
      
      <!-- Link 链接 -->
      <template v-else-if="column.type === 'link'">
        <a
          :href="linkHref"
          :target="column.linkConfig?.target || '_blank'"
          :class="['h-table-cell__link', { 'has-underline': column.linkConfig?.underline }]"
        >
          {{ value }}
        </a>
      </template>
      
      <!-- Image 图片 -->
      <template v-else-if="column.type === 'image'">
        <img
          :src="value"
          :style="imageStyle"
          class="h-table-cell__image"
          @error="handleImageError"
        />
      </template>
      
      <!-- Dot 状态点 -->
      <template v-else-if="column.type === 'dot'">
        <span
          class="h-table-cell__dot"
          :style="dotStyle"
        />
      </template>
      
      <!-- Progress 进度条 -->
      <template v-else-if="column.type === 'progress'">
        <div class="h-table-cell__progress">
          <div class="h-table-cell__progress-bar">
            <div
              class="h-table-cell__progress-inner"
              :style="progressStyle"
            />
          </div>
          <span v-if="column.progressConfig?.showText !== false" class="h-table-cell__progress-text">
            {{ progressText }}
          </span>
        </div>
      </template>
      
      <!-- Badge 徽标 -->
      <template v-else-if="column.type === 'badge'">
        <span
          class="h-table-cell__badge"
          :style="badgeStyle"
        >
          {{ badgeText }}
        </span>
      </template>
      
      <!-- Ellipsis 省略 -->
      <template v-else-if="column.type === 'ellipsis'">
        <span
          class="h-table-cell__ellipsis"
          :title="value"
          :style="{ '-webkit-line-clamp': column.ellipsisConfig?.rows || 1 }"
        >
          {{ value }}
        </span>
      </template>
      
      <!-- Action 操作列 -->
      <template v-else-if="column.type === 'action'">
        <div class="h-table-cell__actions">
          <template v-for="(action, actionIndex) in visibleActions" :key="actionIndex">
            <button
              v-if="action.visible !== false"
              :class="['h-table-cell__action-btn', `is-${action.type || 'default'}`]"
              :disabled="action.disabled"
              @click="handleActionClick(action)"
            >
              {{ action.label }}
            </button>
          </template>
        </div>
      </template>
      
      <!-- 默认 -->
      <template v-else>
        {{ value }}
      </template>
    </template>
    
    <!-- 优先级4: format 格式化 -->
    <template v-else-if="column.format">
      {{ column.format(value, row, index) }}
    </template>
    
    <!-- 优先级5: formatter -->
    <template v-else-if="column.formatter">
      {{ column.formatter(row, column, value, index) }}
    </template>
    
    <!-- 默认: 显示值 -->
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, h, inject, ref, type CSSProperties, type VNode } from 'vue'
import type { TableColumn, TableAction, TableColumnOption } from './table'
import HCheckbox from '../checkbox/checkbox.vue'
import HTag from '../tag/tag.vue'
import HIcon from '../icon/icon.vue'

const props = defineProps<{
  row: any
  column: TableColumn
  value: any
  index: number
}>()

const emit = defineEmits<{
  (e: 'select', row: any): void
  (e: 'expand', row: any): void
  (e: 'action', action: TableAction, row: any): void
}>()

const tableInstance = inject<any>('hTable')

// 选中状态
const isSelected = computed(() => {
  if (!tableInstance) return false
  return tableInstance.selection?.includes?.(props.row) || false
})

// 展开状态
const isExpanded = computed(() => {
  if (!tableInstance) return false
  return false // TODO: 从 table instance 获取
})

// render 内容
const renderContent = computed(() => {
  if (props.column.render) {
    const result = props.column.render(props.value, props.row, props.column, props.index)
    if (typeof result === 'string') {
      return h('span', result)
    }
    return result
  }
  return null
})

// Tag 配置
const currentTag = computed<TableColumnOption>(() => {
  const options = props.column.options || []
  const option = options.find(o => o.value === props.value)
  return option || { label: props.value, value: props.value }
})

// Link 配置
const linkHref = computed(() => {
  if (props.column.linkConfig?.href) {
    return typeof props.column.linkConfig.href === 'function'
      ? props.column.linkConfig.href(props.row)
      : props.column.linkConfig.href
  }
  return props.value
})

// Image 配置
const imageStyle = computed<CSSProperties>(() => ({
  width: typeof props.column.imageConfig?.width === 'number'
    ? `${props.column.imageConfig.width}px`
    : props.column.imageConfig?.width || '40px',
  height: typeof props.column.imageConfig?.height === 'number'
    ? `${props.column.imageConfig.height}px`
    : props.column.imageConfig?.height || '40px',
  objectFit: props.column.imageConfig?.fit || 'cover',
  borderRadius: typeof props.column.imageConfig?.radius === 'number'
    ? `${props.column.imageConfig.radius}px`
    : props.column.imageConfig?.radius || '4px',
}))

// Dot 配置
const dotStyle = computed<CSSProperties>(() => {
  const config = props.column.dotConfig
  const size = config?.size || 8
  let color = '#52c41a' // success
  
  if (config?.color) {
    color = typeof config.color === 'function' ? config.color(props.value) : config.color
  } else if (config?.status) {
    const statusColors: Record<string, string> = {
      success: '#52c41a',
      processing: '#1890ff',
      error: '#ff4d4f',
      warning: '#faad14',
      default: '#d9d9d9',
    }
    color = statusColors[config.status] || color
  }
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    borderRadius: '50%',
  }
})

// Progress 配置
const progressStyle = computed<CSSProperties>(() => {
  const config = props.column.progressConfig
  const percent = Math.min(100, Math.max(0, Number(props.value) || 0))
  let color = config?.color || '#1890ff'
  
  if (typeof color === 'function') {
    color = color(percent)
  }
  
  return {
    width: `${percent}%`,
    backgroundColor: color,
  }
})

const progressText = computed(() => {
  const config = props.column.progressConfig
  if (config?.format) {
    return config.format(Number(props.value) || 0)
  }
  return `${props.value}%`
})

// Badge 配置
const badgeText = computed(() => {
  const config = props.column.badgeConfig
  const value = Number(props.value) || 0
  const max = config?.max || 99
  return value > max ? `${max}+` : value
})

const badgeStyle = computed<CSSProperties>(() => ({
  backgroundColor: props.column.badgeConfig?.color || '#ff4d4f',
}))

// Action 配置
const visibleActions = computed(() => {
  const actions = props.column.actions || []
  return actions.filter(action => {
    if (typeof action.visible === 'function') {
      return action.visible(props.row)
    }
    return action.visible !== false
  })
})

// 事件处理
function handleSelectChange() {
  emit('select', props.row)
}

function handleExpand() {
  emit('expand', props.row)
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  if (props.column.imageConfig?.fallback) {
    target.src = props.column.imageConfig.fallback
  }
}

function handleActionClick(action: TableAction) {
  if (action.onClick) {
    action.onClick(props.row, props.index)
  }
  emit('action', action, props.row)
}
</script>

<style scoped>
.h-table-cell {
  display: flex;
  align-items: center;
}

.h-table-cell__expand-btn {
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.h-table-cell__expand-btn svg {
  transition: transform 0.2s;
}

.h-table-cell__expand-btn svg.is-expanded {
  transform: rotate(90deg);
}

.h-table-cell__link {
  color: var(--aura-color-primary-500);
  text-decoration: none;
}

.h-table-cell__link.has-underline {
  text-decoration: underline;
}

.h-table-cell__link:hover {
  opacity: 0.8;
}

.h-table-cell__image {
  display: block;
}

.h-table-cell__dot {
  display: inline-block;
}

.h-table-cell__progress {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.h-table-cell__progress-bar {
  flex: 1;
  height: 6px;
  background: var(--aura-bg-elevated, #f5f5f5);
  border-radius: 3px;
  overflow: hidden;
}

.h-table-cell__progress-inner {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}

.h-table-cell__progress-text {
  font-size: 12px;
  color: var(--aura-text-tertiary, #a3a3a3);
  white-space: nowrap;
}

.h-table-cell__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  color: white;
  border-radius: 10px;
}

.h-table-cell__ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.h-table-cell__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.h-table-cell__action-btn {
  padding: 4px 8px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.h-table-cell__action-btn.is-default {
  background: var(--aura-bg-elevated, #f5f5f5);
  color: var(--aura-text-primary, #171717);
}

.h-table-cell__action-btn.is-primary {
  background: var(--aura-color-primary-500);
  color: white;
}

.h-table-cell__action-btn.is-success {
  background: var(--aura-color-success-500, #52c41a);
  color: white;
}

.h-table-cell__action-btn.is-warning {
  background: var(--aura-color-warning-500, #faad14);
  color: white;
}

.h-table-cell__action-btn.is-danger {
  background: var(--aura-color-danger-500, #ff4d4f);
  color: white;
}

.h-table-cell__action-btn.is-info {
  background: var(--aura-color-info-500, #1890ff);
  color: white;
}

.h-table-cell__action-btn:hover {
  opacity: 0.85;
}

.h-table-cell__action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>