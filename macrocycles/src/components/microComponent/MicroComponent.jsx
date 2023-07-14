import { View } from 'react-native'
import Style from './StyleMicroComponent'
import ContentComponentInfo from '../contentComponentInfo/ContentComponentInfo'
import InputGeneral from '../inputGeneral/InputGeneral'
import typesMesocycles from '../../constants/typesMesocycles'
import { useEffect, useState } from 'react'
import typeMicrocycles from '../../constants/typesMicrocycles'

export default function MicroComponent ({ micro, modifyMicro, amountMeso, position, amountUnit }) {
  const { type, percent, amount } = micro

  const [typeMicro, setTypeMicro] = useState(typeMicrocycles[Number(type) - 1].label)
  const [percentMicro, setPercentMicro] = useState(percent)
  const [amountMicro, setAmountMicro] = useState(amount)

  useEffect(() => {
    const percentValue = Number(percentMicro) * amountMeso / 100
    setAmountMicro(percentValue)
  }, [amountMeso, percentMicro])

  useEffect(() => {
    const newMicro = {
      type: typeMicro,
      percent: Number(percentMicro),
      amount: Number(amountMicro)
    }
    modifyMicro(newMicro, position)
  }, [typeMicro, percentMicro, amountMicro])

  return (
    <View>
      <ContentComponentInfo>
        <InputGeneral
          label='Tipo de microciclo'
          disabled
          value={typeMicro}
          editable={false}
        />
      </ContentComponentInfo>
      <ContentComponentInfo>
        <InputGeneral
          label='Porcentaje %'
          disabled={amountMeso <= 0}
          value={String(percentMicro)}
          inputMode='numeric'
          onChangeText={setPercentMicro}
          editable={amountMeso > 0}
        />
      </ContentComponentInfo>
      <ContentComponentInfo>
        <InputGeneral
          label={`Valor en ${amountUnit}`}
          disabled
          value={amountMicro}
          inputMode='numeric'
          editable={false}
        />
      </ContentComponentInfo>
    </View>
  )
}
