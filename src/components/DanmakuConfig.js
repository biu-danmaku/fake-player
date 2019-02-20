import Slider from '@/widgets/Slider'

import svgDanmakuScroll from '@/images/danmaku-scroll.svg'
import svgDanmakuTop    from '@/images/danmaku-top.svg'
import svgDanmakuBottom from '@/images/danmaku-bottom.svg'
import svgDanmakuColor  from '@/images/danmaku-color.svg'

class DanmakuConfig {
    constructor({ buttonClickHandler, sliderValueChangeHandler }) {
        this.container = document.createElement('div')
        this.container.classList.add('fake-player-danmaku-config')

        this.blockButtons = {
            scroll: {
                title: '滚动',
                image: [ svgDanmakuScroll ],
            },
            top:    {
                title: '顶部',
                image: [ svgDanmakuTop ]
            },
            bottom: {
                title: '底部',
                image: [ svgDanmakuBottom ]
            },
            color:  {
                title: '彩色',
                image: [ svgDanmakuColor ]
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
        console.log(this.blockButtons)
        Object.entries(this.sliders).forEach(entry => {
            createSliderSection(this.container, entry[0]).appendChild(entry[1].container)
        })
    }

    set mainColor(color) {
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
        button.element.onclick = () => clickHandler('block-' + key)

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