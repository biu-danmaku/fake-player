class Progress {
  constructor() {
    this.dragging = false

    this.onHover = undefined
    this.onActive = undefined
    this.onChange = undefined

    // container
    this.container = document.createElement('div')
    this.container.classList.add('progress')

    // 已播放进度条
    this.played = document.createElement('div')
    this.played.classList.add('played')

    // 时间提示
    this.time = document.createElement('div')
    this.time.classList.add('time')

    let hoverHandler = (e) => {
      this.onHover(this.attachTime(e))
    }

    let dragHandler = (e) => {
      if (e.button === 0) {
        let rate = this.attachTime(e)
        this.rate = rate
        this.onActive(rate)
      }
    }

    this.container.onmousemove = hoverHandler

    this.container.onmousedown = (e) => {
      document.addEventListener('mousemove', dragHandler)
      let rate = this.attachTime(e)
      this.rate = rate
      this.onActive(rate)
      this.dragging = true
    }

    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 && this.dragging) {
        document.removeEventListener('mousemove', dragHandler)
        this.onChange(this.attachTime(e))
        this.dragging = false
      }
    })

    this.container.appendChild(this.played)
    this.container.appendChild(this.time)
  }
  set rate(value) {
    this.played.style['width'] = (value * 100) + '%'
  }
  attachTime(e) {
    let { left, width } = this.container.getBoundingClientRect()
    let rate = (e.clientX - left) / width
    if (rate < 0) {
      rate = 0
    } else if (rate > 1) {
      rate = 1
    }
    let t = rate * width - this.time.clientWidth / 2
    if (t < 0) {
      t = 0
    } else if (t > width - this.time.clientWidth) {
      t = width - this.time.clientWidth
    }
    this.time.style['transform'] = 'translateX(' + t + 'px)'
    return rate
  }
  set timeText(value) {
    this.time.innerText = value
  }
}

export default Progress
