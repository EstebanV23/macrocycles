import React, { useContext } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import { View } from 'react-native'
import Style from './StyleButtonsBottom'
import theme from '../../theme/theme'
import ButtonGeneral from '../buttonGeneral/ButtonGeneral'
import { UserContext } from '../../store/UserStore'

export default function ButtonsBottom () {
  const { nextStage, previusStage, count, currentFunction } = useContext(RoatMapContext)
  const { newAlert, user } = useContext(UserContext)

  const handleNextStage = (...args) => {
    const functionExecuted = currentFunction(...args)
    if (functionExecuted) {
      const nextMessage = nextStage(user.id)
      if (nextMessage.type && nextMessage.message) {
        newAlert(nextMessage.type, nextMessage.message)
      }
    }
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
