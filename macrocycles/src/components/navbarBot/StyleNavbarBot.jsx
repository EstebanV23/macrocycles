import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNavbarBot = StyleSheet.create({
  navbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    paddingBottom: 30,
    width: Dimensions.get('window').width,
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.white
  },
  contentLinks: {
    display: 'flex',
    flexDirection: 'row',
    gap: 35
  }
})

export default StyleNavbarBot
