import { Outlet, useNavigate } from 'react-router-native'
import iconsConstants from '../../constants/iconConstants'
import HeaderBar from '../headerBar/HeaderBar'
import { useContext, useEffect } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Loader from '../loader/Loader'
import ButtonsBottom from '../buttonsBottom/ButtonsBottom'
import { Dimensions, ScrollView, View } from 'react-native'
import Style from './StyleNewMacro'

export default function NewMacro () {
  const { roadMap, initRoadMap, count, reset } = useContext(RoatMapContext)
  const navigate = useNavigate()

  useEffect(() => {
    const currentRoadMap = initRoadMap()
    navigate(currentRoadMap.currentStage.path)
  }, [])

  useEffect(() => {
    if (count === 0) {
      reset()
      navigate('/')
      return
    }

    roadMap.currentStage && navigate(roadMap.currentStage.path)
  }, [count])

  if (roadMap.currentStage === null) return <Loader />
  return (
    <>
      <HeaderBar
        title='Nuevo macrociclo'
        subtitle={roadMap.currentStage.text}
        iconName={iconsConstants.newDocument}
      />
      <View style={Style.contentGeneral}>
        <View style={Style.containerOutlet}>
          <ScrollView style={Style.containerScroll}>
            <Outlet />
          </ScrollView>
        </View>
      </View>
      <ButtonsBottom />
    </>
  )
}
