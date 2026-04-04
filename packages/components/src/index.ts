import { HButton } from './button'
import { HIcon } from './icon'
import { HInput } from './input'
import { HSelect } from './select'
import { HCheckbox } from './checkbox'
import { HRadio } from './radio'
import { HSwitch } from './switch'
import { HCard } from './card'
import { HTag } from './tag'
import { HDrawer } from './drawer'
import { HLoading } from './loading'
import { HRow, HCol } from './grid'
import { HSpace } from './space'
import { HTabs, HTabPane } from './tabs'
import { HDialog, useDialog } from './dialog'

export { HButton } from './button'
export { HIcon } from './icon'
export { HInput } from './input'
export { HSelect } from './select'
export { HCheckbox } from './checkbox'
export { HRadio } from './radio'
export { HSwitch } from './switch'
export { HCard } from './card'
export { HTag } from './tag'
export { HMessage, message } from './message'
export { HDrawer } from './drawer'
export { HLoading, vLoading, service as loadingService } from './loading'
export { HRow, HCol } from './grid'
export { HSpace } from './space'
export { HTabs, HTabPane } from './tabs'
export { HDialog, useDialog } from './dialog'

export type { ButtonProps, ButtonEmits, ButtonType, ButtonSize, NativeType } from './button'
export type { IconProps, IconEmits, IconSize } from './icon'
export type { InputProps, InputEmits, InputSize, InputType } from './input'
export type { SelectProps, SelectEmits, SelectOption, SelectSize } from './select'
export type { MessageOptions, MessageInstance, MessageType } from './message'
export type { DrawerProps, DrawerEmits, DrawerPlacement, DrawerSize, DrawerDirection } from './drawer'
export type { LoadingProps, LoadingEmits, LoadingType, LoadingSize, LoadingInstance } from './loading'
export type { RowProps, RowEmits, ColProps, ColEmits, Breakpoint, Justify, Align } from './grid'
export type { SpaceProps, SpaceEmits, SpaceSize, SpaceDirection, SpaceAlignment } from './space'
export type { TabsProps, TabsEmits, TabPaneProps, TabPaneEmits, TabType, TabPosition, TabSize, TabPaneInstance } from './tabs'
export type { DialogProps, DialogEmits, DialogInstance, DialogOptions, DialogButton, DialogType, DialogSize, DialogAnimation } from './dialog'

export const components = [
  HButton,
  HIcon,
  HInput,
  HSelect,
  HCheckbox,
  HRadio,
  HSwitch,
  HCard,
  HTag,
  HDrawer,
  HLoading,
  HRow,
  HCol,
  HSpace,
  HTabs,
  HTabPane,
  HDialog,
]

import type { App, Plugin } from 'vue'

export interface HauraOptions {
  prefix?: string
  zIndex?: number
  locale?: any
  theme?: string
}

const HauraUI: Plugin = {
  install(app: App, options: HauraOptions = {}) {
    const { prefix = 'H' } = options

    components.forEach((component) => {
      const name = component.name
      if (name) {
        app.component(`${prefix}${name.slice(1)}`, component)
      }
    })
  },
}

export default HauraUI