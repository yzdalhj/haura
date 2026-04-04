# 动效系统

Haura UI 内置了多种动效，让交互更加流畅。

## 按钮动效

Button 组件支持多种动效类型：

| 动效 | 说明 |
|------|------|
| `ripple` | 涟漪效果（默认） |
| `glow` | 光效效果 |
| `glass` | 玻璃效果 |
| `gradient` | 渐变效果 |
| `none` | 无效果 |

```vue
<HButton type="primary" effect="ripple">涟漪效果</HButton>
<HButton type="primary" effect="glow">光效效果</HButton>
<HButton type="primary" effect="glass">玻璃效果</HButton>
<HButton type="primary" effect="gradient">渐变效果</HButton>
```

## 过渡动画

Haura UI 提供了多种过渡组件：

- `HFadeTransition` - 淡入淡出
- `HSlideTransition` - 滑动
- `HScaleTransition` - 缩放
- `HCollapseTransition` - 折叠

## 缓动曲线

Haura UI 使用自定义缓动曲线，让动效更加自然：

```css
--aura-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--aura-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```