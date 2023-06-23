import { View, ScrollView } from 'react-native'
import Style from './StyleProgressBar'
import UnitProgress from '../unitProgress/UnitProgress'
import IndicationName from '../indicationName/IndicationName'
import { useContext } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Txt from '../Txt/Txt'
import formatDateToString from '../../logic/formatDateToString'
import ListProgress from '../listProgress/ListProgress'
import DatesBars from '../datesBars/DatesBars'
import typesMesocycles from '../../constants/typesMesocycles'
import typeMicrocycles from '../../constants/typesMicrocycles'

export default function ProgressBar ({
  macrocycle,
  microcycles,
  mesocycles,
  timeFrames,
  stages
}) {
  const colors = {
    macrocycle: {
      orange: macrocycle.name
    },
    mesocycle: {
      mesocycle: mesocycles.length > 0
    },
    microcycle: {
      purple: microcycles.length > 0
    },
    timeFrame: {
      blue: timeFrames.length > 0 && timeFrames[0].startDate
    },
    stage: {
      menta: stages.length > 0 && stages[0].startDate
    }
  }

  const { roadMap } = useContext(RoatMapContext)
  const { startDate, endDate, durationInDays } = roadMap.data

  return (
    <View style={Style.containerUnits}>
      <View style={Style.containerIndications}>
        <IndicationName text='Macrociclos' gray {...colors.macrocycle} />
        <IndicationName text='Periodo' gray {...colors.timeFrame} />
        <IndicationName text='Etapa' gray {...colors.stage} />
        <IndicationName text='Microciclos' gray {...colors.microcycle} />
        <IndicationName text='Mesociclo' gray {...colors.mesocycle} />
      </View>
      <ScrollView
        horizontal
        style={Style.containerScroll}
      >
        <View
          style={[Style.contentUnits, Style.widthUnits(microcycles.length > 22 ? microcycles.length : 22)]}
        >
          <View style={Style.containerDates}>
            <Txt megaSmall gray>{formatDateToString(startDate)}</Txt>
            <Txt megaSmall gray>{durationInDays} días</Txt>
            <Txt megaSmall gray>{formatDateToString(endDate)}</Txt>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'flex-end' }}>
            <DatesBars days={durationInDays} endDate={endDate} startDate={startDate} />
          </View>
          <UnitProgress full={macrocycle} {...colors.macrocycle} />
          <ListProgress arrayContent={timeFrames} {...colors.timeFrame} />
          <ListProgress arrayContent={stages} {...colors.stage} />
          <ListProgress arrayContent={mesocycles} types={typesMesocycles} />
          <ListProgress arrayContent={microcycles} types={typeMicrocycles} {...colors.microcycle} />
        </View>
      </ScrollView>
    </View>
  )
}
