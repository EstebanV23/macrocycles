import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../theme/theme'

export default function LinearGradientMe ({ children, colors, style }) {
  return (
    <LinearGradient
      colors={[theme.colors.red[600], theme.colors.red[600], theme.colors.red[400]]}
      style={style}
    >
      {children}
    </LinearGradient>
  )
}
