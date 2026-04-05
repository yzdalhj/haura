# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 交互演示

<ComponentPlayground
  component="drawer"
  :defaultProps="{}"
>
  <template #default>
    <div>
      <HButton type="primary" @click="drawerVisible = true">打开抽屉</HButton>
      <HDrawer
        v-model="drawerVisible"
        title="抽屉标题"
        size="400px"
      >
        <p>这是抽屉的内容区域。</p>
        <p>支持从四个方向滑出。</p>
      </HDrawer>
    </div>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="drawer"
>
  <template #default>
    <HButton type="primary" @click="drawer2Visible = true">打开抽屉</HButton>
    <HDrawer
      v-model="drawer2Visible"
      title="基础抽屉"
      size="360px"
    >
      <p>这是抽屉的内容</p>
    </HDrawer>
  </template>
</ComponentPlayground>

## 不同方向

<ComponentPlayground
  component="drawer"
>
  <template #default>
    <HButton @click="direction = 'left'; drawer3Visible = true">从左</HButton>
    <HButton @click="direction = 'right'; drawer3Visible = true">从右</HButton>
    <HButton @click="direction = 'top'; drawer3Visible = true">从上</HButton>
    <HButton @click="direction = 'bottom'; drawer3Visible = true">从下</HButton>
    
    <HDrawer
      v-model="drawer3Visible"
      :direction="direction"
      title="方向演示"
      size="360px"
    >
      <p>当前方向: {{ direction }}</p>
    </HDrawer>
  </template>
</ComponentPlayground>

## 带底部

<ComponentPlayground
  component="drawer"
>
  <template #default>
    <HButton type="primary" @click="drawer4Visible = true">带底部抽屉</HButton>
    <HDrawer
      v-model="drawer4Visible"
      title="操作确认"
      size="400px"
      showFooter
    >
      <p>请确认您的操作</p>
      <template #footer>
        <HButton @click="drawer4Visible = false">取消</HButton>
        <HButton type="primary" @click="drawer4Visible = false">确定</HButton>
      </template>
    </HDrawer>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | — |
| direction | 打开方向 | `string` | `right` |
| size | 尺寸 | `string` / `number` | `30%` |
| modal | 显示遮罩 | `boolean` | `true` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| showHeader | 显示头部 | `boolean` | `true` |
| showFooter | 显示底部 | `boolean` | `false` |
| beforeClose | 关闭前回调 | `function` | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉内容 |
| header | 自定义头部 |
| footer | 自定义底部 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| open | 打开时触发 | — |
| close | 关闭时触发 | — |
