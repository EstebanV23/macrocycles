import React, { useEffect, useState } from 'react'
import DateInput from '../dateInput/DateInput'

export default function ItemInputDataRoadMap ({ handleCondition, limitDate, minDate, label, name, defaultValue }) {
  const [date, setDate] = useState(defaultValue)

  useEffect(() => {
    setDate(defaultValue)
  }, [defaultValue])
  return (
    <DateInput
      label={label}
      limitDate={limitDate}
      conditionFunction={handleCondition}
      name={name}
      value={date}
      setValue={setDate}
      minDate={minDate}
      errors={{}}
    />
  )
}