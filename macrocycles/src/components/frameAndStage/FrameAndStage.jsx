import { useContext } from 'react'
import Txt from '../Txt/Txt'
import { RoatMapContext } from '../../store/RoadMapStore'
import { View } from 'react-native'

export default function FrameAndStage () {
  const { roadMap } = useContext(RoatMapContext)
  const { microcyles, timeFrames, stages } = roadMap.data
  return (
    <View>
      
    </View>
  )
}
