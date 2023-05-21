export default function formatDataFromDate () {
  const date = new Date('05-23-2023')
  console.log({ date })
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()

  const newDay = day + 1 > 31 ? 1 : day + 1
  const newMonth = day + 1 > 31 ? month + 2 : month + 1

  console.log(`${year}/${newMonth}/${newDay}`)

  return `${year}/${newMonth}/${newDay}`
}
