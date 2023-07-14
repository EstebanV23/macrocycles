import Style from './StyleTxt'
import { Text } from 'react-native'

export default function Txt ({
  children,
  justify,
  small,
  error,
  medium,
  rubik,
  quick,
  big,
  bold,
  color,
  red,
  green,
  light,
  white,
  extraBig,
  style,
  gray,
  quickBold,
  primary,
  mediumBig,
  lowMedium,
  disabled,
  orange,
  yellow,
  purple,
  menta,
  blue,
  extraSmall,
  mesocycle,
  meso1,
  meso2,
  meso3,
  meso4,
  meso5,
  meso6,
  center
}) {
  const styleText = [
    Style.defualtColor,
    small && Style.small,
    medium && Style.medium,
    big && Style.big,
    justify && Style.justify,
    bold && Style.bold,
    green && Style.green,
    light && Style.light,
    white && Style.white,
    extraBig && Style.extraBig,
    quick ? Style.fontQuicksand : Style.fontRubik,
    light && Style.lightQuick,
    error && Style.error,
    gray && Style.gray,
    quickBold && Style.quickBold,
    primary && Style.primary,
    lowMedium && Style.lowMedium,
    mediumBig && Style.mediumBig,
    red && Style.red,
    disabled && Style.disabled,
    orange && Style.orange,
    yellow && Style.yellow,
    purple && Style.purple,
    menta && Style.menta,
    blue && Style.blue,
    extraSmall && Style.extraSmall,
    mesocycle && Style.mesocycle,
    meso1 && Style.meso1,
    meso2 && Style.meso2,
    meso3 && Style.meso3,
    meso4 && Style.meso4,
    meso5 && Style.meso5,
    meso6 && Style.meso6,
    center && Style.center,
    style
  ]
  return (
    <Text
      style={styleText}
    >
      {children}
    </Text>
  )
}
