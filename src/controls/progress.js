class Progress {
  constructor(controls) {
    this.controls = controls

    this.dragging = false

    // container
    this.container = document.createElement('div')
    this.container.classList.add('progress')

    // 已播放进度条
    this.played = document.createElement('div')
    this.played.classList.add('played')
    this.container.appendChild(this.played)

    // 时间提示
    this.time = document.createElement('div')
    this.time.classList.add('time')

    let hoverHandler = (e) => this.moveTip(e)

    let dragHandler = (e) => {
      if (e.button === 0) {
        this.moveProgressByRate(this.moveTip(e))
      }
    }

    this.container.onmousemove = hoverHandler

    this.container.onmousedown = (e) => {
      this.moveProgressByRate(this.moveTip(e))
      document.addEventListener('mousemove', dragHandler)
      this.dragging = true
    }

    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 && this.dragging) {
        let rate = this.moveTip(e)
        this.controls.player.rate = rate
        document.removeEventListener('mousemove', dragHandler)
        this.dragging = false
      }
    })

    this.container.appendChild(this.time)
    controls.container.appendChild(this.container)
  }
  moveProgressByRate(rate) {
    this.played.style['width'] = (rate * 100) + '%'
  }
  moveProgress() {
    this.moveProgressByRate(this.controls.player.time / this.controls.player.duration)
  }
  moveTip(e) {
    let { left, width } = this.container.getBoundingClientRect()
    let rate = getRate(e.clientX - left, width)
    this.time.innerText = parseTime(Math.round(rate * this.controls.player.duration))
    let t = rate * width - this.time.clientWidth / 2
    if (t < 0) {
      t = 0
    } else if (t > width - this.time.clientWidth) {
      t = width - this.time.clientWidth
    }
    this.time.style['transform'] = 'translateX(' + t + 'px)'
    return rate
  }
}

export default Progress

function parseTime (second) {
  let minute = Math.floor(second / 60)
  second = second % 60
  return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
}

function getRate(value, base) {
  if (value < 0) return 0
  else if (value > base) return 1
  return value / base
}
