
export default function dateBetween (component, date, snakeCase) {
  const startDate = new Date(snakeCase ? component.start_date : component.startDate)
  const endDate = new Date(snakeCase ? component.end_date : component.endDate)
  const dateToCheck = new Date(date)
  return dateToCheck >= startDate && dateToCheck <= endDate
}
