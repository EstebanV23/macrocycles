import { Outlet } from 'react-router-native'
import iconsConstants from '../../constants/iconConstants'
import HeaderBar from '../headerBar/HeaderBar'
import { useContext, useEffect, useState } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Loader from '../loader/Loader'
import ButtonsBottom from '../buttonsBottom/ButtonsBottom'
import { SafeAreaView, ScrollView, View } from 'react-native'
import Style from './StyleNewMacro'
import ProgressBar from '../progressBar/ProgressBar'

export default function NewMacro () {
  const { roadMap, initRoadMap } = useContext(RoatMapContext)
  const { data: { macrocycle, microcycles, mesocycles } } = roadMap

  useEffect(() => {
    initRoadMap()
  }, [])

  if (roadMap.currentStage === null) return <Loader />

  return (
    <>
      <HeaderBar
        title='Nuevo macrociclo'
        subtitle={roadMap.currentStage.text}
        iconName={iconsConstants.newDocument}
      />
      <ProgressBar
        macrocycle={macrocycle}
        microcycles={microcycles}
        mesocycles={mesocycles}
      />
      <View style={Style.contentGeneral}>
        <View style={Style.containerOutlet}>
          <SafeAreaView>
            <ScrollView style={Style.containerScroll}>
              <Outlet />
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
      <ButtonsBottom />
    </>
  )
}
