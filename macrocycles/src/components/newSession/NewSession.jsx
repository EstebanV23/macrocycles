import { useContext, useEffect, useState } from 'react'
import EditSessions from '../editSessions/EditSessions'
import ViewInfoSession from '../viewInfoSession/ViewInfoSession'
import { UserContext } from '../../store/UserStore'
import { View, ScrollView } from 'react-native'
import Txt from '../Txt/Txt'
import monthToString from '../../logic/monthToString'
import Style from './StyleNewSession'
import dayToString from '../../constants/dayToString'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import theme from '../../theme/theme'

export default function NewSession ({ microcycleSelected, dateSelected, session, macrocycleSelected, setRetryFetch, test }) {
  const [id, setId] = useState(session?.id ?? null)
  const [amountSportsmans, setAmountSportsmans] = useState(session?.amountSportsmans ?? null)
  const [category, setCategory] = useState(session?.category ?? null)
  const [place, setPlace] = useState(session?.place ?? null)
  const [trainner, setTrainner] = useState(session?.trainner ?? null)
  const [testSession, setTestSession] = useState(session?.test ?? null)
  const [testDescription, setTestDescription] = useState(session?.testDescription ?? null)
  const [testResult, setTestResult] = useState(session?.testResult ?? null)
  const [objectiveTec, setObjectiveTec] = useState(session?.objectiveTec ?? null)
  const [objectivePhysical, setObjectivePhysical] = useState(session?.objectiveEducational ?? null)
  const [objectiveEducational, setObjectiveEducational] = useState(session?.objectiveEducational ?? null)
  const [material, setMaterial] = useState(session?.material ?? null)
  const [stages, setStages] = useState(session?.stages ?? null)
  const [editMode, setEditMode] = useState(!place || !trainner || !amountSportsmans)
  const { setLoading } = useContext(UserContext)
  const [functionToExecute, setFunctionToExecute] = useState(() => {})
  const [year, month, day] = dateSelected.split('-')
  console.log('🚀 ~ file: NewSession.jsx:28 ~ NewSession ~ functionToExecute:', functionToExecute)

  return (
    <View style={Style.containerGeneral}>
      <View style={Style.contentDate}>
        <View style={Style.contentRow}>
          {id && <IconButton
            icon={<Icon
              name={iconsConstants.pencil}
              color={editMode ? theme.colors.red.default : theme.colors.blue.default}
              size={40}
                  />}
            onPress={() => setEditMode(!editMode)}
                 />}
          {editMode &&
            <IconButton
              icon={<Icon
                name={iconsConstants.check}
                color={theme.colors.green.default}
                size={40}
                    />}
              onPress={() => functionToExecute()}
            />}
        </View>
        <Txt quick big orange>{dayToString[new Date(dateSelected).getDay()]}</Txt>
        <Txt quick extraBig blue>{day}</Txt>
        <Txt quick gray medium>{monthToString(month)} - {year}</Txt>
      </View>
      <ScrollView
        style={Style.contentSession}
      >
        {!editMode
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
              test={test}
              testSession={testSession}
              testDescription={testDescription}
              testResult={testResult}
            />
          : <EditSessions
              setRetryFetch={setRetryFetch}
              id={id}
              amountSportsmans={amountSportsmans}
              category={category}
              place={place}
              trainner={trainner}
              objectiveTec={objectiveTec}
              objectivePhysical={objectivePhysical}
              objectiveEducational={objectiveEducational}
              material={material}
              test={test}
              testSession={testSession}
              testDescription={testDescription}
              testResult={testResult}
              stages={stages}
              microId={microcycleSelected}
              date={dateSelected}
              macroId={macrocycleSelected}
              setFunctionToExecute={setFunctionToExecute}
            />}
        <Txt />
      </ScrollView>
    </View>
  )
}
