import { View } from 'react-native'
import UnitProgress from '../unitProgress/UnitProgress'
import Style from './StyleListProgress'
import Txt from '../Txt/Txt'
import { useContext } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import getDiferenceHours from '../../logic/getDiferenceHours'
import getTypeFromNumber from '../../logic/getTypeFromNumber'

function getDay (date) {
  if (!date) return null
  const [year, month, day] = date.split('-')
  return day
}

function getType (types, item) {
  const type = ((item.startDate && !types) || !item.type) ? item.type : (item.startDate && getTypeFromNumber(types, item.type))
  return type && type.length > 13 ? `${type.slice(0, 13)}...` : type
}

export default function ListProgress ({ arrayContent, types, ...props }) {
  const { roadMap } = useContext(RoatMapContext)
  const { durationInDays } = roadMap.data
  const widthUnit = 100 / arrayContent.length
  const lastElement = arrayContent.length - 1
  if (arrayContent.length === 0) return (<UnitProgress />)
  const unitsProgress = arrayContent.map((item, index) => {
    const { days } = getDiferenceHours(item.startDate, item.endDate)
    const widthComponent = ((days + 1) * 100) / durationInDays
    const colorComponent = item.type && { [`meso${item.type}`]: true }
    return (
      <View
        key={item.id}
        style={[index !== lastElement && Style.contentUnit, Style.containerProgress(widthComponent || item.defaultPercent || widthUnit)]}
      >
        <View style={Style.containerF}>
          <Txt quick extraSmall primary>{getDay(item.startDate)}</Txt>
          <Txt quick extraSmall primary>{getType(types, item)}</Txt>
          <Txt quick extraSmall primary>{getDay(item.endDate)}</Txt>
        </View>
        <UnitProgress
          widthComponent={widthComponent}
          {...props}
          {...colorComponent}
        />
      </View>
    )
  })

  return (
    <View style={Style.containerFlex}>
      {unitsProgress}
    </View>
  )
}
