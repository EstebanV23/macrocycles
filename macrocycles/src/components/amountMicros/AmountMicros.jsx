import { View } from 'react-native'
import Txt from '../Txt/Txt'

export default function AmountMicros ({ minMicros, maxMicros }) {
  return (
    <View>
      <View>
        <Txt quick gray small>Mínimo de microciclos posibles: <Txt quickBold small gray>{minMicros}</Txt></Txt>
        <Txt quick gray small>Máximo de microciclos posibles: <Txt quickBold small gray>{maxMicros}</Txt></Txt>
      </View>
    </View>
  )
}
