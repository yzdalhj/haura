/**
 * HLoading 加载组件导出
 */

import Loading from './loading.vue'
import { HLoading as HLoadingComponent, vLoading, service } from './method'

export { HLoadingComponent as HLoading, vLoading, service }

export * from './loading'
export * from './method'

export default HLoadingComponent