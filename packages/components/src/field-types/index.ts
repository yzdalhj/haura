import type { Component, VNode } from 'vue'

export type FieldTypeCategory = 'form' | 'display' | 'both'

export interface FieldTypeConfig {
  component: Component | null
  type: FieldTypeCategory
  defaultValue?: any
  defaultProps?: Record<string, any>
  defaultEvents?: Record<string, (...args: any[]) => any>
  transform?: {
    input?: (value: any) => any
    output?: (value: any) => any
    display?: (value: any, config: any, row?: any) => string | VNode | number
  }
}

const fieldTypeRegistry = new Map<string, FieldTypeConfig>()

export function registerFieldType(type: string, config: FieldTypeConfig): void {
  fieldTypeRegistry.set(type, config)
}

export function getFieldType(type: string): FieldTypeConfig | undefined {
  return fieldTypeRegistry.get(type)
}

export function hasFieldType(type: string): boolean {
  return fieldTypeRegistry.has(type)
}

export function getAllFieldTypes(): string[] {
  return Array.from(fieldTypeRegistry.keys())
}

export function getFormFieldTypes(): string[] {
  return Array.from(fieldTypeRegistry.entries())
    .filter(([, config]) => config.type === 'form' || config.type === 'both')
    .map(([type]) => type)
}

export function getDisplayFieldTypes(): string[] {
  return Array.from(fieldTypeRegistry.entries())
    .filter(([, config]) => config.type === 'display' || config.type === 'both')
    .map(([type]) => type)
}

export function getDefaultValue(type: string): any {
  const config = fieldTypeRegistry.get(type)
  return config?.defaultValue
}

export function getFieldComponent(type: string): Component | null {
  const config = fieldTypeRegistry.get(type)
  return config?.component || null
}

export { fieldTypeRegistry }