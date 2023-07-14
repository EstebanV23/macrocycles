import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleNewStage = StyleSheet.create({
  rowContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    width: '100%'
  },
  iconButton: {
    backgroundColor: theme.colors.red.default,
    height: 22,
    width: 22
  },
  input: {
    width: '90%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  text: {
    marginVertical: 5
  },
  rowCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default StyleNewStage
