import Checkbox from 'expo-checkbox'
import { useEffect, useState } from 'react'
import theme from '../../theme/theme'
import { View, TouchableOpacity } from 'react-native'
import Txt from '../Txt/Txt'

export default function Check ({ initialCheck = false, disabled, setTopCheck, text, information }) {
  const [check, setCheck] = useState(initialCheck)

  return (
    <View style={{ marginVertical: 10 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }}
        onPress={() => {
          if (disabled) return
          setCheck(!check)
          setTopCheck(!check)
        }}
      >
        <Checkbox
          disabled={disabled}
          value={check}
          onValueChange={(newValue) => {
            setCheck(newValue)
            setTopCheck(newValue)
          }}
          color={check ? `${theme.colors.blue[600]}80` : theme.colors.gray}
        />
        <Txt quick primary light disabled={disabled}>{text}</Txt>
      </TouchableOpacity>
      {information && <Txt quick small gray>{information}</Txt>}
    </View>
  )
}
