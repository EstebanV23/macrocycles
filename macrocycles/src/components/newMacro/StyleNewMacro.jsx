import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNewMacro = StyleSheet.create({
  containerOutlet: {
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  containerScroll: {
    height: Dimensions.get('screen').height - 600,
    width: '100%',
    backgroundColor: theme.colors.blue[100],
    padding: 10,
    shadowRadius: 20
  }
})

export default StyleNewMacro
