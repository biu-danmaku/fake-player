import Controls from './controls'
import * as utils from '@/utils'

class Player {
  constructor(fp) {
    this.fp = fp
    this._duration = 0
    this._time = 0
    this.timer = undefined
    this.fullScreen = false
    this.lastTickAt = 0

    this.container = document.createElement('div')
    this.container.classList.add('player')

    this.screen = document.createElement('div')
    this.screen.classList.add('screen')
    this.screen.addEventListener('click', () => this.toggle())

    this.controls = new Controls()
    this.controls.onPlayClick = () => this.toggle()
    this.controls.onFullWinfowClick = () => {
      if (this.container.classList.contains('full-window')) {
        this.container.classList.remove('full-window')
      } else {
        this.container.classList.add('full-window')
      }
    }
    this.controls.onFullScreenClick = () => {
      if (this.fullScreen) {
        document.exitFullscreen().catch(() => {}).finally(() => this.fullScreen = false)
      } else {
        this.container.requestFullscreen().then(() => this.fullScreen = true)
      }
    }
    this.controls.onProgressHover = (rate) => {
      if (!this.controls.progress.dragging) {
        this.controls.progress.timeText = utils.ms2text(rate * this.duration)
      }
    }
    this.controls.onProgressActive = (rate) => {
      this.controls.timeText = utils.ms2text(rate * this.duration)
    }
    this.controls.onProgressChange = (rate) => {
      this.time = rate * this.duration
      this.lastTickAt = Date.now()
      if (this.fp.onchange) this.fp.onchange(this.time)
    }

    this.container.onmousemove = () => {
      if (this.playing) {
        this.controls.fadeOut()
      }
    }
    this.container.onmouseleave = () => {
      if (this.playing) {
        this.controls.hide()
      }
    }

    this.container.appendChild(this.screen)
    this.container.appendChild(this.controls.container)

    this.time = 0
  }
  play() {
    if (this.playing) return
    this.timer = null
    this.lastTickAt = Date.now()
    this.controls.fadeOut()
    this.container.classList.add('playing')
    if (this.time >= this.duration) {
      this.time = 0
    }
    this.timer = setInterval(() => {
      let now = Date.now()
      this.time += now - this.lastTickAt
      if (this.time >= this.duration) {
        this.pause()
      }
      this.lastTickAt = now
    }, 100)
    if (this.fp.onplay) this.fp.onplay(this.time)
  }
  pause() {
    if ( ! this.playing) return
    clearInterval(this.timer)
    this.time += Date.now() - this.lastTickAt
    this.controls.clearFade()
    this.controls.show()
    this.container.classList.remove('playing')
    this.timer = undefined
    if (this.fp.onpause) this.fp.onpause()
  }
  toggle() {
    if (this.playing) {
      this.pause()
    } else {
      this.play()
    }
  }
  get playing() {
    return this.timer !== undefined
  }
  set duration(ms) {
    this._duration = ms < 0 ? 0 : ms
    this.controls.durationText = utils.ms2text(ms)
    this.pause()
    this.time = 0
  }
  get duration() { return this._duration }
  set time(ms) {
    if (ms > this.duration) {
      ms = this.duration
    } else if (ms < 0) {
      ms = 0
    }
    this._time = ms
    if (!this.controls.progress.dragging) {
      this.controls.progress.rate = ms / this.duration
      this.controls.timeText = utils.ms2text(ms)
    }
  }
  get time() { return this._time }
}

export default Player
