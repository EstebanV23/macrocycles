import { View } from 'react-native'
import Txt from '../Txt/Txt'
import { useEffect, useState } from 'react'
import { ProgressBarWitData } from '../progressBar/ProgressBar'
import CalendarWithData from '../calendarWithData/CalendarWithData'

export default function MacroMoreInfo ({ macrocycle }) {
  const { time_frame: timeFrames, stages, mesocycles } = macrocycle
  const [macrocycleSelected, setMacrocycleSelected] = useState(macrocycle)
  const [timeFramesSelected, setTimeFramesSelected] = useState(timeFrames)
  const [stagesSelected, setStagesSelected] = useState(stages)
  const [mesocyclesSelected, setMesocyclesSelected] = useState(mesocycles)
  const [microcyclesSelected, setMicrocyclesSelected] = useState(() => mesocyclesSelected.map((mesocycle) => mesocycle.microcycles).flat())

  useEffect(() => {
    setMicrocyclesSelected(mesocyclesSelected.map((mesocycle) => mesocycle.microcycles).flat())
  }, [mesocyclesSelected])

  return (
    <View style={{ flex: 1 }}>
      <ProgressBarWitData
        macrocycle={macrocycleSelected}
        timeFrames={timeFramesSelected}
        stages={stagesSelected}
        mesocycles={mesocyclesSelected}
        microcycles={microcyclesSelected}
      />
      <CalendarWithData
        macrocycle={macrocycleSelected}
        timeFrames={timeFramesSelected}
        stages={stagesSelected}
        mesocycles={mesocyclesSelected}
        microcycles={microcyclesSelected}
      />
      <Txt>{macrocycle.name}</Txt>
    </View>
  )
}
