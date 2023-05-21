export default function formatDataFromDate (stringDate) {
  const date = new Date(stringDate)
  console.log({ date })
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()

  const newDay = day + 1 > 31 ? 1 : day + 1
  const newMonth = day + 1 > 31 ? month + 2 : month + 1

  return `${year}-${newMonth}-${newDay}`
}
