import { ref, computed, reactive, watch, type Ref, type ComputedRef, provide, inject } from 'vue'
import type {
  TableColumn,
  TableProps,
  TableInstance,
  TableSortOrder,
  PaginationConfig,
  SearchConfig,
} from './table'

export function useTable(props: TableProps): TableInstance {
  const selection = ref<any[]>([])
  const currentRow = ref<any>(null)
  const sortState = ref<{ prop: string; order: TableSortOrder }>({ prop: '', order: null })
  const filters = ref<Record<string, any[]>>({})
  const expandedRows = ref<Set<any>>(new Set())

  const searchValues = ref<Record<string, any>>({})
  const pagination = ref<PaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    ...getDefaultPagination(props.pagination),
  })

  function getDefaultPagination(pagination?: boolean | PaginationConfig): Partial<PaginationConfig> {
    if (pagination === false) return {}
    if (pagination === true) return { current: 1, pageSize: 10 }
    return pagination || {}
  }

  // 过滤后的数据
  const filteredData = computed(() => {
    let data = [...(props.data || [])]

    // 排序
    if (sortState.value.prop && sortState.value.order) {
      const column = props.columns.find(c => c.prop === sortState.value.prop)
      if (column) {
        data.sort((a, b) => {
          const aVal = getNestedValue(a, sortState.value.prop)
          const bVal = getNestedValue(b, sortState.value.prop)

          if (column.sortMethod) {
            return column.sortMethod(a, b)
          }

          const order = sortState.value.order === 'ascending' ? 1 : -1
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return (aVal - bVal) * order
          }
          return String(aVal).localeCompare(String(bVal)) * order
        })
      }
    }

    // 筛选
    for (const [prop, values] of Object.entries(filters.value)) {
      if (values && values.length > 0) {
        const column = props.columns.find(c => c.prop === prop)
        if (column?.filterMethod) {
          data = data.filter(row => values.some(v => column.filterMethod!(v, row)))
        } else {
          data = data.filter(row => values.includes(getNestedValue(row, prop)))
        }
      }
    }

    // 搜索
    if (props.search && searchValues.value) {
      for (const [prop, value] of Object.entries(searchValues.value)) {
        if (value !== '' && value !== null && value !== undefined) {
          data = data.filter(row => {
            const rowValue = getNestedValue(row, prop)
            if (Array.isArray(value)) {
              // 日期范围等
              return true
            }
            return String(rowValue).toLowerCase().includes(String(value).toLowerCase())
          })
        }
      }
    }

    return data
  })

  // 分页后的数据
  const pagedData = computed(() => {
    const data = filteredData.value
    const pag = pagination.value

    if (!props.pagination) return data

    const start = (pag.current - 1) * pag.pageSize
    const end = start + pag.pageSize
    return data.slice(start, end)
  })

  // 最终显示的数据
  const displayData = computed(() => pagedData.value)

  // 方法
  function clearSelection(): void {
    selection.value = []
  }

  function toggleRowSelection(row: any, selected?: boolean): void {
    const rowKey = props.rowKey || 'id'
    const key = typeof rowKey === 'function' ? rowKey(row) : row[rowKey]
    const index = selection.value.findIndex(s => {
      const sKey = typeof rowKey === 'function' ? rowKey(s) : s[rowKey]
      return sKey === key
    })

    if (selected === false) {
      if (index > -1) selection.value.splice(index, 1)
    } else if (selected === true) {
      if (index === -1) selection.value.push(row)
    } else {
      if (index > -1) {
        selection.value.splice(index, 1)
      } else {
        selection.value.push(row)
      }
    }
  }

  function toggleAllSelection(): void {
    if (selection.value.length === displayData.value.length) {
      selection.value = []
    } else {
      selection.value = [...displayData.value]
    }
  }

  function setCurrentRow(row: any): void {
    currentRow.value = row
  }

  function clearSort(): void {
    sortState.value = { prop: '', order: null }
  }

  function clearFilter(columnKeys?: string[]): void {
    if (columnKeys) {
      columnKeys.forEach(key => {
        delete filters.value[key]
      })
    } else {
      filters.value = {}
    }
  }

  function doLayout(): void {
    // 触发重新渲染
  }

  function sort(prop: string, order: TableSortOrder): void {
    sortState.value = { prop, order }
  }

  function scrollTo(options: { left?: number; top?: number }): void {
    // 滚动到指定位置
  }

  function search(params: Record<string, any>): void {
    searchValues.value = { ...params }
    if (props.pagination) {
      pagination.value.current = 1
    }
  }

  function reset(): void {
    searchValues.value = {}
    sortState.value = { prop: '', order: null }
    filters.value = {}
    if (props.pagination) {
      pagination.value.current = 1
    }
  }

  function refresh(): void {
    // 触发重新加载数据
  }

  function toggleRowExpansion(row: any, expanded?: boolean): void {
    const rowKey = props.rowKey || 'id'
    const key = typeof rowKey === 'function' ? rowKey(row) : row[rowKey]

    if (expanded === false) {
      expandedRows.value.delete(key)
    } else if (expanded === true) {
      expandedRows.value.add(key)
    } else {
      if (expandedRows.value.has(key)) {
        expandedRows.value.delete(key)
      } else {
        expandedRows.value.add(key)
      }
    }
  }

  function expandAll(): void {
    const rowKey = props.rowKey || 'id'
    displayData.value.forEach(row => {
      const key = typeof rowKey === 'function' ? rowKey(row) : row[rowKey]
      expandedRows.value.add(key)
    })
  }

  function collapseAll(): void {
    expandedRows.value.clear()
  }

  const instance: TableInstance = {
    get data() { return displayData.value },
    get columns() { return props.columns },
    get selection() { return selection.value },
    get currentRow() { return currentRow.value },
    get sortState() { return sortState.value },
    get filters() { return filters.value },
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
    scrollTo,
    search,
    reset,
    refresh,
    toggleRowExpansion,
    expandAll,
    collapseAll,
  }

  return instance
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

export function provideTable(instance: TableInstance): void {
  provide('hTable', instance)
}

export function useTableInstance(): TableInstance | undefined {
  return inject<TableInstance>('hTable')
}

export function useSearch(props: TableProps) {
  const searchValues = ref<Record<string, any>>({})
  const collapsed = ref(false)

  const searchConfig = computed<SearchConfig>(() => {
    if (props.search === true) {
      return { enabled: true }
    }
    if (props.search === false) {
      return { enabled: false }
    }
    return props.search || { enabled: false }
  })

  const searchFields = computed(() => {
    if (!searchConfig.value.enabled) return []

    return props.columns
      .filter(col => col.searchable !== false && col.searchable !== undefined)
      .map(col => {
        const searchConfig = typeof col.searchable === 'object' ? col.searchable : {}
        return {
          prop: col.prop,
          label: col.label,
          type: searchConfig.type || col.searchType || (col.options ? 'select' : 'input'),
          span: searchConfig.span || col.searchSpan || 4,
          placeholder: searchConfig.placeholder || col.searchPlaceholder,
          options: col.options,
          defaultValue: searchConfig.defaultValue,
          clearable: searchConfig.clearable !== false,
          filterable: searchConfig.filterable,
          multiple: searchConfig.multiple,
          disabled: searchConfig.disabled,
          visible: searchConfig.visible,
          order: searchConfig.order || 0,
          component: searchConfig.component,
          componentProps: searchConfig.componentProps,
          transform: searchConfig.transform,
        }
      })
      .sort((a, b) => a.order - b.order)
  })

  const handleSearch = () => {
    // 触发搜索
  }

  const handleReset = () => {
    searchValues.value = {}
  }

  return {
    searchValues,
  collapsed,
    searchConfig,
    searchFields,
    handleSearch,
    handleReset,
  }
}