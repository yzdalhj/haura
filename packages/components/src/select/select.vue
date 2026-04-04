<template>
  <div
    ref="selectRef"
    :class="[
      'h-select',
      `h-select--${size}`,
      {
        'is-disabled': disabled,
        'is-multiple': multiple,
        'is-focus': visible,
        'has-hover-indicator': hoverIndicator,
      },
    ]"
    @click="toggleMenu"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 选择器输入框 -->
    <div class="h-select__wrapper">
      <!-- 多选标签 -->
      <div v-if="multiple && selected.length > 0" class="h-select__tags">
        <span
          v-for="(item, index) in collapseTags ? selected.slice(0, 1) : selected"
          :key="index"
          class="h-select__tag"
        >
          {{ item.label }}
          <i class="h-select__tag-close" @click.stop="handleRemove(item)">×</i>
        </span>
        <span v-if="collapseTags && selected.length > 1" class="h-select__tag">
          +{{ selected.length - 1 }}
        </span>
      </div>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        :readonly="!filterable"
        :disabled="disabled"
        :placeholder="currentPlaceholder"
        class="h-select__input"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down.prevent="handleNavigate('next')"
        @keydown.up.prevent="handleNavigate('prev')"
        @keydown.enter.prevent="handleSelect"
        @keydown.esc.prevent="handleClose"
      />

      <!-- 图标区域 -->
      <span class="h-select__suffix">
        <!-- 清空按钮 -->
        <i
          v-if="showClear"
          class="h-select__clear"
          @click.stop="handleClear"
        >
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
          </svg>
        </i>
        <!-- 下拉箭头 -->
        <i
          v-else
          class="h-select__arrow"
          :class="{ 'is-reverse': visible }"
        >
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path fill="currentColor" d="M7 10l5 5 5-5z"/>
          </svg>
        </i>
      </span>
    </div>

    <!-- 下拉菜单 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition name="h-select-dropdown">
        <div
          v-show="visible"
          ref="dropdownRef"
          :class="[
            'h-select__dropdown',
            popperClass,
            { 'is-glass': glassDropdown }
          ]"
          :style="dropdownStyle"
        >
          <!-- 悬停指示器 -->
          <div
            v-if="hoverIndicator"
            ref="indicatorRef"
            class="h-select__indicator"
          />

          <!-- 选项列表 -->
          <ul class="h-select__list">
            <li
              v-for="(option, index) in filteredOptions"
              :key="index"
              :class="[
                'h-select__option',
                {
                  'is-selected': isSelected(option),
                  'is-disabled': option.disabled,
                  'is-hover': hoverIndex === index,
                },
              ]"
              @mouseenter="handleOptionHover(index)"
              @click="handleOptionClick(option)"
            >
              <span class="h-select__option-label">{{ option.label }}</span>
              <span v-if="isSelected(option)" class="h-select__check">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </span>
            </li>
          </ul>

          <!-- 空状态 -->
          <div v-if="filteredOptions.length === 0" class="h-select__empty">
            {{ noDataText }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { selectProps, selectEmits } from './select'
import type { SelectOption } from './select'
import { Teleport, Transition } from 'vue'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

// 状态
const visible = ref(false)
const inputValue = ref('')
const hoverIndex = ref(-1)
const selected = ref<SelectOption[]>([])
const selectRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()
const indicatorRef = ref<HTMLElement>()

// 选项列表（示例，实际应从 slots 或 props 获取）
const options = ref<SelectOption[]>([
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3', disabled: true },
  { label: '选项 4', value: '4' },
])

// 过滤后的选项
const filteredOptions = computed(() => {
  if (!props.filterable || !inputValue.value) {
    return options.value
  }
  return options.value.filter(opt => 
    opt.label.toLowerCase().includes(inputValue.value.toLowerCase())
  )
})

// 当前占位符
const currentPlaceholder = computed(() => {
  if (props.multiple && selected.value.length > 0) {
    return ''
  }
  return props.placeholder
})

// 是否显示清空按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && selected.value.length > 0
})

// 下拉菜单样式
const dropdownStyle = computed(() => {
  if (!selectRef.value) return {}
  const rect = selectRef.value.getBoundingClientRect()
  return {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: props.fitInputWidth ? `${rect.width}px` : 'auto',
    minWidth: `${rect.width}px`,
    zIndex: 2000,
  }
})

// 是否选中
const isSelected = (option: SelectOption) => {
  return selected.value.some(item => item.value === option.value)
}

// 切换菜单
const toggleMenu = () => {
  if (props.disabled) return
  visible.value = !visible.value
  if (visible.value) {
    emit('visibleChange', true)
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 关闭菜单
const handleClose = () => {
  visible.value = false
  emit('visibleChange', false)
}

// 处理聚焦
const handleFocus = (evt: FocusEvent) => {
  emit('focus', evt)
}

// 处理失焦
const handleBlur = (evt: FocusEvent) => {
  // 延迟关闭，以便点击选项
  setTimeout(() => {
    if (!dropdownRef.value?.contains(document.activeElement)) {
      handleClose()
    }
  }, 200)
  emit('blur', evt)
}

// 处理选项悬停
const handleOptionHover = (index: number) => {
  hoverIndex.value = index
  
  // 更新悬停指示器位置
  if (props.hoverIndicator && indicatorRef.value && dropdownRef.value) {
    const optionEl = dropdownRef.value.querySelectorAll('.h-select__option')[index] as HTMLElement
    if (optionEl) {
      const dropdownRect = dropdownRef.value.getBoundingClientRect()
      const optionRect = optionEl.getBoundingClientRect()
      indicatorRef.value.style.transform = `translateY(${optionRect.top - dropdownRect.top}px)`
      indicatorRef.value.style.height = `${optionRect.height}px`
      indicatorRef.value.style.opacity = '1'
    }
  }
}

// 处理选项点击
const handleOptionClick = (option: SelectOption) => {
  if (option.disabled) return

  if (props.multiple) {
    const index = selected.value.findIndex(item => item.value === option.value)
    if (index > -1) {
      selected.value.splice(index, 1)
      emit('removeTag', option.value)
    } else {
      if (props.multipleLimit > 0 && selected.value.length >= props.multipleLimit) {
        return
      }
      selected.value.push(option)
    }
    inputValue.value = ''
  } else {
    selected.value = [option]
    inputValue.value = option.label
    handleClose()
  }

  const value = props.multiple ? selected.value.map(item => item.value) : selected.value[0]?.value
  emit('update:modelValue', value)
  emit('change', value)
}

// 处理键盘导航
const handleNavigate = (direction: 'next' | 'prev') => {
  if (!visible.value) {
    visible.value = true
    return
  }
  
  const maxIndex = filteredOptions.value.length - 1
  if (direction === 'next') {
    hoverIndex.value = hoverIndex.value < maxIndex ? hoverIndex.value + 1 : 0
  } else {
    hoverIndex.value = hoverIndex.value > 0 ? hoverIndex.value - 1 : maxIndex
  }
  handleOptionHover(hoverIndex.value)
}

// 处理选择
const handleSelect = () => {
  const option = filteredOptions.value[hoverIndex.value]
  if (option && !option.disabled) {
    handleOptionClick(option)
  }
}

// 处理移除标签
const handleRemove = (item: SelectOption) => {
  const index = selected.value.findIndex(s => s.value === item.value)
  if (index > -1) {
    selected.value.splice(index, 1)
    emit('removeTag', item.value)
    const value = props.multiple ? selected.value.map(s => s.value) : undefined
    emit('update:modelValue', value)
    emit('change', value)
  }
}

// 处理清空
const handleClear = () => {
  selected.value = []
  inputValue.value = ''
  emit('update:modelValue', props.multiple ? [] : undefined)
  emit('change', props.multiple ? [] : undefined)
  emit('clear')
}

// 处理鼠标进入/离开
const handleMouseEnter = () => {}
const handleMouseLeave = () => {}

// 点击外部关闭
const handleClickOutside = (evt: MouseEvent) => {
  if (visible.value && selectRef.value && !selectRef.value.contains(evt.target as Node)) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.h-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

.h-select__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--aura-border-default);
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-select__wrapper:hover {
  border-color: var(--aura-border-hover);
}

.h-select.is-focus .h-select__wrapper {
  border-color: var(--aura-color-primary-500);
  box-shadow: 0 0 0 3px var(--aura-glow-primary);
}

.h-select--large .h-select__wrapper {
  min-height: 40px;
}

.h-select--small .h-select__wrapper {
  min-height: 24px;
}

.h-select.is-disabled .h-select__wrapper {
  background-color: var(--aura-neutral-100);
  cursor: not-allowed;
}

/* 标签 */
.h-select__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-right: 8px;
}

.h-select__tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background-color: var(--aura-color-primary-50);
  color: var(--aura-color-primary-600);
  border-radius: 4px;
  font-size: 12px;
}

.h-select__tag-close {
  margin-left: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.h-select__tag-close:hover {
  opacity: 1;
}

/* 输入框 */
.h-select__input {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  color: var(--aura-text-primary);
  cursor: pointer;
}

.h-select__input::placeholder {
  color: var(--aura-text-tertiary);
}

/* 后缀图标 */
.h-select__suffix {
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: var(--aura-text-tertiary);
}

.h-select__arrow {
  transition: transform 0.3s;
}

.h-select__arrow.is-reverse {
  transform: rotate(180deg);
}

.h-select__clear {
  cursor: pointer;
  transition: color 0.2s;
}

.h-select__clear:hover {
  color: var(--aura-color-danger-500);
}

/* 下拉菜单 */
.h-select__dropdown {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
}

.h-select__dropdown.is-glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

/* 悬停指示器 */
.h-select__indicator {
  position: absolute;
  left: 4px;
  right: 4px;
  background-color: var(--aura-neutral-100);
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

/* 选项列表 */
.h-select__list {
  list-style: none;
  margin: 0;
  padding: 4px;
  max-height: 274px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.h-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.h-select__option:hover,
.h-select__option.is-hover {
  background-color: transparent;
}

.h-select__option.is-selected {
  color: var(--aura-color-primary-500);
  font-weight: 500;
}

.h-select__option.is-disabled {
  color: var(--aura-text-disabled);
  cursor: not-allowed;
}

.h-select__option-label {
  flex: 1;
}

.h-select__check {
  display: flex;
  align-items: center;
  color: var(--aura-color-primary-500);
}

/* 空状态 */
.h-select__empty {
  padding: 20px;
  text-align: center;
  color: var(--aura-text-tertiary);
}

/* 下拉动画 */
.h-select-dropdown-enter-active,
.h-select-dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.h-select-dropdown-enter-from,
.h-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>