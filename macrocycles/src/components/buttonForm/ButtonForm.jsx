import { Button } from '@react-native-material/core'
import theme from '../../theme/theme'
import Style from './StyleButtonForm'
import iconsConstants from '../../constants/iconConstants'

export default function ButtonForm ({ onPress, title }) {
  return (
    <Button onPress={onPress} style={Style.buttonLogout} title={title} color={theme.colors.green.default} icon={iconsConstants.logout} />
  )
}
