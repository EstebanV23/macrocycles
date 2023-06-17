import { Outlet } from 'react-router-native'
import iconsConstants from '../../constants/iconConstants'
import HeaderBar from '../headerBar/HeaderBar'
import { useContext, useEffect } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Loader from '../loader/Loader'
import ButtonsBottom from '../buttonsBottom/ButtonsBottom'
import { ScrollView, View, Text } from 'react-native'
import Style from './StyleNewMacro'
import ProgressBar from '../progressBar/ProgressBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CalendarGeneral from '../calendarGeneral/CalendarGeneral'

export default function NewMacro () {
  const { roadMap, initRoadMap, previusStage } = useContext(RoatMapContext)
  const { data: { macrocycle, microcycles, mesocycles, timeFrames } } = roadMap

  useEffect(() => {
    AsyncStorage.getItem('roadMap')
      .then((roadMap) => roadMap ? initRoadMap() : initRoadMap())
  }, [])

  if (roadMap.currentStage === null) return <Loader />
  return (
    <>
      <HeaderBar
        title='Nuevo macrociclo'
        subtitle={roadMap.currentStage.text}
        iconName={iconsConstants.newDocument}
        onPress={() => previusStage()}
      />
      <ProgressBar
        macrocycle={macrocycle}
        microcycles={microcycles}
        mesocycles={mesocycles}
        timeFrames={timeFrames}
      />
      <CalendarGeneral />
      <ScrollView style={Style.containerScroll}>
        <View style={Style.contentGeneral}>
          <View style={Style.containerOutlet}>
            <Outlet />
          </View>
        </View>
        <ButtonsBottom />
        <Text />
        <Text />
        <Text />
      </ScrollView>
    </>
  )
}
