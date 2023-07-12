/*
{
      "amount": 120,
      "type": "fuerza",
      "unitMeasure": 1,
      "mesocycles": [
        {
          "type": "desaro",
          "percent": 10,
          "amount": 12,
          "microcycles": [
            {
              "type": "ordinario",
              "percent": 50,
              "amount": 6
            },
            {
              "type": "ordinario",
              "percent": 50,
              "amount": 6
            }
          ]
        },
        {
          "type": "desaro 2",
          "percent": 20,
          "amount": 24,
          "microcycles": [
            {
              "type": "ordinario",
              "percent": 50,
              "amount": 12
            },
            {
              "type": "ordinario",
              "percent": 50,
              "amount": 12
            }
          ]
        }
      ]
    }
*/

import { View, ScrollView } from 'react-native'
import Txt from '../Txt/Txt'
import componentsUnits from '../../constants/componentsUnits'
import Style from './StyleInfoComponent'
import ComponentMesocycle from '../componentMesocycle/ComponentMesocycle'

export default function InfoComponent ({ component, typeMacro }) {
  const { amount, type, unitMeasure, mesocycles: mesocycleComponent } = component

  const unitMeasureInfo = componentsUnits.find(unit => unit.value === unitMeasure)
  const { unitValue } = unitMeasureInfo

  return (
    <View Style={Style.content}>
      <Txt quickBold medium>Componente por {type}</Txt>
      {typeMacro === 1 && <Txt quick>Cantidad total: {amount} {unitValue}</Txt>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={Style.scroll}
      >
        {mesocycleComponent.map((mesocycle, index) => (
          <ComponentMesocycle
            key={`${mesocycle.type}${mesocycle.amount}${mesocycle.percent}re${index}`}
            mesocycle={mesocycle}
            typeMacro={typeMacro}
            unitValue={unitValue}
          />
        ))}
      </ScrollView>
    </View>
  )
}
