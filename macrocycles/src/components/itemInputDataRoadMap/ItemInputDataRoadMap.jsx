import React, { useState } from 'react'
import DateInput from '../dateInput/DateInput'

export default function ItemInputDataRoadMap ({ handleCondition, limitDate, minDate, label, name, defaultValue }) {
  const [date, setDate] = useState(defaultValue)
  return (
    <DateInput
      label={label}
      limitDate={limitDate}
      conditionFunction={handleCondition}
      name={name}
      value={date}
      setValue={setDate}
      minDate={minDate}
    />
  )
}
