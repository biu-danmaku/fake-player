import Progress from './progress'

class Controls {
  constructor(player) {
    this.player = player
    this.display = true
    this.hideTimer = null
    this.hideAt = 0

    this.container = document.createElement('div')
    this.container.classList.add('controls')
    player.container.appendChild(this.container)

    this.mask = document.createElement('div')
    this.mask.classList.add('mask')
    this.container.appendChild(this.mask)

    this.progress = new Progress(this)

    this.btnPlay = document.createElement('div')
    this.btnPlay.className = 'btn play'
    this.btnPlay.onclick = () => this.player.togglePlay()
    this.container.appendChild(this.btnPlay)

    this.btnFullWindow = document.createElement('div')
    this.btnFullWindow.className = 'btn full-window'
    this.btnFullWindow.onclick = () => this.player.fullWindow = ! this.player.fullWindow
    this.container.appendChild(this.btnFullWindow)

    let btnFullScreen = document.createElement('div')
    btnFullScreen.className = 'btn full-screen'
    btnFullScreen.onclick = () => this.player.fullScreen = ! this.player.fullScreen
    this.container.appendChild(btnFullScreen)
  }
  fade() {
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
}

export default Controls
