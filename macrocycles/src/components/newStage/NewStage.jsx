import { useContext, useEffect, useState } from 'react'
import Style from './StyleNewStage'
import { UserContext } from '../../store/UserStore'
import { View } from 'react-native'
import InputGeneral from '../inputGeneral/InputGeneral'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import theme from '../../theme/theme'
import NewExercise from '../newExercise/NewExercise'
import Txt from '../Txt/Txt'

const UPDATE = 'update'
const CREATE = 'create'

export default function NewStage ({ arrayToSave, setArrayToSave, stageSelected }) {
  const [exercises, setExercises] = useState(stageSelected?.exercises ?? [])
  const [name, setName] = useState(stageSelected?.name ?? '')
  const [id, setId] = useState(stageSelected?.id ?? null)
  const [action, setAction] = useState((stageSelected?.id) ? UPDATE : CREATE)
  const { newAlert } = useContext(UserContext)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!arrayToSave && !setArrayToSave) return
    if (arrayToSave && setArrayToSave) {
      const newArray = arrayToSave.map((item) => {
        if (item.id === id) {
          item.name = name
          item.exercises = exercises
        }
        return item
      })
      setArrayToSave(newArray)
    }
  }, [name, exercises])

  useEffect(() => {
    if (count === 0) return
    const id = `test ${new Date()}${count}`
    const newExercices = [...exercises, { id }]
    setExercises(newExercices)
  }, [count])

  const removeToSession = () => {
    if (arrayToSave && setArrayToSave) {
      const newArray = arrayToSave.filter((item) => item.id !== id)
      setArrayToSave(newArray)
    }
  }

  const createOrModify = () => {
    if (name.trim() === '') {
      newAlert('error', 'El nombre de la fase es obligatorio')
      return
    }
    setName('')
    setExercises([])
  }

  return (
    <View>
      <View style={Style.rowContent}>
        <InputGeneral
          value={name}
          onChangeText={setName}
          label='Nombre de la fase'
          style={Style.input}
        />
        {!arrayToSave && !setArrayToSave && (
          <IconButton
            style={Style.iconButton}
            icon={<Icon name={iconsConstants.check} color={theme.colors.green} size={22} />}
            onPress={() => createOrModify()}
          />
        )}
        {arrayToSave && setArrayToSave && (
          <IconButton
            style={Style.iconButton}
            icon={<Icon name={iconsConstants.trash} color={theme.colors.white} size={18} />}
            onPress={() => removeToSession()}
          />
        )}
      </View>
      <Txt quick big style={Style.text}>Ejercicios: </Txt>
      <View style={Style.content}>
        {exercises.map((item, index) => (
          <NewExercise
            key={item.id}
            arrayToSave={exercises}
            setArrayToSave={setExercises}
            exerciceSelected={item}
          />
        ))}
      </View>
      <View style={Style.rowCont}>
        <IconButton
          icon={<Icon name={iconsConstants.more} color={theme.colors.blue.default} size={25} />}
          onPress={() => setCount(count + 1)}
        />
      </View>
    </View>
  )
}
