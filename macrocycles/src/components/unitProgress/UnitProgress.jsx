import { View } from 'react-native'
import Style from './StyleUnitProgress'

export default function UnitProgress ({ green, red, orange, blue, yellow, purple, menta, style, mesocycle, meso1, meso2, meso3, meso4, meso5, meso6 }) {
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
    menta && Style.menta,
    mesocycle && Style.mesocycle,
    meso1 && Style.meso1,
    meso2 && Style.meso2,
    meso3 && Style.meso3,
    meso4 && Style.meso4,
    meso5 && Style.meso5,
    meso6 && Style.meso6,
    style
  ]
  return (
    <View style={styles} />
  )
}
