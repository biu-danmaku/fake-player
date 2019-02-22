import DanmakuConfig from './DanmakuConfig'

import ProgressBar from '@/widgets/ProgressBar'

import iPlay             from '@/images/play.svg'
import iPause            from '@/images/pause.svg'
import iDanmakuConfig    from '@/images/danmaku-config.svg'
import iFullWindow       from '@/images/full-window.svg'
import iFullWindowActive from '@/images/full-window-active.svg'
import iFullScreen       from '@/images/full-screen.svg'

class Controls {
    constructor({
        buttonClickHandler,
        progressBarEventHandler,
        sliderValueChangeHandler,
    }) {
        this.hideTimer = null
        this.container = undefined
        this.time = undefined
        this.duration = undefined

        this.progressBar = new ProgressBar({
            eventHandler: progressBarEventHandler,
        })

        this.danmakuConfig = new DanmakuConfig({
            sliderValueChangeHandler: (key, value) => console.log(key, value),
            buttonClickHandler,
        })

        this.buttons = {
            'play': {
                image: [ iPlay, iPause ]
            },
            'danmaku-config': {
                image: [ iDanmakuConfig ]
            },
            'full-window': {
                image: [ iFullWindow, iFullWindowActive ]
            },
            'full-screen': {
                image: iFullScreen
            },
        }

        render.call(this, buttonClickHandler)
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
    activeButton(key, active = true) {
        if (this.buttons[key]) {
            let button = this.buttons[key]
            if (button.image instanceof Array && button.image.length > 1) {
                button.element.innerHTML = active ? button.image[1] : button.image[0]
            }
        } else {
            this.danmakuConfig.activeButton(key, active)
        }
    }
}

export default Controls

function render(buttonClickHandler) {
    this.container = document.createElement('div')
    this.container.classList.add('fake-player-controls')
    
    let mask = document.createElement('div')
    mask.classList.add('mask')
    this.container.appendChild(mask)

    this.container.appendChild(this.progressBar.container)

    let timeBox = document.createElement('div')
    timeBox.classList.add('time-box')
    this.time = document.createElement('span')
    this.duration = document.createElement('span')
    timeBox.appendChild(this.time)
    timeBox.appendChild(this.duration)
    this.container.appendChild(timeBox)

    renderButtons.call(this, buttonClickHandler)
    this.buttons['danmaku-config'].element.appendChild(this.danmakuConfig.container)
}

function renderButtons(clickHandler) {
    Object.entries(this.buttons).forEach(([ key, button ]) => {
        button.element = document.createElement('div')
        if (button.image instanceof Array) {
            button.element.innerHTML = button.image[0]
        } else {
            button.element.innerHTML = button.image
        }
        button.element.classList.add('button', key)
        button.element.onclick = () => clickHandler(key)
        this.container.appendChild(button.element)
    })
}