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
  ...props
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
