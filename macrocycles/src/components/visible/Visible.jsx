import { Icon, IconButton } from '@react-native-material/core'
import theme from '../../theme/theme'

export default function Visible ({ setVisible, visible }) {
  return <IconButton icon={!visible ? <Icon name='eye-outline' size={24} color={theme.colors.gray} /> : <Icon name='eye-off-outline' size={24} color={theme.colors.gray} />} onPress={() => setVisible(!visible)} />
}
