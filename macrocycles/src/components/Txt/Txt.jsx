import Style from './StyleTxt'
import { Text } from 'react-native'

export default function Txt ({
  children,
  small,
  error,
  medium,
  rubik,
  quick,
  big,
  bold,
  color,
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
  ...props
}) {
  const styleText = [
    Style.defualtColor,
    small && Style.small,
    medium && Style.medium,
    big && Style.big,
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
