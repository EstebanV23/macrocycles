import { View } from 'react-native'
import Style from './StyleDateInput'
import Txt from '../Txt/Txt'
import { useEffect, useState } from 'react'
import formatDataFromDate from '../../helpers/formatDataFromDate'
import DateTimePicker from 'react-native-modern-datepicker'

export default function DateInput ({ label, setDateTop, initialDate, limitDate, minDate = formatDataFromDate(new Date('05-23-2023')), placeholder }) {
  const [date, setDate] = useState(initialDate)

  useEffect(() => {
    setDateTop(date)
  }, [date])

  return (
    <View
      style={Style.containerInput}
    >
      <Txt quick primary>{label}</Txt>
      <DateTimePicker
        mode='calendar'
        minimumDate={minDate}
        selected={date}
        onDateChange={(date) => setDate(date)}
      />
    </View>
  )
}
