import { View } from 'react-native'
import Txt from '../Txt/Txt'
import Style from './StyleIndicationButton'

/**
 *
 * @param {{ text: string, color: string }} param0
 */
export default function IndicationButton ({ text, color }) {
  return (
    <View style={[Style.contentButton, Style.bgColor(color)]}>
      <View style={[Style.rounded, Style.colorRounded(color)]} />
      <Txt quick small style={[Style.textColor]}>{text}</Txt>
    </View>
  )
}
