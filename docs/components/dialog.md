# Dialog 对话框

模态对话框，支持多种交互方式。

## 交互演示

<ComponentPlayground
  component="dialog"
  :defaultProps="{}"
>
  <template #default>
    <div>
      <HButton type="primary" @click="dialogVisible = true">打开对话框</HButton>
      <HDialog
        v-model="dialogVisible"
        title="对话框标题"
        width="400px"
      >
        <p>这是对话框的内容区域。</p>
        <template #footer>
          <HButton @click="dialogVisible = false">取消</HButton>
          <HButton type="primary" @click="dialogVisible = false">确定</HButton>
        </template>
      </HDialog>
    </div>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="dialog"
>
  <template #default>
    <HButton type="primary" @click="dialog2Visible = true">打开对话框</HButton>
    <HDialog
      v-model="dialog2Visible"
      title="提示"
      width="400px"
    >
      <p>这是一段信息</p>
      <template #footer>
        <HButton @click="dialog2Visible = false">取消</HButton>
        <HButton type="primary" @click="dialog2Visible = false">确定</HButton>
      </template>
    </HDialog>
  </template>
</ComponentPlayground>

## 自定义宽度

<ComponentPlayground
  component="dialog"
>
  <template #default>
    <HButton @click="dialog3Visible = true">小尺寸</HButton>
    <HButton @click="dialog4Visible = true">大尺寸</HButton>
    
    <HDialog v-model="dialog3Visible" title="小对话框" width="300px">
      <p>宽度 300px</p>
    </HDialog>
    
    <HDialog v-model="dialog4Visible" title="大对话框" width="600px">
      <p>宽度 600px</p>
    </HDialog>
  </template>
</ComponentPlayground>

## 玻璃效果

<ComponentPlayground
  component="dialog"
>
  <template #default>
    <HButton type="primary" @click="glassDialogVisible = true">玻璃对话框</HButton>
    <HDialog
      v-model="glassDialogVisible"
      title="玻璃效果"
      glass
      width="400px"
    >
      <p>毛玻璃效果的对话框</p>
    </HDialog>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| width | 宽度 | `string` / `number` | `500px` |
| modal | 显示遮罩 | `boolean` | `true` |
| glass | 玻璃效果 | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| draggable | 可拖拽 | `boolean` | `false` |
| center | 内容居中 | `boolean` | `false` |
| beforeClose | 关闭前回调 | `function` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 对话框内容 |
| header | 自定义头部 |
| footer | 自定义底部 |
| title | 自定义标题 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| open | 打开时触发 | — |
| close | 关闭时触发 | — |
