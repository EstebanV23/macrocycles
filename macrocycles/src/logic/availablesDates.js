
export default function availablesDates (arrAvailables, dateSelected, estrictMode = true) {
  const conditionTrue = arrAvailables.some(item => {
    console.log({ item, dateSelected })
    return item.startDate === dateSelected || item.endDate === dateSelected
  })
  const conditionFalse = arrAvailables.some(item => new Date(dateSelected) >= new Date(item.startDate) && new Date(dateSelected) <= new Date(item.endDate))
  console.log({ conditionTrue })
  const result = estrictMode ? conditionTrue : conditionFalse
  return result
}
