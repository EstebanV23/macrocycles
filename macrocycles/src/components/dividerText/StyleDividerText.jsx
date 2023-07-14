import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleDividerText = StyleSheet.create({
  containerDivider: {
    position: 'relative',
    marginVertical: 20
  },
  content: {
    position: 'absolute',
    width: '100%',
    top: -12,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  text: {
    backgroundColor: theme.colors.white,
    zIndex: 3,
    paddingHorizontal: 10
  }
})

export default StyleDividerText
