import { View } from 'react-native'
import LinearGradientMe from '../linearGradientMe/LinearGradientMe'
import StylesBackgroundTop from './StylesBackgroundTop'
import Txt from '../Txt/Txt'

export default function BackgroundTop ({ children, text = 'MACROCYCLES' }) {
  return (
    <View>
      <LinearGradientMe
        style={StylesBackgroundTop.backgroundTop}
      >
        <Txt
          white
          extraBig
          style={{ marginTop: '30%' }}
        >
          {text}
        </Txt>
        {children}
      </LinearGradientMe>
    </View>
  )
}
