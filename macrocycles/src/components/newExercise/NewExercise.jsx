import { useContext, useEffect, useState } from 'react'
import Style from './StyleNewExercise'
import { UserContext } from '../../store/UserStore'
import InputGeneral from '../inputGeneral/InputGeneral'
import { View } from 'react-native'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import theme from '../../theme/theme'

const UPDATE = 'update'
const CREATE = 'create'

export default function NewExercise ({ arrayToSave, setArrayToSave, exerciceSelected }) {
  const [name, setName] = useState(exerciceSelected?.name ?? '')
  const [description, setDescription] = useState(exerciceSelected?.description ?? '')
  const [duration, setDuration] = useState(exerciceSelected?.duration ?? '')
  const [id, setId] = useState(exerciceSelected?.id ?? null)
  const [action, setAction] = useState((exerciceSelected?.id) ? UPDATE : CREATE)
  const { newAlert } = useContext(UserContext)

  useEffect(() => {
    if (!arrayToSave && !setArrayToSave) return
    if (arrayToSave && setArrayToSave) {
      const newArray = arrayToSave.map((item) => {
        if (item.id === id) {
          item.name = name
          item.description = description
          item.duration = duration
        }
        return item
      })
      setArrayToSave(newArray)
    }
  }, [name, description, duration])

  const removeToSession = () => {
    if (arrayToSave && setArrayToSave) {
      const newArray = arrayToSave.filter((item) => item.id !== id)
      setArrayToSave(newArray)
    }
  }

  return (
    <View style={Style.content}>
      <View>
        <InputGeneral
          style={Style.input}
          label='Nombre'
          value={name}
          onChangeText={setName}
          placeholder='Nombre del ejercicio'
        />
        <InputGeneral
          style={Style.input}
          label='Descripción'
          value={description}
          multiline
          onChangeText={setDescription}
          placeholder='Descripción del ejercicio'
        />
        <InputGeneral
          style={Style.input}
          label='Duración'
          value={duration}
          inputMode='numeric'
          onChangeText={setDuration}
          placeholder='Duración del ejercicio'
        />
      </View>
      {arrayToSave && setArrayToSave && (
        <View style={Style.columnCon}>
          <IconButton
            style={Style.iconButton}
            icon={<Icon name={iconsConstants.trash} color={theme.colors.white} size={18} />}
            onPress={() => removeToSession()}
          />
        </View>
      )}
    </View>

  )
}
