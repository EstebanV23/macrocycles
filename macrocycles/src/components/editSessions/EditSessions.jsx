import { useContext, useEffect, useState } from 'react'
import Txt from '../Txt/Txt'
import serviceUpdateSession from '../../services/serviceUpdateSession'
import serviceNewSession from '../../services/serviceNewSession'
import InputGeneral from '../inputGeneral/InputGeneral'
import { useNavigate } from 'react-router-native'
import { TextInput, View } from 'react-native'
import IndicationButton from '../indicationButton/IndicationButton'
import theme from '../../theme/theme'
import Style from './StyleEditSessions'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import { UserContext } from '../../store/UserStore'
import NewStage from '../newStage/NewStage'
import Select from '../select/Select'
import getAllSessionsToSelect from '../../logic/getAllSessionsToSelect'
import arrToCreateOrEdit from '../../logic/arrToCreateOrEdit'
import serviceNewExercise from '../../services/serviceNewExercise'
import serviceUpdateExercise from '../../services/serviceUpdateExercise'
import serviceNewStage from '../../services/serviceNewStage'
import serviceUpdateNewStage from '../../services/serviceUpdateStage'
import { LoadingContext } from '../../store/LoadingStore'

const UPDATE = 'update'
const CREATE = 'create'

export default function EditSessions ({
  id,
  amountSportsmans,
  category,
  place,
  trainner,
  objectiveTec,
  objectivePhysical,
  objectiveEducational,
  material,
  stages,
  microId,
  macroId,
  date,
  setFunctionToExecute
}) {
  const [newId, setNewId] = useState(id ?? null)
  const [newAmountSportsmans, setNewAmountSportsmans] = useState(amountSportsmans ?? '')
  const [newCategory, setNewCategory] = useState(category ?? '')
  const [newPlace, setNewPlace] = useState(place ?? '')
  const [newTrainner, setNewTrainner] = useState(trainner ?? '')
  const [newObjectiveTec, setNewObjectiveTec] = useState(objectiveTec ?? '')
  const [newObjectivePhysical, setNewObjectivePhysical] = useState(objectivePhysical ?? '')
  const [newObjectiveEducational, setNewObjectiveEducational] = useState(objectiveEducational ?? '')
  const [parcialMaterial, setParcialMaterial] = useState('')
  const [newMaterial, setNewMaterial] = useState(material ?? [])
  const [newStages, setNewStages] = useState(stages ?? [])
  const { newAlert } = useContext(UserContext)
  const [addNewStage, setAddNewStage] = useState(0)
  const [lastNumber, setLastNumber] = useState(0)

  const [fsd, setLoading] = useContext(LoadingContext)

  const [functionSave, setFunctionSave] = useState(id ? UPDATE : CREATE)

  const navigate = useNavigate()

  useEffect(() => {
    setFunctionToExecute(() => async () => {
      setLoading(true)
      if (newCategory.trim() === '' || newPlace.trim() === '' || newTrainner.trim() === '' || newObjectiveTec.trim() === '' || newObjectivePhysical.trim() === '' || newObjectiveEducational.trim() === '' || newMaterial.length === 0 || newStages.length === 0) {
        newAlert('error', 'Los campos son * son obligatorios')
        return
      }

      console.log('🚀 ~ file: EditSessions.jsx:77 ~ newStagesToSave ~ stage:', 'fdasf')
      const newStagesToSave = await Promise.all(newStages.map(async (stage, index) => {
        const { exercises } = stage
        const newExcercises = await arrToCreateOrEdit({ arr: exercises, functionToCreate: serviceNewExercise, functionToUpdate: serviceUpdateExercise, special: true })
        return {
          ...stage,
          exercises: newExcercises
        }
      }))

      const newStageToSave = await arrToCreateOrEdit({ arr: newStagesToSave, functionToCreate: serviceNewStage, functionToUpdate: serviceUpdateNewStage })

      const dataSend = {
        amountSportsmans: Number(newAmountSportsmans),
        category: newCategory,
        place: newPlace,
        trainner: newTrainner,
        objectiveTec: newObjectiveTec,
        objectivePhysical: newObjectivePhysical,
        objectiveEducational: newObjectiveEducational,
        material: newMaterial,
        stages: newStageToSave,
        date
      }
      setLoading(false)
      const newData = functionSave === UPDATE
        ? await serviceUpdateSession({ id: newId, data: dataSend })
        : await serviceNewSession({ data: dataSend, microId })

      navigate(`/sessions/${newData.data.id}/${microId}/${date}/${macroId}`)
    })
  }, [])

  useEffect(() => {
    if (addNewStage === 0) return
    const currentsStages = [...newStages]
    const id = `test ${new Date()}${addNewStage}`
    const stageToNew = [...currentsStages, { id }]
    setNewStages(stageToNew)
  }, [addNewStage])

  function addMaterial () {
    try {
      if (parcialMaterial.trim() === '') return
      console.log('function executed')
      setNewMaterial([...newMaterial, parcialMaterial.trim()])
      console.log('function executed')
      setParcialMaterial('')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMaterial = (index) => {
    const newMaterials = newMaterial.filter((item, i) => i !== index)
    setNewMaterial(newMaterials)
  }

  return (
    <View>
      <InputGeneral
        label='*Categoría'
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <InputGeneral
        label='*Cantidad de deportistas'
        inputMode='numeric'
        value={`${newAmountSportsmans}`}
        onChangeText={setNewAmountSportsmans}
      />
      <InputGeneral
        label='*Lugar'
        value={newPlace}
        onChangeText={setNewPlace}
      />
      <InputGeneral
        label='*Entrenador'
        value={newTrainner}
        onChangeText={setNewTrainner}
      />
      <InputGeneral
        label='*Objetivo técnico'
        multiline
        value={newObjectiveTec}
        onChangeText={setNewObjectiveTec}
      />
      <InputGeneral
        label='*Objetivo físico'
        multiline
        value={newObjectivePhysical}
        onChangeText={setNewObjectivePhysical}
      />
      <InputGeneral
        label='*Objetivo educativo'
        multiline
        value={newObjectiveEducational}
        onChangeText={setNewObjectiveEducational}
      />
      <InputGeneral
        label='*Material'
        value={parcialMaterial}
        onChangeText={setParcialMaterial}
        onKeyPress={addMaterial}
      />
      <View style={Style.containerMaterials}>
        {newMaterial.map((item, index) => (
          <View key={index} style={Style.contentMaterial}>
            <IndicationButton
              text={item}
              color={theme.colors.gray}
            />
            <IconButton
              icon={<Icon name={iconsConstants.trash} size={17} color={theme.colors.red.default} />}
              style={{ backgroundColor: theme.colors.red[200], padding: 0, height: 24, width: 24 }}
              onPress={() => deleteMaterial(index)}
            />
          </View>
        ))}
      </View>
      <Txt big quick style={Style.text}>Fases: </Txt>
      <View style={Style.containerStages}>
        {newStages.map(item => (
          <View key={item.id} style={Style.contentStage}>
            <NewStage
              arrayToSave={newStages}
              stageSelected={item}
              setArrayToSave={setNewStages}
            />
          </View>
        ))}
        <View style={Style.rowCont}>
          <IconButton
            icon={<Icon name={iconsConstants.more} color={theme.colors.blue.default} size={45} />}
            onPress={() => setAddNewStage(addNewStage + 1)}
            style={Style.iconButton}
          />
        </View>
      </View>
      <Txt />
    </View>
  )
}
