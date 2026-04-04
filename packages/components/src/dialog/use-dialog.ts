import { createApp, h, ref, reactive, type App, type Component, type Raw } from 'vue'
import DialogComponent from './dialog.vue'
import type {
  DialogProps,
  DialogInstance,
  DialogOptions,
  AlertOptions,
  ConfirmOptions,
  PromptOptions,
  UseDialogReturn,
} from './dialog'
import { dialogPropsDefaults } from './dialog'

let dialogId = 0
const instances = new Map<string, DialogInstance>()
const zStack: number[] = []

const getZIndex = () => {
  const base = 2000
  return base + zStack.length * 100
}

const pushZIndex = (zIndex: number) => {
  zStack.push(zIndex)
}

const popZIndex = (zIndex: number) => {
  const index = zStack.indexOf(zIndex)
  if (index > -1) {
    zStack.splice(index, 1)
  }
}

function createDialog(options: DialogOptions): DialogInstance {
  const id = `dialog_${++dialogId}`
  const container = document.createElement('div')

  const visible = ref(false)
  const isMaximized = ref(false)
  const isMinimized = ref(false)
  const isSticked = ref(false)

  const zIndex = options.zIndex ?? getZIndex()
  pushZIndex(zIndex)

  const props = reactive<DialogProps>({
    ...dialogPropsDefaults,
    ...options,
    modelValue: false,
    zIndex,
  })

  let resolvePromise: ((value: any) => void) | null = null
  let rejectPromise: ((reason: any) => void) | null = null

  const app = createApp({
    render() {
      return h(DialogComponent, {
        ...props,
        modelValue: visible.value,
        'onUpdate:modelValue': (val: boolean) => {
          visible.value = val
          if (!val) {
            handleClose()
          }
        },
        onConfirm: () => {
          if (options.onConfirm) {
            const result = options.onConfirm(instance, () => {
              visible.value = false
            })
            if (result instanceof Promise) {
              props.confirmLoading = true
              result.then(() => {
                props.confirmLoading = false
                if (resolvePromise) {
                  if (options.inputType !== undefined) {
                    resolvePromise(instance.inputValue)
                  } else {
                    resolvePromise(true)
                  }
                }
              }).catch(() => {
                props.confirmLoading = false
              })
            } else {
              visible.value = false
              if (resolvePromise) {
                if (options.inputType !== undefined) {
                  resolvePromise(instance.inputValue)
                } else {
                  resolvePromise(true)
                }
              }
            }
          } else {
            visible.value = false
            if (resolvePromise) {
              if (options.inputType !== undefined) {
                resolvePromise(instance.inputValue)
              } else {
                resolvePromise(true)
              }
            }
          }
        },
        onCancel: () => {
          if (options.onCancel) {
            options.onCancel(instance, () => {
              visible.value = false
            })
          } else {
            visible.value = false
          }
          if (rejectPromise) {
            rejectPromise('cancel')
          }
        },
        onClose: () => {
          if (options.onClose) {
            options.onClose(instance)
          }
          if (rejectPromise) {
            rejectPromise('close')
          }
        },
      })
    },
  })

  const instance = app.mount(container) as any

  if (options.component) {
    instance.setComponent?.(
      options.component as Component,
      options.componentProps,
      options.componentEmits
    )
  }

  document.body.appendChild(container)

  const close = () => {
    visible.value = false
    setTimeout(() => {
      app.unmount()
      if (container.parentNode) {
        container.parentNode.removeChild(container)
      }
      instances.delete(id)
      popZIndex(zIndex)
    }, 300)
  }

  const dialogInstance: DialogInstance = {
    id,
    visible,
    close,
    open: () => {
      visible.value = true
    },
    confirm: () => {
      instance.handleConfirm?.()
    },
    cancel: () => {
      instance.handleCancel?.()
    },
    setConfirmLoading: (loading: boolean) => {
      props.confirmLoading = loading
    },
    setCancelLoading: (loading: boolean) => {
      props.cancelLoading = loading
    },
    setTitle: (title: string) => {
      props.title = title
    },
    setContent: (content: string) => {
      props.content = content
    },
    maximize: () => {
      isMaximized.value = true
    },
    minimize: () => {
      isMinimized.value = true
    },
    restore: () => {
      isMaximized.value = false
      isMinimized.value = false
    },
    stick: () => {
      isSticked.value = true
    },
    unstick: () => {
      isSticked.value = false
    },
    isMaximized,
    isMinimized,
    isSticked,
  }

  instances.set(id, dialogInstance)

  return dialogInstance
}

function handleClose() {}

export function useDialog(options: DialogOptions = {}): UseDialogReturn {
  let dialog: DialogInstance | null = null

  const promise = new Promise<boolean>((resolve, reject) => {
    dialog = createDialog({
      ...options,
      onConfirm: (instance, done) => {
        if (options.onConfirm) {
          const result = options.onConfirm(instance, done)
          if (result instanceof Promise) {
            result.then(resolve)
          }
        } else {
          done()
          resolve(true)
        }
      },
      onCancel: (instance, done) => {
        if (options.onCancel) {
          options.onCancel(instance, done)
        } else {
          done()
        }
        reject('cancel')
      },
      onClose: (instance) => {
        if (options.onClose) {
          options.onClose(instance)
        }
        reject('close')
      },
    })

    if (options.onOpen) {
      options.onOpen(dialog!)
    }

    nextTick(() => {
      dialog!.open()
    })
  })

  return {
    get dialog() {
      return dialog!
    },
    confirm: () => promise.then(() => true).catch(() => false),
    cancel: () => promise.catch(() => false),
    close: () => dialog?.close(),
    open: () => dialog?.open(),
    then: (onFulfilled) => {
      promise.then(onFulfilled as any)
      return useDialog(options)
    },
    catch: (onRejected) => {
      promise.catch(onRejected)
      return useDialog(options)
    },
    finally: (onFinally) => {
      promise.finally(onFinally)
      return useDialog(options)
    },
  }
}

function nextTick(fn: () => void) {
  setTimeout(fn, 0)
}

useDialog.alert = (message: string | AlertOptions['message'], options: AlertOptions = {}) => {
  const opts: DialogOptions = typeof message === 'string'
    ? { ...options, content: message, title: options.title ?? '提示', showCancel: false }
    : { ...options, content: message, title: options.title ?? '提示', showCancel: false }

  return new Promise<boolean>((resolve) => {
    const dialog = createDialog({
      ...opts,
      onConfirm: () => {
        resolve(true)
      },
      onClose: () => {
        resolve(true)
      },
    })
    nextTick(() => dialog.open())
  })
}

useDialog.confirm = (message: string | ConfirmOptions['message'], options: ConfirmOptions = {}) => {
  const opts: DialogOptions = typeof message === 'string'
    ? { ...options, content: message, title: options.title ?? '确认' }
    : { ...options, content: message, title: options.title ?? '确认' }

  return new Promise<boolean>((resolve) => {
    const dialog = createDialog({
      ...opts,
      onConfirm: () => {
        resolve(true)
      },
      onCancel: () => {
        resolve(false)
      },
      onClose: () => {
        resolve(false)
      },
    })
    nextTick(() => dialog.open())
  })
}

useDialog.prompt = (message: string | PromptOptions['message'], options: PromptOptions = {}) => {
  const opts: DialogOptions = typeof message === 'string'
    ? { ...options, content: message, title: options.title ?? '请输入', inputType: options.inputType ?? 'text' }
    : { ...options, content: message, title: options.title ?? '请输入', inputType: options.inputType ?? 'text' }

  return new Promise<string | number | null>((resolve) => {
    const dialog = createDialog({
      ...opts,
      onConfirm: (instance) => {
        resolve(instance.inputValue)
      },
      onCancel: () => {
        resolve(null)
      },
      onClose: () => {
        resolve(null)
      },
    })
    nextTick(() => dialog.open())
  })
}

useDialog.closeAll = () => {
  instances.forEach((instance) => {
    instance.close()
  })
  instances.clear()
  zStack.length = 0
}

export { useDialog }