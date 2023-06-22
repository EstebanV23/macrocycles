import modifyDates from './modifyDates'

export default function modifyStages (date, frames, stages, newStartDate, newEndDate) {
  const indexFrameSelected = getIndex(frames, date)
  const indexStageSelected = getIndex(stages, date)

  const frameSelected = frames[indexFrameSelected]
  const stageSelected = stages[indexStageSelected]

  const newStages = replaceDatesWithMicros(stages, stageSelected, indexStageSelected, frameSelected, newStartDate, newEndDate)
  const newFrames = modifyDates(frames, newStartDate, newEndDate, indexFrameSelected)

  return [newFrames, newStages]
}

function replaceDatesWithMicros (arrayEdit, selectedValue, indexValue, microRef, newStartDate, newEndDate) {
  if (selectedValue.startDate === microRef.startDate) {
    arrayEdit = modifyDates(arrayEdit, newStartDate, null, indexValue)
  }

  if (selectedValue.endDate === microRef.endDate) {
    arrayEdit = modifyDates(arrayEdit, null, newEndDate, indexValue)
  }

  return arrayEdit
}

export function getIndex (arr, date) {
  const dateCompare = new Date(date)
  return arr.findIndex(item => dateCompare >= new Date(item.startDate) && dateCompare <= new Date(item.endDate))
}
