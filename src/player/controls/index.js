import Progress from './progress'

class Controls {
  constructor() {
    this.display = true
    this.hideTimer = null
    this.hideAt = 0
    this.onPlayClick = undefined
    this.onFullWinfowClick = undefined
    this.onFullScreenClick = undefined
    this.onProgressHover = undefined
    this.onProgressActive = undefined
    this.onProgressChange = undefined

    this.container = document.createElement('div')
    this.container.classList.add('controls')

    let mask = document.createElement('div')
    mask.classList.add('mask')

    this.progress = new Progress()
    this.progress.onHover = (rate) => this.onProgressHover(rate)
    this.progress.onActive = (rate) => this.onProgressActive(rate)
    this.progress.onChange = (rate) => this.onProgressChange(rate)

    let buttonPlay = document.createElement('div')
    buttonPlay.className = 'btn play'
    buttonPlay.onclick = () => this.onPlayClick()

    let timeBox = document.createElement('div')
    timeBox.classList.add('time')
    this.time = document.createElement('span')
    this.duration = document.createElement('span')
    timeBox.appendChild(this.time)
    timeBox.appendChild(this.duration)

    let buttonFullWindow = document.createElement('div')
    buttonFullWindow.className = 'btn full-window'
    buttonFullWindow.onclick = () => this.onFullWinfowClick()

    let buttonFullScreen = document.createElement('div')
    buttonFullScreen.className = 'btn full-screen'
    buttonFullScreen.onclick = () => this.onFullScreenClick()


    this.container.appendChild(mask)
    this.container.appendChild(this.progress.container)
    this.container.appendChild(buttonPlay)
    this.container.appendChild(timeBox)
    this.container.appendChild(buttonFullWindow)
    this.container.appendChild(buttonFullScreen)
  }
  fadeOut() {
    if ( ! this.display) this.show()
    this.hideAt = Date.now() + 1500
    if ( ! this.hideTimer) {
      this.hideTimer = setInterval(() => {
        if (Date.now() >= this.hideAt) {
          this.clearFade()
          this.hide()
        }
      }, 1000)
    }
  }
  clearFade() {
    if (this.hideTimer) {
      clearInterval(this.hideTimer)
      this.hideTimer = null
    }
  }
  hide() {
    if ( ! this.display) return
    this.clearFade()
    this.container.classList.add('hide')
    this.display = false
  }
  show() {
    if (this.display) return
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
