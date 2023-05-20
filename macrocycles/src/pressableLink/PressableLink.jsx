import { Icon, Pressable } from '@react-native-material/core'
import Txt from '../components/Txt/Txt'
import { useNavigate } from 'react-router-native'
import theme from '../theme/theme'
import Style from './StylePressableLink'

export default function PressableLink ({ children, icon, to }) {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(to)
  }
  return (
    <Pressable
      onPress={redirect}
      style={Style.containerPressable}
    >
      <Icon name={icon} color={theme.colors.blue.default} size={25} />
      <Txt primary medium quick light>{children}</Txt>
    </Pressable>
  )
}
