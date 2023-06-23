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

export default function MesoInfo () {
  const { roadMap, addMesos, previewMeso } = useContext(RoatMapContext)
  const { microcycles, mesocycles } = roadMap.data
  const [microsSelected, setMicrosSelected] = useState(0)
  const [amountMicrosSelected, setAmountMicrosSelected] = useState(0)
  const [lastAmount, setLastAmount] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [direction, setDirection] = useState(0)
  const [typeSelected, setTypeSelected] = useState(null)
  const [openMeso, setOpenMeso] = useState(false)
  const [elementsMicros, setElementsMicros] = useState([])
  const allMesos = typesMesocycles.length
  const amountMicros = microcycles.length - 1

  useEffect(() => {
    if (direction > 0) {
      console.log({ currentPosition })
      if (elementsMicros.length === 0) return
      setCurrentPosition(currentPosition + 1)
      setLastAmount(microsSelected)
      setAmountMicrosSelected(0)
      setTypeSelected(null)
      setElementsMicros([])
      return
    }
    const newPosition = currentPosition - 1
    setCurrentPosition(newPosition < 1 ? 0 : newPosition)
    setMicrosSelected(microsSelected - amountMicrosSelected)
    setAmountMicrosSelected(mesocycles[newPosition]?.microcycles?.length ?? 0)
  }, [direction])

  useEffect(() => {
    if (amountMicrosSelected < 0 || !typeSelected) return
    const microsSelecteds = microcycles.slice(lastAmount, lastAmount + amountMicrosSelected)
    setElementsMicros(microsSelecteds)
    const newMeso = generateMesos({ type: typeSelected, microcycles: microsSelecteds, currentPosition })
    previewMeso(newMeso, currentPosition)
    setMicrosSelected(lastAmount + amountMicrosSelected)
  }, [amountMicrosSelected])

  useEffect(() => {
    if (typeSelected === null || elementsMicros.length === 0) return
    const newMeso = generateMesos({ type: typeSelected, microcycles: elementsMicros, currentPosition })
    previewMeso(newMeso, currentPosition)
  }, [typeSelected])

  return (
    <View>
      <Txt quick style={{ textAlign: 'center' }}>Cantidad de microciclos disponibles: <Txt>{amountMicros - microsSelected}</Txt></Txt>
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
            if (typeSelected === null) return
            return setAmountMicrosSelected(amountMicrosSelected + 1)
          }}
          style={[Style.containerPressable, Style.containerPressableColor, Style.success]}
        >
          <Icon name='checkerboard-plus' size={17} color={theme.colors.green[400]} />
        </Pressable>
      </View>
      <Select
        items={typesMesocycles}
        placeholder='Selecciona un tipo de mesociclo'
        open={openMeso}
        setOpen={setOpenMeso}
        selectedValue={typeSelected}
        setSelectedValue={setTypeSelected}
      />
      {
        elementsMicros.map(micro => (
          <View key={micro.id}>
            <Txt>{micro.startDate}</Txt>
            <Txt>{micro.endDate}</Txt>
          </View>
        ))
      }
      <Txt quick style={{ textAlign: 'center' }}>Microciclos seleccionados: <Txt>{lastAmount + amountMicrosSelected}</Txt></Txt>
    </View>
  )
}
