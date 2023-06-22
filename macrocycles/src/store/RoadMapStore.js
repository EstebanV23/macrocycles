import { createContext, useEffect, useState } from 'react'
import useCount from '../hooks/useCount'
import { useNavigate } from 'react-router-native'
import { Alert } from 'react-native'
import formatDataFromDate from '../logic/formatDataFromDate'
import getAllDatesBetween from '../logic/getAllDatesBetween'
import AsyncStorage from '@react-native-async-storage/async-storage'
import frames from '../constants/frames'
import getTimeFramesPercent from '../logic/getTimeFramesPercent'
import * as stagesMacro from '../constants/stages'
import getStages from '../logic/getStages'
import theme from '../theme/theme'
import getDiferenceHours from '../logic/getDiferenceHours'
import { getDataBetweenDates } from '../logic/getsWithDate'

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

const generateMicro = (startDate, endDate, id) => {
  const micro = {
    startDate,
    endDate,
    id,
    printer: {
      [startDate]: { startingDay: true, selected: true, color: theme.colors.micros, textColor: '#ffffff' },
      [endDate]: { endingDay: true, selected: true, color: theme.colors.micros, textColor: '#ffffff' },
      ...getAllDatesBetween(startDate, endDate, 'purple')
    }
  }
  return micro
}

export const generatePrinter = (itemSelected, color, dot, micros, frames) => {
  const objectDotStart = dot && micros && frames ? { ...getDataBetweenDates(micros, itemSelected.startDate).printer[itemSelected.startDate], ...getDataBetweenDates(frames, itemSelected.startDate).printer[itemSelected.startDate], startingDay: true, selected: true, marked: true, dotColor: color } : { startingDay: true, selected: true, color, textColor: '#ffffff' }
  const objectDotEnd = dot && micros && frames ? { ...getDataBetweenDates(micros, itemSelected.endDate).printer[itemSelected.endDate], ...getDataBetweenDates(frames, itemSelected.endDate).printer[itemSelected.endDate], endingDay: true, selected: true, marked: true, dotColor: color } : { endingDay: true, selected: true, color, textColor: '#ffffff' }
  console.log({ objectDotStart, objectDotEnd })
  const item = {
    printer: {
      [itemSelected.startDate]: objectDotStart,
      [itemSelected.endDate]: objectDotEnd
    }
  }
  return item
}

const generateMicrosWithData = (quantity, daysMicros, startDate, endDate, mesos) => {
  const micros = []
  const lastMicrocycle = quantity - 1
  let lastEndDate = startDate
  for (let i = 0; i < quantity; i++) {
    const startDateMicro = lastEndDate === startDate ? lastEndDate : formatDataFromDate(lastEndDate, true, 2)
    const endDateMicro = i === lastMicrocycle ? endDate : formatDataFromDate(startDate, true, (i + 1) * daysMicros)
    lastEndDate = endDateMicro
    micros.push(generateMicro(startDateMicro, endDateMicro, i, mesos))
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
    timeFrames: frames,
    stages: stagesMacro.stages
  }
}

export default function RoadMapStore ({ children }) {
  const [roadMap, setRoadMap] = useState(initialRoatMap)
  const [count, increment, decrement, reset] = useCount(1)
  const [currentFunction, setCurrentFunction] = useState(null)
  const [amountMicros, setAmountMicros] = useState(0)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    roadMap.currentStage && navigate(roadMap.currentStage.path)
  }, [count])

  const updateAll = ({ macrocycle, timeFrames, stages, mesocycles, microcycles }) => {
    const newRoadMap = JSON.parse(JSON.stringify(roadMap))
    newRoadMap.data.macrocycle = macrocycle ?? newRoadMap.data.macrocycle
    newRoadMap.data.timeFrames = timeFrames ?? newRoadMap.data.timeFrames
    newRoadMap.data.stages = stages ?? newRoadMap.data.stages
    newRoadMap.data.mesocycles = mesocycles ?? newRoadMap.data.mesocycles
    newRoadMap.data.microcycles = microcycles ?? newRoadMap.data.microcycles
    setRoadMap(newRoadMap)
  }

  const setStartDate = (date) => {
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.startDate = date
    if (newRoapMap.data.endDate) {
      const { days } = getDiferenceHours(date, newRoapMap.data.endDate)
      newRoapMap.data.durationInDays = days + 1
    }
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
    if (newRoapMap.data.startDate) {
      const { days } = getDiferenceHours(newRoapMap.data.startDate, date)
      newRoapMap.data.durationInDays = days + 1
    }
    setRoadMap(newRoapMap)
  }

  const generateMicros = (amountMicro, initialDayMicro, initialLastDayMicro, startDate, endDate) => {
    setLoading(true)
    const newRoapMap = JSON.parse(JSON.stringify(roadMap))
    newRoapMap.data.initialDayMicro = initialDayMicro
    newRoapMap.data.initialLastDayMicro = initialLastDayMicro
    const micros = generateMicrosWithData(amountMicro, initialDayMicro, startDate, endDate, newRoapMap.data.mesocycles)
    newRoapMap.data.microcycles = micros
    const newTimeFrames = getTimeFramesPercent(micros, newRoapMap.data.timeFrames)
    const newStages = getStages(newTimeFrames, micros, newRoapMap.data.stages)
    newRoapMap.data.timeFrames = newTimeFrames
    newRoapMap.data.stages = newStages
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

  const nextStage = async () => {
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
    setStartDate,
    setEndDate,
    setNameMacro,
    generateMicros,
    loading,
    updateAll
  }

  return (
    <RoatMapContext.Provider value={values}>
      {children}
    </RoatMapContext.Provider>
  )
}
