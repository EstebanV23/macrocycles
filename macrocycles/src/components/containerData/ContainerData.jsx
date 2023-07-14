import { View } from 'react-native'

export default function ContainerData ({ paddingHorizontal = 20, paddingVertical, style, children }) {
  return (
    <View style={[{ paddingHorizontal, paddingVertical }, style]}>{children}</View>
  )
}
