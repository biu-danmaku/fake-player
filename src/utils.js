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
    createElement(type, ...classNames) {
        let element = document.createElement(type)
        for (let className of classNames) {
            element.classList.add(className)
        }
        return element
    },
    div(...classNames) {
        return this.createElement('div', ...classNames)
    },
    span(...classNames) {
        return this.createElement('span', ...classNames)
    },
}

export default utils