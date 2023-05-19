import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleInput = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: theme.sizes.small,
    fontFamily: theme.fonts.quicksand.regular
  },
  leading: {
    fontFamily: theme.fonts.quicksand.regular
  }
})

export default StyleInput
