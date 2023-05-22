import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleBasicInput = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 3,
    borderWidth: 2,
    borderColor: theme.colors.gray,
    color: theme.colors.text,
    fontFamily: theme.fonts.quicksand.regular
  },
  disabled: {
    backgroundColor: theme.colors.disbaled
  },
  error: {
    borderColor: theme.colors.red[300]
  },
  selected: {
    borderColor: theme.colors.red.default
  }
})

export default StyleBasicInput
