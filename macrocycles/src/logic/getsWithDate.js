export function getMicroWithDate (micros, date) {
  const micro = micros.find(micro => micro.startDate === date || micro.endDate === date)
  return micro
}

export function getFrameWithDate (frames, date) {
  const frame = frames.find(frame => frame.startDate === date || frame.endDate === date)
  return frame
}

export function getDataBetweenDates (array, date) {
  const item = array.find(element => new Date(date) >= new Date(element.startDate) && new Date(date) <= new Date(element.endDate))
  return item
}
