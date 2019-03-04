# FakePlayer
[![devDependencies Status](https://david-dm.org/biu-danmaku/fake-player/dev-status.svg)](https://david-dm.org/biu-danmaku/fake-player?type=dev)

### 说明
本项目诞生于 Biu 的 demo，原计划使用 div 拼装一个简单的播放器来交互展示 Biu 的功能，没想到越写越复杂。
索性新建一个项目来构建一个完整且美观的播放器 UI，也为以后踩播放器这个深坑做些技术上的铺垫。

**FakePlayer 是一个播放器 UI，而不是真正意义上的播放器。**

[查看 DEMO](https://biu-danmaku.github.io/fake-player/demo/)

### 使用

新建一个播放器：
```js
const player = new FakePlayer({
    // 播放器容器, 可以是 CSS 选择器或 HTMLElement 实例
    container: '.player-box',
    // "视频"时长(毫秒)
    duration: 300,
})
```

### API
- `player.on(eventName, handler)` 监听播放器[事件](#事件)

### 事件
1. `play`，点击播放按钮：  
handler 参数：`time` - `当前播放时间`；

2. `pause`，点击暂停按钮；

3. `timeChange`，拖拽进度条改变播放时间：  
handler 参数：`time` - `当前播放时间`；

4. `configChange`，修改播放器[配置](#配置)：  
handler 参数：`name` - `配置名称`，`value` - `值`；

### 配置
名称|类型|说明
-|-|-
blockScroll|Boolean|禁用滚动弹幕，默认为 false
blockTop|Boolean|禁用顶端弹幕，默认为 false
blockBottom|Boolean|禁用底部弹幕，默认为 false
blockColor|Boolean|禁用彩色弹幕，默认为 false
fontSize|Number|字体大小，0 到 4 之间的整数，默认为 2
opacity|Number|弹幕透明度，0 到 1 之间的浮点数，默认为 1
speed|Number|弹幕速度，0 到 1 之间的浮点数，默认为 1

### 属性
下列属性可在创建播放器时提供也可以在运行时修改：

名称|描述
-|-
duration|"视频"总时长(毫秒), 改变该值会暂停播放并将当前播放时间设置为0, 但不会触发 `onpause` 和 `onchange` 事件
background|播放器背景, 一个 CSS 字符串

### 引用
FakePlayer 的按钮使用了 [bilibili](https://www.bilibili.com) HTML5 播放器的 SVG。
