import formatDataFromDate from './formatDataFromDate'

export default function modifyDates (component, newStartDate, newEndDate, indexComponent) {
  const beforeComponent = indexComponent - 1
  const afterComponent = indexComponent + 1
  const getBeforeComponent = component[beforeComponent]
  const getAfterComponent = component[afterComponent]

  if (getAfterComponent) {
    getAfterComponent.startDate = formatDataFromDate(newEndDate, true, 2)
    component[afterComponent] = getAfterComponent
  }

  if (getBeforeComponent) {
    getBeforeComponent.endDate = formatDataFromDate(newStartDate, true, 0)
    component[beforeComponent] = getBeforeComponent
  }

  component[indexComponent].startDate = newStartDate ?? component[indexComponent].startDate
  component[indexComponent].endDate = newEndDate ?? component[indexComponent].endDate
  return component
}
