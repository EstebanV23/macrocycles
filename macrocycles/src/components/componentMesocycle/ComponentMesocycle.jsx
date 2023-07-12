import { View } from 'react-native'
import Txt from '../Txt/Txt'
import Style from './StyleComponentMesocycle'
import ContentComponentInfo from '../contentComponentInfo/ContentComponentInfo'
import ComponentMicrocycle from '../componentMicrocycle/ComponentMicrocycle'

export default function ComponentMesocycle ({ mesocycle }) {
  return (
    <View style={Style.content}>
      <ContentComponentInfo>
        <Txt quickBold blue>{mesocycle.type}</Txt>
      </ContentComponentInfo>
      <ContentComponentInfo>
        <Txt quickBold blue>{mesocycle.percent}%</Txt>
      </ContentComponentInfo>
      <ContentComponentInfo>
        <Txt quickBold blue>{mesocycle.amount}</Txt>
      </ContentComponentInfo>
      <View style={[Style.flexRow]}>
        {mesocycle.microcycles.map((microcycle, index) => (
          <ComponentMicrocycle
            key={`${microcycle.type}${microcycle.amount}${microcycle.percent}${index}`}
            microcycle={microcycle}
          />
        ))}
      </View>
    </View>
  )
}

/*
  {mesocycle.microcycles.map(microcycle => (
    <ComponentMicrocycle
    key={`${microcycle.type}${microcycle.amount}${microcycle.percent}`}
    microcycle={microcycle}
  />
  ))}
*/
