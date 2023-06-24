/**
 *
 * @param {string} date - format 'YYYY-MM-DD'
 * @returns
 */
export default function formatDateToString (date) {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  const newMonth = monthsObject[month - 1]
  const monthString = newMonth.name
  return `${monthString.substring(0, 3)} - ${day}`
}

export const monthsObject = [
  {
    name: 'Enero',
    days: 31,
    position: 0
  },
  {
    name: 'Febrero',
    days: 28,
    position: 1
  },
  {
    name: 'Marzo',
    days: 31,
    position: 2
  },
  {
    name: 'Abril',
    days: 30,
    position: 3
  },
  {
    name: 'Mayo',
    days: 31,
    position: 4
  },
  {
    name: 'Junio',
    days: 30,
    position: 5
  },
  {
    name: 'Julio',
    days: 31,
    position: 6
  },
  {
    name: 'Agosto',
    days: 31,
    position: 7
  },
  {
    name: 'Septiembre',
    days: 30,
    position: 8
  },
  {
    name: 'Octubre',
    days: 31,
    position: 9

  },
  {
    name: 'Noviembre',
    days: 30,
    position: 10
  },
  {
    name: 'Diciembre',
    days: 31,
    position: 11
  }
]
