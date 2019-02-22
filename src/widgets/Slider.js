import utils from '@/utils'

class Slider {
    constructor(args) {
        this.container = utils.div('fake-player-slider')

        this.left     = undefined
        this.width    = undefined
        this.scales   = undefined
        this.onChange = undefined

        if (args && args.onChange) {
            this.onChange = args.onChange
        }

        let wrap     = utils.div('wrap'),
            progress = utils.div('progress'),
            scales   = utils.div('scales')

        if (args && args.scales) {
            this.scales = new Array(args.scales.length)
            let oneStep = undefined
            for (let i = 0; i < args.scales.length; i++) {
                let scale = utils.div('scale')
                let leftPercent = i / (args.scales.length - 1) * 100
                scale.style['left'] = leftPercent + '%'
                if (i === 1) {
                    oneStep = leftPercent / 2
                }
                this.scales[i] = { leftPercent }
                if (args.scales[i]) {
                    let text = utils.span('text')
                    text.innerText = args.scales[i]
                    scale.appendChild(text)
                }
                scales.appendChild(scale)
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
        wrap.appendChild(scales)
        wrap.appendChild(progress)
        this.container.appendChild(wrap)

        let dragHandler = (e) => {
            let rate = (e.clientX - this.left) / this.width
            rate = Math.max(0, rate)
            rate = Math.min(1, rate)

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
            return value
        }
        let upHandler = (e) => {
            if (e.button === 0) {
                let value = dragHandler(e)
                if (this.onChange) this.onChange(value)
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
            this.dot.style['left'] = this.scales[value].leftPercent + '%'
        } else {
            this.current.style['width'] = (value * 100) + '%'
            this.dot.style['left'] = (value * 100) + '%'
        }
    }
    set mainColor(color) {
        this.dot.style['backgroundColor'] = color
        if ( ! this.scales) {
            this.current.style['backgroundColor'] = color
        }
    }
}

export default Slider
