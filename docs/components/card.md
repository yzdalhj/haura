# Card 卡片

通用卡片容器。

## 基础用法

:::demo
<template>
  <div class="demo-block">
    <HCard title="卡片标题">
      <p>卡片内容</p>
    </HCard>
  </div>
</template>
:::

## 带图片

:::demo
<template>
  <div class="demo-block">
    <HCard>
      <img src="https://picsum.photos/400/200" alt="card image" style="width: 100%;" />
      <template #footer>
        <HButton size="small">操作</HButton>
      </template>
    </HCard>
  </div>
</template>
:::

## 悬停效果

使用 `hoverable` 属性显示悬停效果。

:::demo
<template>
  <div class="demo-block">
    <HCard title="悬停卡片" hoverable>
      <p>鼠标悬停查看效果</p>
    </HCard>
  </div>
</template>
:::

## 玻璃效果

使用 `glass` 属性显示玻璃效果。

:::demo
<template>
  <div class="demo-block" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px;">
    <HCard title="玻璃卡片" glass>
      <p style="color: #333;">毛玻璃效果</p>
    </HCard>
  </div>
</template>
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 卡片标题 | `string` | — |
| header | 是否显示头部 | `boolean` | `true` |
| shadow | 阴影时机 | `string` | `always` |
| hoverable | 悬停效果 | `boolean` | `false` |
| glass | 玻璃效果 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| header | 自定义头部 |
| footer | 自定义底部 |
| extra | 头部额外内容 |