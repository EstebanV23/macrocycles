import { generatePrinter } from '../store/RoadMapStore'
import formatDataFromDate from './formatDataFromDate'

export default function modifyDates (component, newStartDate, newEndDate, indexComponent, color, dot, micros, frames) {
  const beforeComponent = indexComponent - 1
  const afterComponent = indexComponent + 1
  const getBeforeComponent = component[beforeComponent]
  const getAfterComponent = component[afterComponent]

  if (newEndDate && getAfterComponent) {
    getAfterComponent.startDate = formatDataFromDate(newEndDate, true, 2)
    component[afterComponent] = getAfterComponent
    const { printer } = generatePrinter(getAfterComponent, color, dot, micros, frames)
    component[afterComponent].printer = printer
  }

  if (newStartDate && getBeforeComponent) {
    getBeforeComponent.endDate = formatDataFromDate(newStartDate, true, 0)
    component[beforeComponent] = getBeforeComponent
    const { printer } = generatePrinter(getBeforeComponent, color, dot, micros, frames)
    component[beforeComponent].printer = printer
  }

  component[indexComponent].startDate = newStartDate ?? component[indexComponent].startDate
  component[indexComponent].endDate = newEndDate ?? component[indexComponent].endDate
  const { printer } = generatePrinter(component[indexComponent], color, dot, micros, frames)
  component[indexComponent].printer = printer
  return component
}
