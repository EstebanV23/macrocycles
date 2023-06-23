import theme from '../theme/theme'
import getAmountMicrosForAmount from './getAmountMicrosForAmount'
import { getMicroWithDate } from './getsWithDate'

export const numberStages = {
  1: 2,
  2: 2,
  3: 1
}

export default function getStages (frames, micros, stages) {
  let lastStage = 0
  const allMicros = micros.length
  const newStages = frames.map((frame, index) => {
    let count = 0
    const stageContructor = []
    const microsFrame = micros.filter(micro => micro.startDate >= frame.startDate && micro.endDate <= frame.endDate)
    const allMicrosFrame = microsFrame.length
    const amountMicros = numberStages[index + 1]
    const { daysMicros: currentMicros, lastDaysMicrocycle: lastMicros } = getAmountMicrosForAmount(allMicrosFrame, amountMicros)
    const lastStageNumber = lastStage + amountMicros
    for (let i = lastStage; i < lastStage + amountMicros; i++) {
      const stage = stages[i]
      const microsStage = getMicrosFromStage(stage, microsFrame, count, currentMicros, frame, allMicros, i === lastStageNumber - 1, lastMicros)
      stageContructor.push(microsStage)
      count++
    }
    lastStage = lastStageNumber
    return stageContructor
  })
  return newStages.flat(1)
}

function getMicrosFromStage (stage, micros, i, amount, frame, allMicros, allEnds, lastMicros) {
  const initSlice = i * amount
  const finishSlice = allEnds ? stage.length : initSlice + amount
  const percent = frame.defaultPercent / micros.length
  const microsStage = micros.slice(initSlice, finishSlice)
  stage.startDate = microsStage[0].startDate
  stage.endDate = microsStage[microsStage.length - 1].endDate
  stage.printer = {
    [stage.startDate]: { ...getMicroWithDate(microsStage, stage.startDate).printer[stage.startDate], ...frame.printer[stage.startDate], selected: true, startingDay: true, dotColor: theme.colors.stages, marked: true },
    [stage.endDate]: { ...getMicroWithDate(microsStage, stage.endDate).printer[stage.endDate], ...frame.printer[stage.endDate], selected: true, endingDay: true, dotColor: theme.colors.stages, marked: true }
  }

  const defaultPercent = allEnds ? percent * lastMicros : percent * amount
  stage.defaultPercent = defaultPercent
  return stage
}
