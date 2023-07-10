import { View } from 'react-native'
import InfoComponent from '../infoComponent/InfoComponent'
import Style from './StyleListComponents'
import Txt from '../Txt/Txt'

export default function ListComponents ({ macrocycleId, components, typeMacro }) {
  return (
    <View style={Style.list}>
      <Txt quickBold extraBig style={{ marginBottom: 10 }}>Componentes</Txt>
      {components.map((component) => (
        <InfoComponent
          key={component.id}
          component={component}
          typeMacro={typeMacro}
          macrocycleId={macrocycleId}
        />))}
    </View>
  )
}
