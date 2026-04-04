/**
 * 路径工具函数 - 支持深度属性绑定
 */

/**
 * 解析路径为数组
 * 'user.name' => ['user', 'name']
 * 'items[0].name' => ['items', '0', 'name']
 * 'items[0]' => ['items', '0']
 */
export function parsePath(path: string): (string | number)[] {
  const result: (string | number)[] = []
  const parts = path.split('.')

  for (const part of parts) {
    const match = part.match(/^([^\[]+)(\[\d+\])*$/)
    if (match) {
      result.push(match[1])
      const indices = part.match(/\[(\d+)\]/g)
      if (indices) {
        for (const idx of indices) {
          result.push(parseInt(idx.slice(1, -1), 10))
        }
      }
    }
  }

  return result
}

/**
 * 获取嵌套对象的值
 */
export function get(obj: any, path: string): any {
  if (obj == null) return undefined
  if (!path) return obj

  const keys = parsePath(path)
  let result = obj

  for (const key of keys) {
    if (result == null) return undefined
    result = result[key]
  }

  return result
}

/**
 * 设置嵌套对象的值
 */
export function set(obj: any, path: string, value: any): void {
  if (!path) return

  const keys = parsePath(path)
  let target = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]

    if (target[key] == null) {
      target[key] = typeof nextKey === 'number' ? [] : {}
    }
    target = target[key]
  }

  target[keys[keys.length - 1]] = value
}

/**
 * 删除嵌套对象的值
 */
export function unset(obj: any, path: string): boolean {
  if (!path) return false

  const keys = parsePath(path)
  let target = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (target[key] == null) return false
    target = target[key]
  }

  const lastKey = keys[keys.length - 1]
  if (Array.isArray(target)) {
    target.splice(lastKey as number, 1)
  } else {
    delete target[lastKey]
  }

  return true
}

/**
 * 检查路径是否存在
 */
export function has(obj: any, path: string): boolean {
  return get(obj, path) !== undefined
}

/**
 * 获取路径的所有键名
 */
export function keys(obj: any, path?: string): string[] {
  const target = path ? get(obj, path) : obj
  if (target == null) return []
  return Object.keys(target)
}

/**
 * 深拷贝
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 深度合并
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = deepClone(target)

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = result[key]

      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue !== null &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue)
      } else {
        result[key] = sourceValue as any
      }
    }
  }

  return result
}

/**
 * 获取对象差异
 */
export function diff(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Record<string, { old: any; new: any }> {
  const result: Record<string, { old: any; new: any }> = {}

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

  for (const key of allKeys) {
    if (obj1[key] !== obj2[key]) {
      result[key] = {
        old: obj1[key],
        new: obj2[key],
      }
    }
  }

  return result
}