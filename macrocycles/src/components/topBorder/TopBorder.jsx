import { View } from 'react-native'
import Constants from 'expo-constants'

export default function TopBorder ({ children, style, ...props }) {
  const styles = [
    { paddingTop: Constants.statusBarHeight },
    style
  ]

  return (
    <View style={styles} {...props}>{children}</View>
  )
}
