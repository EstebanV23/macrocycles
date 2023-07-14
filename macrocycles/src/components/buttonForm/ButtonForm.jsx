import { Button } from '@react-native-material/core'
import theme from '../../theme/theme'
import Style from './StyleButtonForm'
import iconsConstants from '../../constants/iconConstants'

export default function ButtonForm ({ onPress, title }) {
  return (
    <Button onPress={onPress} style={Style.buttonForm} title={title} color={theme.colors.red.default} tintColor={theme.colors.white} icon={iconsConstants.logout} />
  )
}
