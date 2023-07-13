import { View } from 'react-native'
import Txt from '../Txt/Txt'
import { useState } from 'react'
import { BasicInputNoControl } from '../basicInput/BasicInput'

export default function InputGeneral ({
  label,
  placeholder,
  name,
  multiline,
  inputMode,
  value,
  disabled,
  onChangeText,
  editable = true,
  errors = {},
  style,
  onKeyPress
}) {
  const [selected, setSelected] = useState(false)

  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%'
        },
        style
      ]}
    >
      {label && <Txt quick gray={!selected} red={selected} error={errors[name]}>{label}</Txt>}
      <BasicInputNoControl
        editable={editable ?? disabled}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChangeText={onChangeText}
        selected={selected}
        setSelected={setSelected}
        error={errors[name]}
        inputMode={inputMode}
        multiline={multiline}
        onKeyPress={onKeyPress}
      />
      {errors[name] && <Txt quick small error style={{ marginTop: 0 }}>{errors[name].message}</Txt>}
    </View>
  )
}