import Slider from '@/widgets/Slider'

import iDanmakuScroll       from '@/images/danmaku-scroll.svg'
import iDanmakuScrollActive from '@/images/danmaku-scroll-active.svg'
import iDanmakuTop          from '@/images/danmaku-top.svg'
import iDanmakuTopActive    from '@/images/danmaku-top-active.svg'
import iDanmakuBottom       from '@/images/danmaku-bottom.svg'
import iDanmakuBottomActive from '@/images/danmaku-bottom-active.svg'
import iDanmakuColor        from '@/images/danmaku-color.svg'
import iDanmakuColorActive  from '@/images/danmaku-color-active.svg'

class DanmakuConfig {
    constructor({ buttonClickHandler, sliderValueChangeHandler }) {
        this._mainColor = '#f00'
        this.container = document.createElement('div')
        this.container.classList.add('fake-player-danmaku-config')

        this.buttons = {
            'block-scroll': {
                title: '滚动',
                image: [ iDanmakuScroll, iDanmakuScrollActive ],
            },
            'block-top':    {
                title: '顶部',
                image: [ iDanmakuTop, iDanmakuTopActive ]
            },
            'block-bottom': {
                title: '底部',
                image: [ iDanmakuBottom, iDanmakuBottomActive ]
            },
            'block-color':  {
                title: '彩色',
                image: [ iDanmakuColor, iDanmakuColorActive ]
            },
        }

        this.sliders = {
            'opacity': {
                title:  '不透明度'
            },
            'speed': {
                title:  '弹幕速度',
                scales: ['极慢', '', '适中', '', '超快']
            },
            'font-size': {
                title:  '字体大小',
                scales: ['极小', '', '适中', '', '超大']
            }
        }

        renderButtons.call(this, buttonClickHandler)
        renderSliders.call(this, sliderValueChangeHandler)
    }
    activeButton(key, active = true) {
        if (this.buttons[key]) {
            let button = this.buttons[key]
            if (active) {
                button.imageElement.innerHTML = button.image[1]
                button.element.style['fill'] = button.element.style['color'] = this._mainColor
            } else {
                button.imageElement.innerHTML = button.image[0]
                button.element.style['fill'] = button.element.style['color'] = ''
            }
        }
    }
    set mainColor(color) {
        this._mainColor = color
        Object.values(this.sliders).forEach(slider => slider.mainColor = color)
    }
}

export default DanmakuConfig

function renderSliders(valueChangeHandler) {
    Object.entries(this.sliders).forEach(([ key, slider ]) => {
        let titleElement = document.createElement('div')
        titleElement.classList.add('title')
        titleElement.innerText = slider.title

        let content = document.createElement('div')
        content.classList.add('content')

        slider.obj = new Slider({
            scales:   slider.scales,
            onChange: (value) => valueChangeHandler(key, value)
        })
        content.appendChild(slider.obj.container)

        let section = document.createElement('div')
        section.classList.add('slider-section')
        section.appendChild(titleElement)
        section.appendChild(content)
        this.container.appendChild(section)
    })
}

function renderButtons(clickHandler) {
    let section = document.createElement('div')
    section.classList.add('block-section')
    section.appendChild(document.createRange().createContextualFragment('<div>按类型屏蔽</div>'))

    let buttons = document.createElement('div')
    buttons.classList.add('buttons')
    section.appendChild(buttons)

    Object.entries(this.buttons).forEach(([ key, button ]) => {
        button.element = document.createElement('div')
        button.element.classList.add('button')
        button.element.onclick = () => clickHandler(key)

        button.imageElement = document.createElement('div')
        button.imageElement.classList.add('image')
        button.imageElement.innerHTML = button.image[0]
        button.imageElement = button.imageElement
        button.element.appendChild(button.imageElement)

        let title = document.createElement('div')
        title.classList.add('title')
        title.innerText = button.title
        delete button.title
        button.element.appendChild(title)

        buttons.appendChild(button.element)
    })
    this.container.appendChild(section)
}