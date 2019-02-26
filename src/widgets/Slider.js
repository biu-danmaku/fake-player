import utils from '@/utils'

class Slider {
    constructor({ id, scales, onChange}) {
        this.container = utils.div('fake-player-slider')

        this.left     = undefined
        this.width    = undefined
        this.scales   = undefined
        this.onChange = onChange
        this.id       = id

        let wrap      = utils.div('wrap'),
            progress  = utils.div('progress'),
            scalesEle = utils.div('scales')

        if (scales) {
            this.scales = new Array(scales.length)
            let oneStep = undefined
            for (let i = 0; i < scales.length; i++) {
                let scale = utils.div('scale')
                let leftPercent = i / (scales.length - 1) * 100
                scale.style['left'] = leftPercent + '%'
                if (i === 1) {
                    oneStep = leftPercent / 2
                }
                this.scales[i] = { leftPercent }
                if (scales[i]) {
                    let text = utils.span('text')
                    text.innerText = scales[i]
                    scale.appendChild(text)
                }
                scalesEle.appendChild(scale)
            }
            for (let i = 0; i < this.scales.length - 1; i++) {
                this.scales[i].stepBeforeRate = (this.scales[i + 1].leftPercent - oneStep) / 100
            }
        } else {
            this.current = utils.div('current')
            progress.appendChild(this.current)
        }
        this.dot = utils.div('dot')
        progress.appendChild(this.dot)
        wrap.appendChild(scalesEle)
        wrap.appendChild(progress)
        this.container.appendChild(wrap)

        let dragHandler = (e) => {
            let rate = (e.clientX - this.left) / this.width

            let value = rate
            if (this.scales) {
                value = this.scales.length - 1
                for (let i = 0; i < this.scales.length - 1; i++) {
                    if (rate < this.scales[i].stepBeforeRate) {
                        value = i
                        break
                    }
                }
            }
            this.value = value
        }
        let upHandler = (e) => {
            if (e.button === 0) {
                dragHandler(e)
                this.onChange(this)
                document.removeEventListener('mouseup', upHandler)
                document.removeEventListener('mousemove', dragHandler)
            }
        }
        this.container.onmousedown = (e) => {
            if (e.button === 0) {
                let { left, width } = this.container.getBoundingClientRect()
                this.left = left
                this.width = width
                dragHandler(e)
                document.addEventListener('mouseup', upHandler)
                document.addEventListener('mousemove', dragHandler)
            }
        }
    }
    set value(value) {
        if (this.scales) {
            value = Math.max(value, 0)
            value = Math.min(value, this.scales.length)
            this.dot.style['left'] = this.scales[value].leftPercent + '%'
        } else {
            value = Math.max(value, 0)
            value = Math.min(value, 1)
            this.current.style['width'] = (value * 100) + '%'
            this.dot.style['left'] = (value * 100) + '%'
        }
        this._value = value
    }
    get value() {
        return this._value
    }
    set mainColor(color) {
        this.dot.style['backgroundColor'] = color
        if ( ! this.scales) {
            this.current.style['backgroundColor'] = color
        }
    }
}

export default Slider
