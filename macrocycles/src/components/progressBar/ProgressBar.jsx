import { View } from 'react-native'
import Style from './StyleProgressBar'
import UnitProgress from '../unitProgress/UnitProgress'
import IndicationName from '../indicationName/IndicationName'
import { useContext } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Txt from '../Txt/Txt'
import formatDateToString from '../../logic/formatDateToString'
import ListProgress from '../listProgress/ListProgress'
import DatesBars from '../datesBars/DatesBars'

export default function ProgressBar ({
  macrocycle,
  microcycles,
  mesocycles,
  timeFrames
}) {
  const colors = {
    macrocycle: {
      orange: macrocycle.name
    },
    mesocycle: {
      blue: mesocycles.length > 0
    },
    microcycle: {
      green: microcycles.length > 0
    },
    timeFrame: {
      red: timeFrames.length > 0 && timeFrames[0].startDate
    }
  }

  const { roadMap } = useContext(RoatMapContext)
  const { startDate, endDate, durationInDays } = roadMap.data

  return (
    <View style={Style.containerUnits}>
      <View style={Style.containerIndications}>
        <IndicationName text='Macrociclos' gray {...colors.macrocycle} />
        <IndicationName text='Periodo' gray {...colors.mesocycle} />
        <IndicationName text='Microciclos' gray {...colors.microcycle} />
      </View>
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
      <ListProgress arrayContent={mesocycles} {...colors.mesocycle} />
      <ListProgress arrayContent={microcycles} {...colors.microcycle} />
    </View>
  )
}
