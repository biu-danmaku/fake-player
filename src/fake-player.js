import Player from './components/Player'

class FakePlayer {
    constructor(args) {
        this._container = undefined
        this._player = undefined
        this._events = new Map()
        this._player = new Player(this._events)
        let config = args.config || {
            opacity:  1,
            speed:    2,
            fontSize: 2
        }

        initContainerElement.call(this, args.container)

        Object.entries(config).forEach(([ key, value ]) => {
            switch (key) {
                case 'opacity': 
                case 'speed':
                case 'fontSize':
                    this._player.applyConfig(key, value)
                    break
            }
        })
        this.duration = args.duration || 0
        this.background = args.background || '#000'
    }
    set duration(second) {
        this._player.duration = second * 1000
    }
    get duration() {
        return this._player.duration / 1000
    }
    set background(value) {
        this._player.screen.style['background'] = value
    }
    get background() {
        return this._player.screen.style['background']
    }
    on(name, handler) {
        if (this._events.has(name)) {
            this._events.get(name).push(handler)
        } else {
            this._events.set(name, [ handler ])
        }
    }
}

export default FakePlayer

function initContainerElement(container) {
    if (typeof container === 'string') {
        this._container = document.querySelector(container)
    } else if (container instanceof HTMLElement) {
        this._container = container
    } else {
        throw new Error('Invalid container')
    }
    this._container.classList.add('fake-player')
    this._container.appendChild(this._player.container)
}
