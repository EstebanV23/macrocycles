import { View } from 'react-native'
import Style from './StyleComponentMicrocycle'
import ContentComponentInfo from '../contentComponentInfo/ContentComponentInfo'
import Txt from '../Txt/Txt'

export default function ComponentMicrocycle ({ microcycle, unitValue }) {
  const { type, amount, percent } = microcycle
  return (
    <View style={Style.content}>
      <ContentComponentInfo>
        <Txt quickBold blue>{type}</Txt>
      </ContentComponentInfo>
      <ContentComponentInfo>
        <Txt quickBold blue>{percent}%</Txt>
      </ContentComponentInfo>
      <ContentComponentInfo>
        <Txt quickBold blue>{amount} {unitValue}</Txt>
      </ContentComponentInfo>
    </View>
  )
}
