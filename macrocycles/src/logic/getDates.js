
export default function getDates (arrItems) {
  if (arrItems.length === 0 || arrItems.some(item => !item.startDate)) return arrItems
  const objectFlatFirst = arrItems.map((item) => item.printer)

  const getEntriesObject = objectFlatFirst.map(item => [Object.entries(item)]).flat(2)

  const entriesValues = getEntriesObject.map((item) => Object.fromEntries([item]))

  const transformToKeyValue = entriesValues.map(item => Object.entries(item)).flat(1)

  return Object.fromEntries(transformToKeyValue)
}

export function getDatesOnlyCorner (arrItems) {
  if (arrItems.length === 0 || arrItems.some(item => !item.startDate)) return arrItems
  const objectFlatFirst = arrItems.map((item) => { return { [item.startDate]: item.printer[item.startDate], [item.endDate]: item.printer[item.endDate] } })

  const getEntriesObject = objectFlatFirst.map(item => [Object.entries(item)]).flat(2)

  const entriesValues = getEntriesObject.map((item) => Object.fromEntries([item]))

  const transformToKeyValue = entriesValues.map(item => Object.entries(item)).flat(1)

  return Object.fromEntries(transformToKeyValue)
}
