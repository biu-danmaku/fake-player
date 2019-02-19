
class FakePlayer {
  constructor(args) {
    this._privates = {
      container: undefined,
      player: undefined,
    }

    // events
    this.onplay = undefined
    this.onpause = undefined
    this.onchange = undefined

    this._privates.player = new Player(this)
    initContainerElement.call(this, args.container)

    this.duration = args.duration || 0
    this.background = args.background || '#000'
  }
  set duration(second) {
    this._privates.player.duration = second * 1000
  }
  get duration() {
    return this._privates.player.duration / 1000
  }
  set background(value) {
    this._privates.player.screen.style['background'] = value
  }
  get background() {
    return this._privates.player.screen.style['background']
  }
}

export default FakePlayer

function initContainerElement(container) {
  if (typeof container === 'string') {
    this._privates.container = document.querySelector(container)
  } else if (container instanceof HTMLElement) {
    this._privates.container = container
  } else {
    throw new Error('Invalid container')
  }
  this._privates.container.classList.add('fake-player')
  this._privates.container.appendChild(this._privates.player.container)
}
