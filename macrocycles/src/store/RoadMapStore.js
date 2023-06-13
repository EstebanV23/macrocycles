import { createContext, useContext, useEffect, useState } from 'react'
import useCount from '../hooks/useCount'
import { useNavigate } from 'react-router-native'
import { Alert } from 'react-native'
import formatDataFromDate from '../logic/formatDataFromDate'
import getAllDatesBetween from '../logic/getAllDatesBetween'
import colorsSelector, { MICROCYCLE } from '../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoadingContext } from './LoadingStore'
import frames from '../constants/frames'
import getMicrosPercent from '../logic/getMicrosPercent'

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

const generateMicro = (startDate, endDate, identity) => {
  const micro = {
    startDate,
    endDate,
    identity,
    printer: {
      [startDate]: { startingDay: true, selected: true, color: colorsSelector(MICROCYCLE, true), textColor: '#ffffff' },
      [endDate]: { endingDay: true, selected: true, color: colorsSelector(MICROCYCLE, true), textColor: '#ffffff' },
      ...getAllDatesBetween(startDate, endDate, 'green')
    }
  }
  return micro
}

const generateMicrosWithData = (quantity, daysMicros, startDate, endDate) => {
  const micros = []
  const lastMicrocycle = quantity - 1
  let lastEndDate = startDate
  for (let i = 0; i < quantity; i++) {
    const startDateMicro = lastEndDate === startDate ? lastEndDate : formatDataFromDate(lastEndDate, true, 2)
    const endDateMicro = i === lastMicrocycle ? endDate : formatDataFromDate(startDate, true, (i + 1) * daysMicros)
    lastEndDate = endDateMicro
    micros.push(generateMicro(startDateMicro, endDateMicro, i))
  }
  return micros
}

const initialRoatMap = {
  currentStage: null,
  stagesCompleted: [],
  finished: false,
  data: {
    amountMicros: 0,
    durationInDays: 0,
    initialDayMicro: null,
    initialLastDayMicro: null,
    startDate: null,
    endDate: null,
    microcycles: [],
    macrocycle: {},
    mesocycles: [],
    timeFrames: frames
  }
}

export default function RoadMapStore ({ children }) {
  const [roadMap, setRoadMap] = useState(initialRoatMap)
  const [count, increment, decrement, reset] = useCount(1)
  const [currentFunction, setCurrentFunction] = useState(null)
  const [amountMicros, setAmountMicros] = useState(0)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // console.log('🚀 ~ file: RoadMapStore.js:66 ~ initialRoatMap:', initialRoatMap)
  // console.log('🚀 ~ file: RoadMapStore.js:66 ~ roadMap:', roadMap)

  useEffect(() => {
    roadMap.currentStage && navigate(roadMap.currentStage.path)
  }, [count])

  const setStartDate = (date) => {
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.startDate = date
    setRoadMap(newRoapMap)
  }

  const setDifferentDays = (days) => {
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.durationInDays = days
    setRoadMap(newRoapMap)
  }

  const setNameMacro = (name) => {
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.macrocycle.name = name || null
    setRoadMap(newRoapMap)
  }

  const setEndDate = (date) => {
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.endDate = date
    setRoadMap(newRoapMap)
  }

  const setDataFirstStage = async (startDate, endDate, name, amountMicro, differentsDays, initialDayMicro, initialLastDayMicro) => {
    setLoading(true)
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.startDate = startDate
    newRoapMap.data.endDate = endDate
    newRoapMap.data.macrocycle.name = name
    newRoapMap.data.amountMicros = amountMicro
    newRoapMap.data.durationInDays = differentsDays
    newRoapMap.data.initialDayMicro = initialDayMicro
    newRoapMap.data.initialLastDayMicro = initialLastDayMicro
    const micros = generateMicrosWithData(amountMicro, initialDayMicro, startDate, endDate)
    newRoapMap.data.microcycles = micros
    setRoadMap(newRoapMap)
    return newRoapMap
  }

  const generateMicros = (amountMicro, initialDayMicro, initialLastDayMicro, startDate, endDate) => {
    setLoading(true)
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.initialDayMicro = initialDayMicro
    newRoapMap.data.initialLastDayMicro = initialLastDayMicro
    const micros = generateMicrosWithData(amountMicro, initialDayMicro, startDate, endDate)
    newRoapMap.data.microcycles = micros
    const newTimeFrames = getMicrosPercent(micros, newRoapMap.data.timeFrames)
    newRoapMap.data.timeFrames = newTimeFrames
    setRoadMap(newRoapMap)
    setLoading(false)
  }

  const restartRoadMap = () => {
    setRoadMap(initialRoatMap)
  }

  const initRoadMap = (roadMap) => {
    if (roadMap) {
      setRoadMap(roadMap)
      navigate(roadMap.currentStage.path)
      return roadMap
    }
    const newRoapMap = JSON.parse(JSON.stringify(initialRoatMap))
    newRoapMap.currentStage = stages.find(stage => stage.roadPosition === MIN_STAGE)
    setRoadMap(newRoapMap)
    reset()
    navigate(newRoapMap.currentStage.path)
    return newRoapMap
  }

  const nextStage = async (roadMap) => {
    setLoading(true)
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
    await AsyncStorage.setItem('roadMap', JSON.stringify(currentRoapMap))
    setLoading(false)
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
        onPress: async () => {
          setLoading(true)
          await AsyncStorage.removeItem('roadMap')
          setRoadMap(initialRoatMap)
          setLoading(false)
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
    setDataFirstStage,
    setStartDate,
    setEndDate,
    setNameMacro,
    setDifferentDays,
    generateMicros,
    loading
  }

  return (
    <RoatMapContext.Provider value={values}>
      {children}
    </RoatMapContext.Provider>
  )
}
