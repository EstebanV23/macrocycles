import { monthsObject } from './formatDateToString'

export default function getDifferentsMonths (strartDate, endDate, days) {
  const initMonth = Number(strartDate.split('-')[1]) - 1
  const initDay = Number(strartDate.split('-')[2]) - 1
  const endMonth = Number(endDate.split('-')[1]) - 1
  const endDay = Number(endDate.split('-')[2])
  const initYear = Number(strartDate.split('-')[0]) - 1
  const endYear = Number(endDate.split('-')[0]) - 1

  const condition = (index) => {
    return endYear > initYear ? (index >= initMonth || index <= endMonth) : (index >= initMonth && index <= endMonth)
  }

  if (initMonth === endMonth) return [{ name: monthsObject[initMonth].name, percent: getPercent(days, days) }]

  const months = monthsObject.filter((month, index) => condition(index))
  const lastMonth = months.length - 1

  endYear > initYear && months.sort((before, after) => {
    if (before.position > after.position && before.position > lastMonth) return -1
    return 0
  })

  const contructor = months.map((month, index) => {
    if (index === 0) {
      return {
        name: month.name,
        percent: getPercent(days, month.days - initDay),
        position: month.position
      }
    }
    if (index === lastMonth) {
      return {
        name: month.name,
        percent: getPercent(days, endDay),
        position: month.position
      }
    }
    return {
      name: month.name,
      percent: getPercent(days, month.days),
      position: month.position
    }
  })

  return contructor
}

function getPercent (allDays, days) {
  return Number(days) * 100 / Number(allDays)
}
