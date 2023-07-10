import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleContentComponentInfo = StyleSheet.create({
  content: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.blue[500],
    display: 'flex',
    minWidth: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
})

export default StyleContentComponentInfo
