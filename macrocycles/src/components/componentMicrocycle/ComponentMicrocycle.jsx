import { View } from 'react-native'
import Style from './StyleComponentMicrocycle'
import ContentComponentInfo from '../contentComponentInfo/ContentComponentInfo'
import Txt from '../Txt/Txt'

export default function ComponentMicrocycle ({ microcycle }) {
  const { type, amount, percent } = microcycle
  return (
    <View style={Style.content}>
      <ContentComponentInfo>
        <Txt quickBold white>{type}</Txt>
      </ContentComponentInfo>
      <ContentComponentInfo>
        <Txt quickBold white>{percent}%</Txt>
      </ContentComponentInfo>
      <ContentComponentInfo>
        <Txt quickBold white>{amount}</Txt>
      </ContentComponentInfo>
    </View>
  )
}
