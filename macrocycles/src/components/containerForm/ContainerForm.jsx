import { View } from 'react-native'
import StyleContainerForm from './StyleContainerForm'
import Txt from '../Txt/Txt'

export default function ContainerForm ({ children, title }) {
  return (
    <View
      style={StyleContainerForm.container}
    >
      <Txt
        extraBig
        red
        style={StyleContainerForm.title}
      >
        {title}
      </Txt>
      {children}
    </View>
  )
}
