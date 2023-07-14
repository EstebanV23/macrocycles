import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleSelect = StyleSheet.create({
  select: {
    borderWidth: 2,
    borderColor: theme.colors.gray,
    borderRadius: 5,
    fontFamily: theme.fonts.quicksand.medium
  },
  height: {
    height: 20,
    padding: 0
  },
  disabled: {
    backgroundColor: theme.colors.disbaled
  },
  text: {
    fontFamily: theme.fonts.quicksand.medium,
    color: theme.colors.text
  },
  dropDownContainer: {
    borderWidth: 2,
    borderColor: theme.colors.gray
  },
  itemSeparator: {
    borderWidth: 1,
    borderColor: theme.colors.blue.default,
    backgroundColor: `${theme.colors.blue[200]}90`
  }
})

export default StyleSelect
