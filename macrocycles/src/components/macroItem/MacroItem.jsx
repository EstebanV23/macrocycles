
import PressableLink, { PressableLinkEdit } from '../pressableLink/PressableLink'
import Style from './StyleMacroItem'
import Txt from '../Txt/Txt'
import IndicationButton from '../indicationButton/IndicationButton'
import { useState } from 'react'
import theme from '../../theme/theme'
import { View } from 'react-native'
import formatDateToString from '../../logic/formatDateToString'
import typeMicrocycles from '../../constants/typesMicrocycles'
import typesMesocycles from '../../constants/typesMesocycles'

export default function MacroItem ({ macrocycle }) {
  const today = new Date()
  const firstDate = new Date(macrocycle.start_date)
  const lastDate = new Date(macrocycle.end_date)

  const [timeFrameSelected, setTimeFrameSelected] = useState(() => {
    if (today <= firstDate) return macrocycle.time_frame[0]
    if (today >= lastDate) return macrocycle.time_frame[macrocycle.time_frame.length - 1]

    const timeFrame = macrocycle.time_frame.find((timeFrame) => {
      const startDate = new Date(timeFrame.start_date)
      const endDate = new Date(timeFrame.end_date)
      return today >= startDate && today <= endDate
    })

    return timeFrame
  })

  const [stageSelected, setStageSelected] = useState(() => {
    if (today <= firstDate) return macrocycle.stages[0]
    if (today >= lastDate) return macrocycle.stages[macrocycle.stages.length - 1]

    const stage = macrocycle.stages.find((stage) => {
      const startDate = new Date(stage.start_date)
      const endDate = new Date(stage.end_date)
      return today >= startDate && today <= endDate
    })

    return stage
  })

  const [mesoSelected, setMesoSelected] = useState(() => {
    if (today <= firstDate) return macrocycle.mesocycles[0]
    if (today >= lastDate) return macrocycle.mesocycles[macrocycle.mesocycles.length - 1]

    const meso = macrocycle.mesocycles.find((meso) => {
      const startDate = new Date(meso.start_date)
      const endDate = new Date(meso.end_date)
      return today >= startDate && today <= endDate
    })

    return meso
  })

  const [microSelected, setMicroSelected] = useState(() => {
    if (today <= firstDate) return mesoSelected.microcycles[0]
    if (today >= lastDate) return mesoSelected.microcycles[mesoSelected.microcycles.length - 1]

    const micro = mesoSelected.microcycles.find((micro) => {
      const startDate = new Date(micro.start_date)
      const endDate = new Date(micro.end_date)
      return today >= startDate && today <= endDate
    })

    return micro
  })

  const [amountMicros, setAmountMicros] = useState(() => {
    const micros = macrocycle.mesocycles.reduce((acc, meso) => acc + meso.microcycles.length, 0)
    return micros
  })

  return (
    <PressableLinkEdit
      to={`/macrocycles/${macrocycle.id}`}
      style={Style.contentMacro}
    >
      <View style={Style.containerInfo}>
        <Txt quickBold big style={Style.nameText}>{macrocycle.name}</Txt>
        <View style={Style.containerIndications}>
          <IndicationButton text={timeFrameSelected.type} color={theme.colors.timeFrames} />
          <IndicationButton text={stageSelected.type} color={theme.colors.stages} />
          <IndicationButton text={typesMesocycles.find(item => item.value === Number(mesoSelected.type)).label} color={theme.colors.micros} />
          <IndicationButton text={typeMicrocycles.find(item => item.value === Number(microSelected.type)).label} color={theme.colors.micros} />
        </View>
      </View>
      <View style={Style.containerDates}>
        <Txt quick><Txt quickBold>Inicio:</Txt> {formatDateToString(macrocycle.start_date, true)}</Txt>
        <Txt quick><Txt quickBold>Fin:</Txt> {formatDateToString(macrocycle.end_date, true)}</Txt>
      </View>
      <Txt quick><Txt quickBold>Microciclos creados:</Txt> {amountMicros}</Txt>
    </PressableLinkEdit>
  )
}
