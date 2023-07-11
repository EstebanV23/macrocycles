import { View, ScrollView } from 'react-native'
import Txt from '../Txt/Txt'
import Style from './StyleNewComponentMeso'
import { Icon, IconButton } from '@react-native-material/core'
import iconsConstants from '../../constants/iconConstants'
import theme from '../../theme/theme'
import ContentComponentInfo from '../contentComponentInfo/ContentComponentInfo'
import InputGeneral from '../inputGeneral/InputGeneral'
import typesMesocycles from '../../constants/typesMesocycles'
import { useEffect, useState } from 'react'
import Select from '../select/Select'
import componentsUnits from '../../constants/componentsUnits'
import MesoEditComponent from '../mesoEditComponent/MesoEditComponent'

export default function NewComponentMeso ({ component, typeMacro, position, deleteComponent, saveComponents }) {
  console.log('🚀 ~ file: NewComponentMeso.jsx:9 ~ NewComponentMeso ~ component:', component)

  const { type, unitMeasure, amount, mesocycles } = component

  const [typeComponent, setTypeComponent] = useState(type)
  const [amountComponent, setAmountComponent] = useState(amount)
  const [unitMeasureComponent, setUnitMeasureComponent] = useState(unitMeasure)
  const [mesosComponent, setMesosComponent] = useState(mesocycles)

  const modifyMeso = (newMeso, position) => {
    const newMesos = mesosComponent.map((meso, index) => index === position ? newMeso : meso)
    setMesosComponent(newMesos)
  }

  useEffect(() => {
    const newComponent = {
      type: typeComponent,
      amount: Number(amountComponent),
      unitMeasure: Number(unitMeasureComponent),
      mesocycles: mesosComponent
    }
    saveComponents(newComponent, position)
  }, [typeComponent, amountComponent, unitMeasureComponent, mesosComponent])

  return (
    <View style={Style.content}>
      <InputGeneral
        value={typeComponent}
        onChangeText={setTypeComponent}
        label='Tipo de componente'
      />
      {
        typeMacro === 1 && (
          <InputGeneral
            value={String(amountComponent)}
            onChangeText={setAmountComponent}
            label='Cantidad total del componente'
            inputMode='numeric'
          />
        )
      }
      <Select
        items={componentsUnits}
        selectedValue={unitMeasureComponent}
        setSelectedValue={setUnitMeasureComponent}
        placeholder='Unidad de medida'
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={Style.scroll}
      >
        {
          mesosComponent.map((meso, index) => (
            <MesoEditComponent
              key={`${meso.type}${meso.amount}${meso.percent}x${index}`}
              meso={meso}
              position={index}
              modifyMeso={modifyMeso}
              typeMacro={typeMacro}
              amountComponent={amountComponent}
            />
          ))
        }
      </ScrollView>
      <IconButton
        icon={<Icon
          name={iconsConstants.cancel}
          color={theme.colors.red.default}
          size={20}
              />}
        onPress={() => deleteComponent(position)}
      />
    </View>
  )
}
