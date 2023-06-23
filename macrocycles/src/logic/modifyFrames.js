import theme from '../theme/theme'
import modifyDates from './modifyDates'

export default function modifyFrames (date, frames, stages, newStartDate, newEndDate, micros) {
  const indexFrameSelected = getIndex(frames, date)
  const indexStageSelected = getIndex(stages, date)

  const frameCopy = frames.map(item => item)

  const frameSelected = frameCopy[indexFrameSelected]
  const stageSelected = stages[indexStageSelected]

  replaceDatesWithMicros(stages, stageSelected, indexStageSelected, frameSelected, newStartDate, newEndDate, micros, frames)
  const newFrames = modifyDates(frames, newStartDate, newEndDate, indexFrameSelected, theme.colors.timeFrames)
  const newStages = replaceDatesWithMicros(stages, stageSelected, indexStageSelected, frameSelected, newStartDate, newEndDate, micros, frames)

  return [newFrames, newStages]
}

function replaceDatesWithMicros (arrayEdit, selectedValue, indexValue, microRef, newStartDate, newEndDate, micros, frames) {
  if (newStartDate && selectedValue.startDate === microRef.startDate) {
    arrayEdit = modifyDates(arrayEdit, newStartDate, null, indexValue, theme.colors.stages, true, micros, frames)
  }

  if (newEndDate && selectedValue.endDate === microRef.endDate) {
    arrayEdit = modifyDates(arrayEdit, null, newEndDate, indexValue, theme.colors.stages, true, micros, frames)
  }

  return arrayEdit
}

export function getIndex (arr, date) {
  const dateCompare = new Date(date)
  return arr.findIndex(item => dateCompare >= new Date(item.startDate) && dateCompare <= new Date(item.endDate))
}
