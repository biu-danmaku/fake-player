import ProgressBar from '@/widgets/ProgressBar'

import svgPlay from '@/images/play.svg'
import svgPause from '@/images/pause.svg'
import svgFullWindow from '@/images/full-window.svg'
import svgFullWindowCancel from '@/images/full-window-cancel.svg'
import svgFullScreen from '@/images/full-screen.svg'

class Controls {
    constructor({
        // 向 player 传递的事件
        onPlayClick,        // 点击播放按钮
        onFullWindowClick,  // 点击全屏按钮
        onFullScreenClick,  // 点击网页全屏按钮
        onProgressHover,    // 鼠标在悬停在进度条上
        onProgressMove,     // 拖拽进度条
        onProgressChange,   // 改变进度
    }) {
        this.hideTimer = null

        this.container = document.createElement('div')
        this.container.classList.add('fake-player-controls')

        let mask = document.createElement('div')
        mask.classList.add('mask')
        this.container.appendChild(mask)

        this.progressBar = new ProgressBar({
            onHover: (rate) => onProgressHover(rate),
            onMove: (rate) => onProgressMove(rate),
            onChange: (rate) => onProgressChange(rate),
            mountTo: this.container,
        })

        this.buttonPlay = document.createElement('div')
        this.buttonPlay.innerHTML = svgPlay
        this.buttonPlay.classList.add('button', 'play')
        this.buttonPlay.onclick = () => onPlayClick()

        let timeBox = document.createElement('div')
        timeBox.classList.add('time-box')
        this.time = document.createElement('span')
        this.duration = document.createElement('span')
        timeBox.appendChild(this.time)
        timeBox.appendChild(this.duration)

        let buttonFullWindow = document.createElement('div')
        buttonFullWindow.classList.add('button', 'full-window')
        buttonFullWindow.innerHTML = svgFullWindow
        buttonFullWindow.onclick = () => {
            if (onFullWindowClick()) {
                buttonFullWindow.innerHTML = svgFullWindowCancel
            } else {
                buttonFullWindow.innerHTML = svgFullWindow
            }
        }

        let buttonFullScreen = document.createElement('div')
        buttonFullScreen.classList.add('button', 'full-screen')
        buttonFullScreen.innerHTML = svgFullScreen
        buttonFullScreen.onclick = () => onFullScreenClick()

        this.container.appendChild(this.buttonPlay)
        this.container.appendChild(timeBox)
        this.container.appendChild(buttonFullWindow)
        this.container.appendChild(buttonFullScreen)
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
    set playing(value) {
        if (value) {
            this.buttonPlay.innerHTML = svgPause
        } else {
            this.buttonPlay.innerHTML = svgPlay
        }
    }
}

export default Controls
