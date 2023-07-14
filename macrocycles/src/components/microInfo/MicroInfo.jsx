import { useEffect, useState } from 'react'
import OnlyMicroData from '../onlyMicroData/OnlyMicroData'
import { View } from 'react-native'

export default function MicroInfo ({ micros, setMicrosSelecteds }) {
  const [valuesMicros, setValuesMicros] = useState([])

  useEffect(() => {
    setMicrosSelecteds(valuesMicros)
  }, [valuesMicros])

  return micros.map(micro => (
    <View key={micro.id}>
      <OnlyMicroData
        micro={micro}
        functionArray={setValuesMicros}
        array={valuesMicros}
      />
    </View>
  ))
}
