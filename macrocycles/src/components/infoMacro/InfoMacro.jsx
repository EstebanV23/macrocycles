import { View } from 'react-native'
import Txt from '../Txt/Txt'
import DateInput from '../dateInput/DateInput'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RoatMapContext } from '../../store/RoadMapStore'

export default function InfoMacro () {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const { control, formState: { errors }, handleSubmit } = useForm()
  const { setCurrentFunction } = useContext(RoatMapContext)

  const onSubmit = (data) => {
    console.log(data)
    return false
  }

  console.log({ startDate, endDate })

  useEffect(() => {
    setCurrentFunction(handleSubmit(onSubmit))
  }, [])

  return (
    <View>
      <Txt quick light small primary justify>Recuerde que toda la información suministrada podrá ser cambiana en un futuro, a exepción de las características que ya hayan superado su fecha límite, como pueden ser los microciclos, sesiones, etc.</Txt>
      <DateInput
        setDateTop={setStartDate}
        control={control}
        label='Fecha de inicio'
      />
      <DateInput
        setDateTop={setEndDate}
        control={control}
        label='Fecha de fin'
        disabled={!startDate}
      />
    </View>
  )
}
