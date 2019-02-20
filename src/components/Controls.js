import DanmakuConfig from './DanmakuConfig'

import ProgressBar from '@/widgets/ProgressBar'

import svgPlay             from '@/images/play.svg'
import svgPause            from '@/images/pause.svg'
import svgDanmakuConfig    from '@/images/danmaku-config.svg'
import svgFullWindow       from '@/images/full-window.svg'
import svgFullWindowCancel from '@/images/full-window-cancel.svg'
import svgFullScreen       from '@/images/full-screen.svg'

class Controls {
    constructor({
        buttonClickHandler,
        progressBarEventHandler,
        sliderValueChangeHandler,
    }) {
        this.hideTimer = null

        this.container = document.createElement('div')
        this.container.classList.add('fake-player-controls')

        let mask = document.createElement('div')
        mask.classList.add('mask')
        this.container.appendChild(mask)

        this.progressBar = new ProgressBar({
            eventHandler: progressBarEventHandler.bind(this),
            mountTo:      this.container,
        })

        this.DanmakuConfig = new DanmakuConfig({
            sliderValueChangeHandler: (key, value) => console.log(key, value),
            buttonClickHandler:       buttonClickHandler.bind(this)
        })

        let timeBox = document.createElement('div')
        timeBox.classList.add('time-box')
        this.time = document.createElement('span')
        this.duration = document.createElement('span')
        timeBox.appendChild(this.time)
        timeBox.appendChild(this.duration)
        this.container.appendChild(timeBox)

        this.buttons = {
            'play':           document.createElement('div'),
            'danmaku-config': document.createElement('div'),
            'full-window':    document.createElement('div'),
            'full-screen':    document.createElement('div'),
        }

        this.buttons['play'].innerHTML = svgPlay
        this.buttons['play'].classList.add('button', 'play')
        this.buttons['play'].onclick = () => buttonClickHandler('play')

        this.buttons['danmaku-config'].classList.add('button', 'danmaku-config')
        this.buttons['danmaku-config'].innerHTML = svgDanmakuConfig

        this.buttons['full-window'].classList.add('button', 'full-window')
        this.buttons['full-window'].innerHTML = svgFullWindow
        this.buttons['full-window'].onclick = () => buttonClickHandler('full-window')

        this.buttons['full-screen'].classList.add('button', 'full-screen')
        this.buttons['full-screen'].innerHTML = svgFullScreen
        this.buttons['full-screen'].onclick = () => buttonClickHandler('full-screen')

        for (let key in this.buttons) {
            this.container.appendChild(this.buttons[key])
        }
        this.buttons['danmaku-config'].appendChild(this.DanmakuConfig.container)
    }
    fadeOut() {
        this.show()
        this.hideTimer = setTimeout(() => this.hide(), 2000)
    }
    hide() {
        this.container.classList.add('hide')
        this.display = false
    }
    show() {
        clearTimeout(this.hideTimer)
        this.container.classList.remove('hide')
        this.display = true
    }
    set durationText(value) {
        this.duration.innerText = ' / ' + value
    }
    set timeText(value) {
        this.time.innerText = value
    }
    activeButton(button, active = true) {
        switch(button) {
            case 'play':
                this.buttons['play'].innerHTML = active ? svgPause : svgPlay
                break
            case 'full-window':
                this.buttons['full-window'].innerHTML = active ? svgFullWindowCancel : svgFullWindow
                break
        }
    }
}

export default Controls
