import { TouchableOpacity } from 'react-native'
import Txt from '../Txt/Txt'
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../theme/theme'
import Style from './StyleButtonForm'

export default function ButtonForm ({ onPress, children, ...props }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Style.buttonForm}
    >
      <LinearGradient
        colors={[theme.colors.green[600], theme.colors.green[600], theme.colors.green[400]]}
        style={Style.buttonForm}
      >
        <Txt
          white
          quick
          {...props}
        >
          {children}
        </Txt>
      </LinearGradient>
    </TouchableOpacity>
  )
}
