import { View } from 'react-native'
import InfoComponent from '../infoComponent/InfoComponent'
import Style from './StyleListComponents'
import Txt from '../Txt/Txt'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import theme from '../../theme/theme'
import NewComponentMeso from '../newComponentMeso/NewComponentMeso'
import transformMesoToComponent from '../../logic/transformMesoToComponent'
import { useEffect, useState } from 'react'

export default function ListComponents ({ macrocycleId, components, typeMacro, mesocycles }) {
  const [editMode, setEditMode] = useState(false)
  const [newComponents, setNewComponents] = useState([])

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
    setNewComponents(newComponentList)
  }

  return (
    <View style={Style.list}>
      <Txt quickBold extraBig style={{ marginBottom: 10 }}>Componentes</Txt>
      {components.map((component, index) => (
        <InfoComponent
          key={`${component.id}fdaf${index}`}
          component={component}
          typeMacro={typeMacro}
          macrocycleId={macrocycleId}
        />))}
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
            name={iconsConstants.cancel}
            color={theme.colors.red.default}
            size={40}
                />}
          onPress={() => setEditMode(false)}
        />}
    </View>
  )
}
