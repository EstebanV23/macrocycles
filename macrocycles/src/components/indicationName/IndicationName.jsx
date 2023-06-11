import { View } from 'react-native'
import Style from './StyleIndicationName'
import Txt from '../Txt/Txt'
import UnitProgress from '../unitProgress/UnitProgress'

export default function IndicationName ({ text, ...props }) {
  return (
    <View style={Style.container}>
      <UnitProgress style={Style.point} {...props} />
      <Txt quick small quickBold {...props}>{text}</Txt>
    </View>
  )
}
