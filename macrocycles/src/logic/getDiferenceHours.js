/**
 *
 * @param {string} initDate - String with date format 'YYYY/MM/DD'
 * @param {string} endDate - String with date format 'YYYY/MM/DD'
 * @returns
 */

export default function getDiferenceHours (initDate, endDate) {
  if (!initDate || !endDate) return { hours: 0, minutes: 0, seconds: 0, days: 0, ms: 0, years: 0 }
  const newInitDate = initDate.split('-').join('-')
  const newEndDate = endDate.split('-').join('-')

  const init = new Date(newInitDate)
  const end = new Date(newEndDate)
  const diference = end - init
  const hours = Math.floor(diference / 1000 / 60 / 60)
  const minutes = Math.floor(diference / 1000 / 60) - (hours * 60)
  const seconds = Math.floor(diference / 1000) - (minutes * 60) - (hours * 60 * 60)
  const days = hours / 24
  const years = Math.floor(days / 365)

  return { hours, minutes, seconds, days, ms: diference, years }
}
