import { View } from 'react-native'
import MacroItem from '../macroItem/MacroItem'

export default function Macrocycles ({ macrocycles }) {
  return (
    <View style={{ marginTop: 10, padding: 10 }}>
      {macrocycles.map((macrocycle) => (
        <View key={macrocycle.id}>
          <MacroItem macrocycle={macrocycle} />
        </View>
      ))}
    </View>
  )
}
