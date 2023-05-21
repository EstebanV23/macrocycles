import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNewMacro = StyleSheet.create({
  containerOutlet: {
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  containerScroll: {
    maxHeight: Dimensions.get('screen').height - 250,
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    padding: 10,
    elevation: 4,
    shadowColor: theme.colors.text,
    shadowRadius: 20
  }
})

export default StyleNewMacro
