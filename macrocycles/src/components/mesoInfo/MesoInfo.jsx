import { useContext, useEffect, useState } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Txt from '../Txt/Txt'
import typesMesocycles from '../../constants/typesMesocycles'
import { View } from 'react-native'
import Style from './StyleMesoInfo'
import { Icon, Pressable } from '@react-native-material/core'
import theme from '../../theme/theme'
import generateMesos from '../../logic/generateMesos'
import Select from '../select/Select'
import { UserContext } from '../../store/UserStore'
import MicroInfo from '../microInfo/MicroInfo'

export default function MesoInfo () {
  const { roadMap, previewMeso, setCurrentFunction } = useContext(RoatMapContext)
  const { newAlert } = useContext(UserContext)
  const { microcycles, mesocycles } = roadMap.data
  const [microsSelected, setMicrosSelected] = useState(0)
  const [amountMicrosSelected, setAmountMicrosSelected] = useState(0)
  const [lastAmount, setLastAmount] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [direction, setDirection] = useState(0)
  const [typeSelected, setTypeSelected] = useState(null)
  const [openMeso, setOpenMeso] = useState(false)
  const [elementsMicros, setElementsMicros] = useState([])
  const [microsSelectedsInfo, setMicrosSelectedsInfo] = useState([])
  const [leftMicros, setLeftMicros] = useState(microcycles.length)
  const amountMicros = microcycles.length - 1

  useEffect(() => {
    setCurrentFunction(() => () => {
      newAlert('error', 'Debes terminar de llenar la información de la fase actual para continuar')
      return false
    })
    if (direction > 0) {
      if (amountMicrosSelected === 0) return
      if (currentPosition > typesMesocycles.length - 2 && leftMicros === 0) {
        newAlert('success', 'Presiona el botón de continuar para guardar la información del macrociclo completo')
        setCurrentFunction(() => () => {
          return true
        })
        return
      }
      if (elementsMicros.length === 0) return
      const newPosition = currentPosition + 1
      setCurrentPosition(newPosition)
      setLastAmount(microsSelected)
      setAmountMicrosSelected(0)
      setTypeSelected(null)
      setElementsMicros([])
      return
    }
    const newPosition = currentPosition - 1
    setCurrentPosition(newPosition < 0 ? 0 : newPosition)
    setMicrosSelected(microsSelected - amountMicrosSelected)
    setTypeSelected(mesocycles[newPosition]?.type ?? null)
    setAmountMicrosSelected(mesocycles[newPosition]?.microcycles?.length ?? 0)
    setElementsMicros(mesocycles[newPosition]?.microcycles || [])
    setLastAmount(lastAmount - (mesocycles[newPosition]?.microcycles?.length ?? 0))
  }, [direction])

  useEffect(() => {
    if (amountMicrosSelected < 0 || !typeSelected) {
      setAmountMicrosSelected(0)
      return
    }
    const microsSelecteds = microcycles.slice(lastAmount, lastAmount + amountMicrosSelected)
    const newMicros = microsSelecteds.map(micro => {
      const newMicroInfo = microsSelectedsInfo.find(microInfo => microInfo.id === micro.id)
      if (!newMicroInfo) return micro
      return {
        ...micro,
        type: newMicroInfo.type,
        frequency: newMicroInfo.frequency,
        test: newMicroInfo.test
      }
    })
    setElementsMicros(newMicros)
    const newMeso = generateMesos({ type: typeSelected, microcycles: newMicros, currentPosition })
    previewMeso(newMeso, currentPosition)
    setMicrosSelected(lastAmount + amountMicrosSelected)
  }, [amountMicrosSelected, microsSelectedsInfo])

  useEffect(() => {
    setLeftMicros(amountMicros - microsSelected + 1)
  }, [amountMicros, microsSelected])

  useEffect(() => {
    if (typeSelected === null || elementsMicros.length === 0) return
    const newMicros = elementsMicros.map(micro => {
      const newMicroInfo = microsSelectedsInfo.find(microInfo => microInfo.id === micro.id)
      if (!newMicroInfo) return micro
      return {
        ...micro,
        type: newMicroInfo.type,
        frequency: newMicroInfo.frequency,
        test: newMicroInfo.test
      }
    })
    const newMeso = generateMesos({ type: typeSelected, microcycles: newMicros, currentPosition })
    previewMeso(newMeso, currentPosition)
  }, [typeSelected, microsSelectedsInfo])

  return (
    <View>
      <Txt quick style={{ textAlign: 'center' }}>Cantidad de microciclos disponibles: <Txt>{leftMicros}</Txt></Txt>
      <Select
        items={typesMesocycles}
        placeholder='Selecciona un tipo de mesociclo'
        open={openMeso}
        setOpen={setOpenMeso}
        selectedValue={typeSelected}
        setSelectedValue={setTypeSelected}
      />
      <MicroInfo
        micros={elementsMicros}
        setMicrosSelecteds={setMicrosSelectedsInfo}
      />
      <View style={Style.contentAdd}>
        <Pressable
          onPress={() => {
            if (typeSelected === null) return
            return setAmountMicrosSelected(amountMicrosSelected - 1)
          }}
          style={[Style.containerPressable, Style.containerPressableColor, Style.error]}
        >
          <Icon name='checkerboard-minus' size={17} color={theme.colors.red[400]} />
        </Pressable>
        <Txt>{amountMicrosSelected}</Txt>
        <Pressable
          onPress={() => {
            if (typeSelected === null || leftMicros === 0) return
            return setAmountMicrosSelected(amountMicrosSelected + 1)
          }}
          style={[Style.containerPressable, Style.containerPressableColor, Style.success]}
        >
          <Icon name='checkerboard-plus' size={17} color={theme.colors.green[400]} />
        </Pressable>
      </View>
      <Txt quick style={{ textAlign: 'center' }}>Microciclos seleccionados: <Txt>{lastAmount + amountMicrosSelected}</Txt></Txt>
      <View style={Style.container}>
        <Pressable
          onPress={() => setDirection(-1 * currentPosition - 1)}
          style={Style.containerPressable}
        >
          <Icon name='arrow-left' size={23} color={theme.colors.blue.default} />
        </Pressable>
        <Pressable
          onPress={() => setDirection(1 * currentPosition + 1)}
          style={Style.containerPressable}
        >
          <Icon name='arrow-right' size={23} color={theme.colors.blue.default} />
        </Pressable>
      </View>
    </View>
  )
}
