import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleTxt = StyleSheet.create({
  small: {
    fontSize: theme.sizes.small
  },
  justify: {
    textAlign: 'justify'
  },
  red: {
    color: theme.colors.red.default
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
  },
  error: {
    color: theme.colors.red[300]
  },
  gray: {
    color: theme.colors.gray
  },
  quickBold: {
    fontFamily: theme.fonts.quicksand.bold
  },
  primary: {
    color: theme.colors.blue.default
  },
  lowMedium: {
    fontSize: theme.sizes.lowMedium
  },
  mediumBig: {
    fontSize: theme.sizes.mediumBig
  }
})

export default StyleTxt
