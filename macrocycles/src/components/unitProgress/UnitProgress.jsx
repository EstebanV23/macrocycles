import { View } from 'react-native'
import Style from './StyleUnitProgress'

export default function UnitProgress ({ green, red }) {
  const styles = [
    Style.component,
    Style.transparent,
    Style.fullComponent,
    green && Style.green,
    red && Style.red
  ]
  return (
    <View style={styles} />
  )
}
