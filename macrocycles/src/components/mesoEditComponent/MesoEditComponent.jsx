import { View } from 'react-native'
import Style from './StyleMesoEditComponent'
import ContentComponentInfo from '../contentComponentInfo/ContentComponentInfo'
import { useEffect, useState } from 'react'
import InputGeneral from '../inputGeneral/InputGeneral'
import typesMesocycles from '../../constants/typesMesocycles'
import Txt from '../Txt/Txt'
import MicroComponent from '../microComponent/MicroComponent'
export default function MesoEditComponent ({ meso, position, modifyMeso, typeMacro, amountComponent, amountUnit }) {
  const { type, percent, amount, microcycles } = meso

  const [typeMeso, setTypeMeso] = useState(type)
  const [percentMeso, setPercentMeso] = useState(percent)
  const [amountMeso, setAmountMeso] = useState(amount)
  const [microcyclesMeso, setMicrocyclesMeso] = useState(microcycles)
  const [showMicros, setShowMicros] = useState(microcycles)

  const modifyMicro = (newMicro, position) => {
    const newMicros = microcyclesMeso.map((micro, index) => index === position ? newMicro : micro)
    setMicrocyclesMeso(newMicros)
  }

  useEffect(() => {
    const percentValue = Number(percentMeso) * amountComponent / 100
    setAmountMeso(percentValue)
  }, [percentMeso, amountComponent])

  useEffect(() => {
    const newMeso = {
      type: typeMeso,
      percent: Number(percentMeso),
      amount: Number(amountMeso),
      microcycles: microcyclesMeso
    }
    modifyMeso(newMeso, position)
  }, [typeMeso, percentMeso, amountMeso, microcyclesMeso])

  return (
    <View style={Style.content}>
      <ContentComponentInfo>
        <InputGeneral
          disabled
          label='Tipo de mesociclo'
          value={typesMesocycles[Number(typeMeso) - 1].label}
          editable={false}
        />
      </ContentComponentInfo>
      <ContentComponentInfo>
        <InputGeneral
          label='Porcentaje %'
          disabled={typeMacro === 2}
          value={String(percentMeso)}
          inputMode='numeric'
          onChangeText={setPercentMeso}
          editable={!(typeMacro === 2)}
        />
      </ContentComponentInfo>
      <ContentComponentInfo>
        <InputGeneral
          label={`Valor en ${amountUnit}`}
          disabled={typeMacro === 1}
          value={amountMeso}
          inputMode='numeric'
          onChangeText={setAmountMeso}
          editable={!(typeMacro === 1)}
        />
      </ContentComponentInfo>
      <View style={Style.contentRow}>
        {
          showMicros.map((micro, index) => (
            <MicroComponent
              key={`${micro.id}+${micro.amount}+${index}+${micro.type}+${micro.percent}`}
              micro={micro}
              modifyMicro={modifyMicro}
              amountMeso={amountMeso}
              position={index}
              amountUnit={amountUnit}
            />
          ))
        }
      </View>
    </View>
  )
}
