import { createContext, useState } from 'react'

export const RoatMapContext = createContext()

const stages = [
  {
    roadPosition: 1,
    refrence: 'macroInfo',
    path: '/new-macro/macroInfo',
    completed: false
  },
  {
    roadPosition: 2,
    refrence: 'frameAndStage',
    path: '/new-macro/frameAndStage',
    completed: false
  },
  {
    roadPosition: 3,
    refrence: 'mesoInfo',
    path: '/new-macro/mesoInfo',
    completed: false
  }
]

const ALL_STAGES = stages.length
const MIN_STAGE = 1

const initialRoatMap = {
  currentStage: null,
  stagesCompleted: [],
  finished: false
}

export default function RoadMapStore ({ children }) {
  const [roadMap, setRoadMap] = useState(initialRoatMap)

  const restartRoadMap = () => {
    setRoadMap(initialRoatMap)
  }

  const initRoadMap = () => {
    const newRoapMap = structuredClone(roadMap)
    newRoapMap.currentStage = stages.find(stage => stage.roadPosition === 1)
    newRoapMap.currentStage.currentMake = true
    setRoadMap(newRoapMap)
  }

  const nextStage = () => {
    const currentRoapMap = structuredClone(roadMap)
    const { currentStage } = currentRoapMap
    currentStage.completed = true
    const currentNumberStage = currentStage.roadPosition
    const nextNumberStage = currentNumberStage + 1
    if (nextNumberStage > ALL_STAGES) {
      currentRoapMap.finished = true
      setRoadMap(currentRoapMap)
      return
    }
    const nextStage = stages.find(stage => stage.roadPosition === nextNumberStage)
    currentRoapMap.stagesCompleted.push(currentStage)
    currentRoapMap.currentStage = nextStage
    setRoadMap(currentRoapMap)
  }

  const previusStage = () => {
    const currentRoapMap = structuredClone(roadMap)
    const { currentStage } = currentRoapMap
    const previusNumberStage = currentStage.roadPosition - 1
    if (previusNumberStage < MIN_STAGE) {
      setRoadMap(initialRoatMap)
      return false
    }
    const previusStage = stages.find(stage => stage.roadPosition === previusNumberStage)
    currentRoapMap.currentStage = previusStage
    setRoadMap(currentRoapMap)
    return true
  }

  const values = {
    roadMap,
    restartRoadMap,
    initRoadMap,
    nextStage,
    previusStage
  }

  return (
    <RoatMapContext.Provider value={values}>
      {children}
    </RoatMapContext.Provider>
  )
}
