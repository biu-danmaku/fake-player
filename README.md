# FakePlayer
[![devDependencies Status][devDependenciesSvg]][devDependenciesStatus]

### 说明
FakePlayer 是一个播放器 UI，目的是为 Biu 提供一个真实、美观的使用示例。

[查看 DEMO](https://biu-danmaku.github.io/fake-player/demo/)

### 使用

新建一个播放器：
```js
const player = new FakePlayer({
    container: '.player-box',
    duration: 300000,
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
|名称        |类型   |默认值|说明                       |      
|-----------|-------|-----|--------------------------|
|blockScroll|Boolean|false|禁用滚动弹幕                |
|blockTop   |Boolean|false|禁用顶端弹幕                |
|blockBottom|Boolean|false|禁用底部弹幕                |
|blockColor |Boolean|false|禁用彩色弹幕                |
|fontSize   |Number |2    |字体大小, 0 到 4 之间的整数   |
|opacity    |Number |1    |弹幕透明度, 0 到 1 之间的浮点数|
|speed      |Number |1    |弹幕速度, 0 到 1 之间的浮点数 |

### 属性
下列属性必须创建播放器时提供：

|名称      |类型                 |说明     |
|---------|---------------------|--------|
|container|String \| HTMLElement|播放器容器|

下列属性可在创建播放器时提供也可在运行时修改：

|名称       |类型   |说明                                        |
|----------|------|--------------------------------------------|
|duration  |Number|时长(毫秒), 改变该值会重置播放器, 但不会触发任何事件|
|background|String|播放器背景                                    |

### 引用
FakePlayer 的按钮使用了 [哔哩哔哩][bilibili] HTML5 播放器的 SVG。

[bilibili]: https://www.bilibili.com
[devDependenciesSvg]: https://david-dm.org/biu-danmaku/fake-player/dev-status.svg
[devDependenciesStatus]: https://david-dm.org/biu-danmaku/fake-player?type=dev
