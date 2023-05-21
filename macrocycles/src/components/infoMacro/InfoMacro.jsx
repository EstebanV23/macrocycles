import { View } from 'react-native'
import Txt from '../Txt/Txt'
import DateInput from '../dateInput/DateInput'
import { useState } from 'react'

export default function InfoMacro () {
  const [date, setDate] = useState(null)
  console.log(date)
  return (
    <View>
      <Txt quick light small primary justify>Recuerde que toda la información suministrada podrá ser cambiana en un futuro, a exepción de las características que ya hayan superado su fecha límite, como pueden ser los microciclos, sesiones, etc.</Txt>
      <DateInput
        setDateTop={setDate}
      />
    </View>
  )
}
