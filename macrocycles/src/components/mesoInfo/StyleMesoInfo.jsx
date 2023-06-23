import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const styleMesoInfo = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  containerPressable: {
    padding: 5
  },
  contentAdd: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  containerPressableColor: {
    borderRadius: 20
  },
  error: {
    backgroundColor: theme.colors.red[100]
  },
  success: {
    backgroundColor: theme.colors.green[100]
  }
})

export default styleMesoInfo
