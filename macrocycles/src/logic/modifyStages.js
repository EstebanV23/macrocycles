import theme from '../theme/theme'
import modifyDates from './modifyDates'

export default function modifyStages (date, frames, stages, newStartDate, newEndDate, micros) {
  const indexFrameSelected = getIndex(frames, date)
  const indexStageSelected = getIndex(stages, date)

  const frameSelected = frames[indexFrameSelected]
  const stageSelected = stages[indexStageSelected]

  const newFrames = replaceDatesWithMicros(frames, frameSelected, indexFrameSelected, stageSelected, newStartDate, newEndDate)
  const newStages = modifyDates(stages, newStartDate, newEndDate, indexStageSelected, theme.colors.stages, true, micros, frames)

  return [newFrames, newStages]
}

function replaceDatesWithMicros (arrayEdit, selectedValue, indexValue, microRef, newStartDate, newEndDate) {
  if (selectedValue.startDate === microRef.startDate) {
    arrayEdit = modifyDates(arrayEdit, newStartDate, null, indexValue, theme.colors.timeFrames)
  }

  if (selectedValue.endDate === microRef.endDate) {
    arrayEdit = modifyDates(arrayEdit, null, newEndDate, indexValue, theme.colors.timeFrames)
  }

  return arrayEdit
}

export function getIndex (arr, date) {
  const dateCompare = new Date(date)
  return arr.findIndex(item => dateCompare >= new Date(item.startDate) && dateCompare <= new Date(item.endDate))
}
