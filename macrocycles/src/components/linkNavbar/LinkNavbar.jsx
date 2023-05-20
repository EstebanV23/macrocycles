import { Icon, Pressable } from '@react-native-material/core'
import Style from './StyleLinkNavbar'
import { useNavigate } from 'react-router-native'
import theme from '../../theme/theme'

export default function LinkNavbar ({ to, icon }) {
  const navigate = useNavigate()

  const redirect = () => {
    navigate(to)
  }

  return (
    <Pressable
      style={Style.link}
      onPress={redirect}
    >
      <Icon name={icon} size={34} color={theme.colors.blue.default} />
    </Pressable>
  )
}
