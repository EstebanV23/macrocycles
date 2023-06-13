import theme from '../theme/theme'
import { months } from './formatDataFromDate'

/**
 *
 * @param {String} startDate - format 'YYYY-MM-DD'
 * @param {String} endDate - format 'YYYY-MM-DD'
 */
export default function getAllDatesBetween (startDate, endDate, color = 'green') {
  if (!startDate || !endDate) return {}
  const dates = {}
  let [startYear, startMonth, startDay] = startDate.split('-').map(item => parseInt(item))
  const [endYear, endMonth, endDay] = endDate.split('-').map(item => parseInt(item))

  while (startYear <= endYear) {
    while (startMonth <= 12 + 1) {
      while (startDay <= months[startMonth - 1] + 1) {
        startDay++
        if (startDay === endDay || startDay > months[startMonth - 1]) {
          startDay = 0
          break
        }
        dates[`${startYear}-${formatNumbers(startMonth)}-${formatNumbers(startDay)}`] = { selected: true, color: theme.colors[color].default }
      }
      if (startMonth === endMonth || startMonth > 12) {
        startMonth = 1
        break
      }
      startMonth++
    }
    if (startYear === endYear) break
    startYear++
  }

  return dates
}

function formatNumbers (number) {
  return number < 10 ? `0${number}` : number
}
