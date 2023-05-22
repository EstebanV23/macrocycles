import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleUnitProgress = StyleSheet.create({
  component: {
    height: 5,
    borderRadius: 20
  },
  fullComponent: {
    width: '100%'
  },
  transparent: {
    backgroundColor: theme.colors.gray
  },
  green: {
    backgroundColor: theme.colors.green[500]
  },
  red: {
    backgroundColor: theme.colors.red[500]
  }
})

export default StyleUnitProgress
