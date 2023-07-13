import serviceNewMicrocycle from './serviceNewMicrocycle'
import transformToArrayId from '../logic/transformToArrayId'
import serviceNewTimeFrame from './serviceNewTimeFrame'
import serviceNewStage from './serviceNewStage'
import serviceAddMacroToUser from './serviceAddMacroToUser'
import serviceNewMesocycle from './serviceNewMesocycle'
import serviceNewMacrocycle from './serviceNewMacrocycle'

export default async function serviceAllDataMacro (data, user) {
  if (!data) throw new Error('No se ha definido el roadMap')
  const { startDate, endDate, macrocycle, mesocycles, stages, timeFrames, typeMacrocycle } = data

  const objectMacrocycle = {
    startDate,
    endDate,
    type: typeMacrocycle,
    name: macrocycle.name
  }

  const fetchMesos = await Promise.all(mesocycles.map(async (meso) => {
    const fetchMicros = await Promise.all(meso.microcycles.map(async (micro) => {
      const microFetch = await serviceNewMicrocycle(micro)
      return microFetch.data
    }))
    const micros = transformToArrayId(fetchMicros)
    const mesoWithMicros = { ...meso, microcycles: micros }
    const mesoFetch = await serviceNewMesocycle(mesoWithMicros)
    return mesoFetch.data
  }))
  console.log('🚀 ~ file: serviceAllDataMacro.js:33 ~ fetchMesos ~ fetchMesos:', fetchMesos)

  const mesosNew = transformToArrayId(fetchMesos)

  console.log('🚀 ~ file: serviceAllDataMacro.js:33 ~ fetchMesos ~ mesosNew:', mesosNew)
  const fetchTimeFrames = await Promise.all(timeFrames.map(async (frame) => {
    const timeFrameFetch = await serviceNewTimeFrame(frame)
    return timeFrameFetch.data
  }))

  const framesNew = transformToArrayId(fetchTimeFrames)

  const fetchStages = await Promise.all(stages.map(async (stage) => {
    console.log('🚀 ~ file: serviceAllDataMacro.js:43 ~ fetchStages ~ stage:', stage)
    const stageFetch = await serviceNewStage(stage)
    console.log('🚀 ~ file: serviceAllDataMacro.js:45 ~ fetchStages ~ stageFetch:', stageFetch)
    return stageFetch.data
  }))
  console.log('🚀 ~ file: serviceAllDataMacro.js:46 ~ fetchStages ~ fetchStages:', fetchStages)

  const stagesNew = transformToArrayId(fetchStages)
  console.log('🚀 ~ file: serviceAllDataMacro.js:51 ~ serviceAllDataMacro ~ stagesNew:', stagesNew)

  objectMacrocycle.time_frame = framesNew
  objectMacrocycle.mesocycles = mesosNew
  objectMacrocycle.stages = stagesNew
  objectMacrocycle.components = []
  console.log('🚀 ~ file: serviceAllDataMacro.js:57 ~ serviceAllDataMacro ~ objectMacrocycle:', objectMacrocycle)
  const macroNew = await serviceNewMacrocycle(objectMacrocycle)
  console.log('🚀 ~ file: serviceAllDataMacro.js:57 ~ serviceAllDataMacro ~ macroNew:', macroNew)

  return await serviceAddMacroToUser(macroNew.data, user)
}
