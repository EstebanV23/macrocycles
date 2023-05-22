import { View } from 'react-native'
import Txt from '../Txt/Txt'
import DateInput from '../dateInput/DateInput'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RoatMapContext } from '../../store/RoadMapStore'
import InputGeneral from '../inputGeneral/InputGeneral'
import formatDataFromDate from '../../helpers/formatDataFromDate'
import Check from '../check/Check'
import useHanlderDates from '../../hooks/useHanlderDates'
import { UserContext } from '../../store/UserStore'

export default function InfoMacro () {
  const { startDate, setStartDate, endDate, setEndDate, differentsDays } = useHanlderDates()
  const { setCurrentFunction } = useContext(RoatMapContext)
  const { newAlert } = useContext(UserContext)
  const [check, setCheck] = useState(false)
  const [macroName, setMacroName] = useState('')
  const [errors, setErrors] = useState({})

  const handlerFunction = () => {
    console.log({ startDate, endDate, differentsDays, macroName })
    if (macroName.trim() === '') {
      newAlert('error', 'Campos incompletos')
      setErrors({
        ...errors,
        macroName: { message: 'El nombre es requerido' }
      })
      return false
    } else {
      setErrors({
        ...errors,
        macroName: null
      })
    }
    return false
  }

  useEffect(() => {
    setCurrentFunction(() => handlerFunction)
  }, [startDate, endDate, differentsDays, macroName])

  return (
    <View>
      <Txt quick light small primary justify style={{ marginBottom: 10 }}>Recuerde que toda la información suministrada podrá ser cambiana en un futuro, a exepción de las características que ya hayan superado su fecha límite, como pueden ser los microciclos, sesiones, etc.</Txt>
      <View
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <InputGeneral
          name='macroName'
          onChangeText={setMacroName}
          value={macroName}
          label='Nombre'
          placeholder='Nombre de la macrociclo'
          required
          errors={errors}
        />
        <DateInput
          setValue={setStartDate}
          label='Fecha de inicio'
          value={startDate}
        />
        <DateInput
          setDateTop={setEndDate}
          label='Fecha de fin'
          disabled={!startDate}
          minDate={formatDataFromDate(startDate, false, 4)}
          value={endDate}
          setValue={setEndDate}
        />
        <Check
          initialCheck={check}
          disabled={!startDate || !endDate}
          setTopCheck={setCheck}
          text='Duración de macrociclos iguales?'
          information='Se crearán microciclos con una duración de 4 a 15 días'
        />
      </View>
    </View>
  )
}
