<template>
  <div :class="['h-table-wrapper', props.class]" :style="props.style">
    <!-- 搜索栏 -->
    <HTableSearch
      v-if="searchEnabled"
      :columns="columns"
      :config="searchConfig"
      :model-value="searchValues"
      @update:model-value="handleSearchChange"
      @search="handleSearch"
      @reset="handleReset"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </HTableSearch>

    <!-- 表格主体 -->
    <div :class="['h-table', tableClasses]">
      <!-- 加载状态 -->
      <div v-if="loading" class="h-table__loading">
        <div class="h-table__loading-spinner" />
        <span class="h-table__loading-text">加载中...</span>
      </div>

      <!-- 表格容器 -->
      <div class="h-table__container" :style="containerStyle">
        <table ref="tableRef" class="h-table__body">
          <!-- 表头 -->
          <thead v-if="showHeader" class="h-table__header">
            <tr :class="headerRowClass" :style="headerRowStyle">
              <th
                v-for="(column, colIndex) in visibleColumns"
                :key="colIndex"
                :class="getHeaderCellClass(column, colIndex)"
                :style="getHeaderCellStyle(column, colIndex)"
                @click="handleHeaderClick(column, $event)"
              >
                <!-- 多选列 -->
                <template v-if="column.type === 'selection'">
                  <HCheckbox
                    :model-value="isAllSelected"
                    :indeterminate="isIndeterminate"
                    @change="handleSelectAll"
                  />
                </template>
                <!-- 展开列 -->
                <template v-else-if="column.type === 'expand'">
                  <span class="h-table__expand-header" />
                </template>
                <!-- 序号列 -->
                <template v-else-if="column.type === 'index'">
                  {{ column.label || '#' }}
                </template>
                <!-- 排序图标 -->
                <template v-else>
                  <span class="h-table__header-content">
                    <slot
                      v-if="$slots[`${column.prop}-header`]"
                      :name="`${column.prop}-header`"
                      :column="column"
                      :index="colIndex"
                    >
                      {{ column.label }}
                    </slot>
                    <template v-else>{{ column.label }}</template>
                    <span
                      v-if="column.sortable"
                      :class="['h-table__sort-icon', { 'is-active': sortState.prop === column.prop }]"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" :class="{ 'is-asc': sortState.order === 'ascending' && sortState.prop === column.prop }">
                        <path fill="currentColor" d="M7 14l5-5 5 5z"/>
                      </svg>
                      <svg viewBox="0 0 24 24" width="14" height="14" :class="{ 'is-desc': sortState.order === 'descending' && sortState.prop === column.prop }">
                        <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                      </svg>
                    </span>
                  </span>
                </template>
              </th>
            </tr>
          </thead>

          <!-- 表体 -->
          <tbody class="h-table__tbody">
            <template v-if="displayData.length === 0">
              <tr class="h-table__empty">
                <td :colspan="visibleColumns.length">
                  <slot name="empty">
                    <div class="h-table__empty-content">
                      <svg viewBox="0 0 24 24" width="48" height="48">
                        <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                        <path fill="currentColor" d="M12 17c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
                      </svg>
                      <span>{{ emptyText }}</span>
                    </div>
                  </slot>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr
                v-for="(row, rowIndex) in displayData"
                :key="getRowKey(row, rowIndex)"
                :class="getRowClass(row, rowIndex)"
                :style="getRowStyle(row, rowIndex)"
                @click="handleRowClick(row, $event)"
                @dblclick="handleRowDblClick(row, $event)"
                @contextmenu="handleRowContextMenu(row, $event)"
              >
                <td
                  v-for="(column, colIndex) in visibleColumns"
                  :key="colIndex"
                  :class="getCellClass(row, column, rowIndex, colIndex)"
                  :style="getCellStyle(row, column, rowIndex, colIndex)"
                  @click="handleCellClick(row, column, $event)"
                  @dblclick="handleCellDblClick(row, column, $event)"
                >
                  <HTableCell
                    :row="row"
                    :column="column"
                    :value="getCellValue(row, column)"
                    :index="rowIndex"
                  >
                    <template v-for="(_, name) in $slots" #[name]="slotData">
                      <slot :name="name" v-bind="slotData" />
                    </template>
                  </HTableCell>
                </td>
              </tr>
            </template>
          </tbody>

          <!-- 合计行 -->
          <tfoot v-if="showSummary" class="h-table__footer">
            <tr>
              <td
                v-for="(column, colIndex) in visibleColumns"
                :key="colIndex"
                :class="getFooterCellClass(column, colIndex)"
              >
                {{ getSummaryValue(column, colIndex) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="paginationEnabled" class="h-table__pagination">
      <div class="h-table__pagination-total">
        共 {{ pagination.total }} 条
      </div>
      <div class="h-table__pagination-sizes">
        <select :value="pagination.pageSize" @change="handlePageSizeChange">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }} 条/页
          </option>
        </select>
      </div>
      <div class="h-table__pagination-pages">
        <button
          class="h-table__pagination-btn"
          :disabled="pagination.current === 1"
          @click="handlePageChange(pagination.current - 1)"
        >
          上一页
        </button>
        <span class="h-table__pagination-current">{{ pagination.current }}</span>
        <span class="h-table__pagination-info">/ {{ totalPages }}</span>
        <button
          class="h-table__pagination-btn"
          :disabled="pagination.current === totalPages"
          @click="handlePageChange(pagination.current + 1)"
        >
          下一页
        </button>
      </div>
      <div class="h-table__pagination-jumper">
        <span>前往</span>
        <input
          type="number"
          :value="pagination.current"
          :min="1"
          :max="totalPages"
          @change="handleJumperChange"
        />
        <span>页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, type CSSProperties } from 'vue'
import { tablePropsDefaults } from './table'
import type { TableColumn, TableProps, TableSortOrder } from './table'
import { useTable, useSearch } from './use-table'
import HCheckbox from '../checkbox/checkbox.vue'

const props = withDefaults(defineProps<TableProps>(), tablePropsDefaults)

const emit = defineEmits<{
  (e: 'select', selection: any[], row: any): void
  (e: 'select-all', selection: any[]): void
  (e: 'selection-change', selection: any[]): void
  (e: 'current-change', currentRow: any, oldRow: any): void
  (e: 'sort-change', sort: { prop: string; order: TableSortOrder | null }): void
  (e: 'filter-change', filters: Record<string, any[]>): void
  (e: 'row-click', row: any, column: TableColumn | null, event: MouseEvent): void
  (e: 'row-dblclick', row: any, column: TableColumn | null, event: MouseEvent): void
  (e: 'row-contextmenu', row: any, column: TableColumn | null, event: MouseEvent): void
  (e: 'cell-click', row: any, column: TableColumn, event: MouseEvent): void
  (e: 'cell-dblclick', row: any, column: TableColumn, event: MouseEvent): void
  (e: 'page-change', page: number): void
  (e: 'page-size-change', size: number): void
  (e: 'search', params: Record<string, any>): void
  (e: 'reset'): void
}>()

const table = useTable(props)
provide('hTable', table)

const { searchValues, searchConfig, handleSearch, handleReset } = useSearch(props)

const tableRef = ref<HTMLTableElement>()
const sortState = ref<{ prop: string; order: TableSortOrder | null }>({ prop: '', order: null })
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: props.data?.length || 0,
})

// 搜索栏
const searchEnabled = computed(() => {
  if (props.search === false) return false
  if (props.search === undefined) return false
  return true
})

// 分页
const paginationEnabled = computed(() => {
  return props.pagination !== false
})

const pageSizes = computed(() => {
  if (typeof props.pagination === 'object' && props.pagination?.pageSizes) {
    return props.pagination.pageSizes
  }
  return [10, 20, 50, 100]
})

const totalPages = computed(() => {
  return Math.ceil(pagination.value.total / pagination.value.pageSize) || 1
})

// 可见列
const visibleColumns = computed(() => {
  return props.columns.filter(col => col.visible !== false)
})

// 显示数据
const displayData = computed(() => {
  let data = [...(props.data || [])]

  // 排序
  if (sortState.value.prop && sortState.value.order) {
    data.sort((a, b) => {
      const aVal = getNestedValue(a, sortState.value.prop)
      const bVal = getNestedValue(b, sortState.value.prop)
      const order = sortState.value.order === 'ascending' ? 1 : -1
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * order
      }
      return String(aVal).localeCompare(String(bVal)) * order
    })
  }

  // 分页
  if (props.pagination !== false) {
    const start = (pagination.value.current - 1) * pagination.value.pageSize
    data = data.slice(start, start + pagination.value.pageSize)
  }

  return data
})

// 选择状态
const selection = ref<any[]>([])
const isAllSelected = computed(() => {
  return displayData.value.length > 0 && selection.value.length === displayData.value.length
})
const isIndeterminate = computed(() => {
  return selection.value.length > 0 && selection.value.length < displayData.value.length
})

// 样式计算
const tableClasses = computed(() => [
  `h-table--${props.size}`,
  {
    'is-striped': props.stripe,
    'is-border': props.border,
    'is-loading': props.loading,
  },
])

const containerStyle = computed<CSSProperties>(() => ({
  height: props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : undefined,
  maxHeight: props.maxHeight ? (typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight) : undefined,
}))

const headerRowClass = computed(() => props.headerRowClassName || '')
const headerRowStyle = computed<CSSProperties>(() => props.headerRowStyle || {})

// 方法
function getRowKey(row: any, index: number): string | number {
  if (props.rowKey) {
    return typeof props.rowKey === 'function' ? props.rowKey(row) : row[props.rowKey]
  }
  return index
}

function getNestedValue(obj: any, path: string): any {
  if (!path) return obj
  const keys = path.split('.')
  let result = obj
  for (const key of keys) {
    if (result == null) return undefined
    result = result[key]
  }
  return result
}

function getCellValue(row: any, column: TableColumn): any {
  if (!column.prop) return ''
  return getNestedValue(row, column.prop)
}

function getHeaderCellClass(column: TableColumn, index: number): string[] {
  const classes = ['h-table__header-cell', `is-${column.align || 'left'}`]
  if (column.fixed === 'left') classes.push('is-fixed-left')
  if (column.fixed === 'right') classes.push('is-fixed-right')
  if (column.sortable) classes.push('is-sortable')
  if (column.headerClassName) {
    classes.push(typeof column.headerClassName === 'function' ? column.headerClassName(column, index) : column.headerClassName)
  }
  return classes
}

function getHeaderCellStyle(column: TableColumn, index: number): CSSProperties {
  const style: CSSProperties = {
    width: column.width ? (typeof column.width === 'number' ? `${column.width}px` : column.width) : undefined,
    minWidth: column.minWidth ? (typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth) : undefined,
    maxWidth: column.maxWidth ? (typeof column.maxWidth === 'number' ? `${column.maxWidth}px` : column.maxWidth) : undefined,
    textAlign: column.headerAlign || column.align || 'left',
  }
  return { ...style, ...column.headerCellStyle }
}

function getRowClass(row: any, index: number): string[] {
  const classes = ['h-table__row']
  if (props.stripe && index % 2 === 1) classes.push('is-striped')
  if (props.highlightOnHover) classes.push('is-hoverable')
  if (props.rowClassName) {
    classes.push(typeof props.rowClassName === 'function' ? props.rowClassName(row, index) : props.rowClassName)
  }
  return classes
}

function getRowStyle(row: any, index: number): CSSProperties {
  if (props.rowStyle) {
    return typeof props.rowStyle === 'function' ? props.rowStyle(row, index) : props.rowStyle
  }
  return {}
}

function getCellClass(row: any, column: TableColumn, rowIndex: number, colIndex: number): string[] {
  const classes = ['h-table__cell', `is-${column.align || 'left'}`]
  if (column.className) {
    classes.push(typeof column.className === 'function' ? column.className(row, column, rowIndex) : column.className)
  }
  return classes
}

function getCellStyle(row: any, column: TableColumn, rowIndex: number, colIndex: number): CSSProperties {
  const style: CSSProperties = {}
  if (column.style) {
    Object.assign(style, typeof column.style === 'function' ? column.style(row, column, rowIndex) : column.style)
  }
  if (props.cellStyle) {
    Object.assign(style, typeof props.cellStyle === 'function' ? props.cellStyle(row, column, rowIndex, colIndex) : props.cellStyle)
  }
  return style
}

function getFooterCellClass(column: TableColumn, index: number): string[] {
  return ['h-table__footer-cell', `is-${column.align || 'left'}`]
}

function getSummaryValue(column: TableColumn, index: number): string {
  if (index === 0) return '合计'
  if (!column.prop) return ''
  const values = props.data.map(row => getNestedValue(row, column.prop!)).filter(v => typeof v === 'number')
  const sum = values.reduce((a, b) => a + b, 0)
  return sum.toLocaleString()
}

// 事件处理
function handleHeaderClick(column: TableColumn, event: MouseEvent) {
  if (column.sortable) {
    if (sortState.value.prop === column.prop) {
      sortState.value.order = sortState.value.order === 'ascending' ? 'descending' : sortState.value.order === 'descending' ? null : 'ascending'
    } else {
      sortState.value = { prop: column.prop || '', order: 'ascending' }
    }
    if (sortState.value.order === null) {
      sortState.value.prop = ''
    }
    emit('sort-change', sortState.value)
  }
}

function handleSelectAll() {
  if (isAllSelected.value) {
    selection.value = []
  } else {
    selection.value = [...displayData.value]
  }
  emit('select-all', selection.value)
  emit('selection-change', selection.value)
}

function handleRowClick(row: any, event: MouseEvent) {
  emit('row-click', row, null, event)
}

function handleRowDblClick(row: any, event: MouseEvent) {
  emit('row-dblclick', row, null, event)
}

function handleRowContextMenu(row: any, event: MouseEvent) {
  emit('row-contextmenu', row, null, event)
}

function handleCellClick(row: any, column: TableColumn, event: MouseEvent) {
  emit('cell-click', row, column, event)
}

function handleCellDblClick(row: any, column: TableColumn, event: MouseEvent) {
  emit('cell-dblclick', row, column, event)
}

function handlePageChange(page: number) {
  pagination.value.current = page
  emit('page-change', page)
}

function handlePageSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  pagination.value.pageSize = Number(target.value)
  pagination.value.current = 1
  emit('page-size-change', pagination.value.pageSize)
}

function handleJumperChange(event: Event) {
  const target = event.target as HTMLInputElement
  const page = Math.min(Math.max(Number(target.value), 1), totalPages.value)
  pagination.value.current = page
  emit('page-change', page)
}

function handleSearchChange(values: Record<string, any>) {
  searchValues.value = values
}

defineExpose({
  ...table,
  sortState,
  pagination,
  selection,
})
</script>

<style scoped>
.h-table-wrapper {
  width: 100%;
  font-size: 14px;
}

.h-table {
  position: relative;
  width: 100%;
  background: var(--aura-bg-base, #fff);
  border-radius: 8px;
  overflow: hidden;
}

.h-table__container {
  overflow-x: auto;
  overflow-y: auto;
}

.h-table__body {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
}

.h-table__header {
  background: var(--aura-bg-elevated, #f5f5f5);
}

.h-table__header-cell {
  padding: 12px 16px;
  font-weight: 600;
  color: var(--aura-text-primary, #171717);
  border-bottom: 1px solid var(--aura-border-default, #e5e5e5);
  white-space: nowrap;
}

.h-table__header-cell.is-sortable {
  cursor: pointer;
  user-select: none;
}

.h-table__header-content {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.h-table__sort-icon {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
}

.h-table__sort-icon svg {
  opacity: 0.3;
  transition: opacity 0.2s;
}

.h-table__sort-icon svg.is-asc,
.h-table__sort-icon svg.is-desc {
  opacity: 1;
  color: var(--aura-color-primary-500);
}

.h-table__tbody {
  
}

.h-table__row {
  transition: background-color 0.2s;
}

.h-table__row.is-hoverable:hover {
  background-color: var(--aura-bg-elevated, #f5f5f5);
}

.h-table__row.is-striped {
  background-color: var(--aura-bg-elevated, #fafafa);
}

.h-table__cell {
  padding: 12px 16px;
  color: var(--aura-text-primary, #171717);
  border-bottom: 1px solid var(--aura-border-default, #e5e5e5);
  vertical-align: middle;
}

.h-table__cell.is-left {
  text-align: left;
}

.h-table__cell.is-center {
  text-align: center;
}

.h-table__cell.is-right {
  text-align: right;
}

.h-table--border .h-table__header-cell,
.h-table--border .h-table__cell {
  border-right: 1px solid var(--aura-border-default, #e5e5e5);
}

.h-table--border .h-table__header-cell:last-child,
.h-table--border .h-table__cell:last-child {
  border-right: none;
}

.h-table__empty {
  text-align: center;
}

.h-table__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  color: var(--aura-text-tertiary, #a3a3a3);
  gap: 12px;
}

.h-table__loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
}

.h-table__loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--aura-border-default, #e5e5e5);
  border-top-color: var(--aura-color-primary-500);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.h-table__pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid var(--aura-border-default, #e5e5e5);
}

.h-table__pagination-total {
  color: var(--aura-text-secondary, #525252);
  font-size: 14px;
}

.h-table__pagination-sizes select {
  padding: 6px 12px;
  border: 1px solid var(--aura-border-default, #d9d9d9);
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.h-table__pagination-pages {
  display: flex;
  align-items: center;
  gap: 8px;
}

.h-table__pagination-btn {
  padding: 6px 12px;
  border: 1px solid var(--aura-border-default, #d9d9d9);
  border-radius: 4px;
  background: var(--aura-bg-base, #fff);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.h-table__pagination-btn:hover:not(:disabled) {
  border-color: var(--aura-color-primary-500);
  color: var(--aura-color-primary-500);
}

.h-table__pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.h-table__pagination-current {
  padding: 6px 12px;
  background: var(--aura-color-primary-500);
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

.h-table__pagination-info {
  color: var(--aura-text-tertiary, #a3a3a3);
}

.h-table__pagination-jumper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.h-table__pagination-jumper input {
  width: 48px;
  padding: 6px 8px;
  border: 1px solid var(--aura-border-default, #d9d9d9);
  border-radius: 4px;
  text-align: center;
  outline: none;
}

.h-table--small .h-table__header-cell,
.h-table--small .h-table__cell {
  padding: 8px 12px;
  font-size: 13px;
}

.h-table--large .h-table__header-cell,
.h-table--large .h-table__cell {
  padding: 16px 20px;
  font-size: 15px;
}
</style>