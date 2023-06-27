import { useContext, useState } from 'react'
import EditSessions from '../editSessions/EditSessions'
import ViewInfoSession from '../viewInfoSession/ViewInfoSession'
import { UserContext } from '../../store/UserStore'
import { View } from 'react-native'
import Txt from '../Txt/Txt'
import monthToString from '../../logic/monthToString'
import Style from './StyleNewSession'
import dayToString from '../../constants/dayToString'

export default function NewSession ({ microcycleSelected, dateSelected, session }) {
  const [amountSportsmans, setAmountSportsmans] = useState(session?.amountSportsmans ?? null)
  const [category, setCategory] = useState(session?.category ?? null)
  const [place, setPlace] = useState(session?.place ?? null)
  const [trainner, setTrainner] = useState(session?.trainner ?? null)
  const [objectiveTec, setObjectiveTec] = useState(session?.objectiveTec ?? null)
  const [objectivePhysical, setObjectivePhysical] = useState(session?.objectiveEducational ?? null)
  const [objectiveEducational, setObjectiveEducational] = useState(session?.amountSportsmans ?? null)
  const [material, setMaterial] = useState(session?.material ?? null)
  const [stages, setStages] = useState(session?.stages ?? null)
  const [exercises, setExercises] = useState(session?.stages?.exercises ?? null)
  const [editMode, setEditMode] = useState(!place || !trainner || !amountSportsmans)
  const { setLoading } = useContext(UserContext)
  const [year, month, day] = dateSelected.split('-')

  return (
    <View>
      <View style={Style.contentDate}>
        <Txt quick medium blue>{dayToString[new Date(dateSelected).getDay()]}</Txt>
        <Txt quick big blue>{day}</Txt>
        <Txt quick gray>{monthToString(month)} - {year}</Txt>
      </View>
      {editMode
        ? <ViewInfoSession
            amountSportsmans={amountSportsmans}
            category={category}
            place={place}
            trainner={trainner}
            objectiveTec={objectiveTec}
            objectivePhysical={objectivePhysical}
            objectiveEducational={objectiveEducational}
            material={material}
            stages={stages}
            exercises={exercises}
          />
        : <EditSessions />}
    </View>
  )
}
