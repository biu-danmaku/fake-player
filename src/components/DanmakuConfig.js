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

        this.blockButtons = {
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
            '不透明度': new Slider({
                onChange: (value) => sliderValueChangeHandler('opacity', value)
            }),
            '弹幕速度': new Slider({
                scales:   ['极慢', '', '适中', '', '超快'],
                onChange: (value) => sliderValueChangeHandler('speed', value)
            }),
            '字体大小': new Slider({
                scales:   ['极小', '', '适中', '', '超大'],
                onChange: (value) => sliderValueChangeHandler('font-size', value)
            })
        }

        renderBlockSection.call(this, buttonClickHandler)
        Object.entries(this.sliders).forEach(entry => {
            createSliderSection(this.container, entry[0]).appendChild(entry[1].container)
        })
    }
    activeButton(key, active = true) {
        if (this.blockButtons[key]) {
            let button = this.blockButtons[key]
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

function createSliderSection(container, title) {
    let titleElement = document.createElement('div')
    titleElement.classList.add('title')
    titleElement.innerText = title
    let content = document.createElement('div')
    content.classList.add('content')
    let section = document.createElement('div')
    section.classList.add('slider-section')
    section.appendChild(titleElement)
    section.appendChild(content)
    container.appendChild(section)
    return content
}

function renderBlockSection(clickHandler) {
    let section = document.createElement('div')
    section.classList.add('block-section')
    section.appendChild(document.createRange().createContextualFragment('<div>按类型屏蔽</div>'))

    let buttons = document.createElement('div')
    buttons.classList.add('buttons')
    section.appendChild(buttons)

    Object.entries(this.blockButtons).forEach(entry => {
        let [ key, button ] = entry

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