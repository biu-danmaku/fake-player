import Controls from './Controls'
import utils from '@/utils'

class Player {
    constructor(events) {
        this.events = events
        this._duration = 0
        this._time = 0
        this.timer = undefined
        this.fullScreen = false
        this.lastTickAt = 0
        this.config = {
            blockScroll: false,
            blockTop:    false,
            blockBottom: false,
            blockColor:  false,
        }

        this.container = document.createElement('div')
        this.container.classList.add('fake-player-player')

        this.screen = document.createElement('div')
        this.screen.classList.add('screen')
        this.screen.addEventListener('click', () => this.togglePlay())

        this.controls = new Controls({
            buttonClickHandler: buttonClickHandler.bind(this),
            sliderMoveHandler: (slider) => {
                if (this.events.has('configChange')) {
                    this.events.get('configChange').forEach(h => h(slider.id, slider.value))
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
                        if (this.events.has('timeChange')) {
                            this.events.get('timeChange').forEach(h => h(this.time))
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
        this.buttons = { ...this.controls.buttons }
    }
    play() {
        if (this.playing) return
        this.timer = null
        this.lastTickAt = Date.now()
        this.controls.fadeOut()
        this.buttons['play'].active()
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
        if (this.events.has('play')) {
            this.events.get('play').forEach(h => h(this.time))
        }
    }
    pause() {
        if (!this.playing) return
        clearInterval(this.timer)
        this.time += Date.now() - this.lastTickAt
        this.controls.show()
        this.buttons['play'].active(false)
        this.timer = undefined
        if (this.events.has('pause')) {
            this.events.get('pause').forEach(h => h())
        }
    }
    togglePlay() {
        this.playing ? this.pause() : this.play()
    }
    toggleFullWindow() {
        if (this.container.classList.contains('full-window')) {
            this.container.classList.remove('full-window')
            this.buttons.fullWindow.active(false)
        } else {
            this.container.classList.add('full-window')
            this.buttons.fullWindow.active(true)
        }
    }
    applyConfig(key, value) {
        switch (key) {
            case 'opacity':
                this.controls.danmakuConfig.sliders.opacity.value = value
                break
            case 'speed':
                this.controls.danmakuConfig.sliders.speed.value = value
                break
            case 'fontSize':
                this.controls.danmakuConfig.sliders.fontSize.value = value
                break
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
        if (!this.controls.progressBar.dragging) {
            this.controls.progressBar.rate = ms / this.duration
            this.controls.timeText = utils.ms2text(ms)
        }
    }
    get time() { return this._time }
}

export default Player

function buttonClickHandler(button) {
    switch (button.id) {
        case 'play':
            this.togglePlay()
            break
        case 'fullWindow':
            this.toggleFullWindow()
            break
        case 'fullScreen':
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
        case 'blockScroll':
        case 'blockTop':
        case 'blockBottom':
        case 'blockColor':
            this.config[button.id] = ! this.config[button.id]
            button.active(this.config[button.id])
            if (this.events.has('configChange')) {
                this.events.get('configChange').forEach(h => h(button.id, this.config[button.id]))
            }
            break
    }
}
