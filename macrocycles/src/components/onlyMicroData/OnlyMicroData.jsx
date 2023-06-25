import { View } from 'react-native'
import DateInput from '../dateInput/DateInput'
import Select from '../select/Select'
import Txt from '../Txt/Txt'
import { useEffect, useState } from 'react'
import getDiferenceHours from '../../logic/getDiferenceHours'
import typeMicrocycles from '../../constants/typesMicrocycles'
import InputGeneral from '../inputGeneral/InputGeneral'
import Style from './StyleOnlyMicroData'
import Check from '../check/Check'

export default function OnlyMicroData ({ micro, functionArray, array }) {
  const [value, setValue] = useState(1)
  const [check, setCheck] = useState(() => Boolean(micro.test))
  const [test, setTest] = useState(() => micro.test || '')
  const [frequency, setFrequency] = useState(() => {
    const { days } = getDiferenceHours(micro.startDate, micro.endDate)
    return `${days}`
  })

  useEffect(() => {
    const infoMicro = {
      type: value,
      frequency,
      id: micro.id,
      test
    }

    const newArray = array.filter(item => item.id !== micro.id)
    newArray.push(infoMicro)
    functionArray(newArray)
  }, [value, frequency])
  return (
    <View style={{ marginTop: 20 }}>
      <Txt quick>Microciclo {micro.startDate} - {micro.endDate}</Txt>
      <View style={Style.contentInputs}>
        <DateInput
          label='Fecha de inicio'
          value={micro.startDate}
          errors={{}}
          name={micro.id}
          conditionFunction={() => true}
          disabled
        />
        <DateInput
          label='Fecha de inicio'
          value={micro.endDate}
          errors={{}}
          name={micro.id}
          conditionFunction={() => true}
          disabled
        />
      </View>
      <Select
        items={typeMicrocycles}
        selectedValue={value}
        setSelectedValue={setValue}
      />
      <InputGeneral
        errors={{}}
        label='Frecuencia'
        name={micro.id}
        value={frequency}
        onChangeText={setFrequency}
        inputMode='numeric'
      />
      <Check
        setTopCheck={setCheck}
        initialCheck={check}
        text='Tiene test?'
      />
      {
        check &&
          <InputGeneral
            errors={{}}
            label='Test Microciclo'
            onChangeText={setTest}
            value={test}
            name={`TEST${micro.id}`}
            placeholder='Médico, FMS, etc.'
            editable={check}
          />
      }
    </View>
  )
}
