import theme from '../theme/theme'
import getAmountMicrosForAmount from './getAmountMicrosForAmount'

export const numberStages = {
  1: 2,
  2: 2,
  3: 1
}

export default function getStages (frames, micros, stages) {
  let lastStage = 0
  const newStages = frames.map((frame, index) => {
    const stageContructor = []
    const microsFrame = micros.filter(micro => micro.startDate >= frame.startDate && micro.endDate <= frame.endDate)
    const allMicrosFrame = microsFrame.length
    const amountMicros = numberStages[index + 1]
    const { lastDaysMicrocycle: lastMicro, daysMicros: currentMicros } = getAmountMicrosForAmount(allMicrosFrame, amountMicros)
    const lastStageNumber = lastStage + amountMicros
    for (let i = lastStage; i < lastStage + amountMicros; i++) {
      const stage = stages[i]
      if (i === lastStageNumber - 1) {
        const microsStage = getMicrosFromStage(stage, microsFrame, i, lastMicro, frame)
        stageContructor.push(microsStage)
        break
      }
      const microsStage = getMicrosFromStage(stage, microsFrame, i, currentMicros, frame)
      stageContructor.push(microsStage)
    }
    lastStage = lastStageNumber
    return stageContructor
  })
  console.log({ newStages: newStages.flat(1) })
  return newStages.flat(1)
}

function getMicrosFromStage (stage, micros, i, amount, frame) {
  const initSlice = i * amount
  const finishSlice = initSlice + amount
  const microsStage = micros.slice(initSlice, finishSlice)
  console.log('🚀 getMicrosFromStage: ', { microsStage, initSlice, finishSlice })
  stage.startDate = microsStage[0].startDate
  stage.endDate = microsStage[microsStage.length - 1].endDate
  stage.printer = {
    [stage.startDate]: { selected: true, startingDay: true, color: theme.colors.timeFrames, dotColor: '#fff', marked: true },
    [stage.endDate]: { selected: true, endingDay: true, color: theme.colors.timeFrames, dotColor: '#fff', marked: true }
  }
  stage.defaultPercent = (((frame.defaultPercent / 100) * micros.length) / 100) * amount
  return stage
}
