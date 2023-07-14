import modifyDates from './modifyDates'

export default function modifyMicros (date, micros, frames, stages, mesos, newStartDate, newEndDate) {
  const indexFrameSelected = getIndex(frames, date)
  const indexStageSelected = getIndex(stages, date)
  const indexMesoSelected = getIndex(mesos, date)
  const indexMicroSelected = getIndex(micros, date)

  const frameSelected = frames[indexFrameSelected]
  const stageSelected = stages[indexStageSelected]
  const mesoSelected = mesos[indexMesoSelected]
  const microSelected = micros[indexMicroSelected]

  const newFrames = replaceDatesWithMicros(frames, frameSelected, indexFrameSelected, microSelected, newStartDate, newEndDate)
  const newStages = replaceDatesWithMicros(stages, stageSelected, indexStageSelected, microSelected, newStartDate, newEndDate)

  const newMesos = replaceDatesWithMicros(mesos, mesoSelected, indexMesoSelected, microSelected, newStartDate, newEndDate)
  const newMicros = modifyDates(micros, newStartDate, newEndDate, indexMicroSelected)

  return [newMicros, newFrames, newStages, newMesos]
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
