class ProgressBar {
    constructor({ eventHandler }) {
        this.container = document.createElement('div')
        this.container.classList.add('fake-player-progress-bar')

        this.dragging = false

        let wrap = document.createElement('div')
        wrap.classList.add('wrap')

        this.played = document.createElement('div')
        this.played.classList.add('played')
        wrap.appendChild(this.played)

        this.time = document.createElement('div')
        this.time.classList.add('time-tip')
        this.container.appendChild(this.time)

        this.container.appendChild(wrap)

        let hoverHandler = (e) => eventHandler('hover', this.attachTime(e))
        let dragHandler = (e) => {
            let rate = this.attachTime(e)
            this.rate = rate
            eventHandler('move', rate)
        }
        let upHandler = (e) => {
            if (e.button === 0) {
                this.dragging = false
                document.removeEventListener('mousemove', dragHandler)
                document.removeEventListener('mouseup', upHandler)
                this.container.addEventListener('mousemove', hoverHandler)
                this.container.addEventListener('mousemove', hoverHandler)
                eventHandler('change', this.attachTime(e))
            }
        }
        this.container.addEventListener('mousemove', hoverHandler)
        this.container.onmousedown = (e) => {
            if (e.button === 0) {
                this.dragging = true
                this.container.removeEventListener('mousemove', hoverHandler)
                document.addEventListener('mousemove', dragHandler)
                document.addEventListener('mouseup', upHandler)
                let rate = this.attachTime(e)
                this.rate = rate
                eventHandler('move', rate)
            }
        }

        this.timeText = '00:00'
    }
    attachTime(e) {
        let { left, width } = this.container.getBoundingClientRect()
        let rate = (e.clientX - left) / width
        if (rate < 0) rate = 0
        else if (rate > 1) rate = 1
        let temp = rate * width - this.time.clientWidth / 2
        if (temp < 0) {
            temp = 0
        } else if (temp > width - this.time.clientWidth) {
            temp = width - this.time.clientWidth
        }
        this.time.style['transform'] = 'translateX(' + temp + 'px)'
        return rate
    }
    set rate(rate) {
        if (rate < 0) rate = 0
        else if (rate > 1) rate = 1
        this.played.style['width'] = (rate * 100) + '%'
    }
    set timeText(text) {
        this.time.innerText = text
    }
}

export default ProgressBar
