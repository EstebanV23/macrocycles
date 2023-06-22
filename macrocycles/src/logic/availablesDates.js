
export default function availablesDates (arrAvailables, dateSelected, estrictMode = true) {
  return estrictMode ? arrAvailables.some(item => item.startDate === dateSelected || item.endDate === dateSelected) : arrAvailables.some(item => new Date(dateSelected) >= new Date(item.startDate) && new Date(dateSelected) <= new Date(item.endDate))
}
