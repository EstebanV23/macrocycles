import React from 'react'
import Txt from '../Txt/Txt'
import { View } from 'react-native'
import { Divider } from '@react-native-material/core'
import Style from './StyleDividerText'

export default function DividerText ({ children }) {
  return (
    <View style={Style.containerDivider}>
      <View style={Style.content}>
        <Txt quick gray style={Style.text}>{children}</Txt>
      </View>
      <Divider />
    </View>
  )
}
