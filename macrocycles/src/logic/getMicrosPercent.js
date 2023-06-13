import colorsSelector, { TIME_FRAMES } from '../constants/colors'
import theme from '../theme/theme'

/**
 *
 * @param {Array} micros
 * @param {Array} timeFrames
 */
export default function getMcrosPercent (micros, timeFrames) {
  const amountMicros = micros.length

  let lastAmount = 0
  const newTimeFrames = timeFrames.map((frame, index) => {
    const getAmountMicros = index === timeFrames.length - 1 ? amountMicros - lastAmount : Math.floor(amountMicros * (frame.defaultPercent / 100))
    console.log(lastAmount, lastAmount + getAmountMicros)
    const microsSelf = micros.slice(lastAmount, lastAmount + getAmountMicros)
    frame.micros = microsSelf
    frame.startDate = microsSelf[0].startDate
    frame.endDate = microsSelf[microsSelf.length - 1].endDate
    frame.printer = {
      [frame.startDate]: { selected: true, startingDay: true, color: theme.colors.blue.default },
      [frame.endDate]: { selected: true, endingDay: true, color: theme.colors.blue.default }
    }
    lastAmount = lastAmount + getAmountMicros
    return frame
  })
  return newTimeFrames
}
