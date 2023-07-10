import { View } from 'react-native'
import Style from './StyleContentComponentInfo'

export default function ContentComponentInfo ({ children }) {
  return (
    <View style={Style.content}>
      {children}
    </View>
  )
}
