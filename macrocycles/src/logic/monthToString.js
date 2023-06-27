import monthsString from '../constants/monthsString'

export default function monthToString (month) {
  return monthsString[Number(month) - 1]
}
