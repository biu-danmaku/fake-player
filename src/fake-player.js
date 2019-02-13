import Controls from './controls'

class FakePlayer {
  constructor(args) {
    this.duration = args.duration
    this._time = 0
    this._fullScreen = false
    this.timer = null

    this.el = document.querySelector(args.el)
    this.el.classList.add('fake-player')

    this.container = document.createElement('div')
    this.container.classList.add('player')
    this.el.appendChild(this.container)

    this.screen = document.createElement('div')
    this.screen.classList.add('screen')
    this.screen.addEventListener('click', () => this.togglePlay())
    this.container.appendChild(this.screen)

    this.controls = new Controls(this)

    this.container.onmousemove = () => {
      if (this.playing) {
        this.controls.fade()
      }
    }
    this.container.onmouseleave = () => {
      if (this.playing) {
        this.controls.hide()
      }
    }
  }
  play() {
    if (this.playing) return
    this.controls.fade()
    this.controls.btnPlay.classList.add('playing')
    if (this.time >= this.duration) {
      this.time = 0
    }
    this.timer = setInterval(() => {
      this.time += 1
      if (this.time >= this.duration) {
        this.pause()
      }
    }, 1000)
  }
  pause() {
    if ( ! this.playing) return
    this.controls.clearFade()
    this.controls.show()
    this.controls.btnPlay.classList.remove('playing')
    clearInterval(this.timer)
    this.timer = null
  }
  togglePlay() { 
    this.playing ? this.pause() : this.play() 
  }
  get time() { 
    return this._time 
  }
  set time(value) {
    if (value < 0) value = 0
    else if (value > this.duration) value = duration
    this._time = value
    this.controls.progress.moveProgress()
  }
  set rate(value) { 
    this.time = Math.round(this.duration * value) 
  }
  get fullWindow() {
    return this.container.classList.contains('full-window')
  }
  set fullWindow(value) {
    if (value) {
      this.container.classList.add('full-window')
      this.controls.btnFullWindow.classList.add('active')
    } else {
      this.container.classList.remove('full-window')
      this.controls.btnFullWindow.classList.remove('active')
    }
  }
  get fullScreen() {
    return this._fullScreen
  }
  set fullScreen(value) {
    if (value) {
      this.container.requestFullscreen().then(() => this._fullScreen = true)
    } else {
      document.exitFullscreen()
        .catch((err) => {})  // 忽略错误
        .finally(() => this._fullScreen = false)
    }
  }
  get playing() {
    return this.timer !== null
  }
}

export default FakePlayer
