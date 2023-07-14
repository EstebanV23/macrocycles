import { View } from 'react-native'
import InfoComponent from '../infoComponent/InfoComponent'
import Style from './StyleListComponents'
import Txt from '../Txt/Txt'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import theme from '../../theme/theme'
import NewComponentMeso from '../newComponentMeso/NewComponentMeso'
import transformMesoToComponent from '../../logic/transformMesoToComponent'
import { useContext, useState } from 'react'
import { LoadingContext } from '../../store/LoadingStore'
import { UserContext } from '../../store/UserStore'
import addNewComponentToDatabase from '../../logic/addNewComponentToDatabase'
import { useNavigate } from 'react-router-native'

export default function ListComponents ({ macrocycleId, components, typeMacro, mesocycles }) {
  const [editMode, setEditMode] = useState(false)
  const [newComponents, setNewComponents] = useState([])
  const [componentsList, setComponentsList] = useState([])
  const { setLoading } = useContext(LoadingContext)
  const { newAlert } = useContext(UserContext)
  const navigate = useNavigate()
  console.log('🚀 ~ file: ListComponents.jsx:16 ~ ListComponents ~ componentsList:', componentsList)

  const mesocycleToComponent = transformMesoToComponent(mesocycles)

  const addNewComponent = (newMeso) => {
    const componentConstructor = (JSON.parse(JSON.stringify(newMeso)))
    const newComponentList = [...newComponents, componentConstructor]
    setNewComponents(newComponentList)
    setEditMode(true)
  }

  const deleteComponent = (position) => {
    const newComponentList = newComponents.filter((component, index) => index !== position)
    setNewComponents(newComponentList)
  }

  const saveComponents = (newComponent, position) => {
    const newComponentList = newComponents.map((component, index) => position === index ? newComponent : component)
    setComponentsList(newComponentList)
  }

  const handlerSaveComponents = async () => {
    try {
      setLoading(true)
      const response = await addNewComponentToDatabase(componentsList, macrocycleId)
      console.log('🚀 ~ file: ListComponents.jsx:46 ~ handlerSaveComponents ~ response:', response)
      setLoading(false)
      newAlert(response.type, response.message)
      navigate(`/macrocycles/${macrocycleId.id}`)
    } catch (error) {
      newAlert('error', error.message)
      setLoading(false)
    }
  }

  return (
    <View style={Style.list}>
      <Txt quickBold extraBig style={{ marginBottom: 10 }}>Componentes</Txt>
      {components
        ? components.map((component, index) => (
          <InfoComponent
            key={`${component.id}fdaf${index}`}
            component={component}
            typeMacro={typeMacro}
            macrocycleId={macrocycleId}
          />))
        : <Txt>No tienes componentes</Txt>}
      {editMode && newComponents.map((component, index) => (
        <NewComponentMeso
          key={`${component.type}${component.amount}${component.percent}ll${index}`}
          component={component}
          typeMacro={typeMacro}
          position={index}
          deleteComponent={deleteComponent}
          saveComponents={saveComponents}
        />
      ))}
      <View style={Style.content}>
        <IconButton
          icon={<Icon
            name={iconsConstants.more}
            color={theme.colors.blue.default}
            size={40}
                />}
          onPress={() => addNewComponent(mesocycleToComponent)}
        />
        {editMode &&
          <IconButton
            icon={<Icon
              name={iconsConstants.pencil}
              color={theme.colors.red.default}
              size={40}
                  />}
            onPress={() => setEditMode(false)}
          />}
        {editMode &&
          <IconButton
            icon={<Icon
              name={iconsConstants.check}
              color={theme.colors.green.default}
              size={40}
                  />}
            onPress={() => handlerSaveComponents()}
          />}
      </View>
    </View>
  )
}
