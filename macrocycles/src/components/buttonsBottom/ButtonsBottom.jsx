import React, { useContext } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import { View } from 'react-native'
import Style from './StyleButtonsBottom'
import theme from '../../theme/theme'
import ButtonGeneral from '../buttonGeneral/ButtonGeneral'

export default function ButtonsBottom () {
  const { nextStage, previusStage, count, currentFunction } = useContext(RoatMapContext)

  const handleNextStage = (...args) => {
    const functionExecuted = currentFunction(...args)
    if (functionExecuted) nextStage(functionExecuted)
  }

  const handlePreviusStage = () => {
    previusStage()
  }

  return (
    <View
      style={Style.containerButtons}
    >
      <ButtonGeneral onPress={handlePreviusStage} title={count === 1 ? '< Cancelar' : '< Anterior'} color={theme.colors.red[300]} tintColor={theme.colors.white} />
      <ButtonGeneral onPress={handleNextStage} title='Continuar >' color={theme.colors.blue[500]} />
    </View>
  )
}
