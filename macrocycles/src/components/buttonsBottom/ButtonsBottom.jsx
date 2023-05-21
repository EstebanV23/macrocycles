import React, { useContext } from 'react'
import { Button } from '@react-native-material/core'
import { RoatMapContext } from '../../store/RoadMapStore'
import { View } from 'react-native'
import Style from './StyleButtonsBottom'
import theme from '../../theme/theme'

export default function ButtonsBottom () {
  const { nextStage, previusStage, count } = useContext(RoatMapContext)
  return (
    <View
      style={Style.containerButtons}
    >
      <Button onPress={() => previusStage()} title={count === 1 ? '< Cancelar' : '< Anterior'} style={Style.button} color={theme.colors.red[300]} tintColor='white' />
      <Button onPress={() => nextStage()} title='Continuar >' color={theme.colors.blue[500]} style={Style.button} />
    </View>
  )
}
