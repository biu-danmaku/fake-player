# FakePlayer

### 说明
本项目诞生于 Biu 的 demo，原计划使用 div 拼装一个简单的播放器来交互展示 Biu 的功能，没想到越写越复杂。
索性新建一个项目来构建一个完整且美观的播放器 UI，也为以后踩播放器这个深坑做些技术上的铺垫。

**FakePlayer 是一个播放器 UI，而不是真正意义上的播放器**

### 使用

新建一个播放器
```js
const player = new FakePlayer({
  // 创建播放器时必须提供容器
  // 可以是 CSS 选择器或 HTMLElement 实例
  container: '.player-box',
  // "视频"时长, 毫秒
  duration: 300,
})
```

FakePlayer 未提供任何 API，而是提供了以下几个事件
```js
player.onplay = function (time) {
  // 点击播放按钮
  // time 为当前播放时间
}
player.onpause = function () {
  // 点击暂停按钮
}
player.onchange = function (time) {
  // 拖拽进度条改变播放时间
  // time 为当前播放时间
}
```

### 属性
下列属性可在创建播放器时提供也可以在运行时修改

名称|描述
-|-
duration|“视频”总时长(毫秒)，改变该值会暂停播放并将当前播放时间设置为0，但不会触发 `onpause` 和 `onchange` 事件
background|播放器背景，一个 CSS 字符串

### 引用
FakePlayer 的按钮使用了 [bilibili](https://www.bilibili.com) HTML5 播放器的 SVG
