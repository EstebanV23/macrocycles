import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNavbarBot = StyleSheet.create({
  navbarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    position: 'absolute',
    paddingBottom: 10,
    width: Dimensions.get('window').width,
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.white
  }
})

export default StyleNavbarBot
