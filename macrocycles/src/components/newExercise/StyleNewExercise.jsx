import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNewExercise = StyleSheet.create({
  input: {
    width: '100%'
  },
  iconButton: {
    backgroundColor: theme.colors.red.default,
    height: 22,
    width: 22
  },
  content: {
    padding: 7,
    borderRadius: 8,
    backgroundColor: theme.colors.blue[200]
  },
  columnCon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  }
})

export default StyleNewExercise
