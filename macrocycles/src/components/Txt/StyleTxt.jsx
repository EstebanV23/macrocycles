import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleTxt = StyleSheet.create({
  small: {
    fontSize: theme.sizes.small
  },
  medium: {
    fontSize: theme.sizes.medium
  },
  big: {
    fontSize: theme.sizes.big
  },
  extraBig: {
    fontSize: theme.sizes.extraBig
  },
  bold: {
    fontWeight: 'bold'
  },
  defualtColor: {
    color: theme.colors.text
  },
  green: {
    color: theme.colors.green.default
  },
  ligthGreen: {
    color: theme.colors.green[200]
  },
  white: {
    color: theme.colors.white
  },
  fontQuicksand: {
    fontFamily: theme.fonts.quicksand.medium
  },
  fontRubik: {
    fontFamily: theme.fonts.rubik.bold
  },
  lightQuick: {
    fontFamily: theme.fonts.quicksand.light
  }
})

export default StyleTxt
