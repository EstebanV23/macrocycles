import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleListLinksNavbar = StyleSheet.create({
  list: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  linkBig: {
    position: 'relative',
    bottom: 40,
    backgroundColor: theme.colors.white,
    shadowColor: `${theme.colors.text}90`,
    padding: 10,
    elevation: 5
  }
})

export default StyleListLinksNavbar
