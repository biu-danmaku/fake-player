const utils = {
    second2text(second) {
        let minute = Math.floor(second / 60)
        second = second % 60
        return this.time2text(minute, second)
    },
    ms2text(ms) {
        return this.second2text(Math.floor(ms / 1000))
    },
    time2text(minute, second) {
        return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    },
    createEle(type, className) {
        let element = document.createElement(type)
        if (className instanceof Array) {
            element.classList.add(...className)
        } else {
            element.classList.add(className)
        }
        return element
    },
    div(className) {
        return this.createEle('div', className)
    },
    span(className) {
        return this.createEle('span', className)
    },
}

export default utils