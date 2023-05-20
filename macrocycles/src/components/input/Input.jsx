import { Controller } from 'react-hook-form'
import { TextInput } from '@react-native-material/core'
import Style from './StyleInput'
import Txt from '../Txt/Txt'
import theme from '../../theme/theme'
import { View } from 'react-native'
import { useState } from 'react'

export default function Input ({ control, name, required = true, defaultValue, label, errors, rules, secureTextEntry, icon, editable = true, ...props }) {
  const { pattern, message } = rules[name]
  const [select, setSelect] = useState(false)

  return (
    <View>
      <Controller
        control={control}
        rules={{
          pattern,
          required
        }}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={(...args) => {
              setSelect(false)
              onBlur(...args)
            }}
            onChangeText={onChange}
            onFocus={() => setSelect(true)}
            value={value}
            secureTextEntry={secureTextEntry}
            label={<Txt quick gray={!select} green={select} error={select && errors[name]}>{label}</Txt>}
            variant='outlined'
            color={!errors[name] ? theme.colors.green.default : theme.colors.red[300]}
            style={Style.leading}
            trailing={icon}
            editable={editable}
            electTextOnFocus={editable}
            {...props}
          />
        )}
        name={name}
      />
      {errors[name] && <Txt small error quick>{message}</Txt>}
    </View>
  )
}
