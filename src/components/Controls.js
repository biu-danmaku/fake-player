import utils from '@/utils'
import DanmakuConfig from './DanmakuConfig'

import ProgressBar from '@/widgets/ProgressBar'

import iPlay             from '@/images/play.svg'
import iPause            from '@/images/pause.svg'
import iDanmakuConfig    from '@/images/danmaku-config.svg'
import iFullWindow       from '@/images/full-window.svg'
import iFullWindowActive from '@/images/full-window-active.svg'
import iFullScreen       from '@/images/full-screen.svg'

class Controls {
    constructor({ buttonClickHandler, progressBarEventHandler, sliderMoveHandler }) {
        this.hideTimer = null
        this.container = undefined
        this.time      = undefined
        this.duration  = undefined

        this.progressBar = new ProgressBar({
            eventHandler: progressBarEventHandler,
        })

        this.danmakuConfig = new DanmakuConfig({
            sliderMoveHandler,
            buttonClickHandler,
        })

        this.buttons = {
            play: {
                image: [ iPlay, iPause ]
            },
            danmakuConfig: {
                image:   iDanmakuConfig,
                noEvent: true
            },
            fullWindow: {
                image: [ iFullWindow, iFullWindowActive ]
            },
            fullScreen: {
                image: iFullScreen
            },
        }

        renderContainer.call(this)
        renderButtons.call(this, buttonClickHandler)
        Object.assign(this.buttons, this.danmakuConfig.buttons)
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
}

export default Controls

function renderContainer() {
    this.container = utils.div('fake-player-controls')
    
    let mask = utils.div('mask')
    this.container.appendChild(mask)

    this.container.appendChild(this.progressBar.container)

    let timeBox = utils.div('time-box')
    this.time = utils.span()
    this.duration = utils.span()
    timeBox.appendChild(this.time)
    timeBox.appendChild(this.duration)
    this.container.appendChild(timeBox)
}

function renderButtons(buttonClickHandler) {
    Object.entries(this.buttons).forEach(([ key, button ]) => {
        button.id = key
        button.element = utils.div('button', utils.camel2hyphen(key))
        if (button.image instanceof Array) {
            button.element.innerHTML = button.image[0]
            button.active = function (active = true) {
                this.element.innerHTML = active ? this.image[1] : this.image[0]
            }
        } else {
            button.element.innerHTML = button.image
        }
        if ( ! button.noEvent) {
            button.element.onclick = () => buttonClickHandler(button)
        }
        this.container.appendChild(button.element)
    })
    this.buttons.danmakuConfig.element.appendChild(this.danmakuConfig.container)
}
