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
    color: `${theme.colors.gray}90`
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
  },
  disabled: {
    color: theme.colors.disbaled
  },
  orange: {
    color: theme.colors.orange.default
  },
  yellow: {
    color: theme.colors.yellow.default
  },
  purple: {
    color: theme.colors.purple.default
  },
  menta: {
    color: theme.colors.menta.default
  },
  blue: {
    color: theme.colors.blue.default
  },
  extraSmall: {
    fontSize: theme.sizes.extraSmall
  },
  mesocycle: {
    color: theme.colors[1].default
  },
  meso1: {
    color: theme.colors[1].default
  },
  meso2: {
    color: theme.colors[2].default
  },
  meso3: {
    color: theme.colors[3].default
  },
  meso4: {
    color: theme.colors[4].default
  },
  meso5: {
    color: theme.colors[5].default
  },
  meso6: {
    color: theme.colors[6].default
  },
  center: {
    textAlign: 'center'
  }
})

export default StyleTxt
