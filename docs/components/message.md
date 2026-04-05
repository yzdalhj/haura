# Message 消息提示

用于显示操作反馈的轻量级提示。

## 交互演示

<ComponentPlayground
  component="message"
  :defaultProps="{}"
>
  <template #default>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <HButton @click="$message('这是一条消息')">默认消息</HButton>
      <HButton type="success" @click="$message.success('操作成功')">成功</HButton>
      <HButton type="warning" @click="$message.warning('警告提示')">警告</HButton>
      <HButton type="danger" @click="$message.error('发生错误')">错误</HButton>
      <HButton type="info" @click="$message.info('信息提示')">信息</HButton>
    </div>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="message"
>
  <template #default>
    <HButton @click="$message('这是一条消息提示')">打开消息</HButton>
  </template>
</ComponentPlayground>

## 不同类型

<ComponentPlayground
  component="message"
>
  <template #default>
    <div style="display: flex; gap: 12px;">
      <HButton @click="$message.success('恭喜你，操作成功！')">成功</HButton>
      <HButton @click="$message.warning('请注意，这是一条警告')">警告</HButton>
      <HButton @click="$message.error('抱歉，操作失败')">错误</HButton>
    </div>
  </template>
</ComponentPlayground>

## 可关闭

<ComponentPlayground
  component="message"
>
  <template #default>
    <HButton @click="$message({ message: '点击关闭按钮关闭', showClose: true })">可关闭</HButton>
  </template>
</ComponentPlayground>

## API

### Options

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息内容 | `string` / `VNode` | — |
| type | 消息类型 | `string` | `info` |
| duration | 显示时间(ms) | `number` | `3000` |
| showClose | 显示关闭按钮 | `boolean` | `false` |
| center | 文字居中 | `boolean` | `false` |
| onClose | 关闭回调 | `function` | — |

### 全局方法

| 方法名 | 说明 |
|--------|------|
| `$message(message)` | 默认消息 |
| `$message.success(message)` | 成功消息 |
| `$message.warning(message)` | 警告消息 |
| `$message.error(message)` | 错误消息 |
| `$message.info(message)` | 信息消息 |
| `$message.closeAll()` | 关闭所有消息 |
