import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../theme/theme'

export default function LinearGradientMe ({ children, colors, style }) {
  return (
    <LinearGradient
      colors={[theme.colors.green[600], theme.colors.green[600], theme.colors.green[400]]}
      style={style}
    >
      {children}
    </LinearGradient>
  )
}
