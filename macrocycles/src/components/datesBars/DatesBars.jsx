import { View } from 'react-native'
import getDifferentsMonths from '../../logic/getDifferentsMonths'
import UnitProgress from '../unitProgress/UnitProgress'
import Styles from './StyleDatesBars'
import Txt from '../Txt/Txt'

export default function DatesBars ({ startDate, endDate, days }) {
  if (!startDate || !endDate || !days) return null
  console.log('🚀 ~ file: DatesBars.jsx:8 ~ DatesBars ~ { startDate, endDate, days }:', { startDate, endDate, days })
  const months = getDifferentsMonths(startDate, endDate, days)
  console.log('🚀 ~ file: DatesBars.jsx:11 ~ DatesBars ~ months:', months)
  const lastMonth = months.length - 1
  return months.map((month, index) => (
    <View style={[index !== lastMonth && Styles.contentBar, Styles.containerWidth(month.percent)]} key={month.name}>
      <View style={[Styles.contentText]}>
        <Txt small blue>{month.name.substring(0, 3)}</Txt>
        <UnitProgress yellow />
      </View>
    </View>
  ))
}
