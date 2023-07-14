
import { View } from 'react-native'
import Style from './StyleItemSessionInfo'
import Txt from '../Txt/Txt'
export default function ItemSessionInfo ({ text, value }) {
  return (
    <View style={Style.contentInfo}>
      <Txt quick>{value}</Txt>
      <Txt quick small gray>{text}</Txt>
    </View>
  )
}
