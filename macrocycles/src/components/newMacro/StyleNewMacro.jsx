import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNewMacro = StyleSheet.create({
  containerOutlet: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    paddingBottom: 48 + 10
  },
  containerScroll: {
    maxHeight: Dimensions.get('screen').height - 320,
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    padding: 10,
    elevation: 4,
    shadowColor: theme.colors.text,
    shadowRadius: 20,
    paddingBottom: 60
  }
})

export default StyleNewMacro
