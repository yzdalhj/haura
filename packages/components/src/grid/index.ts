/**
 * HRow/HCol 栅格布局组件导出
 */

import Row from './row.vue'
import Col from './col.vue'

export { Row as HRow }
export { Col as HCol }

export * from './grid'

export default {
  HRow: Row,
  HCol: Col,
}