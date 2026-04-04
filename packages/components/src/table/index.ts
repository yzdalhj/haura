import Table from './table.vue'
import TableCell from './table-cell.vue'
import TableSearch from './table-search.vue'
import { useTable, useTableInstance, useSearch } from './use-table'

export { Table as HTable }
export { TableCell as HTableCell }
export { TableSearch as HTableSearch }
export { useTable, useTableInstance, useSearch }

export * from './table'
export * from './use-table'

export default Table