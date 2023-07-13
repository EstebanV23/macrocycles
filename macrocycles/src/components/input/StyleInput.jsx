import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleInput = StyleSheet.create({
  input: {
    width: '100%',
    fontSize: theme.sizes.small,
    fontFamily: theme.fonts.quicksand.regular
  },
  leading: {
    fontFamily: theme.fonts.quicksand.regular,
    fontSize: theme.sizes.medium,
    borderColor: theme.colors.white
  }
})

export default StyleInput