import { TextInput } from 'react-native'
import Style from './StyleBasicInput'
import { Controller } from 'react-hook-form'

export default function BasicInput ({
  editable,
  selected,
  setSelected,
  onChange: change,
  onValue,
  required,
  control,
  name,
  placeholder,
  disabled,
  defaultValue,
  error,
  multiline,
  inputMode
}) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      rules={{ required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          editable={editable}
          placeholder={placeholder}
          value={onValue || value}
          style={[Style.input, disabled && Style.disabled, error && Style.error, selected && Style.selected]}
          onChange={change || onChange}
          onBlur={(...args) => {
            onBlur(...args)
            setSelected(false)
          }}
          onFocus={() => setSelected(true)}
          multiline={multiline}
          inputMode={inputMode}
          cursorColor={error ? Style.error : Style.selected}
        />
      )}
      name={name}
    />
  )
}

export function BasicInputNoControl ({ editable, selected, setSelected, onChangeText, value, placeholder, style, disabled, error, multiline, inputMode, onKeyPress = () => {} }) {
  return (
    <TextInput
      onSubmitEditing={() => onKeyPress()}
      editable={editable}
      placeholder={placeholder}
      value={value}
      style={[Style.input, disabled && Style.disabled, error && Style.error, selected && Style.selected, style]}
      onChangeText={onChangeText}
      onBlur={() => setSelected(false)}
      onFocus={() => setSelected(true)}
      multiline={multiline}
      inputMode={inputMode}
      cursorColor={error ? Style.errorPick : Style.selectedPick}
    />
  )
}
