import getAllDatesBetween from './getAllDatesBetween'
import { getDatesOnlyCorner } from './getDates'

export default function generateMesos ({ type, microcycles, currentPosition }) {
  const startDate = microcycles[0].startDate
  const endDate = microcycles[microcycles.length - 1].endDate
  return {
    type,
    startDate,
    endDate,
    microcycles,
    printer: {
      ...getAllDatesBetween(startDate, endDate, type),
      ...getDatesOnlyCorner(microcycles)
    },
    id: `meso${currentPosition}`
  }
}
