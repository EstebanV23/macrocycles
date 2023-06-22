import { useContext } from 'react'
import Txt from '../Txt/Txt'
import { RoatMapContext } from '../../store/RoadMapStore'
import { View } from 'react-native'
import InputWithRoadMap from '../inputWithRoadMap/InputWithRoadMap'
import modifyFrames from '../../logic/modifyFrames'
import modifyStages from '../../logic/modifyStages'

export default function FrameAndStage () {
  const { roadMap, updateAll } = useContext(RoatMapContext)
  const { microcycles, timeFrames, stages, endDate, startDate } = roadMap.data
  const handleFunctionTimeFrames = (selectedDate, newStartDate, newEndDate) => {
    const [newTimeFrames, newStages] = modifyFrames(selectedDate, timeFrames, stages, newStartDate, newEndDate, microcycles)
    updateAll({ timeFrames: newTimeFrames, stages: newStages })
    return true
  }

  const handleFunctionStages = (selectedDate, newStartDate, newEndDate) => {
    const [newTimeFrames, newStages] = modifyStages(selectedDate, timeFrames, stages, newStartDate, newEndDate, microcycles)
    updateAll({ timeFrames: newTimeFrames, stages: newStages })
    return true
  }

  return (
    <View>
      <Txt big>Periodos</Txt>
      <InputWithRoadMap
        arrayEdit={timeFrames}
        functionModify={handleFunctionTimeFrames}
        limitDate={endDate}
        minDate={startDate}
        microcycles={microcycles}
      />
      <Txt big>Etapas</Txt>
      <InputWithRoadMap
        arrayEdit={stages}
        functionModify={handleFunctionStages}
        limitDate={endDate}
        minDate={startDate}
        microcycles={microcycles}
      />
    </View>
  )
}
