import { View } from 'react-native'
import getDifferentsMonths from '../../logic/getDifferentsMonths'
import UnitProgress from '../unitProgress/UnitProgress'
import Styles from './StyleDatesBars'
import Txt from '../Txt/Txt'

export default function DatesBars ({ startDate, endDate, days }) {
  if (!startDate || !endDate || !days) return null
  const months = getDifferentsMonths(startDate, endDate, days)
  const lastMonth = months.length - 1
  return months.map((month, index) => (
    <View style={[index !== lastMonth && Styles.contentBar, Styles.containerWidth(month.percent)]} key={month.name}>
      <View style={[Styles.contentText]}>
        <Txt small blue>{month.name.substring(0, 3)}</Txt>
        <UnitProgress blue />
      </View>
    </View>
  ))
}
