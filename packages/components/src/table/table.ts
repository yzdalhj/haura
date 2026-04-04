import type { CSSProperties, VNode, Component } from 'vue'

export type TableColumnType =
  | 'default'
  | 'index'
  | 'selection'
  | 'expand'
  | 'tag'
  | 'icon'
  | 'link'
  | 'image'
  | 'dot'
  | 'ellipsis'
  | 'progress'
  | 'badge'
  | 'action'
  | 'custom'

export type TableColumnAlign = 'left' | 'center' | 'right'

export type TableSortOrder = 'ascending' | 'descending' | null

export type TableSize = 'small' | 'default' | 'large'

export interface TableFilter {
  text: string
  value: any
}

export interface TableAction {
  label: string
  icon?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'small' | 'default' | 'large'
  disabled?: boolean | ((row: any) => boolean)
  visible?: boolean | ((row: any) => boolean)
  confirm?: string
  onClick?: (row: any, index: number) => void
}

export interface TableColumn {
  prop?: string
  label?: string
  type?: TableColumnType
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  fixed?: 'left' | 'right' | boolean
  align?: TableColumnAlign
  headerAlign?: TableColumnAlign
  sortable?: boolean | 'custom'
  sortMethod?: (a: any, b: any) => number
  sortOrders?: TableSortOrder[]
  sortType?: 'number' | 'string' | 'auto'
  filterable?: boolean
  filters?: TableFilter[]
  filterMultiple?: boolean
  filterMethod?: (value: any, row: any) => boolean
  filteredValue?: any[]
  resizable?: boolean
  className?: string | ((row: any, column: TableColumn, index: number) => string)
  style?: CSSProperties | ((row: any, column: TableColumn, index: number) => CSSProperties)
  headerClassName?: string | ((column: TableColumn, index: number) => string)
  headerCellStyle?: CSSProperties
  showOverflowTooltip?: boolean
  formatter?: (row: any, column: TableColumn, value: any, index: number) => string | number
  format?: (value: any, row: any, index: number) => string | number
  render?: (value: any, row: any, column: TableColumn, index: number) => VNode | string
  slot?: string
  children?: TableColumn[]
  visible?: boolean
  disabled?: boolean
  
  // 搜索配置
  searchable?: boolean | SearchFieldConfig
  searchType?: 'input' | 'select' | 'daterange' | 'cascader' | 'custom'
  searchSpan?: number
  searchPlaceholder?: string
  
  // 内置类型配置
  options?: TableColumnOption[]
  imageConfig?: ImageConfig
  linkConfig?: LinkConfig
  dotConfig?: DotConfig
  progressConfig?: ProgressConfig
  badgeConfig?: BadgeConfig
  ellipsisConfig?: EllipsisConfig
  
  // 操作列配置
  actions?: TableAction[]
  
  // 编辑配置
  editable?: boolean
  editType?: string
  editConfig?: Record<string, any>
  editRules?: any[]
}

export interface TableColumnOption {
  label: string
  value: any
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
  class?: string
  style?: CSSProperties
}

export interface ImageConfig {
  width?: number | string
  height?: number | string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  radius?: string | number
  preview?: boolean
  fallback?: string
  lazy?: boolean
}

export interface LinkConfig {
  href?: string | ((row: any) => string)
  target?: '_self' | '_blank' | '_parent' | '_top'
  underline?: boolean
  disabled?: boolean | ((row: any) => boolean)
}

export interface DotConfig {
  size?: number
  color?: string | ((value: any) => string)
  status?: 'success' | 'processing' | 'error' | 'warning' | 'default'
}

export interface ProgressConfig {
  height?: number
  color?: string | ((percent: number) => string)
  showText?: boolean
  format?: (percent: number) => string
  status?: 'success' | 'exception' | 'active'
}

export interface BadgeConfig {
  max?: number
  showZero?: boolean
  dot?: boolean
  color?: string
  offset?: [number, number]
}

export interface EllipsisConfig {
  rows?: number
  tooltip?: boolean
  expandable?: boolean
  symbol?: string
}

export interface SearchFieldConfig {
  type?: 'input' | 'select' | 'daterange' | 'cascader' | 'custom'
  span?: number
  placeholder?: string
  defaultValue?: any
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  disabled?: boolean
  visible?: boolean
  order?: number
  component?: Component
  componentProps?: Record<string, any>
  transform?: (value: any) => any
}

export interface SearchConfig {
  enabled?: boolean
  fields?: SearchFieldConfig[]
  collapsed?: boolean
  defaultCollapsed?: boolean
  collapseRows?: number
  columns?: boolean
  refresh?: boolean
  fullscreen?: boolean
  searchOnEnter?: boolean
  debounce?: number
  autoSearch?: boolean
  resetOnSearch?: boolean
  showSearchButton?: boolean
  showResetButton?: boolean
  searchButtonText?: string
  resetButtonText?: string
  actions?: SearchAction[]
  storageKey?: string
  storageType?: 'localStorage' | 'sessionStorage'
  prefix?: VNode | (() => VNode)
  suffix?: VNode | (() => VNode)
}

export interface SearchAction {
  label: string
  icon?: string
  type?: 'primary' | 'default' | 'text'
  disabled?: boolean
  loading?: boolean
  onClick?: (search: any) => void
}

export interface PaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  layout?: ('total' | 'sizes' | 'prev' | 'pager' | 'next' | 'jumper')[]
  showTotal?: boolean
  showQuickJumper?: boolean
  showSizeChanger?: boolean
  simple?: boolean
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
}

export interface SelectionConfig {
  selectedRows?: any[]
  rowKey?: string | ((row: any) => string)
  reserveSelection?: boolean
  disabled?: boolean | ((row: any) => boolean)
}

export interface TableProps {
  data: any[]
  columns: TableColumn[]
  rowKey?: string | ((row: any) => string)
  height?: number | string
  maxHeight?: number | string
  stripe?: boolean
  border?: boolean
  size?: TableSize
  showHeader?: boolean
  highlightCurrentRow?: boolean
  highlightOnHover?: boolean
  loading?: boolean
  emptyText?: string
  emptyRender?: () => VNode
  
  // 搜索栏
  search?: boolean | SearchConfig
  
  // 分页
  pagination?: boolean | PaginationConfig
  
  // 选择
  selection?: boolean | SelectionConfig
  
  // 树形数据
  tree?: boolean | TreeConfig
  
  // 虚拟滚动
  virtual?: boolean
  rowHeight?: number
  bufferSize?: number
  
  // 拖拽
  draggable?: boolean
  
  // 其他
  showSummary?: boolean
  summaryMethod?: (data: { columns: TableColumn[]; data: any[] }) => any[]
  spanMethod?: (data: { row: any; column: TableColumn; rowIndex: number; columnIndex: number }) => { rowspan: number; colspan: number }
  rowClassName?: string | ((row: any, index: number) => string)
  rowStyle?: CSSProperties | ((row: any, index: number) => CSSProperties)
  cellClassName?: string | ((row: any, column: TableColumn, rowIndex: number, columnIndex: number) => string)
  cellStyle?: CSSProperties | ((row: any, column: TableColumn, rowIndex: number, columnIndex: number) => CSSProperties)
  headerRowClassName?: string | ((columns: TableColumn[]) => string)
  headerRowStyle?: CSSProperties | ((columns: TableColumn[]) => CSSProperties)
  headerCellClassName?: string | ((column: TableColumn, index: number) => string)
  headerCellStyle?: CSSProperties | ((column: TableColumn, index: number) => CSSProperties)
  defaultExpandAll?: boolean
  expandRowKeys?: (string | number)[]
  defaultSort?: { prop: string; order: TableSortOrder }
  class?: string | string[]
  style?: CSSProperties
}

export interface TreeConfig {
  rowKey?: string
  parentKey?: string
  children?: string
  lazy?: boolean
  load?: (row: any, resolve: (data: any[]) => void) => void
  indent?: number
  defaultExpandAll?: boolean
  expandRowKeys?: (string | number)[]
}

export interface TableEmits {
  (e: 'select', selection: any[], row: any): void
  (e: 'select-all', selection: any[]): void
  (e: 'selection-change', selection: any[]): void
  (e: 'current-change', currentRow: any, oldRow: any): void
  (e: 'sort-change', sort: { prop: string; order: TableSortOrder }): void
  (e: 'filter-change', filters: Record<string, any[]>): void
  (e: 'row-click', row: any, column: TableColumn, event: MouseEvent): void
  (e: 'row-dblclick', row: any, column: TableColumn, event: MouseEvent): void
  (e: 'row-contextmenu', row: any, column: TableColumn, event: MouseEvent): void
  (e: 'cell-click', row: any, column: TableColumn, cell: HTMLTableCellElement, event: MouseEvent): void
  (e: 'cell-dblclick', row: any, column: TableColumn, cell: HTMLTableCellElement, event: MouseEvent): void
  (e: 'expand-change', row: any, expanded: boolean): void
  (e: 'page-change', page: number): void
  (e: 'page-size-change', size: number): void
  (e: 'search', params: Record<string, any>): void
  (e: 'reset'): void
}

export interface TableInstance {
  data: any[]
  columns: TableColumn[]
  selection: any[]
  currentRow: any
  sortState: { prop: string; order: TableSortOrder }
  filters: Record<string, any[]>
  
  // 方法
  clearSelection: () => void
  toggleRowSelection: (row: any, selected?: boolean) => void
  toggleAllSelection: () => void
  setCurrentRow: (row: any) => void
  clearSort: () => void
  clearFilter: (columnKeys?: string[]) => void
  doLayout: () => void
  sort: (prop: string, order: TableSortOrder) => void
  scrollTo: (options: { left?: number; top?: number }) => void
  
  // 搜索
  search: (params: Record<string, any>) => void
  reset: () => void
  refresh: () => void
  
  // 展开
  toggleRowExpansion: (row: any, expanded?: boolean) => void
  expandAll: () => void
  collapseAll: () => void
}

export const tablePropsDefaults: Partial<TableProps> = {
  data: () => [],
  columns: () => [],
  stripe: false,
  border: false,
  size: 'default',
  showHeader: true,
  highlightCurrentRow: false,
  highlightOnHover: true,
  loading: false,
  emptyText: '暂无数据',
}

export const searchConfigDefaults: Partial<SearchConfig> = {
  enabled: true,
  collapsed: false,
  defaultCollapsed: false,
  collapseRows: 1,
  columns: true,
  refresh: true,
  fullscreen: false,
  searchOnEnter: true,
  debounce: 300,
  autoSearch: false,
  resetOnSearch: true,
  showSearchButton: true,
  showResetButton: true,
  searchButtonText: '搜索',
  resetButtonText: '重置',
}

export const paginationConfigDefaults: Partial<PaginationConfig> = {
  current: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  layout: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
  showTotal: true,
  showQuickJumper: true,
  showSizeChanger: true,
}