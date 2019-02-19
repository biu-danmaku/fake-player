class Slider {
    constructor({ scales }) {
        this.container = document.createElement('div')
        this.container.classList.add('fake-player-slider')

        this.left = undefined
        this.width = undefined
        this.scales = undefined
        this.onChange = undefined
        this.value = undefined

        let progress = document.createElement('div')
        progress.classList.add('progress')

        if (scales) {
            this.scales = new Array(scales.length)
            let oneStep = 0
            let scalesContainer = document.createElement('div')
            scalesContainer.classList.add('scales')
            for (let i = 0; i < scales.length; i++) {
                let scale = document.createElement('div')
                scale.classList.add('scale')
                let leftRate = i / (scales.length - 1)
                scale.style['left'] = leftRate * 100 + '%'
                if (i === 1) {
                    oneStep = leftRate / 2
                }
                this.scales[i] = {
                    leftRate: leftRate
                }
                if (scales[i]) {
                    let text = document.createElement('span')
                    text.innerText = scales[i]
                    text.classList.add('text')
                    scale.appendChild(text)
                }
                scalesContainer.appendChild(scale)
                this.container.appendChild(scalesContainer)
            }
            for (let i = 0; i < this.scales.length - 1; i++) {
                this.scales[i].stepBefore = this.scales[i + 1].leftRate - oneStep
            }
        } else {
            this.current = document.createElement('div')
            this.current.classList.add('current')
            progress.appendChild(this.current)
        }
        this.dot = document.createElement('div')
        this.dot.classList.add('dot')
        progress.appendChild(this.dot)

        this.container.appendChild(progress)

        let moveHandler = (e) => {
            let rate = (e.clientX - this.left) / this.width
            if (this.scales) {
                for (let i = 0; i < this.scales.length - 1; i++) {
                    if (rate < this.scales[i].stepBefore) {
                        this.step = i
                        return
                    }
                }
                this.step = this.scales.length - 1
            } else {
                this.rate = rate
            }
        }
        let upHandler = (e) => {
            moveHandler(e)
            if (this.onChange) this.onChange(this.value)
            document.removeEventListener('mouseup', upHandler)
            document.removeEventListener('mousemove', moveHandler)
        }
        this.container.onmousedown = (e) => {
            if (e.button === 0) {
                let { left, width } = this.container.getBoundingClientRect()
                this.left = left
                this.width = width
                moveHandler(e)
                document.addEventListener('mouseup', upHandler)
                document.addEventListener('mousemove', moveHandler)
            }
        }
    }
    set rate(rate) {
        if (rate < 0) rate = 0
        else if (rate > 1) rate = 1
        this.current.style['width'] = (rate * 100) + '%'
        this.dot.style['left'] = rate * this.width + 'px'
        this.value = rate
    }
    set step(step) {
        this.dot.style['left'] = this.scales[step].leftRate * this.width + 'px'
        this.value = step
    }
}

export default Slider
