import { View } from 'react-native'
import Style from './StyleUnitProgress'

export default function UnitProgress ({ green, red, orange, blue, yellow, purple, menta }) {
  const styles = [
    Style.component,
    Style.transparent,
    Style.fullComponent,
    green && Style.green,
    red && Style.red,
    orange && Style.orange,
    blue && Style.blue,
    yellow && Style.yellow,
    purple && Style.purple,
    menta && Style.menta
  ]
  return (
    <View style={styles} />
  )
}
