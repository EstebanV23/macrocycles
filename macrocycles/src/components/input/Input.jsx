import { Controller } from 'react-hook-form'
import { TextInput } from '@react-native-material/core'
import Style from './StyleInput'
import Txt from '../Txt/Txt'
import theme from '../../theme/theme'

export default function Input ({ control, name, label, errors, rules, secureTextEntry, icon, editable = true, ...props }) {
  const { pattern, message } = rules[name]
  console.log({ errors })
  return (
    <>
      <Controller
        control={control}
        rules={{
          pattern
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            label={label}
            variant='outlined'
            color={theme.colors.green.default}
            inputContainerStyle={Style.input}
            inputStyle={Style.leading}
            leadingContainerStyle={Style.leading}
            trailing={icon}
            style={Style.leading}
            editable={editable}
            electTextOnFocus={editable}
            {...props}
          />
        )}
        name={name}
      />
      {errors[name] && <Txt>{message}</Txt>}
    </>
  )
}
