function second2text(second) {
  let minute = Math.floor(second / 60)
  second = second % 60
  return time2text(minute, second)
}

function ms2text(ms) {
  return second2text(Math.floor(ms / 1000))
}

function time2text(minute, second) {
  return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
}

export {
  second2text,
  ms2text,
}