# Card 卡片

通用卡片容器。

## 交互演示

<ComponentPlayground
  component="card"
  :defaultProps="{ title: '卡片标题', bordered: true, hoverable: true }"
  :propConfig="{
    title: {
      type: 'string',
      label: '标题',
      default: '卡片标题'
    },
    bordered: {
      type: 'boolean',
      label: '边框',
      default: true
    },
    hoverable: {
      type: 'boolean',
      label: '悬停效果',
      default: true
    },
    glass: {
      type: 'boolean',
      label: '玻璃效果',
      default: false
    },
    glow: {
      type: 'boolean',
      label: '发光效果',
      default: false
    }
  }"
>
  <template #default="{ props }">
    <HCard v-bind="props" style="width: 300px;">
      <p>卡片内容区域</p>
    </HCard>
  </template>
</ComponentPlayground>

## 基础用法

<ComponentPlayground
  component="card"
>
  <template #default>
    <HCard title="卡片标题" style="width: 300px;">
      <p>卡片内容</p>
    </HCard>
  </template>
</ComponentPlayground>

## 带图片

<ComponentPlayground
  component="card"
>
  <template #default>
    <HCard style="width: 300px;">
      <template #cover>
        <img src="https://picsum.photos/400/200" alt="card image" style="width: 100%;" />
      </template>
      <p>卡片内容</p>
      <template #footer>
        <HButton size="small" type="primary">操作</HButton>
      </template>
    </HCard>
  </template>
</ComponentPlayground>

## 玻璃效果

<ComponentPlayground
  component="card"
>
  <template #default>
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px;">
      <HCard title="玻璃卡片" glass style="width: 300px;">
        <p>毛玻璃效果</p>
      </HCard>
    </div>
  </template>
</ComponentPlayground>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 卡片标题 | `string` | — |
| extra | 标题右侧内容 | `string` | — |
| bordered | 显示边框 | `boolean` | `true` |
| hoverable | 悬停效果 | `boolean` | `true` |
| glass | 玻璃效果 | `boolean` | `false` |
| glow | 发光效果 | `boolean` | `false` |
| padding | 内容区内边距 | `string` / `number` | — |
| size | 尺寸 | `string` | `default` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| header | 自定义头部 |
| footer | 自定义底部 |
| cover | 封面图片 |
