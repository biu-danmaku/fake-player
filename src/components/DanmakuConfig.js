import utils from '@/utils'

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
        this.container = utils.div('fake-player-danmaku-config')

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
    set mainColor(color) {
        this._mainColor = color
        Object.values(this.sliders).forEach(slider => slider.mainColor = color)
        Object.values(this.buttons).forEach(button => {
            if (button.actived) {
                button.active(true, color)
            }
        })
    }
}

export default DanmakuConfig

function renderSliders(valueChangeHandler) {
    Object.entries(this.sliders).forEach(([ key, slider ]) => {
        let titleElement = utils.div('title')
        titleElement.innerText = slider.title

        let content = utils.div('content')

        let _slider = new Slider({
            id:       key,
            scales:   slider.scales,
            onChange: valueChangeHandler
        })
        content.appendChild(_slider.container)

        let section = utils.div('slider-section')
        section.appendChild(titleElement)
        section.appendChild(content)
        this.container.appendChild(section)

        this.sliders[key] = _slider
    })
}

function renderButtons(buttonClickHandler) {
    let section = utils.div('block-section')
    section.appendChild(document.createRange().createContextualFragment('<div>按类型屏蔽</div>'))

    let buttons = utils.div('buttons')
    section.appendChild(buttons)

    Object.entries(this.buttons).forEach(([ key, button ]) => {
        button.id = key
        button.element = utils.div('button')
        button.element.onclick = () => buttonClickHandler(button)

        let image = utils.div('image')
        image.innerHTML = button.image[0]
        button.element.appendChild(image)

        button.active = (active = true, color = this._mainColor) => {
            if (active) {
                image.style['fill'] = color
                image.innerHTML = button.image[1]
            } else {
                image.innerHTML = button.image[0]
                image.style['fill'] = ''
            }
            button.actived = active
        }

        let title = utils.div('title')
        title.innerText = button.title
        button.element.appendChild(title)
        delete button.title

        buttons.appendChild(button.element)
    })
    this.container.appendChild(section)
}