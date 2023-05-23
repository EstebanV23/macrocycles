import { createContext, useEffect, useState } from 'react'
import useCount from '../hooks/useCount'
import { useNavigate } from 'react-router-native'
import { Alert } from 'react-native'

export const RoatMapContext = createContext()

const stages = [
  {
    roadPosition: 1,
    refrence: 'macroInfo',
    text: 'Info macrociclo',
    path: '/new-macro/macroInfo',
    completed: false
  },
  {
    roadPosition: 2,
    refrence: 'frameAndStage',
    text: 'Periodo & Etapa',
    path: '/new-macro/frameAndStage',
    completed: false
  },
  {
    roadPosition: 3,
    text: 'Info Mesociclo',
    refrence: 'mesoInfo',
    path: '/new-macro/mesoInfo',
    completed: false
  }
]

const ALL_STAGES = stages.length
const MIN_STAGE = 1
let count = 1

const generateMicro = (startDate, endDate) => {
  const micro = {
    startDate,
    endDate,
    identity: count
  }
  count++
  return micro
}

const generateMicros = (quantity) => {
  const micros = []
  for (let i = 0; i < quantity; i++) {
    micros.push(generateMicro(null, null))
  }
  return micros
}

const initialRoatMap = {
  currentStage: null,
  stagesCompleted: [],
  finished: false,
  amountMicros: 0,
  data: {
    startDate: null,
    endDate: null,
    microcycles: [],
    macrocycle: {},
    mesocycles: []
  }
}

export default function RoadMapStore ({ children }) {
  const [roadMap, setRoadMap] = useState(initialRoatMap)
  const [count, increment, decrement, reset] = useCount(1)
  const [currentFunction, setCurrentFunction] = useState(null)
  const [amountMicros, setAmountMicros] = useState(0)
  const navigate = useNavigate()

  // console.log('🚀 ~ file: RoadMapStore.js:66 ~ initialRoatMap:', initialRoatMap)
  console.log('🚀 ~ file: RoadMapStore.js:66 ~ roadMap:', roadMap)

  useEffect(() => {
    roadMap.currentStage && navigate(roadMap.currentStage.path)
  }, [count])

  useEffect(() => {
    const newMicros = generateMicros(amountMicros)
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.microcycles = newMicros
    setRoadMap(newRoapMap)
  }, [amountMicros])

  const setDataFirstStage = (startDate, endDate, name, amountMicro) => {
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.startDate = startDate
    newRoapMap.data.endDate = endDate
    newRoapMap.data.macrocycle.name = name
    newRoapMap.amountMicros = amountMicro
    const micros = generateMicros(amountMicro)
    newRoapMap.data.microcycles = micros
    console.log('🚀 ~ file: RoadMapStore.js:95 ~ setDataFirstStage ~ newRoapMap:', newRoapMap)
    setRoadMap(newRoapMap)
    return newRoapMap
  }

  const restartRoadMap = () => {
    setRoadMap(initialRoatMap)
  }

  const initRoadMap = () => {
    const newRoapMap = JSON.parse(JSON.stringify(initialRoatMap))
    newRoapMap.currentStage = stages.find(stage => stage.roadPosition === MIN_STAGE)
    setRoadMap(newRoapMap)
    reset()
    navigate(newRoapMap.currentStage.path)
    return newRoapMap
  }

  const nextStage = (roadMap) => {
    const currentRoapMap = JSON.parse(JSON.stringify(roadMap))
    const { currentStage } = currentRoapMap
    currentStage.completed = true
    const currentNumberStage = currentStage.roadPosition
    const nextNumberStage = currentNumberStage + 1
    if (nextNumberStage > ALL_STAGES) {
      currentRoapMap.finished = true
      setRoadMap(currentRoapMap)
      return currentRoapMap
    }
    increment()
    const nextStage = stages.find(stage => stage.roadPosition === nextNumberStage)
    currentRoapMap.stagesCompleted.push(currentStage)
    currentRoapMap.currentStage = nextStage
    setRoadMap(currentRoapMap)
    return currentRoapMap
  }

  const previusStage = () => {
    const currentRoapMap = JSON.parse(JSON.stringify(roadMap))
    const { currentStage } = currentRoapMap
    const previusNumberStage = currentStage.roadPosition - 1
    decrement()
    if (previusNumberStage < MIN_STAGE) {
      Alert.alert('Cancelar información', 'Si aceptas se perderán los datos que llevas almacenados, si no lo deseas hacer, presiona por fuera de esta alerta', [{
        text: 'Si, cancelar información',
        onPress: () => {
          setRoadMap(initialRoatMap)
          navigate('/')
          return false
        }
      }], { cancelable: true, onDismiss: () => { return false } })
      return
    }
    const previusStage = stages.find(stage => stage.roadPosition === previusNumberStage)
    currentRoapMap.currentStage = previusStage
    console.log('🚀 ~ file: RoadMapStore.js:156 ~ previusStage ~ currentRoapMap:', currentRoapMap)
    setRoadMap(currentRoapMap)
    return true
  }

  const values = {
    roadMap,
    restartRoadMap,
    initRoadMap,
    nextStage,
    previusStage,
    count,
    reset,
    setCurrentFunction,
    currentFunction,
    amountMicros,
    setAmountMicros,
    setDataFirstStage
  }

  return (
    <RoatMapContext.Provider value={values}>
      {children}
    </RoatMapContext.Provider>
  )
}
