import { Icon, Pressable } from '@react-native-material/core'
import Style from './StyleLinkNavbar'
import { useNavigate } from 'react-router-native'
import theme from '../../theme/theme'

export default function LinkNavbar ({ to, icon, size = 34, style, onPress }) {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(to)
  }

  return (
    <Pressable
      style={[Style.link, style]}
      onPress={onPress || redirect}
    >
      <Icon name={icon} size={size} color={theme.colors.blue.default} />
    </Pressable>
  )
}
