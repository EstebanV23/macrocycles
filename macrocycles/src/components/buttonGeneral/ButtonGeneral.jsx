import { Button } from '@react-native-material/core'
import Style from './StyleButtonGeneral'

export default function ButtonGeneral ({ onPress, title, style, color, tintColor, ...props }) {
  return (
    <Button onPress={onPress} title={title} style={[Style.button, style]} color={color} tintColor={tintColor} {...props} />
  )
}
