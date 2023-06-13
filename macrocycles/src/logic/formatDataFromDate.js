export const months = [
  31, // January
  28, // February
  31, // March
  30, // April
  31, // May
  30, // June
  31, // July
  31, // August
  30, // September
  31, // October
  30, // November
  31 // December
]

/**
  * @param {string} stringDate - String with date format 'YYYY/MM/DD'
  * @param {boolean} globalDate
*/
export default function formatDataFromDate (stringDate, globalDate = true, offset = 1) {
  const isString = typeof stringDate === 'string'
  const newDate = isString && stringDate.split('/').join('-')
  const date = stringDate ? new Date(newDate) : new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  const { newDays, newMonth, newYear } = getDataAfterOffset(offset, day, month, year)

  const newDaysFormated = newDays < 10 ? `0${newDays}` : newDays
  const newMonthFormated = newMonth < 10 ? `0${newMonth}` : newMonth

  const newDateFormat = globalDate ? `${newYear}-${newMonthFormated}-${newDaysFormated}` : `${newYear}/${newMonthFormated}/${newDaysFormated}`

  return newDateFormat
}

const getDataAfterOffset = (offset, days, month, year) => {
  const currentMonth = month - 1
  if (offset + days <= months[currentMonth]) {
    return { newDays: offset + days, newMonth: month, newYear: year }
  }
  const newOffset = offset + days - months[currentMonth]
  const newMonth = currentMonth + 1 > 11 ? 1 : currentMonth + 2
  const newYear = currentMonth + 1 > 11 ? year + 1 : year
  return getDataAfterOffset(newOffset, 0, newMonth, newYear)
}
