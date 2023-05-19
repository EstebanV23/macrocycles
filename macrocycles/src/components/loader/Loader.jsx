import { ActivityIndicator, View } from 'react-native'
import Style from './StyleLoader'
import theme from '../../theme/theme'

export default function Loader () {
  return (
    <View
      style={Style.container}
    >
      <ActivityIndicator size={70} color={theme.colors.green[300]} />
    </View>
  )
}
