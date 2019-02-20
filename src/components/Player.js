import Controls from './Controls'
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
    this.container.classList.add('fake-player-player')

    this.screen = document.createElement('div')
    this.screen.classList.add('screen')
    this.screen.addEventListener('click', () => this.togglePlay())

    this.controls = new Controls({
      buttonClickHandler: (button) => {
        switch (button) {
          case 'play':
            this.togglePlay()
            break
          case 'full-window':
            this.toggleFullWindow()
            break
          case 'full-screen':
            if (this.fullScreen) {
              if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
              } else {
                document.exitFullscreen()
              }
              this.fullScreen = false
            } else {
              if (this.container.webkitRequestFullscreen) {
                this.container.webkitRequestFullscreen()
              } else {
                this.container.requestFullscreen()
              }
              this.fullScreen = true
            }
            break
        }
      },
      progressBarEventHandler: (event, rate) => {
        switch (event) {
          case 'hover':
            this.controls.progressBar.timeText = utils.ms2text(rate * this.duration)
            break
          case 'move':
            this.controls.timeText = this.controls.progressBar.timeText = utils.ms2text(rate * this.duration)
            break
          case 'change':
            this.time = rate * this.duration
            this.lastTickAt = Date.now()
            if (this.fp.onchange) {
              this.fp.onchange(this.time)
            }
            break
        }
      },
    })
    
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
    this.controls.activeButton('play')
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
    this.controls.show()
    this.controls.activeButton('play', false)
    this.timer = undefined
    if (this.fp.onpause) this.fp.onpause()
  }
  togglePlay() {
    this.playing ? this.pause() : this.play()
  }
  toggleFullWindow() {
    if (this.container.classList.contains('full-window')) {
      this.container.classList.remove('full-window')
      this.controls.activeButton('full-window', false)
    } else {
      this.container.classList.add('full-window')
      this.controls.activeButton('full-window')
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
    if ( ! this.controls.progressBar.dragging) {
      this.controls.progressBar.rate = ms / this.duration
      this.controls.timeText = utils.ms2text(ms)
    }
  }
  get time() { return this._time }
}

export default Player
